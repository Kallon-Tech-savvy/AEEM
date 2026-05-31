// ── Hooks ─────────────────────────────────────────────────────────────────────
import { useContext, useState, useEffect, createContext } from "react"
import { ThemeContextValue } from "../ThemeProvider"

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}

/**
 * Returns true when the user has opted into reduced motion.
 * Pass this to every Framer Motion component so decorative animations
 * are skipped while functional feedback animations are preserved.
 *
 * @example
 * const reduced = useReducedMotion()
 * <motion.div
 *   animate={reduced ? {} : { y: [20, 0], opacity: [0, 1] }}
 *   transition={{ duration: reduced ? 0 : 0.5 }}
 * />
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
