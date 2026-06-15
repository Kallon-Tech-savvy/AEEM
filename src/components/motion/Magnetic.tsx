import { motion } from 'framer-motion'
import { useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { useReducedMotion } from '../../services/hooks'

type MagneticProps = {
  children: ReactNode
  className?: string
  intensity?: number
  disabled?: boolean
}

export function Magnetic({ children, className = '', intensity = 0.18, disabled = false }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reducedMotion = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled || reducedMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) - rect.width / 2) * intensity
    const y = ((event.clientY - rect.top) - rect.height / 2) * intensity

    setOffset({ x, y })
  }

  const handleLeave = () => setOffset({ x: 0, y: 0 })

  const transition = useMemo(
    () => ({ type: 'spring' as const, stiffness: 180, damping: 16, mass: 0.6 }),
    []
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={reducedMotion || disabled ? { x: 0, y: 0, scale: 1 } : { x: offset.x, y: offset.y, scale: 1.02 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
