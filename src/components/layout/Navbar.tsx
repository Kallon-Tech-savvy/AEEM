import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../theme/ThemeToggle'
import { Magnetic } from '../motion/Magnetic'

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
      className={`fixed w-full z-[100] transition-all duration-200 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 dark:bg-aeem-charcoal/95 border-b border-gray-100 dark:border-zinc-800 py-4 shadow-sm backdrop-blur-xl'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="dark:bg-white/95">
          <img src="/assets/AEEM_logo.png" alt="AEEM Logo" className="w-36 h-14 object-fill rounded-lg shadow-md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = location.pathname === link.path
            return (
              <motion.div key={link.name} whileHover={{ y: -2, scale: 1.01 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }}>
                <Link
                  to={link.path}
                  className={`relative text-sm font-semibold transition-colors hover:text-aeem-gold ${
                    active ? 'text-aeem-gold' : 'text-aeem-charcoal dark:text-white'
                  }`}
                >
                  {link.name}
                  {active ? <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-aeem-gold" /> : null}
                </Link>
              </motion.div>
            )
          })}
          <ThemeToggle />
          <Magnetic className="inline-flex">
            <Link to="/get-involved" className="bg-aeem-charcoal dark:bg-aeem-gold text-white dark:text-black px-8 py-3 rounded-full text-sm font-bold hover:bg-aeem-gold dark:hover:bg-aeem-white dark:hover:text-aeem-charcoal transition-all hover:scale-105 active:scale-95 shadow-xl">
              Get Involved
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-aeem-charcoal dark:text-aeem-gold"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full md:hidden bg-white/95 dark:bg-aeem-charcoal/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 px-6 py-12 flex flex-col gap-8 shadow-2xl overflow-hidden rounded-b-[2rem]"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.path}
                  className={`text-2xl font-black ${
                    location.pathname === link.path ? 'text-aeem-gold' : 'text-aeem-charcoal dark:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 }}
            >
              <Magnetic className="inline-flex w-full">
                <Link to="/get-involved" className="w-full bg-aeem-charcoal dark:bg-aeem-gold text-white px-8 py-5 rounded-2xl text-center font-black text-lg shadow-xl block">
                  Get Involved
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
