/**
 * AEEM Shared Form Utilities — idempotent submission system
 *
 * Security layers (client side — see schema.sql for server-side enforcement):
 *  1. Email / phone normalisation      → consistent identity before hashing
 *  2. SHA-256 scoped submission key    → deterministic, forgery-resistant key
 *  3. In-memory rate limiter           → UX guard, resets on page reload
 *  4. localStorage deduplication hint  → skips the network round-trip for known submissions
 *  5. Honeypot check                   → silent bot rejection
 *
 * The REAL duplicate guard lives in the database:
 *   UNIQUE (form_type, submission_key)   ← see schema.sql
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
// Generates a deterministic, scoped key for (formType, email, scope).
// The same inputs always produce the same hash, so:
//  • localStorage can check it before hitting the network
//  • The DB unique constraint rejects concurrent duplicates atomically
//
// Pattern: SHA-256( "formType:v1:scope:normalised_email" )
//   newsletter    → scope = "global"
//   inquiry       → scope = "volunteer" | "partner" | "donor"
//   event_reg     → scope = event.id

export async function generateSubmissionKey(
  formType: string,
  email: string,
  scope = 'global'
): Promise<string> {
  const raw = `${formType}:v1:${scope}:${normalizeEmail(email)}`
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
//   checkClientRateLimit('newsletter:user@example.com', 3, 10 * 60_000)
//   → false if >3 calls in the last 10 minutes from this session

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