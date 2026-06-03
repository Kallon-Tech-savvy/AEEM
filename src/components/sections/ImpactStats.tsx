import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Stat {
  label: string
  numericValue: number
  suffix: string
  prefix?: string
  color: string
  description: string
}

const stats: Stat[] = [
  {
    label: 'Communities Reached',
    numericValue: 120,
    suffix: '+',
    color: 'text-aeem-gold',
    description: 'Across 8 African nations',
  },
  {
    label: 'Scholarships Awarded',
    numericValue: 2500,
    suffix: '',
    prefix: '',
    color: 'text-aeem-charcoal dark:text-white/80',
    description: 'Life-changing opportunities created',
  },
  {
    label: 'Active Mentors',
    numericValue: 480,
    suffix: '',
    color: 'text-aeem-charcoal dark:text-white/80',
    description: 'Professionals giving back',
  },
]

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k'
  return String(n)
}

function AnimatedStat({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * stat.numericValue))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, stat.numericValue])

  const displayValue = formatNumber(count)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      viewport={{ once: true }}
      className="group text-center relative"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl bg-aeem-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105" />

      <div className="relative py-8 px-4">
        <h3 className={`text-6xl md:text-7xl font-black mb-1 tabular-nums leading-none ${stat.color}`}>
          {stat.prefix}{displayValue}{stat.suffix}
        </h3>

        <div className="w-8 h-0.5 bg-aeem-gold/30 mx-auto my-4 group-hover:w-16 transition-all duration-500" />

        <p className="text-sm font-black uppercase tracking-widest text-gray-600 mb-2">
          {stat.label}
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">{stat.description}</p>
      </div>
    </motion.div>
  )
}

export default function ImpactStats() {
  return (
    <section id="impact" className="py-24 bg-aeem relative overflow-hidden">
      <div className="absolute bottom-[1%] w-full h-full opacity-[0.1] dark:opacity-[0.08] pointer-events-none z-10 mix-blend-luminosity select-none transition-opacity duration-300">
        <img 
          src="/assets/Illustrate africa.png" 
          alt="" 
          className="w-full h-full center object-contain object-left-bottom"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            Our Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-aeem-charcoal dark:text-white">
            Impacting <span className="text-aeem-gold">Real</span> Lives
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-0 md:divide-x divide-gray-200 dark:divide-zinc-800 transition-colors duration-300">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}