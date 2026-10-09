// Runs the REAL supabase/functions/submit-inquiry/index.ts handler in Node
// (Deno.serve and createClient are stubbed) so CORS and the dedupe key are
// tested against the shipped code, not a copy of its logic.
import assert from 'node:assert'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

process.env.ALLOWED_ORIGINS = 'https://preview-test.vercel.app'
process.env.SUPABASE_URL = 'https://example.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key'

const transpile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText

const dir = mkdtempSync(join(tmpdir(), 'submit-inquiry-test-'))

// Server: swap the remote esm.sh import for a stub that records the insert.
const inserted = []
globalThis.__createClient = () => ({
  rpc: async () => ({ data: true, error: null }),
  from: () => ({
    insert: async (row) => {
      inserted.push(row)
      return { error: null }
    },
  }),
})
let handler
globalThis.Deno = {
  env: { get: (key) => process.env[key] },
  serve: (fn) => {
    handler = fn
  },
}
const serverSource = readFileSync('supabase/functions/submit-inquiry/index.ts', 'utf8').replace(
  /^import \{ createClient \}.*$/m,
  'const createClient = (...args) => globalThis.__createClient(...args)',
)
const serverFile = join(dir, 'handler.mjs')
writeFileSync(serverFile, transpile(serverSource))
await import(pathToFileURL(serverFile).href)

// Client: the real key generator the forms use.
const clientFile = join(dir, 'formUtils.mjs')
writeFileSync(clientFile, transpile(readFileSync('src/services/formUtils.ts', 'utf8')))
const { generateSubmissionKey } = await import(pathToFileURL(clientFile).href)

const URL_ = 'https://example.supabase.co/functions/v1/submit-inquiry'

async function preflight(origin, requestHeaders) {
  return handler(
    new Request(URL_, {
      method: 'OPTIONS',
      headers: {
        origin,
        'access-control-request-method': 'POST',
        'access-control-request-headers': requestHeaders,
      },
    }),
  )
}

async function post(body) {
  return handler(
    new Request(URL_, {
      method: 'POST',
      headers: { origin: 'http://localhost:5173', 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }),
  )
}

// 1. The browser sends apikey + authorization + content-type; the preflight must allow all three.
{
  const requested = ['apikey', 'authorization', 'content-type']
  const res = await preflight('http://localhost:5173', requested.join(','))
  assert.strictEqual(res.status, 204)
  assert.strictEqual(res.headers.get('access-control-allow-origin'), 'http://localhost:5173')
  const allowed = (res.headers.get('access-control-allow-headers') ?? '')
    .split(',')
    .map((h) => h.trim().toLowerCase())
  for (const header of requested) {
    assert.ok(allowed.includes(header), `preflight must allow the "${header}" header`)
  }
}

// 2. Origin allowlist: both real hosts, localhost, and the ALLOWED_ORIGINS secret pass; others do not.
for (const origin of [
  'https://aeem-w.vercel.app',
  'https://www.aeemmovement.org',
  'http://localhost:5173',
  'https://preview-test.vercel.app',
]) {
  const res = await preflight(origin, 'content-type')
  assert.strictEqual(res.status, 204, `${origin} should be allowed`)
  assert.strictEqual(res.headers.get('access-control-allow-origin'), origin)
}
{
  const res = await preflight('https://evil.example.com', 'content-type')
  assert.strictEqual(res.status, 403)
  assert.strictEqual(res.headers.get('access-control-allow-origin'), null)
}

// 3. Dedupe key: the server's key must equal the key the form computes, and
//    only an identical message (modulo whitespace) counts as a duplicate.
const base = {
  inquiry_type: 'volunteer',
  full_name: 'Jane Doe',
  email: 'Jane@Example.com',
  message: 'I would like to volunteer at your next workshop.',
}
{
  const res = await post(base)
  assert.strictEqual(res.status, 201)
  const clientKey = await generateSubmissionKey(
    'inquiry',
    base.email,
    base.inquiry_type,
    base.message,
  )
  assert.strictEqual(inserted.at(-1).submission_key, clientKey, 'server and client keys must match')
}
{
  await post({ ...base, message: '  I would like   to volunteer at your\nnext workshop.  ' })
  assert.strictEqual(
    inserted.at(-1).submission_key,
    inserted[0].submission_key,
    'whitespace-only differences must produce the same key',
  )
  await post({ ...base, message: 'A different message about volunteering.' })
  assert.notStrictEqual(
    inserted.at(-1).submission_key,
    inserted[0].submission_key,
    'a different message must produce a different key',
  )
  await post({ ...base, inquiry_type: 'partner' })
  assert.notStrictEqual(
    inserted.at(-1).submission_key,
    inserted[0].submission_key,
    'a different inquiry type must produce a different key',
  )
}

console.log('✓ submit-inquiry handler: CORS preflight, origin allowlist and dedupe key tests passed.')
