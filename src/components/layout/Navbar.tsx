import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Impact', path: '/impact' },
    { name: 'Events', path: '/events' },
    { name: 'Resources', path: '/resources' },
    { name: 'Press Kit', path: '/press-kit' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-[100] transition-all duration-500 ${
        isScrolled || isMobileMenuOpen ? 'bg-white/90 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/logo.jpg" alt="AEEM Logo" className="w-12 h-12 object-contain rounded-lg shadow-md" />
          <div className="leading-tight">
            <h1 className="font-extrabold text-lg tracking-tight">AEEM</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Movement</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-semibold transition-colors hover:text-aeem-gold ${
                location.pathname === link.path ? 'text-aeem-gold' : 'text-aeem-charcoal'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/get-involved" className="bg-aeem-charcoal text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-aeem-gold transition-all hover:scale-105 active:scale-95 shadow-xl">
            Get Involved
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t border-gray-100 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-bold ${
                location.pathname === link.path ? 'text-aeem-gold' : 'text-aeem-charcoal'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/get-involved" className="bg-aeem-gold text-white px-8 py-4 rounded-xl text-center font-bold shadow-lg">
            Get Involved
          </Link>
        </motion.div>
      )}
    </motion.nav>
  )
}
