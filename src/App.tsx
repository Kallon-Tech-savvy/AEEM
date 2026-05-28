import './App.css'
import Navbar from './data/components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const About = lazy(() => import('./pages/About') )
const Home = lazy(() => import('./pages/Home'))
const Contact = lazy(() => import('./pages/Contact'))
const GetInvolve = lazy(() => import('./pages/GetInvolve'))
const Event = lazy(() => import('./pages/Event'))
const Award = lazy(() => import('./pages/Awards'))
const TOC = lazy(() => import('./pages/TOC'))
const TOS = lazy(() => import('./pages/TOS'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Cookies = lazy(() => import('./pages/Cookies'))
const Footer = lazy(() => import('./data/components/footer'))
const CookieConsentBanner = lazy(() => import('./data/components/CookieConsentBanner'))

function App() {
  return (
    <div className='App'>
      <Navbar />
      <main className='page-shell'>
        <Routes>
          <Route
            path='/'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='/contact'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path='/Home'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='/Event'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <Event />
              </Suspense>
            }
          />
          <Route
            path='/GetInvolve'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <GetInvolve />
              </Suspense>
            }
          />
          <Route
            path='/AwardsandRecognition'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <Award />
              </Suspense>
            }
          />
          <Route
            path='/toc'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <TOC />
              </Suspense>
            }
          />
          <Route
            path='/tos'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <TOS />
              </Suspense>
            }
          />
          <Route
            path='/privacy'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path='/cookies'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <Cookies />
              </Suspense>
            }
          />
          <Route
            path='*'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <About />
              </Suspense>
            }
          />
          <Route
            path='*'
            element={
              <Suspense fallback={<div className='page-loading' aria-live='polite'>Loading…</div>}>
                <Home/>
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Suspense fallback={null}>
        <CookieConsentBanner />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
