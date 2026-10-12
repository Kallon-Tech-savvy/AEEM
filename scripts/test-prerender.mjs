// Checks the build output of `npm run build` (run it first):
//   node scripts/test-prerender.mjs [distDir]
//
// Home is built to static HTML so its content shows before JavaScript runs.
// Every other route must keep getting a blank app shell, otherwise a visitor
// opening /about would briefly see Home's content (see ADR 0002).
import assert from 'node:assert'
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const dist = resolve(process.argv[2] ?? 'dist')
const read = (name) => {
  const file = join(dist, name)
  assert.ok(existsSync(file), `${name} is missing from ${dist}. Run "npm run build" first.`)
  return readFileSync(file, 'utf8')
}
const count = (haystack, needle) => haystack.split(needle).length - 1
// Only <title> elements in <head> are the document title. Inline SVGs in the
// page (such as Home's map) carry their own <title> for accessibility.
const headTitles = (html) => count(html.slice(0, html.indexOf('</head>')), '<title')

const home = read('index.html')
const shell = read('app-shell.html')

// --- Home: content is in the HTML itself --------------------------------------
assert.match(home, /<div id="root" data-prerendered="\/">[\s\S]*<h1[\s\S]*Empowering the[\s\S]*Future[\s\S]*of Africa/,
  'index.html should contain the Home headline inside #root')
assert.ok(home.includes('Pioneering inclusive, equitable, and quality education'),
  'index.html should contain the Home hero paragraph')
assert.ok(home.includes('Help build a future where every child can learn, lead and thrive.'),
  'index.html should contain content from lazily loaded sections too, not only the first screen')
assert.ok(!home.includes('Loading page'), 'index.html must not contain the page loading spinner')

// --- Head: exactly one title, and it is the Home one --------------------------
assert.strictEqual(headTitles(home), 1, 'index.html must have exactly one <title> in <head>')
assert.ok(home.includes('AEEM | Empowering the Future of Africa through Education'), 'Home title should come from the page')
assert.ok(/<meta[^>]+name="description"/.test(home), 'Home description meta should be present')
assert.ok(/<link[^>]+rel="canonical"/.test(home), 'Home canonical link should be present')

// --- Things the prerender must not break --------------------------------------
assert.ok(home.includes("localStorage.getItem('aeem-theme')"), 'the theme script must still run before first paint')
assert.ok(home.indexOf("localStorage.getItem('aeem-theme')") < home.indexOf('data-prerendered'),
  'the theme script must come before the page content')
const scripts = (html) => [...html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g)].map((m) => m[1])
assert.ok(scripts(home).length > 0, 'index.html must still load the app script')
assert.deepStrictEqual(scripts(home), scripts(shell), 'Home and the shell must load the same app script')

// --- Shell: blank, for every other route --------------------------------------
assert.ok(shell.includes('<div id="root"></div>'), 'app-shell.html must have an empty #root')
assert.ok(!shell.includes('data-prerendered'), 'app-shell.html must not claim to be prerendered')
assert.strictEqual(headTitles(shell), 1, 'app-shell.html must have exactly one <title> in <head>')

// --- Routing: other routes get the shell, not Home ----------------------------
const config = JSON.parse(readFileSync(resolve('vercel.json'), 'utf8'))
const fallback = config.rewrites.find((r) => r.source.includes('assets/'))
assert.ok(fallback, 'vercel.json should still have the catch-all rewrite')
assert.strictEqual(fallback.destination, '/app-shell.html',
  'the catch-all rewrite must serve the blank shell, not index.html (which is Home)')
const pattern = new RegExp(`^${fallback.source}$`)
for (const path of ['/about', '/events/some-slug', '/this-page-does-not-exist']) {
  assert.ok(pattern.test(path), `${path} should be rewritten to the shell`)
}
for (const path of ['/assets/index.js', '/robots.txt', '/sitemap.xml', '/llms.txt']) {
  assert.ok(!pattern.test(path), `${path} must not be rewritten`)
}

console.log('✓ prerender: Home is static HTML, every other route gets the blank shell.')
