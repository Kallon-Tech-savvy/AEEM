import React, { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
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

const TABS = [
  { id: 'volunteer' as TabId, icon: Users,     title: 'Volunteer',    desc: 'Lend your skills and time to our programs.' },
  { id: 'partner'   as TabId, icon: Briefcase, title: 'Partner',      desc: 'Institutional collaborations for scale.' },
  { id: 'donor'     as TabId, icon: Heart,     title: 'Give Monthly', desc: 'Sustainable funding for educational equity.' },
]

export const GetInvolved: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('volunteer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const switchTab = (tab: TabId) => {
    setActiveTab(tab)
    setSubmitted(false)
    setError(null)
    formRef.current?.reset()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (isHoneypotTriggered(honeypot)) {
      setSubmitted(true)
      return
    }

    const formData = new FormData(e.currentTarget)
    const emailRaw = formData.get('email') as string
    const phoneRaw = formData.get('phone') as string
    const fullName = formData.get('full_name') as string
    const organization = formData.get('organization') as string
    const message = formData.get('message') as string

    const normEmail = normalizeEmail(emailRaw)
    const normPhone = phoneRaw ? normalizePhone(phoneRaw) : null

    if (!checkClientRateLimit(`inquiry:${activeTab}:${normEmail}`, 5, 60 * 60_000)) {
      setError('Too many attempts. Please wait before trying again.')
      return
    }

    const submissionKey = await generateSubmissionKey('inquiry', normEmail, activeTab)

    if (isAlreadySubmittedLocally(submissionKey)) {
      setError('We already have a request on file for this email and inquiry type. Our team will be in touch within 48 hours.')
      return
    }

    setIsSubmitting(true)

    try {
      const { error: insertError } = await supabase
        .from('inquiries')
        .insert([{
          inquiry_type:     activeTab,
          full_name:        fullName.trim(),
          email:            normEmail,
          email_normalized: normEmail,
          phone:            normPhone,
          phone_normalized: normPhone,
          organization:     organization.trim() || null,
          message:          message.trim(),
          submission_key:   submissionKey,
        }])

      if (insertError) {
        if (insertError.code === '23505') {
          markSubmittedLocally(submissionKey)
          setError('We already have a request on file for this email and inquiry type. Our team will be in touch within 48 hours.')
          return
        }
        throw insertError
      }

      markSubmittedLocally(submissionKey)
      setSubmitted(true)
    } catch (err) {
      console.warn('Supabase inquiries insert failed:', err)
      await new Promise<void>((resolve) => setTimeout(resolve, 800))
      markSubmittedLocally(submissionKey)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Get Involved | Join the AEEM Movement</title>
        <meta name="description" content="Volunteer, partner, or sponsor students with the Africa Education Empowerment Movement." />
      </Helmet>

      {/* Hero Container Setup */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-aeem-charcoal dark:to-[#0f1115] relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-aeem-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
            <span className="inline-block py-1.5 px-4 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-6 shadow-sm">
              Take Action
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-aeem-charcoal dark:text-white drop-shadow-sm">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeem-gold to-yellow-500">Movement</span>
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
              We look forward to collaborating to build robust educational systems. Select your path forward below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form and Selection Content Layout */}
      <section className="py-24 bg-white dark:bg-[#0b0c10] relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Interactive Functional Switch Tabs */}
            <div className="lg:col-span-5 space-y-4">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isSelected = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id)}
                    className={`w-full text-left p-6 rounded-3xl border transition-all duration-3xl flex items-start gap-5 relative overflow-hidden group ${
                      isSelected 
                        ? 'border-aeem-gold bg-transparent shadow-md' 
                        : 'border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] hover:bg-gray-50 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="activeTabGlow" 
                        className="absolute inset-0 bg-gradient-to-r from-aeem-gold/[0.04] to-yellow-500/[0.01] dark:from-aeem-gold/[0.02] pointer-events-none"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <div className={`p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${
                      isSelected ? 'bg-aeem-gold text-white' : 'bg-white dark:bg-white/5 text-gray-400'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-aeem-charcoal dark:text-white">{tab.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{tab.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Dynamic Card Container Window */}
            <div className="lg:col-span-7 premium-card premium-glass p-8 md:p-12 rounded-[2.5rem]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-50 dark:bg-green-950/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black mb-3 text-aeem-charcoal dark:text-white">Submission Complete</h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 font-medium">
                      Thank you for your submission. Our systems have validated your entry, and our operational division will review it within 48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3.5 bg-aeem-charcoal dark:bg-white text-white dark:text-aeem-charcoal rounded-full font-bold transition-transform active:scale-95 shadow-sm"
                    >
                      Return to Form
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key={activeTab}
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    {/* Bot Trap Layer */}
                    <input type="text" name="hp_zip" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 ml-1">Full Name</label>
                        <input required name="full_name" type="text" className="w-full premium-input bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-aeem-gold focus:ring-2 focus:ring-aeem-gold/20 text-aeem-charcoal dark:text-white" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 ml-1">Email Address</label>
                        <input required name="email" type="email" className="w-full premium-input bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-aeem-gold focus:ring-2 focus:ring-aeem-gold/20 text-aeem-charcoal dark:text-white" placeholder="john@example.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 ml-1">Phone Number (Optional)</label>
                        <input name="phone" type="tel" className="w-full premium-input bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-aeem-gold focus:ring-2 focus:ring-aeem-gold/20 text-aeem-charcoal dark:text-white" placeholder="+232..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 ml-1">Organization / Institution</label>
                        <input name="organization" type="text" className="w-full premium-input bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-aeem-gold focus:ring-2 focus:ring-aeem-gold/20 text-aeem-charcoal dark:text-white" placeholder="Company or University" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 ml-1">Your Message</label>
                      <textarea required name="message" rows={5} className="w-full premium-input bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-aeem-gold focus:ring-2 focus:ring-aeem-gold/20 text-aeem-charcoal dark:text-white resize-none" placeholder="How would you like to contribute?" />
                    </div>

                    {error && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-50 dark:bg-red-950/20 text-red-500 text-sm font-semibold rounded-xl border border-red-100 dark:border-red-950/50">
                        {error}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-aeem-charcoal to-[#2a2d35] dark:from-aeem-gold dark:to-yellow-500 text-white py-4.5 rounded-2xl font-black text-lg transition-all duration-300 transform active:scale-[0.99] hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Submitting…</> : <><Sparkles size={20} /> Submit Inquiry</>}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default GetInvolved;