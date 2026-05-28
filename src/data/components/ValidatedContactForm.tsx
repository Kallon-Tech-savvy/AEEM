import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Button } from './Button'
import { FormField } from './FormField'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ContactValues = {
  name: string
  email: string
  message: string
}

type ContactErrors = Partial<Record<keyof ContactValues, string>>

const validateField = (field: keyof ContactValues, value: string) => {
  const trimmed = value.trim()

  switch (field) {
    case 'name':
      if (!trimmed) return 'Please enter your full name.'
      if (trimmed.length < 2) return 'Name must be at least 2 characters long.'
      return ''
    case 'email':
      if (!trimmed) return 'Please enter your email address.'
      if (!emailPattern.test(trimmed)) return 'Email must include an @ sign and a valid domain, for example: you@domain.com.'
      return ''
    case 'message':
      if (!trimmed) return 'Please describe what you need so we can respond accurately.'
      if (trimmed.length < 15) return 'Message should be at least 15 characters so we can understand your request.'
      return ''
    default:
      return ''
  }
}

export default function ValidatedContactForm() {
  const [values, setValues] = useState<ContactValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFieldChange = (field: keyof ContactValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nextValue = event.target.value
    setValues((current) => ({ ...current, [field]: nextValue }))
    const nextError = validateField(field, nextValue)
    setErrors((current) => ({ ...current, [field]: nextError }))
    if (status) setStatus('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: ContactErrors = {
      name: validateField('name', values.name),
      email: validateField('email', values.email),
      message: validateField('message', values.message),
    }

    setErrors(nextErrors)

    const fieldIssues = Object.values(nextErrors).filter(Boolean)
    if (fieldIssues.length > 0) {
      setStatus(`Please fix the highlighted fields: ${fieldIssues.join(' ')}`)
      setIsSubmitted(false)
      return
    }

    setStatus('Thank you! Your message is ready. We will review it and reply as soon as possible.')
    setIsSubmitted(true)
    setValues({ name: '', email: '', message: '' })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className='partner-contact' aria-live='polite'>
      <SectionHeader title='Message AEEM directly' description='This form checks your inputs as you type, so mistakes are fixed before you submit.' center={false} />
      <FormField
        id='contact-name'
        label='Name'
        value={values.name}
        onChange={handleFieldChange('name')}
        onBlur={handleFieldChange('name')}
        placeholder='Your full name'
        error={errors.name}
        hint='Use the name you prefer us to address you by.'
      />
      <FormField
        id='contact-email'
        label='Email'
        value={values.email}
        onChange={handleFieldChange('email')}
        onBlur={handleFieldChange('email')}
        placeholder='you@domain.com'
        type='email'
        error={errors.email}
        hint='A working email lets us reply quickly.'
      />
      <FormField
        id='contact-message'
        label='Message'
        value={values.message}
        onChange={handleFieldChange('message')}
        onBlur={handleFieldChange('message')}
        placeholder='Tell us what help you need or your partnership idea.'
        multiline
        rows={6}
        error={errors.message}
        hint='Write at least 15 characters so we can answer accurately.'
      />
      <div className='partner-actions'>
        <Button type='submit' variant='primary'>Send message</Button>
      </div>
      {status ? (
        <p className={`form-status ${isSubmitted ? 'form-status--success' : 'form-status--warning'}`}>{status}</p>
      ) : null}
    </form>
  )
}

function SectionHeader({ title, description, center }: { title: string; description: string; center?: boolean }) {
  return (
    <div className={`section-heading ${center ? 'section-heading--center' : ''}`}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
