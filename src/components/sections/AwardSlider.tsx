import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AWARDS } from '../../data/Awards'
import { Section } from '../ui'

export function AwardSlider() {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(Math.max(0, carouselRef.current.scrollWidth - carouselRef.current.offsetWidth))
    }
  }, [])

  const handleScroll = (direction: 'left' | 'right') => {
    carouselRef.current?.scrollBy({
      left: direction === 'left' ? -380 : 380,
      behavior: 'smooth',
    })
  }

  return (
    <Section spacing="default" className="overflow-hidden bg-aeem-cream dark:bg-aeem-charcoal">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold">
              Institutional recognition
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-aeem-ink dark:text-white md:text-4xl">
              Honours & Institutional Recognitions
            </h2>
          </div>

          <div className="flex gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-aeem-ink/20 text-aeem-ink transition-colors hover:border-aeem-forest hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:border-white/20 dark:text-white dark:hover:border-aeem-gold dark:hover:text-aeem-gold"
              aria-label="Scroll recognitions left"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-aeem-ink/20 text-aeem-ink transition-colors hover:border-aeem-forest hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:border-white/20 dark:text-white dark:hover:border-aeem-gold dark:hover:text-aeem-gold"
              aria-label="Scroll recognitions right"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
          aria-label="AEEM institutional recognitions"
        >
          <motion.div
            className="flex shrink-0 gap-5 pr-5"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {AWARDS.map((award, i) => (
              <article
                key={`award-${i}`}
                className="relative flex h-[420px] w-[300px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-aeem-forest shadow-sm md:w-[340px]"
              >
                <img
                  src={award.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aeem-ink via-aeem-ink/65 to-transparent" aria-hidden="true" />

                <div className="relative z-10 p-7 text-white">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-lg bg-aeem-gold px-3 py-1 text-xs font-semibold tracking-wide text-aeem-ink">
                      {award.year}
                    </span>
                    {award.icon ? (
                      <div className="text-aeem-gold" aria-hidden="true">
                        <award.icon size={20} />
                      </div>
                    ) : null}
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-aeem-gold-light">
                    {award.issuer}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold leading-tight">
                    {award.title}
                  </h3>
                  {award.desc ? (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/75">
                      {award.desc}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </motion.div>
        </div>
    </Section>
  )
}

export default AwardSlider
