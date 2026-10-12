// Self-check for the harness's own pure logic. Run: npm run perf:test
import assert from 'node:assert'
import { median, summarize, markdownTable } from './stats.mjs'
import { queryRows, resolveFile } from './server.mjs'
import { ROUTES, PROFILES, SLUGS } from './config.mjs'

// median: odd, even, unsorted input
assert.strictEqual(median([3, 1, 2]), 2)
assert.strictEqual(median([4, 1, 3, 2]), 2.5)
assert.throws(() => median([]))

// summarize picks the LCP element of the run closest to the median
const s = summarize([
  { lcp: 900, fcp: 500, tbt: 10, bytes: 2048, requests: 10, lcpElement: 'h1' },
  { lcp: 1000, fcp: 520, tbt: 20, bytes: 4096, requests: 12, lcpElement: 'img.hero' },
  { lcp: 3000, fcp: 700, tbt: 30, bytes: 4096, requests: 14, lcpElement: 'p' },
])
assert.strictEqual(s.lcpMs, 1000)
assert.strictEqual(s.lcpElement, 'img.hero')
assert.strictEqual(s.lcpMinMs, 900)
assert.strictEqual(s.lcpMaxMs, 3000)
assert.match(markdownTable({ home: s }, 1000), /\| home \| 1000 \|.*\| pass \|/)

// site server mirrors vercel.json: Home is the prerendered index.html, other
// pages go to the blank app shell, static files are served as they are
assert.strictEqual(resolveFile('/about'), '/app-shell.html')
assert.strictEqual(resolveFile('/events/some-slug'), '/app-shell.html')
assert.strictEqual(resolveFile('/?utm_source=x'), '/index.html')
assert.strictEqual(resolveFile('/'), '/index.html')
assert.strictEqual(resolveFile('/assets/index-abc.js'), '/assets/index-abc.js')
assert.strictEqual(resolveFile('/robots.txt'), '/robots.txt')

// fixture API: lists, single objects by slug, and a miss
assert.strictEqual(queryRows('events', new URLSearchParams(), false).body.length, 3)
const one = queryRows('events', new URLSearchParams({ slug: `eq.${SLUGS.event}` }), true)
assert.strictEqual(one.status, 200)
assert.strictEqual(one.body.slug, SLUGS.event)
assert.strictEqual(queryRows('events', new URLSearchParams({ slug: 'eq.nope' }), true).status, 406)
assert.strictEqual(queryRows('nope', new URLSearchParams(), false).status, 404)

// every detail route the router has resolves to a fixture row
for (const [path, table, slug] of [
  [ROUTES.find((r) => r.key === 'impact-detail').path, 'impact_stories', SLUGS.story],
  [ROUTES.find((r) => r.key === 'event-detail').path, 'events', SLUGS.event],
  [ROUTES.find((r) => r.key === 'resource-detail').path, 'resources', SLUGS.resource],
]) {
  assert.ok(path.endsWith(slug), `${path} uses ${slug}`)
  assert.strictEqual(queryRows(table, new URLSearchParams({ slug: `eq.${slug}` }), true).status, 200)
}

// the pinned profile has every number Lighthouse needs
for (const [name, p] of Object.entries(PROFILES)) {
  for (const k of ['rttMs', 'throughputKbps', 'cpuSlowdownMultiplier']) {
    assert.ok(Number.isFinite(p[k]) && p[k] > 0, `${name}.${k}`)
  }
}

console.log('perf harness self-check passed')
