import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import ImpactStats from './components/sections/ImpactStats'
import Pillars from './components/sections/Pillars'
import GlobalReach from './components/sections/GlobalReach'
import AfricaImpactMap from './components/sections/AfricaImpactMap'
import ModernGallery from './components/sections/ModernGallery'
import Footer from './components/layout/Footer'

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-aeem-gold z-[110] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <main>
        <Hero />
        <ImpactStats />
        <Pillars />
        <GlobalReach />
        <AfricaImpactMap />
        <ModernGallery />
      </main>
      <Footer />
    </div>
  )
}

export default App
