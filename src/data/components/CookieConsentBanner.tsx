import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

import '../../assets/styles/CookieBanner.css'

const STORAGE_KEY = 'aeem_cookie_consent'
type ConsentValue = 'accepted' | 'rejected'

export default function CookieConsentBanner() {
  // Fix: Initialize state lazily on the first structural evaluation.
  // This bypasses the need for a useEffect check entirely, preventing cascading renders.
  const [visible, setVisible] = useState<boolean>(() => {
    // SSR safe check (if your build optimization utilizes pre-rendering pipelines)
    if (typeof window === 'undefined') return false;
    
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return !saved
  })

  function handleConsent(value: ConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div className='cookie-banner' role="complementary" aria-labelledby="cookie-title">
      <div className='cookie-banner__body'>
        <div>
          <p className='cookie-banner__eyebrow'>SYS // ACCESS_CONTROL</p>
          <h2 id="cookie-title">We use cookies to keep AEEM secure and easy to use.</h2>
          <p>
            Essential cookies help the site run smoothly, support navigation, and protect your session. 
            You can review our <Link to='/cookies' className="editorial-link">cookie policy</Link> at any time.
          </p>
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
    </div>
  )
}