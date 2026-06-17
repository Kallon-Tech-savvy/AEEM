/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'aeem-theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system'
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? 'system'
  })

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (currentTheme: ThemeMode) => {
      let resolvedTheme = currentTheme
      if (currentTheme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }

      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme)
      setIsDark(resolvedTheme === 'dark')
    }

    applyTheme(theme)

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme('system')
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    }
  }, [theme])

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
