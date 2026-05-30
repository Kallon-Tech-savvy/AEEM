import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
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

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/impact/:slug" element={<StoryDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/press-kit" element={<PressKit />} />
            <Route path="/recognition-awards" element={<Awards />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
    </Routes>
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
