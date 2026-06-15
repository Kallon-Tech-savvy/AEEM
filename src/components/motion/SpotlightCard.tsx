import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMemo, useState, type ReactNode } from 'react'
import { useReducedMotion } from '../../services/hooks'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
  glowClassName?: string
}

export function SpotlightCard({ children, className = '', glowClassName = '' }: SpotlightCardProps) {
  const reducedMotion = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 140, damping: 16 })

  const style = useMemo(
    () => ({
      transformPerspective: 1200,
      transformStyle: 'preserve-3d' as const,
    }),
    []
  )

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = ((event.clientX - rect.left) / rect.width - 0.5) * 12
    const py = ((event.clientY - rect.top) / rect.height - 0.5) * 12

    setPosition({ x: px, y: py })
    x.set(px)
    y.set(py)
    rotateX.set(-py)
    rotateY.set(px)
  }

  const handleLeave = () => {
    setPosition({ x: 0, y: 0 })
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={reducedMotion ? { rotateX: 0, rotateY: 0, scale: 1 } : { rotateX: rotateX.get(), rotateY: rotateY.get(), scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 140, damping: 16 }}
      style={style}
      className={className}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 ${glowClassName}`}
        style={{
          background: `radial-gradient(240px circle at ${50 + position.x * 2}% ${50 + position.y * 2}%, rgba(212,175,55,0.22), transparent 70%)`,
          opacity: reducedMotion ? 0 : 1,
        }}
      />
      {children}
    </motion.div>
  )
}
