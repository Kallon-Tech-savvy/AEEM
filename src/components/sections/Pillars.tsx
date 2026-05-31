import { motion } from 'framer-motion'
import { GraduationCap, Users, ShieldCheck, Globe } from 'lucide-react'

const pillars = [
  { icon: GraduationCap, title: 'Inclusive Education', desc: 'Ensuring every child, regardless of background, has access to quality learning.' },
  { icon: Users, title: 'Community Mentorship', desc: 'Connecting local experts with youth to foster practical skills and guidance.' },
  { icon: ShieldCheck, title: 'Equitable Access', desc: 'Removing systemic barriers that hinder educational progress in underserved areas.' },
  { icon: Globe, title: 'Global Reach', desc: 'Scaling our local successes to create a continent-wide movement.' },
]

export default function Pillars() {
  return (
    <section id="initiatives" className="py-24 dark:bg-aeem-charcoal bg-aeem-bg text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black mb-6 tracking-tight">Our Strategic <span className="text-aeem-gold">Pillars</span></h2>
            <p className="text-aeem-charcoal dark:text-white text-lg mb-12">Building a sustainable foundation for educational empowerment across Africa.</p>
            <div className="space-y-8">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 group"
                >
                  <div className="w-14 h-14 shrink-0 dark:bg-white/5 bg-aeem-charcoal/70 rounded-2xl flex items-center justify-center group-hover:bg-aeem-gold group-hover:text-aeem-charcoal transition-all">
                    <p.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{p.title}</h4>
                    <p className="text-aeem-charcoal/80 dark:text-white/80 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square bg-aeem-focus/20 dark:bg-aeem-gold/10 rounded-full blur-3xl absolute -inset-10 animate-pulse" />
             <div className="relative z-10 grid grid-cols-3 gap-4">
                <div className="space-y-4 pt-12">
                   <div className="h-64 bg-white/5 rounded-3xl overflow-hidden border dark:border-white/10 group">
                      <img src="/assets/gallery/Mage_Award.jpg" alt="AEEM Award Ceremony" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                   <div className="h-48 bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
                      <img src="/assets/gallery/Girls_Fram.jpg" alt="Empowered girls in a classroom" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="h-48 bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
                      <img src="/assets/gallery/Boys_Fram.jpg" alt="Students collaborating on a project" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                   <div className="h-64 bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
                      <img src="/assets/gallery/Activity.jpg" alt="Community educational activity" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                </div>
                <div className="space-y-4 pt-12">
                   <div className="h-48 bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
                      <img src="../../../public/assets/gallery/AEEMTEAM_Photo.jpg" alt="Students collaborating on a project" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                   <div className="h-64 bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
                      <img src="../../../public/assets/gallery/AEEM.jpg" alt="Community educational activity" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
