// Two small servers used only for measurement:
//  - the site server serves a production build the way Vercel does (brotli,
//    long-lived caching for /assets, the same catch-all page rewrite);
//  - the fixture API answers the few PostgREST calls the pages make.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { brotliCompressSync, gzipSync } from 'node:zlib'
import { extname, join, normalize } from 'node:path'
import { TABLES } from './fixtures.mjs'

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
}
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg', '.xml', '.txt'])

// Mirrors vercel.json: "/" is the prerendered Home page (index.html), real
// files are served as they are, and everything else gets the blank app shell.
const STATIC_PREFIX = /^\/(robots\.txt|sitemap\.xml|llms\.txt|assets\/)/

export function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0])
  if (clean === '/') return '/index.html'
  if (!STATIC_PREFIX.test(clean)) return '/app-shell.html'
  return clean
}

function encodingFor(req, ext) {
  if (!COMPRESSIBLE.has(ext)) return null
  const accept = String(req.headers['accept-encoding'] ?? '')
  if (/\bbr\b/.test(accept)) return 'br'
  if (/\bgzip\b/.test(accept)) return 'gzip'
  return null
}

export function startSiteServer({ distDir, port }) {
  const cache = new Map()
  const server = createServer(async (req, res) => {
    try {
      const rel = resolveFile(req.url ?? '/')
      const abs = normalize(join(distDir, rel))
      if (!abs.startsWith(distDir)) { res.writeHead(403).end(); return }
      const info = await stat(abs).catch(() => null)
      if (!info?.isFile()) { res.writeHead(404).end('not found'); return }

      const ext = extname(abs).toLowerCase()
      const enc = encodingFor(req, ext)
      const key = `${abs}|${enc}`
      let body = cache.get(key)
      if (!body) {
        const raw = await readFile(abs)
        body = enc === 'br' ? brotliCompressSync(raw) : enc === 'gzip' ? gzipSync(raw) : raw
        cache.set(key, body)
      }
      const headers = {
        'content-type': TYPES[ext] ?? 'application/octet-stream',
        'content-length': body.length,
        'cache-control': rel.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
        vary: 'Accept-Encoding',
      }
      if (enc) headers['content-encoding'] = enc
      res.writeHead(200, headers).end(body)
    } catch (err) {
      res.writeHead(500).end(String(err))
    }
  })
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)))
}

// Only the filters the pages use matter here: slug=eq.<slug>. Everything in
// the fixtures is published, so published=eq.true needs no handling.
export function queryRows(table, searchParams, wantsObject) {
  const rows = TABLES[table]
  if (!rows) return { status: 404, body: { message: `unknown table ${table}` } }
  const slug = searchParams.get('slug')?.replace(/^eq\./, '')
  const filtered = slug ? rows.filter((r) => r.slug === slug) : rows
  if (wantsObject) {
    return filtered.length === 1
      ? { status: 200, body: filtered[0] }
      : { status: 406, body: { code: 'PGRST116', message: 'no rows' } }
  }
  return { status: 200, body: filtered }
}

export function startFixtureApi({ port }) {
  const cors = {
    'access-control-allow-origin': '*',
    'access-control-allow-headers': '*',
    'access-control-allow-methods': 'GET, OPTIONS',
    'access-control-max-age': '600',
  }
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost')
    if (req.method === 'OPTIONS') { res.writeHead(204, cors).end(); return }
    const match = url.pathname.match(/^\/rest\/v1\/([a-z_]+)$/)
    if (!match) { res.writeHead(404, cors).end(); return }
    const wantsObject = String(req.headers.accept ?? '').includes('vnd.pgrst.object+json')
    const { status, body } = queryRows(match[1], url.searchParams, wantsObject)
    res.writeHead(status, { ...cors, 'content-type': 'application/json' }).end(JSON.stringify(body))
  })
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)))
}
