import React from 'react'
import { motion } from 'framer-motion'
import { partners } from '../../data/Partner'

export function PartnerTicker() {
  // Duplicate array to achieve a seamless loop without gaps
  const dualPartners = [...partners, ...partners]

  return (
    <div className="w-full py-8 bg-aeem-bg dark:bg-aeem-charcoal overflow-hidden border-y border-gray-100 dark:border-white/5 relative">
      {/* Soft gradient edge masking for sleek visual blending */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-aeem-bg dark:from-aeem-charcoal to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-aeem-bg dark:from-aeem-charcoal to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h3 className="text-xs font-black uppercase tracking-[0.25em] text-aeem-gold">
          Trusted Partners
        </h3>
      </div>

      {/* Infinite Scrolling Track Viewport Container */}
      <div className="flex overflow-hidden select-none w-full">
        <motion.div
          /* FIX: w-max guarantees a perfect 50% breakpoint line calculation */
          className="flex flex-nowrap gap-16 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 30, 
            repeat: Infinity,
          }}
        >
          {dualPartners.map((partner, index) => (
            <div
              key={`partner-${index}`}
              /* FIX: shrink-0 ensures elements preserve sizing regardless of viewport */
              className="flex flex-column items-center justify-center shrink-0 h-12 transition-all duration-300"
            >
              {/* Conditional Rendering: Checks if url is an image path or plain text label */}
              {partner.url && (partner.url.includes('/') || partner.url.includes('.')) ? (
                <img 
                  src={partner.url} 
                  alt={partner.name || "Partner Logo"} 
                  width={120}
                  height={48}
                  loading="lazy"
                  className="h-9 w-auto object-contain pointer-events-none select-none"
                  onError={(e) => {
                    // Fallback to text string name if image source fails to resolve
                    e.currentTarget.style.display = 'none'
                    const textFallback = e.currentTarget.nextElementSibling as HTMLElement
                    if (textFallback) textFallback.style.display = 'block'
                  }}
                />
              ) : null}

              <span className="text-xl font-black tracking-tighter text-aeem-charcoal dark:text-aeem-dark-text">
                {partner.name || partner.url}
              </span>
              <span className="text-xs font-bold text-aeem-gold ml-1">.</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}export default PartnerTicker;
