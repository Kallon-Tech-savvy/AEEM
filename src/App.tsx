import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from 'react'
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
const Privacy       = lazy(() => import('./pages/Privacy'))
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
        <Route path="/privacy"          element={<Privacy />} />
        <Route path="*"                   element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

// ─── App shell ────────────────────────────────────────────────────────────────
// Everything that lives inside a router. Split out so the build-time prerender
// (src/entry-server.tsx) can render it inside a StaticRouter while the browser
// renders it inside a BrowserRouter. Both must render the same markup.

export function AppShell() {
  return (
    <>
      {/*
        ScrollToTop: fires window.scrollTo on every pathname change.
        Must live inside a router for useLocation(), but outside <Layout>
        so it runs before the new page renders.

        ScrollToTopButton: the visible ↑ button — unrelated component,
        kept here alongside its sibling for clarity.
      */}
      <ScrollToTop />
      <ScrollToTopButton />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </>
  )
}

// ─── App error boundary ───────────────────────────────────────────────────────
// Non-home routes use an empty HTML shell and depend on client-side rendering.
// If a lazy route chunk fails or a component throws, show a recoverable error
// instead of leaving visitors with a blank white page.
class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('AEEM route rendering failed:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="type-section-title text-aeem-ink dark:text-aeem-dark-text">This page could not load</h1>
          <p className="mt-3 max-w-prose text-aeem-charcoal-soft dark:text-aeem-dark-muted">
            Something went wrong while opening this page. Try again, or return to the homepage.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-aeem-forest px-5 py-3 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aeem-gold-dark"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-lg border border-aeem-border px-5 py-3 font-semibold text-aeem-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aeem-gold-dark dark:border-aeem-dark-border dark:text-white"
            >
              Go to homepage
            </a>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

// ─── App root ─────────────────────────────────────────────────────────────────

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppErrorBoundary>
          <AppShell />
        </AppErrorBoundary>
      </Router>
    </HelmetProvider>
  )
}

export default App
