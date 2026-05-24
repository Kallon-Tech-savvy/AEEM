import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

const STORAGE_KEY = 'aeem_cookie_consent'

type ConsentValue = 'accepted' | 'rejected'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      setVisible(true)
    }
  }, [])

  function handleConsent(value: ConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className='cookie-banner'>
      <div className='cookie-banner__body'>
        <div>
          <p className='cookie-banner__eyebrow'>Cookie notice</p>
          <h2>We use cookies to keep AEEM secure and easy to use.</h2>
          <p>Essential cookies help the site run smoothly, support navigation, and protect your session. You can review our cookie policy at any time.</p>
        </div>
        <div className='cookie-banner__actions'>
          <Button variant='secondary' type='button' onClick={() => handleConsent('rejected')}>
            Reject
          </Button>
          <Button variant='primary' type='button' onClick={() => handleConsent('accepted')}>
            Accept
          </Button>
        </div>
      </div>
      <div className='cookie-banner__footer'>
        <Link to='/cookies'>Review cookies policy</Link>
      </div>
    </div>
  )
}
