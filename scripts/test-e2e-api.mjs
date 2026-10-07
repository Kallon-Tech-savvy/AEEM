import assert from 'node:assert'

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || 'https://stkzagbzabdbuapctqjg.supabase.co'

console.log(`Starting live API smoke tests against: ${SUPABASE_URL}`)

async function readJson(res) {
  return res.json().catch(() => null)
}

async function testInquiryFunctionReachability() {
  const functionUrl = `${SUPABASE_URL}/functions/v1/submit-inquiry`
  console.log('Testing submit-inquiry CORS preflight...')

  const options = await fetch(functionUrl, {
    method: 'OPTIONS',
    headers: {
      Origin: 'https://www.aeemmovement.org',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'content-type',
    },
  })

  assert.strictEqual(
    options.status,
    204,
    `Expected submit-inquiry OPTIONS to return 204, got ${options.status}`,
  )

  assert.strictEqual(
    options.headers.get('access-control-allow-origin'),
    'https://www.aeemmovement.org',
    'Expected an explicit allow-origin for the canonical site',
  )

  assert.match(
    options.headers.get('access-control-allow-methods') ?? '',
    /POST/i,
    'Expected CORS to allow POST',
  )

  assert.match(
    options.headers.get('access-control-allow-headers') ?? '',
    /content-type/i,
    'Expected CORS to allow content-type',
  )

  console.log('✓ submit-inquiry function is deployed and CORS is configured')
}

async function testInquiryValidation() {
  const functionUrl = `${SUPABASE_URL}/functions/v1/submit-inquiry`
  console.log('Testing submit-inquiry validation response...')

  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      Origin: 'https://www.aeemmovement.org',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inquiry_type: 'not-a-real-inquiry-type',
      full_name: 'Endpoint Smoke Test',
      email: 'endpoint-smoke-test@example.com',
      message: 'This request should be rejected before any database write.',
    }),
  })

  const body = await readJson(response)

  assert.strictEqual(
    response.status,
    422,
    `Expected invalid inquiry type to return 422, got ${response.status}`,
  )
  assert.deepStrictEqual(
    body,
    { ok: false, code: 'invalid_inquiry_type' },
    'Unexpected validation response from submit-inquiry',
  )

  console.log('✓ submit-inquiry validation reached the deployed function')
}

async function testInquiryHoneypot() {
  const functionUrl = `${SUPABASE_URL}/functions/v1/submit-inquiry`
  console.log('Testing submit-inquiry honeypot response...')

  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: {
      Origin: 'https://www.aeemmovement.org',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inquiry_type: 'contact',
      full_name: 'Endpoint Smoke Test',
      email: 'endpoint-honeypot@example.com',
      message: 'This request must not create a database record.',
      honeypot: 'filled-by-smoke-test',
    }),
  })

  const body = await readJson(response)

  assert.strictEqual(
    response.status,
    201,
    `Expected honeypot request to return 201, got ${response.status}`,
  )
  assert.deepStrictEqual(
    body,
    { ok: true },
    'Unexpected honeypot response from submit-inquiry',
  )

  console.log('✓ submit-inquiry accepted the honeypot smoke path without a write')
}

async function testPublicContentEndpoint(table) {
  const publishableKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (!publishableKey) {
    console.log(`• Skipping public SELECT smoke test for '${table}' (no publishable key supplied)`)
    return
  }

  console.log(`Testing public SELECT on '${table}'...`)
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&published=eq.true`
  const response = await fetch(url, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
  })

  assert.strictEqual(
    response.status,
    200,
    `Expected public SELECT on ${table} to return 200, got ${response.status}`,
  )

  console.log(`✓ '${table}' public endpoint returned 200`)
}

async function run() {
  try {
    await testInquiryFunctionReachability()
    await testInquiryValidation()
    await testInquiryHoneypot()
    await testPublicContentEndpoint('events')
    await testPublicContentEndpoint('impact_stories')
    await testPublicContentEndpoint('resources')
    console.log('\\n✓ Live API smoke suite passed.')
  } catch (error) {
    console.error('Live API smoke test failed:', error)
    process.exit(1)
  }
}

run()
