import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../theme/ThemeToggle'
import { Container } from '../ui'

const actionLinkClasses =
  'inline-flex min-h-11 items-center justify-center rounded-xl border border-aeem-blue bg-aeem-blue px-5 text-sm font-semibold text-white transition-colors duration-150 hover:border-aeem-blue-dark hover:bg-aeem-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    firstMobileLinkRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Impact', path: '/impact' },
    { name: 'Events', path: '/events' },
    { name: 'Resources', path: '/resources' },
    { name: 'Press Kit', path: '/press-kit' },
  ]

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed inset-x-0 top-0 z-[100] py-4 transition-colors duration-200 ${
        isScrolled || isMobileMenuOpen
          ? 'border-b border-black/10 bg-white/95 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-aeem-charcoal/95'
          : 'bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between">
        <Link
          to="/"
          aria-label="AEEM home"
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2"
        >
          <picture>
            <source srcSet="/assets/AEEM_logo.avif" type="image/avif" />
            <source srcSet="/assets/AEEM_logo.webp" type="image/webp" />
            <img
              src="/assets/AEEM_logo.png"
              alt="AEEM"
              width={144}
              height={36}
              className="h-auto w-[144px]"
            />
          </picture>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = location.pathname === link.path

            return (
              <Link
                key={link.name}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-sm py-2 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2 dark:hover:text-aeem-gold ${
                  active ? 'text-aeem-blue dark:text-aeem-gold-light' : 'text-aeem-charcoal dark:text-white'
                }`}
              >
                {link.name}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-aeem-blue dark:bg-aeem-gold"
                  />
                ) : null}
              </Link>
            )
          })}

          <ThemeToggle />

          <Link to="/get-involved" className={actionLinkClasses}>
            Get Involved
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-aeem-charcoal transition-colors duration-150 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2 dark:text-aeem-gold dark:hover:bg-white/10"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-primary-navigation"
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {isMobileMenuOpen ? (
        <div
          id="mobile-primary-navigation"
          className="absolute inset-x-0 top-full border-t border-black/10 bg-white dark:border-white/10 dark:bg-aeem-charcoal md:hidden"
        >
          <Container className="flex flex-col gap-1 py-6">
            {navLinks.map((link, index) => {
              const active = location.pathname === link.path

              return (
                <Link
                  key={link.name}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  to={link.path}
                  onClick={closeMobileMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-lg px-3 py-3 text-lg font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2 ${
                    active
                      ? 'bg-aeem-gold/10 text-aeem-gold'
                      : 'text-aeem-charcoal hover:bg-black/5 dark:text-white dark:hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}

            <Link
              to="/get-involved"
              onClick={closeMobileMenu}
              className={`${actionLinkClasses} mt-4 w-full text-base`}
            >
              Get Involved
            </Link>
          </Container>
        </div>
      ) : null}
    </nav>
  )
}
