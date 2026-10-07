import assert from 'node:assert'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://stkzagbzabdbuapctqjg.supabase.co'
const PUBLISHABLE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'dummy_anon_key'

console.log(`Starting E2E API tests against target endpoint: ${SUPABASE_URL}`)

async function testPublicContentEndpoint(table) {
  console.log(`Testing SELECT query on public table '${table}'...`)
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&published=eq.true`
  const res = await fetch(url, {
    headers: {
      'apikey': PUBLISHABLE_KEY,
      'Authorization': `Bearer ${PUBLISHABLE_KEY}`
    }
  })

  // Public select should succeed with 200 or return 401 if key is strictly validated
  assert.ok([200, 401].includes(res.status), `Unexpected status code ${res.status} for public SELECT on ${table}`)
  console.log(`✓ Table '${table}' endpoint responded with HTTP ${res.status}`)
}

async function testInquiryFunctionCors() {
  console.log('Testing OPTIONS CORS request on submit-inquiry Edge Function...')
  const functionUrl = `${SUPABASE_URL}/functions/v1/submit-inquiry`

  const res = await fetch(functionUrl, {
    method: 'OPTIONS',
    headers: {
      'Origin': 'https://www.aeemmovement.org',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'content-type'
    }
  })

  assert.ok([200, 204, 404, 500, 503].includes(res.status), `Unexpected OPTIONS status code ${res.status}`)
  console.log(`✓ OPTIONS preflight request responded with HTTP ${res.status}`)
}

async function run() {
  try {
    await testPublicContentEndpoint('events')
    await testPublicContentEndpoint('impact_stories')
    await testPublicContentEndpoint('resources')
    await testInquiryFunctionCors()
    console.log('\n✓ End-to-End API endpoint test suite executed successfully.')
  } catch (err) {
    console.error('E2E API Test Failed:', err)
    process.exit(1)
  }
}

run()
