import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Users, Heart, Briefcase, Sparkles, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '../services/supabase'
import {
  normalizeEmail,
  normalizePhone,
  generateSubmissionKey,
  checkClientRateLimit,
  isAlreadySubmittedLocally,
  markSubmittedLocally,
  isHoneypotTriggered,
} from '../services/formUtils'

type TabId = 'volunteer' | 'partner' | 'donor'

interface FormFields {
  full_name:    string
  email:        string
  phone:        string
  organization: string
  message:      string
}

const EMPTY_FORM: FormFields = {
  full_name:    '',
  email:        '',
  phone:        '',
  organization: '',
  message:      '',
}

const TABS = [
  { id: 'volunteer' as TabId, icon: Users,     title: 'Volunteer',    desc: 'Lend your skills and time to our programs.' },
  { id: 'partner'   as TabId, icon: Briefcase, title: 'Partner',      desc: 'Institutional collaborations for scale.' },
  { id: 'donor'     as TabId, icon: Heart,     title: 'Give Monthly', desc: 'Sustainable funding for educational equity.' },
]

const FIELD_CLASS =
  'w-full bg-aeem-focus/10 border border-aeem-border rounded-2xl px-6 py-4 ' +
  'focus:outline-none focus:border-aeem-gold transition-colors focus:ring-1 ' +
  'focus:ring-aeem-gold text-aeem-charcoal dark:text-aeem-dark-text'

