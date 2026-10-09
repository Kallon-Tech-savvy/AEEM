import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { Badge, Button, Card, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
import {
  normalizeEmail,
  normalizePhone,
  generateSubmissionKey,
  checkClientRateLimit,
  isAlreadySubmittedLocally,
  markSubmittedLocally,
  isHoneypotTriggered,
  submitInquiryApi,
} from '../services/formUtils'

const CONTACT_EMAIL = 'africaseducationempowermentmov@gmail.com'
const CONTACT_PHONE = '+232 76 406 281'

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (isHoneypotTriggered(honeypot)) {
      setSubmitted(true)
      return
    }

    const fullName = formData.full_name.trim()
    const message = formData.message.trim()
    if (fullName.length < 2 || fullName.length > 120 || message.length < 10 || message.length > 3000) {
      setError('Please provide a valid name and a message between 10 and 3,000 characters.')
      return
    }

    const email = normalizeEmail(formData.email)
    const phone = formData.phone ? normalizePhone(formData.phone) : null
    if (!checkClientRateLimit(`contact:${email}`, 5, 60 * 60_000)) {
      setError('Too many attempts. Please wait before trying again.')
      return
    }

    const submissionKey = await generateSubmissionKey('inquiry', email, 'contact', message)
    if (isAlreadySubmittedLocally(submissionKey)) {
      setError('We already received this exact message from you. Please wait for our team to follow up, or send a different message.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await submitInquiryApi({
        inquiry_type: 'contact',
        full_name: fullName,
        email,
        phone,
        message,
        honeypot,
      })

      const result = await response.json().catch(() => null)

      if (response.status === 409 || result?.code === 'duplicate_submission') {
        markSubmittedLocally(submissionKey)
        setError('We already received this exact message from you. Please wait for our team to follow up, or send a different message.')
        return
      }

      if (response.status === 429 || result?.code === 'rate_limited') {
        setError('Too many requests. Please wait a few minutes before trying again.')
        return
      }

      if (!response.ok) {
        throw new Error(typeof result?.code === 'string' ? result.code : `HTTP ${response.status}`)
      }

      markSubmittedLocally(submissionKey)
      setSubmitted(true)
      setFormData({ full_name: '', email: '', phone: '', message: '' })
      setHoneypot('')
    } catch (err) {
      console.warn('Inquiry submission failed:', err)
      setError(
        err instanceof DOMException && err.name === 'AbortError'
          ? 'The inquiry service took too long to respond. Please check your connection and try again.'
          : 'We could not send your message. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact AEEM | Get in Touch</title>
        <meta name="description" content="Contact the Africa Education Empowerment Movement about programs, partnerships, media, and general inquiries." />
        <link rel="canonical" href={getCanonical('/contact')} />
        <meta property="og:title" content="Contact AEEM | Get in Touch" />
        <meta property="og:description" content="Contact AEEM about programs, partnerships, media, and general inquiries." />
        <meta property="og:url" content={getCanonical('/contact')} />
      </Helmet>

      <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
        <div className="max-w-3xl">
          <Badge>Get in touch</Badge>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">A direct line to AEEM.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-ink/70 dark:text-white/70">For general questions, program inquiries, partnerships, or media requests, send a message or use the contact details below.</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-7 lg:col-span-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-gold">Contact details</p>
              <h2 className="mt-3 text-2xl font-bold text-aeem-ink dark:text-white">Reach us directly</h2>
            </div>
            <Card className="space-y-6 p-6">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus">
                <Mail className="mt-1 shrink-0 text-aeem-blue dark:text-aeem-gold-light" size={20} aria-hidden="true" />
                <span><span className="block font-semibold text-aeem-ink dark:text-white">Email</span><span className="mt-1 block break-all text-sm text-aeem-ink/70 dark:text-white/70">{CONTACT_EMAIL}</span></span>
              </a>
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus">
                <Phone className="mt-1 shrink-0 text-aeem-blue dark:text-aeem-gold-light" size={20} aria-hidden="true" />
                <span><span className="block font-semibold text-aeem-ink dark:text-white">Phone</span><span className="mt-1 block text-sm text-aeem-ink/70 dark:text-white/70">{CONTACT_PHONE}</span></span>
              </a>
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-aeem-blue dark:text-aeem-gold-light" size={20} aria-hidden="true" />
                <span><span className="block font-semibold text-aeem-ink dark:text-white">Office</span><span className="mt-1 block text-sm text-aeem-ink/70 dark:text-white/70">Freetown, Sierra Leone</span></span>
              </div>
            </Card>
            <p className="text-sm leading-6 text-aeem-ink/60 dark:text-white/60">For sensitive matters, do not include identity documents, financial information, passwords, or other confidential credentials in this form.</p>
          </div>

          <Card className="px-3 py-6 sm:px-8 lg:col-span-3">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-aeem-blue/10 text-aeem-blue dark:bg-aeem-gold/10 dark:text-aeem-gold-light"><CheckCircle2 size={28} aria-hidden="true" /></div>
                <h2 className="mt-6 text-2xl font-bold text-aeem-ink dark:text-white">Message received</h2>
                <p className="mx-auto mt-3 max-w-md leading-7 text-aeem-ink/70 dark:text-white/70">Thank you. Your message has been submitted. We will follow up using the contact details you provided.</p>
                <Button type="button" variant="secondary" className="mt-7" onClick={() => setSubmitted(false)}>Send another message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 px-3">
                <input type="text" name="hp_contact" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                <div>
                  <h2 className="text-2xl font-bold text-aeem-ink dark:text-white">Send a message</h2>
                  <p className="mt-2 text-sm text-aeem-ink/65 dark:text-white/65">Tell us what you need and include any relevant deadline or context.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="space-y-2"><span className="text-sm font-semibold text-aeem-ink dark:text-white">Full name</span><input required name="full_name" autoComplete="name" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="min-h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-white/15 dark:bg-white/[0.03] dark:text-white" /></label>
                  <label className="space-y-2"><span className="text-sm font-semibold text-aeem-ink dark:text-white">Email address</span><input required type="email" name="email" autoComplete="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="min-h-11 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-white/15 dark:bg-white/[0.03] dark:text-white" /></label>
                  <label className="space-y-2"><span className="text-sm font-semibold text-aeem-ink dark:text-white">Phone <span className="font-normal text-aeem-ink/50">(optional)</span></span><input name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="min-h-11 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-white/15 dark:bg-white/[0.03] dark:text-white" /></label>
                </div>
                <label className="block space-y-2"><span className="text-sm font-semibold text-aeem-ink dark:text-white">Message</span><textarea required name="message" rows={7} maxLength={3000} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-white/15 dark:bg-white/[0.03] dark:text-white" placeholder="How can we help?" /></label>
                {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">{error}</div>}
                <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? 'Sending…' : <><Send size={18} aria-hidden="true" /> Send message</>}</Button>
              </form>
            )}
          </Card>
        </div>
      </Section>
    </>
  )
}

export default Contact
