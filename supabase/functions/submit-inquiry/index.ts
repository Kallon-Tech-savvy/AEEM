import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.108.1'

const ALLOWED_ORIGINS = new Set([
  'https://www.aeemmovement.org',
  'https://aeem-w.vercel.app',
  'http://localhost:5173',
])

const ALLOWED_INQUIRY_TYPES = new Set(['contact', 'volunteer', 'partner', 'donor'])
const MAX_BODY_BYTES = 12_000
const RATE_LIMIT_WINDOW_SECONDS = 600
const RATE_LIMIT_MAX_REQUESTS = 5

function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  }

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
  }

  return headers
}

function json(
  body: Record<string, unknown>,
  status: number,
  origin: string | null,
  extraHeaders: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), ...extraHeaders },
  })
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, '')
}

function getClientAddress(request: Request): string | null {
  const direct = request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-real-ip')

  if (direct?.trim()) {
    return direct.trim()
  }

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }

  return null
}

async function hashRateLimitKey(value: string, secret: string): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign(
    'HMAC',
    keyMaterial,
    new TextEncoder().encode(value),
  )

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function generateSubmissionKey(
  inquiryType: string,
  email: string,
): Promise<string> {
  const raw = `inquiry:v1:${inquiryType}:${normalizeEmail(email)}`
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(raw),
  )
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function stringField(
  body: Record<string, unknown>,
  field: string,
  min: number,
  max: number,
  required = true,
): string | null {
  const value = body[field]
  if (value === undefined || value === null) {
    return required ? null : ''
  }
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (required && (trimmed.length < min || trimmed.length > max)) return null
  if (!required && trimmed.length > max) return null
  return trimmed
}

Deno.serve(async (request) => {
  const origin = request.headers.get('origin')

  if (request.method === 'OPTIONS') {
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return new Response(null, { status: 403, headers: corsHeaders(origin) })
    }
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json({ ok: false, code: 'origin_not_allowed' }, 403, origin)
  }

  if (request.method !== 'POST') {
    return json({ ok: false, code: 'method_not_allowed' }, 405, origin)
  }

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return json({ ok: false, code: 'unsupported_media_type' }, 415, origin)
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0')
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: 'payload_too_large' }, 413, origin)
  }

  let body: unknown
  try {
    const raw = await request.text()
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return json({ ok: false, code: 'payload_too_large' }, 413, origin)
    }
    body = JSON.parse(raw)
  } catch {
    return json({ ok: false, code: 'invalid_json' }, 400, origin)
  }

  if (!isPlainObject(body)) {
    return json({ ok: false, code: 'invalid_request' }, 400, origin)
  }

  const honeypot = typeof body.honeypot === 'string' ? body.honeypot.trim() : ''
  if (honeypot) {
    return json({ ok: true }, 201, origin)
  }

  const inquiryType =
    typeof body.inquiry_type === 'string' ? body.inquiry_type.trim() : ''
  if (!ALLOWED_INQUIRY_TYPES.has(inquiryType)) {
    return json({ ok: false, code: 'invalid_inquiry_type' }, 422, origin)
  }

  const fullName = stringField(body, 'full_name', 2, 120)
  const rawEmail = stringField(body, 'email', 3, 320)
  const phone = stringField(body, 'phone', 0, 100, false)
  const organization = stringField(body, 'organization', 0, 250, false)
  const message = stringField(body, 'message', 10, 3000)

  if (!fullName || !rawEmail || !message) {
    return json({ ok: false, code: 'invalid_fields' }, 400, origin)
  }

  const email = normalizeEmail(rawEmail)
  const normalizedPhone = phone ? normalizePhone(phone) : null

  if (email.length < 3 || email.length > 320 || !email.includes('@')) {
    return json({ ok: false, code: 'invalid_email' }, 422, origin)
  }

  if (phone && (normalizedPhone.length < 7 || normalizedPhone.length > 30)) {
    return json({ ok: false, code: 'invalid_phone' }, 422, origin)
  }

  const submissionKey = await generateSubmissionKey(inquiryType, email)

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const rateLimitSecret =
    Deno.env.get('INQUIRY_RATE_LIMIT_SECRET') ?? serviceRoleKey

  if (!supabaseUrl || !serviceRoleKey || !rateLimitSecret) {
    console.error('Missing required Supabase function environment variables')
    return json({ ok: false, code: 'service_unavailable' }, 503, origin)
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const clientAddress = getClientAddress(request)
  const rateLimitSubject = clientAddress
    ? `ip:${clientAddress}`
    : `email:${email}`

  const rateLimitKey = await hashRateLimitKey(rateLimitSubject, rateLimitSecret)

  const { data: allowed, error: rateLimitError } = await supabase.rpc(
    'consume_inquiry_rate_limit',
    {
      p_key_hash: rateLimitKey,
      p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
      p_limit: RATE_LIMIT_MAX_REQUESTS,
    },
  )

  if (rateLimitError || allowed !== true) {
    if (rateLimitError) {
      console.error(
        'Inquiry rate limiter failed:',
        rateLimitError.code ?? 'unknown',
      )
      return json({ ok: false, code: 'service_unavailable' }, 503, origin)
    }

    return json(
      { ok: false, code: 'rate_limited' },
      429,
      origin,
      { 'Retry-After': String(RATE_LIMIT_WINDOW_SECONDS) },
    )
  }

  const { error } = await supabase.from('inquiries').insert({
    inquiry_type: inquiryType,
    full_name: fullName,
    email,
    email_normalized: email,
    phone: normalizedPhone,
    phone_normalized: normalizedPhone,
    organization: organization || null,
    message,
    submission_key: submissionKey,
  })

  if (error) {
    if (error.code === '23505') {
      return json({ ok: false, code: 'duplicate_submission' }, 409, origin)
    }

    console.error('Inquiry insert failed:', error.code ?? 'unknown')
    return json({ ok: false, code: 'service_unavailable' }, 503, origin)
  }

  return json({ ok: true }, 201, origin)
})