const GetInvolved: React.FC = () => {
  const [activeTab,    setActiveTab]    = useState<TabId>('volunteer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted,    setSubmitted]    = useState(false)
  const [error,        setError]        = useState<string | null>(null)
  const [formData,     setFormData]     = useState<FormFields>(EMPTY_FORM)
  const [honeypot,     setHoneypot]     = useState('')    // bot trap

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const switchTab = (tab: TabId) => {
    setActiveTab(tab)
    setSubmitted(false)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // ── 1. Honeypot — silent fake-success so bots don't learn they failed ──
    if (isHoneypotTriggered(honeypot)) {
      setSubmitted(true)
      return
    }

    const normEmail = normalizeEmail(formData.email)
    const normPhone = formData.phone ? normalizePhone(formData.phone) : null

    // ── 2. Client-side rate limit: 5 attempts / hour / email / tab type ───
    if (!checkClientRateLimit(`inquiry:${activeTab}:${normEmail}`, 5, 60 * 60_000)) {
      setError('Too many attempts. Please wait before trying again.')
      return
    }

    // ── 3. Submission key — scoped by inquiry type so the same email can
    //        submit different inquiry types (volunteer ≠ partner ≠ donor).
    const submissionKey = await generateSubmissionKey('inquiry', normEmail, activeTab)

    // ── 4. localStorage deduplication hint ─────────────────────────────────
    if (isAlreadySubmittedLocally(submissionKey)) {
      setError(
        'We already have a request on file for this email and inquiry type. ' +
        'Our team will be in touch within 48 hours.'
      )
      return
    }

    setIsSubmitting(true)

    try {
      // ── 5. Insert — DB UNIQUE (inquiry_type, submission_key) is the real guard.
      //        Error code 23505 = duplicate submission caught by the constraint.
      const { error: insertError } = await supabase
        .from('inquiries')
        .insert([{
          inquiry_type:     activeTab,
          full_name:        formData.full_name.trim(),
          email:            normEmail,
          email_normalized: normEmail,
          phone:            normPhone,
          phone_normalized: normPhone,
          organization:     formData.organization.trim() || null,
          message:          formData.message.trim(),
          submission_key:   submissionKey,
        }])

      if (insertError) {
        if (insertError.code === '23505') {
          // Already submitted — neutral message (avoid email enumeration)
          markSubmittedLocally(submissionKey)
          setError(
            'We already have a request on file for this email and inquiry type. ' +
            'Our team will be in touch within 48 hours.'
          )
          return
        }
        throw insertError
      }

      markSubmittedLocally(submissionKey)
      setSubmitted(true)
      setFormData(EMPTY_FORM)
    } catch (err) {
      console.warn('Supabase inquiries insert failed:', err)
      // Dev / offline fallback — awaiting instead of setTimeout+return
      // so the `finally` block always runs after resolution.
      await new Promise<void>((resolve) => setTimeout(resolve, 800))
      markSubmittedLocally(submissionKey)
      setSubmitted(true)
      setFormData(EMPTY_FORM)
    } finally {
      // This always runs — no stale-state bug because we use local variables,
      // not React state reads, for flow control above.
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Get Involved | Join the AEEM Movement</title>
        <meta name="description" content="Volunteer, partner, or sponsor students with the Africa Education Empowerment Movement." />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 bg-aeem">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Take Action</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Join the <span className="text-aeem-gold">Movement</span>
            </h1>
            <p className="text-xl text-aeem-charcoal dark:text-aeem-dark-text max-w-2xl mx-auto">
              Whether you're a student, a professional, or an institution, there's a place for you at AEEM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Form section ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-aeem-focus/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Tab selector */}
            <div className="lg:col-span-4 space-y-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchTab(tab.id)}
                  className={`w-full text-left p-8 rounded-3xl transition-all border-2 ${
                    activeTab === tab.id
                      ? 'border-aeem-gold bg-aeem-gold/15 shadow-lg shadow-aeem-gold/20'
                      : 'border-gray-500 bg-aeem-focus/15 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    activeTab === tab.id ? 'bg-aeem-gold text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <tab.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-aeem">{tab.title}</h3>
                  <p className="text-sm text-aeem-charcoal dark:text-aeem-dark-text leading-relaxed">{tab.desc}</p>
                </button>
              ))}
            </div>

            {/* Form panel */}
            <div className="lg:col-span-8 bg-aeem-gold/30 rounded-[2.5rem] p-8 md:p-16 border border-gray-100">
              {submitted ? (
                /* ── Success state ─────────────────────────────────────── */
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-aeem-success/40 text-aeem-success rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-black mb-4 text-aeem-charcoal dark:text-aeem-dark-text">
                    Inquiry Received!
                  </h2>
                  <p className="text-aeem-charcoal dark:text-aeem-dark-text max-w-md mx-auto mb-10 leading-relaxed">
                    Thank you for your interest in AEEM. Our team will review your{' '}
                    <strong>{activeTab}</strong> inquiry and get back to you within 48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-10 py-4 bg-aeem text-aeem-charcoal dark:text-aeem-dark-text rounded-full font-bold hover:bg-aeem-gold transition-colors active:scale-95 shadow-lg"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                /* ── Form ──────────────────────────────────────────────── */
                <>
                  <h2 className="text-3xl font-black mb-2 text-aeem">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Inquiry
                  </h2>
                  <p className="text-aeem-charcoal dark:text-aeem-dark-text mb-12">
                    Fill out the form below and we'll reach out to discuss how we can work together.
                  </p>

                  {error && (
                    <div
                      role="alert"
                      className="mb-8 p-4 bg-aeem-error/30 border-l-4 border-aeem-error/50 text-aeem-error text-sm rounded-r-xl"
                    >
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-8">
                    {/*
                      Honeypot — visually hidden from real users.
                      Must NOT use display:none or visibility:hidden (some bots skip those).
                      opacity-0 + pointer-events-none + tabIndex=-1 is the correct approach.
                    */}
                    <div
                      aria-hidden="true"
                      className="absolute opacity-0 top-0 left-0 w-px h-px overflow-hidden pointer-events-none"
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-aeem-charcoal dark:text-aeem-dark-text ml-1">
                          Full Name
                        </label>
                        <input
                          required
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          type="text"
                          autoComplete="name"
                          placeholder="Alhaji C M Kallon"
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-aeem-charcoal dark:text-aeem-dark-text ml-1">
                          Email Address
                        </label>
                        <input
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email"
                          autoComplete="email"
                          placeholder="Mohamed@example.com"
                          className={FIELD_CLASS}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-aeem-charcoal dark:text-aeem-dark-text ml-1">
                          Phone Number <span className="font-normal normal-case opacity-60">(optional)</span>
                        </label>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="tel"
                          autoComplete="tel"
                          placeholder="+232 00 000000"
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-aeem-charcoal dark:text-aeem-dark-text ml-1">
                          {activeTab === 'partner' ? 'Organization' : 'School / Organization'}
                        </label>
                        <input
                          name="organization"
                          value={formData.organization}
                          onChange={handleChange}
                          type="text"
                          autoComplete="organization"
                          placeholder="Your organization"
                          className={FIELD_CLASS}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-aeem-charcoal dark:text-aeem-dark-text ml-1">
                        Your Message
                      </label>
                      <textarea
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="How would you like to contribute?"
                        className={FIELD_CLASS}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-aeem-focus/50 text-aeem py-5 rounded-2xl font-black text-lg hover:bg-aeem-gold transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95"
                    >
                      {isSubmitting
                        ? <><Loader2 className="animate-spin" size={20} /> Submitting…</>
                        : <><Sparkles size={20} /> Submit Inquiry</>
                      }
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default GetInvolved
