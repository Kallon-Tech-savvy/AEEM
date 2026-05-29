import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-aeem-gold flex items-center justify-center rounded-lg font-bold text-white text-xl shadow-lg">A</div>
          <div className="leading-tight">
            <h1 className="font-extrabold text-lg tracking-tight">AEEM</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Movement</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Impact', 'Initiatives', 'Gallery', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold hover:text-aeem-gold transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-aeem-charcoal text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-aeem-gold transition-all hover:scale-105 active:scale-95 shadow-xl">
            Join Us
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
