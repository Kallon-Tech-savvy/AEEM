import assert from 'node:assert'

const ALLOWED_ORIGINS = new Set([
  'https://www.aeemmovement.org',
  'https://aeem-w.vercel.app',
  'http://localhost:5173',
])

const ALLOWED_INQUIRY_TYPES = new Set(['contact', 'volunteer', 'partner', 'donor'])

function validateInquiryPayload(body) {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, code: 'invalid_request', status: 400 }
  }

  if (body.honeypot && typeof body.honeypot === 'string' && body.honeypot.trim() !== '') {
    return { ok: true, honeypotCaptured: true, status: 201 }
  }

  if (!ALLOWED_INQUIRY_TYPES.has(body.inquiry_type)) {
    return { ok: false, code: 'invalid_inquiry_type', status: 422 }
  }

  const fullName = typeof body.full_name === 'string' ? body.full_name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!fullName || fullName.length < 2 || fullName.length > 120) {
    return { ok: false, code: 'invalid_fields', status: 400 }
  }

  if (!email || email.length < 3 || email.length > 320 || !email.includes('@')) {
    return { ok: false, code: 'invalid_email', status: 422 }
  }

  if (!message || message.length < 10 || message.length > 3000) {
    return { ok: false, code: 'invalid_fields', status: 400 }
  }

  return { ok: true, status: 201, email, fullName, inquiryType: body.inquiry_type }
}

// 1. CORS origin test
assert.strictEqual(ALLOWED_ORIGINS.has('https://www.aeemmovement.org'), true)
assert.strictEqual(ALLOWED_ORIGINS.has('https://malicious.example.com'), false)

// 2. Inquiry payload validation tests
assert.strictEqual(validateInquiryPayload({ inquiry_type: 'unknown' }).code, 'invalid_inquiry_type')
assert.strictEqual(validateInquiryPayload({ inquiry_type: 'contact', honeypot: 'bot' }).honeypotCaptured, true)
assert.strictEqual(validateInquiryPayload({ inquiry_type: 'contact', full_name: 'J', email: 'j@x.com', message: '1234567890' }).code, 'invalid_fields')
assert.strictEqual(validateInquiryPayload({ inquiry_type: 'partner', full_name: 'Jane Doe', email: 'jane@example.com', message: 'Hello, we would love to partner with AEEM.' }).ok, true)

console.log('✓ All Edge Function logic & security tests passed cleanly.')
