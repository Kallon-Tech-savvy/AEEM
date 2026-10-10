/**
 * AEEM Shared Form Utilities — idempotent submission system
 *
 * Security layers (client side — see supabase/migrations/001_initial_schema.sql for server-side enforcement):
 *  1. Email / phone normalisation      → consistent identity before hashing
 *  2. SHA-256 scoped submission key    → deterministic, forgery-resistant key
 *  3. In-memory rate limiter           → UX guard, resets on page reload
 *  4. localStorage deduplication hint  → skips the network round-trip for known submissions
 *  5. Honeypot check                   → silent bot rejection
 *
 * The REAL duplicate guard lives in the database:
 *   UNIQUE (inquiry_type, submission_key)   ← see schema.sql
 *   PostgreSQL error 23505              ← catch this in every form handler
 */

// ── Normalisation ──────────────────────────────────────────────────────────

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function normalizePhone(phone: string): string {
  // Keep only digits and leading +
  return phone.replace(/[^\d+]/g, '')
}

// ── SHA-256 Submission Key (Web Crypto API) ────────────────────────────────
//
// Generates a deterministic, scoped key for (formType, scope, email, message).
// The same inputs always produce the same hash, so:
//  • localStorage can check it before hitting the network
//  • The DB unique constraint rejects concurrent duplicates atomically
//
// Pattern: SHA-256( JSON [formType, "v2", scope, normalised_email, normalised_message] )
//   inquiry       → scope = "contact" | "volunteer" | "partner" | "donor"
//
// Only an identical message from the same email and type is a duplicate.
// Keep in step with generateSubmissionKey in supabase/functions/submit-inquiry.

export function normalizeMessage(message: string): string {
  // Trim and collapse runs of whitespace; case is preserved.
  return message.trim().replace(/\s+/g, ' ')
}

export async function generateSubmissionKey(
  formType: string,
  email: string,
  scope: string,
  message: string
): Promise<string> {
  const raw = JSON.stringify([
    formType,
    'v2',
    scope,
    normalizeEmail(email),
    normalizeMessage(message),
  ])
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(raw)
  )
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// ── In-memory Rate Limiter ─────────────────────────────────────────────────
//
// NOT a security control (resets on reload, bypassable with DevTools).
// Purpose: prevent accidental rapid re-submission and give instant UX feedback.
// Real rate limiting must live on the server / Supabase Edge Function.
//
// Usage:
//   checkClientRateLimit('inquiry:user@example.com', 5, 60 * 60_000)
//   → false if >5 calls in the last hour from this session

const _rateLimitMap = new Map<string, number[]>()

export function checkClientRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): boolean {
  const now = Date.now()
  const prev = (_rateLimitMap.get(key) ?? []).filter((t) => now - t < windowMs)
  if (prev.length >= maxAttempts) {
    _rateLimitMap.set(key, prev)
    return false
  }
  _rateLimitMap.set(key, [...prev, now])
  return true
}

// ── localStorage Deduplication Hint ───────────────────────────────────────
//
// Stores successful submission keys so we can skip the network call on repeat visits.
// UX layer only — clearing localStorage bypasses this. The DB constraint is the truth.

const LS_PREFIX = 'aeem_sub_'

export function isAlreadySubmittedLocally(key: string): boolean {
  try {
    return localStorage.getItem(`${LS_PREFIX}${key}`) === '1'
  } catch {
    return false // Private browsing / storage blocked — treat as no record
  }
}

export function markSubmittedLocally(key: string): void {
  try {
    localStorage.setItem(`${LS_PREFIX}${key}`, '1')
  } catch {
    // Non-fatal: storage full or blocked
  }
}

// ── Honeypot ───────────────────────────────────────────────────────────────
//
// Returns true if the trap field was filled — almost certainly a bot.
// Callers should return FAKE SUCCESS, never reveal that the bot was caught.

export function isHoneypotTriggered(value: string): boolean {
  return value.trim().length > 0
}
// ── Inquiry Edge Function API ──────────────────────────────────────────────

export async function submitInquiryApi(payload: Record<string, unknown>): Promise<Response> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ''
  const functionUrl = `${supabaseUrl}/functions/v1/submit-inquiry`
  const anonKey =
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    ''

  return fetch(functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    body: JSON.stringify(payload),
  })
}
