
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/footer'
import About from './pages/About'
import Contact from './pages/Contact'
import TOC from './pages/TOC'
import TOS from './pages/TOS'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Cookies from './pages/Cookies'
import CookieConsentBanner from './components/CookieConsentBanner'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <main className='page-shell'>
        <Routes>
          <Route path='/' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/toc' element={<TOC />} />
          <Route path='/tos' element={<TOS />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/cookies' element={<Cookies />} />
          <Route path='*' element={<About />} />
        </Routes>
      </main>
      <CookieConsentBanner />
      <Footer />
    </div>
  )
}

export default App
