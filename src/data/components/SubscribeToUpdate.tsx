import { useState, type ChangeEvent, type FormEvent } from 'react'
import '../../assets/styles/subscribeToUpdate.css'
import { Button } from './Button'
import { FormField } from './FormField'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sanitizeInput = (value: string) => value.replace(/<[^>]*>/g, '').trim()

export default function SubscribeToUpdate() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<{ email?: string }>({})
  const [serverMessage, setServerMessage] = useState('')
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return 'Enter your email address to subscribe to updates.'
    if (!emailPattern.test(trimmed)) return 'Enter a valid email address.'
    return ''
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nextEmail = event.target.value
    setEmail(nextEmail)
    if (errors.email) {
      setErrors({ email: validateEmail(nextEmail) })
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const emailError = validateEmail(email)
    if (emailError) {
      setErrors({ email: emailError })
      setServerMessage('')
      setServerError('')
      return
    }

    setIsSubmitting(true)
    setServerError('')
    setServerMessage('')

    const sanitizedEmail = sanitizeInput(email)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sanitizedEmail, website }),
      })

      const result = await response.json()

      if (!response.ok) {
        setServerError(result?.error || 'Unable to submit subscription. Please try again.')
      } else {
        setServerMessage(result.message || 'Thanks! You are now signed up for AEEM updates.')
        setEmail('')
      }
    } catch (error) {
      console.error('Subscription failed:', error)
      setServerError('Subscription failed. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className='subscribe-form' aria-live='polite'>
      <FormField
        id='subscribe'
        label='Subscribe for updates'
        type='email'
        placeholder='info@aeem.ex'
        value={email}
        onChange={handleEmailChange}
        error={errors.email}
        hint='Use an active email so we can keep you informed.'
        inputProps={{
          autoComplete: 'email',
          'aria-describedby': 'subscribe-hint subscribe-error',
        }}
      />

      <input
        type='text'
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete='off'
        style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
        aria-hidden='true'
      />

      <Button type='submit' variant='primary' disabled={isSubmitting || Boolean(errors.email)}>
        {isSubmitting ? 'Submitting…' : 'Subscribe'}
      </Button>

      {serverError ? (
        <p id='subscribe-status' className='subscribe-status subscribe-status--error'>{serverError}</p>
      ) : null}
      {serverMessage ? (
        <p id='subscribe-status' className='subscribe-status subscribe-status--success'>{serverMessage}</p>
      ) : null}
    </form>
  )
}
