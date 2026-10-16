import React, { useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Users, Heart, Briefcase, CheckCircle2, Loader2 } from 'lucide-react'
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
import { Badge, Button, Card, Section } from '../components/ui'

type TabId = 'volunteer' | 'partner' | 'donor'

const TABS = [
  { id: 'volunteer' as TabId, icon: Users, title: 'Volunteer', desc: 'Contribute your time, skills, or professional expertise.' },
  { id: 'partner' as TabId, icon: Briefcase, title: 'Partner', desc: 'Explore institutional collaboration, programs, or shared initiatives.' },
  { id: 'donor' as TabId, icon: Heart, title: 'Support AEEM', desc: 'Discuss ways to support education and youth empowerment.' },
]

const FIELD_CLASS = 'min-h-11 w-full rounded-xl border border-aeem-border bg-aeem-surface px-4 text-sm text-aeem-ink outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-aeem-dark-border dark:bg-aeem-dark-bg dark:text-aeem-dark-text'
const LABEL_CLASS = 'text-sm font-semibold text-aeem-ink dark:text-aeem-dark-text'

export const GetInvolved: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('volunteer')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % TABS.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + TABS.length) % TABS.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = TABS.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    const nextTab = TABS[nextIndex]
    if (!nextTab) return
    switchTab(nextTab.id)
    tabRefs.current[nextIndex]?.focus()
  }

  const switchTab = (tab: TabId) => {
    setActiveTab(tab)
    setSubmitted(false)
    setError(null)
    formRef.current?.reset()
    setHoneypot('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (isHoneypotTriggered(honeypot)) {
      setSubmitted(true)
      return
    }

    const formData = new FormData(e.currentTarget)
    const fullName = String(formData.get('full_name') ?? '').trim()
    const emailRaw = String(formData.get('email') ?? '')
    const phoneRaw = String(formData.get('phone') ?? '')
    const organization = String(formData.get('organization') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (fullName.length < 2 || fullName.length > 120 || message.length < 10 || message.length > 3000) {
      setError('Please provide a valid name and a message between 10 and 3,000 characters.')
      return
    }

    const normEmail = normalizeEmail(emailRaw)
    const normPhone = phoneRaw ? normalizePhone(phoneRaw) : null

    if (!checkClientRateLimit(`inquiry:${activeTab}:${normEmail}`, 5, 60 * 60_000)) {
      setError('Too many attempts. Please wait before trying again.')
      return
    }

    const submissionKey = await generateSubmissionKey('inquiry', normEmail, activeTab, message)

    if (isAlreadySubmittedLocally(submissionKey)) {
      setError('We already received this exact message for this inquiry type. Please wait for our team to follow up, or send a different message.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await submitInquiryApi({
        inquiry_type: activeTab,
        full_name: fullName,
        email: normEmail,
        phone: normPhone,
        organization: organization || null,
        message,
        honeypot,
      })

      const result = await response.json().catch(() => null)

      if (response.status === 409 || result?.code === 'duplicate_submission') {
        markSubmittedLocally(submissionKey)
        setError('We already received this exact message for this inquiry type. Please wait for our team to follow up, or send a different message.')
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
    } catch (err) {
      console.warn('Inquiry submission failed:', err)
      setError(
        err instanceof DOMException && err.name === 'AbortError'
          ? 'The inquiry service took too long to respond. Please check your connection and try again.'
          : 'We could not submit your inquiry. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Get Involved | AEEM</title>
        <meta name="description" content="Volunteer, partner, or support the Africa Education Empowerment Movement." />
      </Helmet>

      <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-dark-bg">
        <div className="max-w-3xl">
          <Badge>Take action</Badge>
          <h1 className="mt-5 type-page-title text-aeem-ink dark:text-aeem-dark-text">There is a place for your contribution.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-charcoal-soft dark:text-aeem-dark-muted">
            Choose the path that best matches how you want to work with AEEM. We will use your inquiry to understand the opportunity before following up.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="type-eyebrow text-aeem-gold-dark dark:text-aeem-gold-light">Ways to contribute</p>
            <h2 className="mt-3 type-section-title text-aeem-ink dark:text-aeem-dark-text">Choose your path</h2>
            <div className="mt-10 space-y-4" role="tablist" aria-label="Ways to get involved">
              {TABS.map((tab, index) => {
                const Icon = tab.icon
                const selected = activeTab === tab.id
                return (
                  <button key={tab.id} ref={element => { tabRefs.current[index] = element }} type="button" role="tab" id={`involvement-tab-${tab.id}`} tabIndex={selected ? 0 : -1} aria-selected={selected} aria-controls="involvement-panel" onClick={() => switchTab(tab.id)} onKeyDown={event => handleTabKeyDown(event, index)}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus ${selected ? 'border-aeem-forest bg-aeem-forest/5 dark:border-aeem-gold dark:bg-aeem-gold/5' : 'border-black/10 hover:border-aeem-forest/40 dark:border-white/10'}`}>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${selected ? 'bg-aeem-forest text-white dark:bg-aeem-gold' : 'bg-aeem-forest/5 text-aeem-forest dark:bg-white/5 dark:text-aeem-gold-light'}`}><Icon size={20} aria-hidden="true" /></span>
                    <span><span className="block font-semibold text-aeem-ink dark:text-aeem-dark-text">{tab.title}</span><span className="mt-1 block text-sm leading-6 text-aeem-charcoal-soft dark:text-aeem-dark-muted">{tab.desc}</span></span>
                  </button>
                )
              })}
            </div>
          </div>

          <Card className="px-3 py-6 sm:px-8 lg:col-span-3" id="involvement-panel" role="tabpanel" aria-labelledby={`involvement-tab-${activeTab}`}>
            {submitted ? (
              <div className="px-3 py-10 text-center sm:px-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-aeem-forest/10 text-aeem-forest dark:bg-aeem-gold/10 dark:text-aeem-gold-light"><CheckCircle2 size={28} aria-hidden="true" /></div>
                <h2 className="mt-6 type-card-title text-aeem-ink dark:text-aeem-dark-text">Inquiry received</h2>
                <p className="mx-auto mt-3 max-w-md leading-7 text-aeem-charcoal-soft dark:text-aeem-dark-muted">Thank you. Your inquiry has been submitted for review. We will follow up using the contact details you provided.</p>
                <Button type="button" variant="secondary" className="mt-7" onClick={() => setSubmitted(false)}>Send another inquiry</Button>
              </div>
            ) : (
              <form id="involvement-form" ref={formRef} onSubmit={handleSubmit} className="space-y-6 px-3">
                <input type="text" name="hp_zip" value={honeypot} onChange={e => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />
                <div>
                  <p className="text-sm font-semibold text-aeem-gold-dark">{TABS.find(tab => tab.id === activeTab)?.title}</p>
                  <h2 className="mt-2 type-section-title text-aeem-ink dark:text-aeem-dark-text">Tell us how you would like to contribute.</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="space-y-2"><span className={LABEL_CLASS}>Full name</span><input required name="full_name" type="text" autoComplete="name" className={FIELD_CLASS} /></label>
                  <label className="space-y-2"><span className={LABEL_CLASS}>Email address</span><input required name="email" type="email" autoComplete="email" className={FIELD_CLASS} /></label>
                  <label className="space-y-2"><span className={LABEL_CLASS}>Phone number <span className="font-normal text-aeem-ink/50">(optional)</span></span><input name="phone" type="tel" autoComplete="tel" className={FIELD_CLASS} placeholder="+232..." /></label>
                  <label className="space-y-2"><span className={LABEL_CLASS}>Organization / institution <span className="font-normal text-aeem-ink/50">(optional)</span></span><input name="organization" type="text" autoComplete="organization" className={FIELD_CLASS} /></label>
                </div>

                <label className="block space-y-2"><span className={LABEL_CLASS}>Message</span><textarea required name="message" rows={6} maxLength={3000} className={FIELD_CLASS + ' py-3'} placeholder="Tell us what you have in mind." /></label>

                {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">{error}</div>}

                <Button type="submit" disabled={isSubmitting} className="w-full">{isSubmitting ? <><Loader2 className="animate-spin" size={18} aria-hidden="true" />Submitting…</> : 'Submit inquiry'}</Button>
                <p className="text-xs leading-5 text-aeem-charcoal-soft dark:text-aeem-dark-muted">Please do not include sensitive personal, financial, or identity-document information in this form.</p>
              </form>
            )}
          </Card>
        </div>
      </Section>
    </>
  )
}

export default GetInvolved
