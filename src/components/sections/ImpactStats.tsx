import { Section, Stat } from '../ui'

const stats = [
  {
    value: '120+',
    label: 'Communities reached',
    detail: 'Across 8 African nations',
  },
  {
    value: '1,500',
    label: 'People empowered',
    detail: 'Life-changing opportunities created',
  },
  {
    value: '80',
    label: 'Active mentors',
    detail: 'Professionals giving back',
  },
]

export default function ImpactStats() {
  return (
    <Section id="impact" className="bg-white dark:bg-aeem-charcoal">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aeem-gold">Our Numbers</p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-aeem-ink dark:text-white sm:text-5xl">
          Impacting <span className="text-aeem-gold">Real</span> Lives
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:divide-x sm:divide-black/10 dark:sm:divide-white/10">
        {stats.map((stat) => (
          <Stat
            key={stat.label}
            value={stat.value}
            label={stat.label}
            detail={stat.detail}
            className="px-0 text-center sm:px-8 first:sm:pl-0 last:sm:pr-0"
          />
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
        Program data — verify against the current AEEM reporting period before publication.
      </p>
    </Section>
  )
}
