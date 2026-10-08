import { Lightbulb, Shield, TrendingUp, Users } from 'lucide-react'
import { Card, Section } from '../ui'

const approach = [
  { icon: Users, title: 'Advocate', desc: 'For fair quality education and local representation.' },
  { icon: Lightbulb, title: 'Empower', desc: 'Marginalized communities through local leadership.' },
  { icon: TrendingUp, title: 'Build', desc: 'Youth leadership and sustainable mentorship networks.' },
  { icon: Shield, title: 'Support', desc: 'Policy reform and track institutional accountability.' },
]

export default function HomeApproach() {
  return (
    <Section className="bg-white dark:bg-[#15181e]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aeem-blue dark:text-aeem-gold-light">Methodology</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-aeem-ink dark:text-white sm:text-5xl">
          Our Approach to <span className="text-aeem-blue dark:text-aeem-gold-light">Change</span>
        </h2>
        <p className="mt-5 text-lg italic leading-8 text-aeem-ink/65 dark:text-gray-400">
          “Fair access to quality education for every child through community-led action,
          clarity, and care.”
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {approach.map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-aeem-blue text-white dark:bg-aeem-gold dark:text-aeem-ink">
              <Icon size={24} aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-aeem-ink dark:text-white">{title}</h3>
            <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">{desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
