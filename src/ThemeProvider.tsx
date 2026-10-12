/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, startTransition } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'aeem-theme'

function readStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
  } catch {
    return 'system' // storage blocked (private mode, strict settings)
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The first render must be identical on the server (prerendered HTML) and in
  // the browser, so it cannot read localStorage. The stored choice is loaded
  // right after mount. Until then index.html's inline script has already put
  // the right light/dark class on <html>, so nothing flashes.
  const [theme, setThemeState] = useState<ThemeMode>('system')
  const [loaded, setLoaded] = useState(false)

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // A transition, not a plain update: changing this context while part of the
    // prerendered page is still waiting for its lazy chunk would make React
    // throw that part away and render it again (React error 421). A transition
    // waits until hydration has finished instead.
    startTransition(() => {
      setThemeState(readStoredTheme())
      setLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (!loaded) return

    const root = window.document.documentElement

    const applyTheme = (currentTheme: ThemeMode) => {
      let resolvedTheme = currentTheme
      if (currentTheme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }

      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme)
      // Same reason as above: this runs right after hydration for dark mode users.
      startTransition(() => setIsDark(resolvedTheme === 'dark'))
    }

    applyTheme(theme)

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme('system')
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [theme, loaded])

  const setTheme = (next: ThemeMode) => {
    setThemeState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}
