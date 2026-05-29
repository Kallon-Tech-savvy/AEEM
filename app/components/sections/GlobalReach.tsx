'use client'

import { motion } from 'framer-motion'

export function GlobalReach() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-safe text-center">
        <h2 className="text-5xl font-black mb-4">Expanding our <span className="text-aeem-gold">Footprint</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg">From West Africa to the entire continent, we are building bridges to better futures.</p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="h-[600px] w-full bg-gradient-to-br from-aeem-gold/20 to-aeem-charcoal/10 rounded-[3rem] flex items-center justify-center"
        >
          <div className="text-center bg-white/50 backdrop-blur-md p-10 rounded-full border border-white/20">
            <p className="text-7xl font-black text-aeem-charcoal">24</p>
            <p className="text-sm font-bold uppercase tracking-widest text-aeem-gold">Countries reached</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
