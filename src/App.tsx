import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import Layout from './components/layout/Layout'
import ScrollToTopButton from './components/layout/ScrollToTopButton'
import ScrollToTop from './components/layout/ScrollToTop'

// ─── Query client ─────────────────────────────────────────────────────────────

// ─── Lazy pages ───────────────────────────────────────────────────────────────
// Each page is its own JS chunk. Vite only loads the chunk for the
// route the user actually visits, cutting initial bundle size significantly.

const Home          = lazy(() => import('./pages/Home'))
const About         = lazy(() => import('./pages/About'))
const Impact        = lazy(() => import('./pages/Impact'))
const StoryDetail   = lazy(() => import('./pages/StoryDetail'))
const Events        = lazy(() => import('./pages/Events'))
const EventDetail   = lazy(() => import('./pages/EventDetail'))
const GetInvolved   = lazy(() => import('./pages/GetInvolved'))
const Resources     = lazy(() => import('./pages/Resources'))
const ResourceDetail= lazy(() => import('./pages/ResourceDetail'))
const PressKit      = lazy(() => import('./pages/PressKit'))
const Contact       = lazy(() => import('./pages/Contact'))
const NotFound      = lazy(() => import('./pages/NotFound'))

// ─── Page loading fallback ────────────────────────────────────────────────────
// Shown while a lazy chunk is fetching. Matches the gallery skeleton
// aesthetic so transitions feel cohesive.

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[60vh]" aria-label="Loading page">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-aeem-gold" />
  </div>
)

// ─── Animated routes ──────────────────────────────────────────────────────────
// Suspense wraps the Routes so lazy chunks can suspend here without
// disrupting AnimatePresence's exit animation tracking.

function AnimatedRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"                   element={<Home />} />
        <Route path="/about"              element={<About />} />
        <Route path="/impact"             element={<Impact />} />
        <Route path="/impact/:slug"       element={<StoryDetail />} />
        <Route path="/events"             element={<Events />} />
        <Route path="/events/:slug"       element={<EventDetail />} />
        <Route path="/get-involved"       element={<GetInvolved />} />
        <Route path="/resources"          element={<Resources />} />
        <Route path="/resources/:slug"    element={<ResourceDetail />} />
        <Route path="/press-kit"          element={<PressKit />} />
        <Route path="/contact"            element={<Contact />} />
        <Route path="*"                   element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────

function App() {
  return (
    <HelmetProvider>
        <Router>
          {/*
            ScrollToTop: fires window.scrollTo on every pathname change.
            Must live inside <Router> for useLocation(), but outside <Layout>
            so it runs before the new page renders.

            ScrollToTopButton: the visible ↑ button — unrelated component,
            kept here alongside its sibling for clarity.
          */}
          <ScrollToTop />
          <ScrollToTopButton />
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </HelmetProvider>
  )
}

export default App
