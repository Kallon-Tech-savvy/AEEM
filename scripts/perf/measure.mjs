// Measures Largest Contentful Paint for every route under a pinned profile.
//   npm run perf                      all routes, 5 runs, mid-4g profile
//   npm run perf -- --routes home,about --runs 3
//   npm run perf -- --profile slow-4g
//   npm run perf -- --baseline        also writes perf/baseline.json + perf/BASELINE.md
// See perf/README.md for what the numbers mean.
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import {
  API_PORT, BUDGET_LCP_MS, DEFAULT_RUNS, PROFILES, ROUTES, SCREEN, SITE_PORT,
} from './config.mjs'
import { startFixtureApi, startSiteServer } from './server.mjs'
import { markdownTable, summarize } from './stats.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const distDir = join(root, '.perf', 'dist')

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`)
  if (i === -1) return fallback
  const next = process.argv[i + 1]
  return next && !next.startsWith('--') ? next : true
}

const runs = Number(arg('runs', DEFAULT_RUNS))
const profileName = String(arg('profile', 'mid-4g'))
const profile = PROFILES[profileName]
if (!profile) throw new Error(`unknown profile "${profileName}" (have: ${Object.keys(PROFILES).join(', ')})`)
const wanted = arg('routes', null)
const routes = wanted ? ROUTES.filter((r) => String(wanted).split(',').includes(r.key)) : ROUTES
if (!routes.length) throw new Error('no routes selected')

if (!arg('skip-build', false)) {
  console.log('Building production bundle against the fixture API...')
  const env = {
    ...process.env,
    VITE_SUPABASE_URL: `http://127.0.0.1:${API_PORT}`,
    VITE_SUPABASE_PUBLISHABLE_KEY: 'perf-fixture-key',
  }
  const run = (args) => execFileSync('npx', args, { cwd: root, stdio: 'inherit', env })
  const ssrDir = join(root, '.perf', 'ssr')
  // The same three steps as `npm run build`: client bundle, server bundle, prerender.
  run(['vite', 'build', '--outDir', distDir, '--emptyOutDir', '--logLevel', 'warn'])
  run(['vite', 'build', '--ssr', 'src/entry-server.tsx', '--outDir', ssrDir, '--emptyOutDir', '--logLevel', 'warn'])
  run(['node', 'scripts/prerender.mjs', '--dist', distDir, '--ssr', join(ssrDir, 'entry-server.js')])
}

const site = await startSiteServer({ distDir, port: SITE_PORT })
const api = await startFixtureApi({ port: API_PORT })

function lighthouseFlags(port) {
  return {
    port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance'],
    formFactor: 'mobile',
    screenEmulation: SCREEN,
    throttlingMethod: 'simulate',
    throttling: {
      rttMs: profile.rttMs,
      throughputKbps: profile.throughputKbps,
      cpuSlowdownMultiplier: profile.cpuSlowdownMultiplier,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
  }
}

function extract(lhr, url) {
  const a = lhr.audits
  // A page that crashes to blank has no LCP. Fail loudly instead of recording NaN.
  if (!Number.isFinite(a['largest-contentful-paint']?.numericValue)) {
    throw new Error(`No Largest Contentful Paint for ${url}: ${a['largest-contentful-paint']?.errorMessage ?? 'the page painted nothing (crashed or blank?)'}`)
  }
  const node = a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node
  return {
    lcp: a['largest-contentful-paint'].numericValue,
    fcp: a['first-contentful-paint'].numericValue,
    tbt: a['total-blocking-time'].numericValue,
    bytes: a['total-byte-weight'].numericValue,
    requests: a['network-requests']?.details?.items?.length ?? 0,
    lcpElement: node?.selector ?? node?.snippet ?? 'unknown',
    benchmarkIndex: lhr.environment?.benchmarkIndex,
  }
}

const results = {}
try {
  for (const route of routes) {
    const url = `http://127.0.0.1:${SITE_PORT}${route.path}`
    const samples = []
    for (let i = 0; i < runs; i++) {
      const chrome = await chromeLauncher.launch({
        chromePath: process.env.CHROME_PATH,
        chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      })
      try {
        const res = await lighthouse(url, lighthouseFlags(chrome.port))
        samples.push(extract(res.lhr, url))
      } finally {
        await chrome.kill()
      }
    }
    results[route.key] = summarize(samples)
    const s = results[route.key]
    console.log(`${route.key.padEnd(16)} LCP ${String(s.lcpMs).padStart(5)} ms  (${s.lcpMinMs}-${s.lcpMaxMs})  ${s.transferKB} KB  ${s.requests} req`)
  }
} finally {
  site.close()
  api.close()
}

const report = {
  measuredAt: new Date().toISOString(),
  profile: { name: profileName, ...profile, screen: SCREEN },
  runsPerRoute: runs,
  budgetLcpMs: BUDGET_LCP_MS,
  results,
}

mkdirSync(join(root, '.perf'), { recursive: true })
writeFileSync(join(root, '.perf', 'latest.json'), JSON.stringify(report, null, 2))
const table = markdownTable(results, BUDGET_LCP_MS)
console.log(`\nProfile: ${profileName} (${profile.description}); median of ${runs} runs; budget LCP <= ${BUDGET_LCP_MS} ms\n`)
console.log(table)

if (arg('baseline', false)) {
  mkdirSync(join(root, 'perf'), { recursive: true })
  writeFileSync(join(root, 'perf', 'baseline.json'), JSON.stringify(report, null, 2) + '\n')
  const bench = Object.values(results)[0]?.benchmarkIndex
  writeFileSync(join(root, 'perf', 'BASELINE.md'), [
    '# Load baseline',
    '',
    `Measured ${report.measuredAt} with \`npm run perf -- --baseline\`.`,
    `Profile \`${profileName}\`: ${profile.description} (RTT ${profile.rttMs} ms, ${profile.throughputKbps} Kbps, CPU slowdown ${profile.cpuSlowdownMultiplier}x). Median of ${runs} runs per route, first visit, empty cache.`,
    `Measuring machine CPU benchmark index: ${bench}. Compare numbers only between runs on similar machines.`,
    `Budget: LCP <= ${BUDGET_LCP_MS} ms. This is report-only for now; a later ticket turns it into a failing check.`,
    '',
    table,
    '',
  ].join('\n'))
  console.log('\nWrote perf/baseline.json and perf/BASELINE.md')
}
