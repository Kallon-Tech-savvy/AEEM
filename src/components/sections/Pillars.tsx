import { motion } from 'framer-motion'
import { GraduationCap, Users, ShieldCheck, Globe } from 'lucide-react'
import { Section } from '../ui'

const pillars = [
  { icon: GraduationCap, title: 'Inclusive Education', desc: 'Ensuring every child, regardless of background, has access to quality learning.' },
  { icon: Users, title: 'Community Mentorship', desc: 'Connecting local experts with youth to foster practical skills and guidance.' },
  { icon: ShieldCheck, title: 'Equitable Access', desc: 'Removing systemic barriers that hinder educational progress in underserved areas.' },
  { icon: Globe, title: 'Global Reach', desc: 'Scaling our local successes to create a continent-wide movement.' },
]

export default function Pillars() {
  return (
    <Section
      id="initiatives"
      className="overflow-hidden bg-aeem-cream text-aeem-ink dark:bg-aeem-charcoal dark:text-white"
      spacing="large"
    >
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Strategic <span className="text-aeem-blue dark:text-aeem-gold-light">Pillars</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-aeem-ink/75 dark:text-white/75">
            Building a sustainable foundation for educational empowerment across Africa.
          </p>

          <div className="mt-10 space-y-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                viewport={{ once: true, margin: '-40px' }}
                className="flex gap-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-aeem-forest text-white dark:bg-aeem-gold dark:text-aeem-ink">
                  <pillar.icon size={24} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-1 text-base leading-7 text-aeem-ink/70 dark:text-white/70">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative grid grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-3 pt-10 sm:space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                <img src="/assets/gallery/Mage_Award.jpg" alt="AEEM award ceremony" width={480} height={640} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                <img src="/assets/gallery/Girls_Fram.jpg" alt="Empowered girls in a classroom" width={360} height={480} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                <img src="/assets/gallery/Boys_Fram.jpg" alt="Students collaborating on a project" width={360} height={480} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                <img src="/assets/gallery/Activity.jpg" alt="Community educational activity" width={480} height={640} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="space-y-3 pt-10 sm:space-y-4">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                <img src="/assets/gallery/AEEMTEAM_Photo.jpg" alt="AEEM team members" width={360} height={480} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
                <img src="/assets/gallery/AEEM boy.jpg" alt="Young person participating in an AEEM activity" width={480} height={640} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
