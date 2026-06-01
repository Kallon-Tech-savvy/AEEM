// ─────────────────────────────────────────────────────────────────────────────
// FIX 3: lucide-react imports moved to the top of the file.
//         All imports must precede any declarations — while JS hoisting means
//         this works at runtime, ESLint (import/first rule) flags it and it
//         harms readability.
// ─────────────────────────────────────────────────────────────────────────────
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
  type ReactElement,
} from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  /** The user's explicit preference (may be 'system') */
  theme: ThemeMode
  /** The resolved theme actually applied to <html> */
  resolvedTheme: 'light' | 'dark'
  /** Update the user preference */
  setTheme: (theme: ThemeMode) => void
  /** Toggle between light ↔ dark (ignores system) */
  toggle: () => void
}

// ── Context ───────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = 'aeem-theme'

// ── Provider ──────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system'
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? 'system'
  })

  const getResolved = useCallback((mode: ThemeMode): 'light' | 'dark' => {
    if (mode !== 'system') return mode
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }, [])

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    getResolved(theme)
  )

  // Apply resolved theme to <html class="dark">
  useEffect(() => {
    const resolved = getResolved(theme)
    setResolvedTheme(resolved)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [theme, getResolved])

  // Stay in sync when the OS preference changes while mode is 'system'
  useEffect(() => {
    if (theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const resolved = mq.matches ? 'dark' : 'light'
      setResolvedTheme(resolved)
      document.documentElement.classList.toggle('dark', resolved === 'dark')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggle = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

// // ── Hooks ─────────────────────────────────────────────────────────────────────

// export function useTheme(): ThemeContextValue {
//   const ctx = useContext(ThemeContext)
//   if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
//   return ctx
// }

// /**
//  * Returns true when the user has opted into reduced motion.
//  * Pass this to every Framer Motion component so decorative animations
//  * are skipped while functional feedback animations are preserved.
//  *
//  * @example
//  * const reduced = useReducedMotion()
//  * <motion.div
//  *   animate={reduced ? {} : { y: [20, 0], opacity: [0, 1] }}
//  *   transition={{ duration: reduced ? 0 : 0.5 }}
//  * />
//  */
// export function useReducedMotion(): boolean {
//   const [reduced, setReduced] = useState(() => {
//     if (typeof window === 'undefined') return false
//     return window.matchMedia('(prefers-reduced-motion: reduce)').matches
//   })

//   useEffect(() => {
//     const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
//     const handler = () => setReduced(mq.matches)
//     mq.addEventListener('change', handler)
//     return () => mq.removeEventListener('change', handler)
//   }, [])

//   return reduced
// }

// ── Theme Toggle Button ────────────────────────────────────────────────────────

const cycle: Record<ThemeMode, ThemeMode> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
}

const labels: Record<ThemeMode, string> = {
  light:  'Switch to dark mode',
  dark:   'Switch to system theme',
  system: 'Switch to light mode',
}

// ─────────────────────────────────────────────────────────────────────────────
// FIX 4: JSX.Element replaced with ReactElement (imported above).
//         JSX.Element is a TypeScript global that was always an alias for
//         React.ReactElement. In React 18+ strict TS configs (noImplicitAny,
//         isolatedModules) JSX.Element is deprecated in favour of the
//         explicit import. Using the named import also works in projects that
//         don't have the JSX global namespace available.
// ─────────────────────────────────────────────────────────────────────────────
const icons: Record<ThemeMode, ReactElement> = {
  light:  <Sun     size={18} aria-hidden="true" />,
  dark:   <Moon    size={18} aria-hidden="true" />,
  system: <Monitor size={18} aria-hidden="true" />,
}

/**
 * Three-way toggle: Light → Dark → System.
 * Drop into your Navbar; no props required.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(cycle[theme])}
      aria-label={labels[theme]}
      title={labels[theme]}
      // ───────────────────────────────────────────────────────────────────
      // FIX 5: Replaced `duration-[var(--transition-fast)]` with an inline
      //         style for the transition.
      //
      // Why it was broken:
      //   --transition-fast is defined as "150ms ease-out" (the full CSS
      //   transition shorthand). Tailwind's duration-[…] utility expects a
      //   bare time value ("150ms"), not a shorthand. The generated class was:
      //     transition-duration: 150ms ease-out   ← invalid CSS, ignored
      //
      // Fix:
      //   Use style={{ transition: … }} with the CSS variable directly, which
      //   passes the full shorthand to the `transition` property where it is
      //   valid. The Tailwind `transition-colors` utility still provides the
      //   list of properties to animate (color, background-color, etc.).
      // ───────────────────────────────────────────────────────────────────
      style={{
        transition: `color var(--transition-fast),
                     background-color var(--transition-fast),
                     border-color var(--transition-fast)`,
      }}
      className={[
        'inline-flex items-center justify-center',
        'w-10 h-10 rounded-full',
        // bg-surface / bg-surface-alt are defined in @layer utilities in index.css
        'bg-surface border border-[var(--color-border-sub)]',
        'text-[var(--color-text-secondary)]',
        'hover:bg-surface-alt hover:text-[var(--color-text-primary)]',
        'cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]',
        'focus-visible:outline-offset-2',
        className,
      ].join(' ')}
    >
      {icons[theme]}
    </button>
  )
}

// ── Hook exported for other components to consume the same context ──────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}