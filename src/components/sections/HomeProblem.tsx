import { Shield } from 'lucide-react'
import { Section } from '../ui'

const points = [
  'Direct community empowerment',
  'Educational policy advocacy',
  'Youth leadership training',
]

export default function HomeProblem() {
  return (
    <Section className="bg-aeem-cream dark:bg-[#0f1115]">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aeem-gold">The challenge</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-aeem-ink dark:text-white sm:text-5xl">
            Bridging the Gap in <span className="text-aeem-gold">Educational Access</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-aeem-ink/70 dark:text-gray-400">
            Africa's potential is its youth. Yet millions face systemic barriers to quality
            education. AEEM works at the intersection of policy advocacy and grassroots
            action to ensure every child has the tools to succeed.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-base font-semibold text-aeem-ink dark:text-gray-300">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white text-aeem-gold dark:border-white/10 dark:bg-white/5">
                  <Shield size={17} aria-hidden="true" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          <picture>
            <source type="image/webp" srcSet="/assets/gallery/Image.webp" />
            <img
              src="/assets/gallery/Image.jpg"
              alt="Students in a classroom"
              width={960}
              height={720}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </picture>
        </div>
      </div>
    </Section>
  )
}
