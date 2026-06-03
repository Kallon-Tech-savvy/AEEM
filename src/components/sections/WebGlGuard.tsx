import { useState, useEffect, ReactNode } from 'react'

interface WebGLGuardProps {
  children: ReactNode
  fallback: ReactNode
}

export function WebGLGuard({ children, fallback }: WebGLGuardProps) {
  const [isSupported, setIsSupported] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const support = !!(
        window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
      setIsSupported(support)
    } catch {
      setIsSupported(false)
    }
  }, [])

  // Avoid flashing while checking
  if (isSupported === null) return null 

  return isSupported ? <>{children}</> : <>{fallback}</>
}