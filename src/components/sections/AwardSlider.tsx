import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AWARDS } from '../../data/Awards'

export function AwardSlider() {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [])

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 380 // Adjusted to match new card size + gap structure
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-24 bg-aeem-focus/5 dark:bg-black/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Layout with Custom Navigation Targets */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-aeem-gold font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              Our Track Record
            </span>
            <h2 className="text-4xl font-black text-aeem-charcoal dark:text-aeem-dark-text tracking-tight">
              Honors & Institutional Recognitions
            </h2>
          </div>
          
          <div className="flex gap-3 self-start">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 border-2 border-gray-300 dark:border-white/10 text-aeem-charcoal dark:text-aeem-dark-text rounded-full hover:border-aeem-gold hover:text-aeem-gold transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 border-2 border-gray-300 dark:border-white/10 text-aeem-charcoal dark:text-aeem-dark-text rounded-full hover:border-aeem-gold hover:text-aeem-gold transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Draggable Viewport Container */}
        <motion.div
          ref={carouselRef}
          className="flex overflow-x-auto gap-8 cursor-grab active:cursor-grabbing scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          <motion.div
            className="flex gap-8 pr-12"
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {AWARDS.map((award, i) => (
              <motion.div
                key={`award-${i}`}
                /* Added group utility, h-[460px] configuration, and relative clip targets */
                className="group relative w-[320px] md:w-[380px] h-[460px] rounded-[2.5rem] overflow-hidden border border-gray-200/10 shadow-2xl snap-start flex-shrink-0 pointer-events-none select-none"
              >
                {/* 1. Background Image Layer with smooth scaling effect */}
                <img
                  src={award.image}
                  alt={award.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* 2. Brand Gradient Mask to protect typography contrast limits */}
                <div className="absolute inset-0 bg-gradient-to-t from-aeem-charcoal via-aeem-charcoal/80 to-black/20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                {/* 3. Text & Node Elements over Image Layout */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between items-stretch">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-widest text-white px-3 py-1 bg-aeem-gold rounded-full shadow-md">
                      {award.year}
                    </span>
                    {award.icon && (
                      <div className="text-aeem-gold p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                        <award.icon size={20} />
                      </div>
                    )}
                  </div>

                  {/* Bottom Text Stack */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-black text-aeem-gold uppercase tracking-widest drop-shadow">
                      {award.issuer}
                    </p>
                    <h3 className="text-2xl font-black text-white leading-tight drop-shadow-md">
                      {award.title}
                    </h3>
                    <p className="text-sm text-gray-200/90 leading-relaxed font-medium line-clamp-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      {award.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}