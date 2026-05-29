import { motion } from 'framer-motion'

const stats = [
  { label: 'Communities Reached', value: '150+', color: 'text-aeem-gold' },
  { label: 'Scholarships Awarded', value: '2.5k', color: 'text-aeem-charcoal' },
  { label: 'Training Centers', value: '12', color: 'text-aeem-gold' },
  { label: 'Active Mentors', value: '480', color: 'text-aeem-charcoal' },
]

export default function ImpactStats() {
  return (
    <section id="impact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className={`text-5xl md:text-6xl font-black mb-2 ${stat.color}`}>{stat.value}</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
