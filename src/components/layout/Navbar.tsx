import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../theme/ThemeToggle'

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
    <nav
      className={`fixed w-full z-[100] py-4 transition-colors duration-200 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 dark:bg-aeem-charcoal/95 border-b border-gray-100 dark:border-zinc-800 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" >
          <picture className="dark:bg-white/95">
            <source srcSet="/assets/AEEM_logo.avif" type="image/avif" />
            <source srcSet="/assets/AEEM_logo.webp" type="image/webp"/>
            <img
              src="/assets/AEEM_logo.png"
              alt="AEEM Logo"
              width={144}
              height={36}
              className="w-[144px] h-auto rounded-lg"
            />
          </picture>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = location.pathname === link.path
            return (
              <div key={link.name} className="transition-transform duration-200 hover:-translate-y-0.5">
                <Link
                  to={link.path}
                  className={`relative text-sm font-semibold transition-colors hover:text-aeem-gold ${
                    active ? 'text-aeem-gold' : 'text-aeem-charcoal dark:text-white'
                  }`}
                >
                  {link.name}
                  {active ? <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-aeem-gold" /> : null}
                </Link>
              </div>
            )
          })}
          <ThemeToggle />
          <Link to="/get-involved" className="inline-flex bg-aeem-charcoal dark:bg-aeem-gold text-white dark:text-black px-8 py-3 rounded-full text-sm font-bold hover:bg-aeem-gold dark:hover:bg-aeem-white dark:hover:text-aeem-charcoal transition-all hover:scale-105 active:scale-95 shadow-xl">
            Get Involved
          </Link>
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
      {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full md:hidden bg-white/95 dark:bg-aeem-charcoal/95 backdrop-blur-xl border-t border-gray-100 dark:border-white/10 px-6 py-12 flex flex-col gap-8 shadow-2xl overflow-hidden rounded-b-[2rem] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-150">
            {navLinks.map((link, i) => (
              <div
                key={link.name}
                style={{ transitionDelay: `${i * 30}ms` }}
                className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-2"
              >
                <Link
                  to={link.path}
                  className={`text-2xl font-black ${
                    location.pathname === link.path ? 'text-aeem-gold' : 'text-aeem-charcoal dark:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <div
              style={{ transitionDelay: `${navLinks.length * 30}ms` }}
              className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2"
            >
              <Link to="/get-involved" className="w-full bg-aeem-charcoal dark:bg-aeem-gold text-white px-8 py-5 rounded-2xl text-center font-black text-lg shadow-xl block">
                Get Involved
              </Link>
            </div>
          </div>
        )}
    </nav>
  )
}
