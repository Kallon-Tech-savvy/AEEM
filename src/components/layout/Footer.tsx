import React, { useState } from 'react'
import { Mail, Twitter, Linkedin, Loader2, CheckCircle2, ArrowRight, Facebook } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import {
  normalizeEmail,
  generateSubmissionKey,
  checkClientRateLimit,
  isAlreadySubmittedLocally,
  markSubmittedLocally,
  isHoneypotTriggered,
} from '../../services/formUtils'

type SubmitStatus = 'idle' | 'success' | 'duplicate' | 'rate-limited' | 'error'

const STATUS_MESSAGES: Record<Exclude<SubmitStatus, 'idle'>, { text: string; className: string }> = {
  success:       { text: "You're subscribed! Welcome to the movement.", className: 'text-green-600 dark:text-green-400' },
  duplicate:     { text: 'This email is already on our list.',          className: 'text-aeem-gold'                    },
  'rate-limited':{ text: 'Too many attempts. Please wait a moment.',    className: 'text-amber-500'                    },
  error:         { text: 'Something went wrong. Please try again.',     className: 'text-red-500 dark:text-red-400'    },
}

export default function Footer() {
  const [email,    setEmail]    = useState('')
  const [honeypot, setHoneypot] = useState('')     // bot trap — must never be filled by a real user
  const [loading,  setLoading]  = useState(false)
  const [status,   setStatus]   = useState<SubmitStatus>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // ── 1. Honeypot check ────────────────────────────────────────────────
    // Return fake success — never reveal bot detection to the sender.
    if (isHoneypotTriggered(honeypot)) {
      setStatus('success')
      setEmail('')
      return
    }

    const normEmail = normalizeEmail(email)

    // ── 2. Client-side rate limit: 3 attempts / 10 min / email ──────────
    if (!checkClientRateLimit(`newsletter:${normEmail}`, 3, 10 * 60_000)) {
      setStatus('rate-limited')
      return
    }

    // ── 3. Generate deterministic idempotency key ────────────────────────
    const submissionKey = await generateSubmissionKey('newsletter', normEmail)

    // ── 4. localStorage deduplication hint (skips network round-trip) ───
    if (isAlreadySubmittedLocally(submissionKey)) {
      setStatus('duplicate')
      return
    }

    setLoading(true)
    setStatus('idle')
    let didSucceed = false

    try {
      // ── 5. Insert — DB unique constraint on (email_normalized) is the
      //        real duplicate guard; error.code 23505 = already subscribed.
      const { error } = await supabase
        .from('subscriptions')
        .insert([{
          email:             normEmail,
          email_normalized:  normEmail,
          submission_key:    submissionKey,
          source:            'website-footer',
          status:            'active',
        }])

      if (error) {
        if (error.code === '23505') {
          // Duplicate — treat gracefully; mark locally so we skip next time
          markSubmittedLocally(submissionKey)
          setStatus('duplicate')
        } else {
          throw error
        }
      } else {
        didSucceed = true
        markSubmittedLocally(submissionKey)
        setStatus('success')
        setEmail('')
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err)
      setStatus('error')
    } finally {
      setLoading(false)
      // Use local flag — reading `status` state here would be stale (closure)
      if (didSucceed) {
        setTimeout(() => setStatus('idle'), 6_000)
      }
    }
  }

  return (
    <footer className="relative overflow-hidden dark:bg-aeem-charcoal bg-aeem-focus/20 dark:text-white text-aeem-charcoal py-20 z-10">

      {/* Background illustration — AVIF first for ~20% weight saving, PNG fallback */}
      <div
        aria-hidden="true"
        className="absolute left-0 bottom-[1%] w-full h-full opacity-[0.08] dark:opacity-[0.05] pointer-events-none -z-10 mix-blend-luminosity select-none transition-opacity duration-300"
      >
        <picture>
          <source srcSet="/assets/Illustrate africa.avif" type="image/avif" />
          <img
            src="/assets/Illustrate africa.png"
            alt=""
            className="w-full h-full object-contain object-left-bottom"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* ── Brand column ────────────────────────────────────────────── */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/assets/logo.jpg" alt="AEEM Logo" className="w-12 h-10 object-fill rounded shadow-md" />
              <h3 className="font-extrabold text-2xl tracking-tight">AEEM</h3>
            </div>
            <p className="max-w-sm mb-8 leading-relaxed italic opacity-90">
              "Fair access to quality education for every child through community-led action, clarity, and care."
            </p>
            <div className="flex gap-4">
              {([
                { Icon: Twitter,   label: 'Twitter', src: '#'},
                { Icon: Facebook, label: 'Facebook', src: '#' },
                { Icon: Linkedin,  label: 'LinkedIn', src: '#'  },
                { Icon: Mail,      label: 'Email' , src: '#'    },
              ] as const).map(({ Icon, label, src }, i) => (
                <a
                  key={i}
                  href={src}
                  aria-label={label}
                  className="w-10 h-10 border border-black/90 dark:border-gray-600 rounded-full flex items-center justify-center text-aeem-charcoal dark:text-gray-400 hover:bg-aeem-gold hover:text-white hover:border-aeem-gold dark:hover:text-white dark:hover:border-aeem-gold transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation column ───────────────────────────────────────── */}
          <div>
            <h4 className="font-bold mb-4 text-aeem-charcoal dark:text-aeem-gold uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-2 text-md md:grid md:grid-cols-2 md:gap-1">
              {[
                { to: '/',                   label: 'Home'                },
                { to: '/about',              label: 'About Us'            },
                { to: '/impact',             label: 'Our Impact'          },
                { to: '/events',             label: 'Events'              },
                { to: '/get-involved',       label: 'Get Involved'        },
                { to: '/recognition-awards', label: 'Awards & Recognition'},
                { to: '/Contact',            label: 'Contact'             },
                { to: '/press-kit',          label: 'Press Kit'           },
                { to: '/resources',          label: 'Resource Hub'       },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-aeem-focus dark:text-aeem-gold dark:hover:text-white hover:text-aeem-gold transition-colors font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter subscription column ──────────────────────────── */}
          <div>
            <h4 className="font-bold mb-6 text-aeem-focus dark:text-aeem-gold uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-aeem-charcoal/90 dark:text-aeem-surface/90 text-sm mb-4">
              Join our newsletter for the latest impact stories and events.
            </p>

            <form onSubmit={handleSubscribe} className="relative mb-3" noValidate>
              {/*
                Honeypot trap — visually hidden from real users, visible to bots
                that crawl the DOM. Never submit this value to the server.
                aria-hidden + tabIndex=-1 ensure screen readers and keyboard
                users never encounter it.
              */}
              <div
                aria-hidden="true"
                className="absolute opacity-0 top-0 left-0 w-px h-px overflow-hidden pointer-events-none"
                tabIndex={-1}
              >
                <input
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                disabled={loading}
                aria-label="Email address for newsletter"
                className="w-full text-black bg-white/90 border border-aeem-focus dark:border-white/10 dark:bg-white/5 dark:text-white rounded-xl px-4 py-3 text-md focus:outline-none focus:border-aeem-gold focus:ring-1 focus:ring-aeem-gold transition-all disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={loading || status === 'success'}
                aria-label="Subscribe to newsletter"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-aeem-gold hover:text-aeem-charcoal dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? <Loader2 className="animate-spin" size={18} />
                  : status === 'success'
                    ? <CheckCircle2 size={18} className="text-green-500" />
                    : <ArrowRight size={18} />
                }
              </button>
            </form>

            {/* Status message */}
            {status !== 'idle' && (
              <p
                role="status"
                aria-live="polite"
                className={`flex items-center gap-1.5 text-xs font-bold ${STATUS_MESSAGES[status].className}`}
              >
                {status === 'success' && <CheckCircle2 size={13} />}
                {STATUS_MESSAGES[status].text}
              </p>
            )}
          </div>
        </div>

        {/* ── Legal / copyright row ──────────────────────────────────────── */}
        <div className="pt-8 border-t border-aeem-charcoal/10 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="dark:text-gray-500 text-black/80 text-xs">
            © 2026 | Africa Education Empowerment Movement. | All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-black/80 dark:text-gray-400">
            <a href="#" className="hover:text-aeem-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-aeem-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}