// Turns the client build into: a prerendered Home page (index.html) and a
// blank app shell (app-shell.html) for every other route. See ADR 0002.
//
//   node scripts/prerender.mjs [--dist dist] [--ssr .prerender/entry-server.js]
//
// Run it after `vite build` and `vite build --ssr src/entry-server.tsx`
// (`npm run build` does all three).
import { copyFile, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}

const dist = resolve(arg('dist', 'dist'))
const ssrEntry = resolve(arg('ssr', '.prerender/entry-server.js'))
const ROOT = '<div id="root"></div>'

const indexPath = join(dist, 'index.html')
const template = await readFile(indexPath, 'utf8')
if (template.split(ROOT).length !== 2) {
  throw new Error(`Expected exactly one ${ROOT} in ${indexPath}. Was it already prerendered?`)
}

// 1. Keep the untouched client shell for every route that is not prerendered.
await copyFile(indexPath, join(dist, 'app-shell.html'))

// 2. Render Home with the same components the browser runs.
const { render } = await import(pathToFileURL(ssrEntry).href)
const { html, head } = await render('/')
if (!html.includes('<h1')) throw new Error('Prerendered Home has no <h1>; refusing to write it.')
if (/Loading page/.test(html)) throw new Error('Prerendered Home still shows the loading spinner; a lazy section did not resolve.')
if (!head.title) throw new Error('Prerendered Home produced no <title>; is <Helmet> missing?')

// 3. Put the markup in #root and the page's own title/meta/canonical in <head>.
//    The template's generic <title> is replaced, not duplicated: browsers use
//    the first <title> in the document.
const headTags = [head.title, head.meta, head.link].filter(Boolean).join('\n    ')
const out = template
  .replace(ROOT, `<div id="root" data-prerendered="/">${html}</div>`)
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace('</head>', `    ${headTags}\n  </head>`)

await writeFile(indexPath, out)
console.log(`Prerendered / (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB of markup) and saved the blank shell as app-shell.html`)
