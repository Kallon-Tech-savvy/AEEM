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
        // Keep server diagnostics actionable without exposing request contents.
        const code = typeof result?.code === 'string' ? result.code : ''
        const messages: Record<string, string> = {
          invalid_fields: 'Some required details are missing or invalid. Please review the form and try again.',
          invalid_email: 'Please check the email address and try again.',
          invalid_phone: 'Please check the phone number or leave it blank.',
          origin_not_allowed: 'This form is temporarily unavailable from this page. Please contact AEEM by email or phone.',
          service_unavailable: 'The inquiry service is temporarily unavailable. Your message was not confirmed as sent. Please try again later or contact AEEM directly.',
        }
        setError(
          messages[code] ??
            (response.status >= 500
              ? 'The inquiry service is temporarily unavailable. Your message was not confirmed as sent. Please try again later or contact AEEM directly.'
              : 'We could not submit your message. Please review the form and try again.'),
        )
        console.warn('Inquiry API rejected submission:', {
          status: response.status,
          code: code || 'unknown',
        })
        return
      }

      markSubmittedLocally(submissionKey)
      setSubmitted(true)
      setFormData({ full_name: '', email: '', phone: '', message: '' })
      setHoneypot('')
    } catch (err) {
      console.warn('Inquiry submission failed:', {
        kind: err instanceof DOMException && err.name === 'AbortError'
          ? 'timeout'
          : err instanceof TypeError
            ? 'network_or_cors'
            : 'unexpected',
      })
      setError(
        err instanceof DOMException && err.name === 'AbortError'
          ? 'The inquiry service took too long to respond. Please check your connection and try again.'
          : err instanceof TypeError
            ? 'We could not connect to the inquiry service. Check your internet connection and try again. If the problem continues, contact AEEM directly.'
            : 'We could not send your message. Please try again or contact AEEM directly.',
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

      <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-dark-bg">
        <div className="max-w-3xl">
          <Badge>Get in touch</Badge>
          <h1 className="mt-5 type-page-title text-aeem-ink dark:text-aeem-dark-text">A direct line to AEEM.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-charcoal-soft dark:text-aeem-dark-muted">For general questions, program inquiries, partnerships, or media requests, send a message or use the contact details below.</p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="space-y-7 lg:col-span-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-gold-dark">Contact details</p>
              <h2 className="mt-3 type-section-title text-aeem-ink dark:text-aeem-dark-text">Reach us directly</h2>
            </div>
            <Card className="space-y-6 p-6">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus">
                <Mail className="mt-1 shrink-0 text-aeem-forest dark:text-aeem-gold-light" size={20} aria-hidden="true" />
                <span><span className="block font-semibold text-aeem-ink dark:text-aeem-dark-text">Email</span><span className="mt-1 block break-all text-sm text-aeem-charcoal-soft dark:text-aeem-dark-muted">{CONTACT_EMAIL}</span></span>
              </a>
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus">
                <Phone className="mt-1 shrink-0 text-aeem-forest dark:text-aeem-gold-light" size={20} aria-hidden="true" />
                <span><span className="block font-semibold text-aeem-ink dark:text-aeem-dark-text">Phone</span><span className="mt-1 block text-sm text-aeem-charcoal-soft dark:text-aeem-dark-muted">{CONTACT_PHONE}</span></span>
              </a>
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-aeem-forest dark:text-aeem-gold-light" size={20} aria-hidden="true" />
                <span><span className="block font-semibold text-aeem-ink dark:text-aeem-dark-text">Office</span><span className="mt-1 block text-sm text-aeem-charcoal-soft dark:text-aeem-dark-muted">Freetown, Sierra Leone</span></span>
              </div>
            </Card>
            <p className="text-sm leading-6 text-aeem-charcoal-soft dark:text-aeem-dark-muted">For sensitive matters, do not include identity documents, financial information, passwords, or other confidential credentials in this form.</p>
          </div>

          <Card className="px-3 py-6 sm:px-8 lg:col-span-3">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-aeem-forest/10 text-aeem-forest dark:bg-aeem-gold/10 dark:text-aeem-gold-light"><CheckCircle2 size={28} aria-hidden="true" /></div>
                <h2 className="mt-6 type-card-title text-aeem-ink dark:text-aeem-dark-text">Message received</h2>
                <p className="mx-auto mt-3 max-w-md leading-7 text-aeem-charcoal-soft dark:text-aeem-dark-muted">Thank you. Your message has been submitted. We will follow up using the contact details you provided.</p>
                <Button type="button" variant="secondary" className="mt-7" onClick={() => setSubmitted(false)}>Send another message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 px-3">
                <input type="text" name="hp_contact" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                <div>
                  <h2 className="type-section-title text-aeem-ink dark:text-aeem-dark-text">Send a message</h2>
                  <p className="mt-2 text-sm text-aeem-charcoal-soft dark:text-aeem-dark-muted">Tell us what you need and include any relevant deadline or context.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="space-y-2"><span className="text-sm font-semibold text-aeem-ink dark:text-aeem-dark-text">Full name</span><input required name="full_name" autoComplete="name" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="min-h-11 w-full rounded-xl border border-aeem-border bg-aeem-surface px-4 text-sm outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-aeem-dark-border dark:bg-aeem-dark-bg dark:text-aeem-dark-text" /></label>
                  <label className="space-y-2"><span className="text-sm font-semibold text-aeem-ink dark:text-aeem-dark-text">Email address</span><input required type="email" name="email" autoComplete="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="min-h-11 w-full rounded-xl border border-aeem-border bg-aeem-surface px-4 text-sm outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-aeem-dark-border dark:bg-aeem-dark-bg dark:text-aeem-dark-text" /></label>
                  <label className="space-y-2"><span className="text-sm font-semibold text-aeem-ink dark:text-aeem-dark-text">Phone <span className="font-normal text-aeem-ink/50">(optional)</span></span><input name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="min-h-11 w-full rounded-xl border border-aeem-border bg-aeem-surface px-4 py-3 text-sm outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-aeem-dark-border dark:bg-aeem-dark-bg dark:text-aeem-dark-text" /></label>
                </div>
                <label className="block space-y-2"><span className="text-sm font-semibold text-aeem-ink dark:text-aeem-dark-text">Message</span><textarea required name="message" rows={7} maxLength={3000} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full rounded-xl border border-aeem-border bg-aeem-surface px-4 py-3 text-sm outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-aeem-dark-border dark:bg-aeem-dark-bg dark:text-aeem-dark-text" placeholder="How can we help?" /></label>
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
