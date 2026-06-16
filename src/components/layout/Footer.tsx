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
  const [honeypot, setHoneypot] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [status,   setStatus]   = useState<SubmitStatus>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    if (isHoneypotTriggered(honeypot)) {
      setStatus('success')
      setEmail('')
      return
    }

    const normEmail = normalizeEmail(email)

    if (!checkClientRateLimit(`newsletter:${normEmail}`, 3, 10 * 60_000)) {
      setStatus('rate-limited')
      return
    }

    const submissionKey = await generateSubmissionKey('newsletter', normEmail)

    if (isAlreadySubmittedLocally(submissionKey)) {
      setStatus('duplicate')
      return
    }

    setLoading(true)
    setStatus('idle')
    let didSucceed = false

    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email: normEmail }])

      if (error) {
        if (error.code === '23505' || error.message?.toLowerCase().includes('duplicate')) {
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
      if (didSucceed) {
        setTimeout(() => setStatus('idle'), 6_000)
      }
    }
  }

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-200 dark:from-aeem-charcoal dark:to-[#0f1115] text-aeem-charcoal dark:text-white py-20 z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.4)] border-t border-white/50 dark:border-white/5 backdrop-blur-3xl">

      {/* Background illustration */}
      <div
        aria-hidden="true"
        className="absolute left-0 bottom-[1%] w-full h-full opacity-[0.08] dark:opacity-[0.05] pointer-events-none -z-10 mix-blend-luminosity select-none transition-opacity duration-300"
      >
        <picture>
          <source srcSet="/assets/Illustrate africa.avif" type="image/avif" />
          <img
            src="/assets/Illustrate africa.avif"
            alt=""
            className="w-full h-full object-contain object-left-bottom drop-shadow-2xl"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-1 bg-white dark:bg-white/10 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.4)] ring-1 ring-black/5 dark:ring-white/10">
                <img src="/assets/logo.jpg" alt="AEEM Logo" width={44} height={36} className="w-11 h-9 object-fill rounded-lg" />
              </div>
              <h3 className="font-extrabold text-3xl tracking-tight drop-shadow-sm">AEEM</h3>
            </div>
            <p className="max-w-sm mb-8 leading-relaxed italic opacity-90 text-gray-700 dark:text-gray-300 font-medium">
              "Fair access to quality education for every child through community-led action, clarity, and care."
            </p>
            <div className="flex gap-4">
              {([
                { Icon: Twitter,   label: 'Twitter', src: 'https://twitter.com/' },
                { Icon: Facebook, label: 'Facebook', src: 'https://www.facebook.com/profile.php?id=61569341634943' },
                { Icon: Linkedin,  label: 'LinkedIn', src: 'https://www.linkedin.com/company/africa-education-empowerment-movement' },
                { Icon: Mail,      label: 'Email' , src: 'mailto:africaseducationempowermentmov@gmail.com' },
              ] as const).map(({ Icon, label, src }, i) => (
                <a
                  key={i}
                  href={src}
                  aria-label={label}
                  target={src.startsWith('http') ? '_blank' : undefined}
                  rel={src.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-11 h-11 bg-white/50 dark:bg-black/30 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-center text-aeem-charcoal dark:text-gray-300 shadow-sm hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)] hover:-translate-y-1 hover:bg-aeem-gold hover:text-white hover:border-aeem-gold dark:hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-extrabold mb-4 text-aeem-charcoal dark:text-aeem-gold uppercase tracking-widest text-xs drop-shadow-sm">Navigation</h4>
            <ul className="space-y-3 text-md md:grid md:grid-cols-2 md:gap-2">
              {[
                { to: '/',                   label: 'Home'                },
                { to: '/about',              label: 'About Us'            },
                { to: '/impact',             label: 'Our Impact'          },
                { to: '/events',             label: 'Events'              },
                { to: '/get-involved',       label: 'Get Involved'        },
                { to: '/contact',            label: 'Contact'             },
                { to: '/press-kit',          label: 'Press Kit'           },
                { to: '/resources',          label: 'Resource Hub'       },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-600 dark:text-gray-400 hover:text-aeem-gold dark:hover:text-white transition-all font-semibold hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="relative">
             <div className="absolute -inset-4 bg-gradient-to-br from-aeem-gold/10 to-transparent dark:from-aeem-gold/5 blur-2xl -z-10 rounded-full"></div>
            <h4 className="font-extrabold mb-6 text-aeem-focus dark:text-aeem-gold uppercase tracking-widest text-xs drop-shadow-sm">Stay Updated</h4>
            <p className="text-gray-600 dark:text-gray-300 font-medium text-sm mb-5 leading-relaxed">
              Join our newsletter for the latest impact stories and events.
            </p>

            <form onSubmit={handleSubscribe} className="relative mb-3 group" noValidate>
              <div aria-hidden="true" className="absolute opacity-0 top-0 left-0 w-px h-px overflow-hidden pointer-events-none" tabIndex={-1}>
                <input name="company_website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                disabled={loading}
                aria-label="Email address for newsletter"
                className="w-full text-black bg-white dark:bg-black/40 border border-gray-300 dark:border-white/10 dark:text-white rounded-xl px-4 py-3.5 text-md shadow-inner focus:outline-none focus:border-aeem-gold focus:ring-2 focus:ring-aeem-gold/50 transition-all disabled:opacity-60 placeholder:text-gray-400"
              />

              <button
                type="submit"
                disabled={loading || status === 'success'}
                aria-label="Subscribe to newsletter"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-aeem-focus dark:bg-aeem-gold text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
              >
                {loading
                  ? <Loader2 className="animate-spin" size={18} />
                  : status === 'success'
                    ? <CheckCircle2 size={18} className="text-white" />
                    : <ArrowRight size={18} />
                }
              </button>
            </form>

            {status !== 'idle' && (
              <p role="status" aria-live="polite" className={`flex items-center gap-1.5 text-xs font-bold ${STATUS_MESSAGES[status].className} animate-in fade-in slide-in-from-bottom-2`}>
                {status === 'success' && <CheckCircle2 size={13} />}
                {STATUS_MESSAGES[status].text}
              </p>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-gray-400 font-medium text-xs">
            © 2026 | Africa Education Empowerment Movement. | All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-bold text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-aeem-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-aeem-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
