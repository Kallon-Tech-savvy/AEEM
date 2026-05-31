import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Impact from './pages/Impact'
import StoryDetail from './pages/StoryDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import GetInvolved from './pages/GetInvolved'
import Resources from './pages/Resources'
import ResourceDetail from './pages/ResourceDetail'
import PressKit from './pages/PressKit'
import Awards from './pages/Awards'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// ─────────────────────────────────────────────────────────────────────────────
// FIX 2: AnimatePresence moved here, directly wrapping <Routes>.
//
// Requirements for route-level exit animations with Framer Motion:
//  a) AnimatePresence must be a direct parent of the component being
//     animated (Routes in this case).
//  b) The `key` prop on <Routes> (or the top-level <motion.*> inside each
//     page) must change on navigation so Framer Motion can detect the
//     unmount/mount cycle and run exit → enter sequences.
//  c) mode="wait" ensures the exiting page fully animates out before the
//     entering page starts — prevents both pages rendering simultaneously.
//
// Each page component should have a wrapping <motion.div> with
// `initial`, `animate`, and `exit` props for transitions to work.
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
        <Route path="/recognition-awards" element={<Awards />} />
        <Route path="/contact"            element={<Contact />} />
        <Route path="*"                   element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </HelmetProvider>
  )
}

export default App