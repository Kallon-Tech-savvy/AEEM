import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { partners } from '../../data/Partner'
import { Container } from '../ui'

export function PartnerTicker() {
  const shouldReduceMotion = useReducedMotion()
  const dualPartners = [...partners, ...partners]

  return (
    <section
      aria-labelledby="partner-heading"
      className="w-full overflow-hidden border-y border-aeem-ink/10 bg-white dark:border-white/10 dark:bg-aeem-charcoal"
    >
      <Container className="py-8">
        <div className="mb-6">
          <h2
            id="partner-heading"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-blue dark:text-aeem-gold-light"
          >
            Partners & institutional relationships
          </h2>
        </div>

        <div className="overflow-hidden" aria-live="off">
          <motion.div
            className="flex w-max gap-10"
            animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    ease: 'linear',
                    duration: 32,
                    repeat: Infinity,
                  }
            }
          >
            {dualPartners.map((partner, index) => (
              <div
                key={`partner-${partner.name}-${index}`}
                className="flex h-16 min-w-[150px] shrink-0 items-center gap-3 border-r border-aeem-ink/10 pr-10 last:border-r-0 dark:border-white/10"
              >
                {partner.url ? (
                  <img
                    src={partner.url}
                    alt=""
                    width={72}
                    height={48}
                    loading="lazy"
                    className="h-10 w-14 shrink-0 object-contain"
                  />
                ) : null}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-aeem-ink dark:text-white">
                    {partner.name}
                  </p>
                  {partner.sub ? (
                    <p className="mt-0.5 max-w-[150px] truncate text-xs text-aeem-ink/55 dark:text-white/50">
                      {partner.sub}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default PartnerTicker
