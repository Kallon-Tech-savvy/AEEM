
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import Home from './pages/About'
import Contact from './pages/Contact'
import About from './pages/About'
import GetInvolve from './pages/GetInvolve'
import Event from './pages/Event'
import Blog from './pages/Blog'
import Award from './pages/Awards'
import TOC from './pages/TOC'
import TOS from './pages/TOS'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Cookies from './pages/Cookies'
import CookieConsentBanner from './components/CookieConsentBanner'
import { Route, Routes } from 'react-router-dom'
import BackToTop from './components/BackToTop'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <main className='page-shell'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/About' element={<About />} />
          <Route path='/Event' element={<Event />} />
          <Route path='/Blog' element={<Blog />} />
          <Route path='/GetInvolve' element={<GetInvolve />} />
          <Route path='/AwardsandRecognition' element={<Award />} />
          <Route path='/toc' element={<TOC />} />
          <Route path='/tos' element={<TOS />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/cookies' element={<Cookies />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </main>
      <BackToTop />
      <CookieConsentBanner />
      <Footer />
    </div>
  )
}

export default App
