import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls the window to the very top whenever the route changes.
 *
 * Place this *inside* <Router> so it has access to routing context,
 * but *outside* <Layout> so it fires before the new page paints.
 *
 * Uses `behavior: 'instant'` (not 'smooth') so the user always sees
 * the top of the new page immediately — smooth scrolling across pages
 * feels jarring because it fights the exit animation.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default ScrollToTop