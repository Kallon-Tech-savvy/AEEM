import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section, Stat } from '../ui'

export default function HomeFeaturedImpact() {
  return (
    <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-aeem-blue/20 bg-aeem-blue dark:border-white/10 lg:grid-cols-2">
          <div className="order-2 flex flex-col justify-center p-8 sm:p-10 lg:order-1 lg:p-14">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold-light">
              Featured impact story
            </p>

            <h2 className="max-w-xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
              I AM SOMEBODY Initiative
            </h2>

            <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/80 md:text-lg">
              Our flagship 2-day empowerment workshop, first implemented in 2025,
              trained 42 participants from six schools, addressing leadership,
              civic awareness, resilience, and public health.
            </p>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-y border-white/15 py-6">
              <Stat value="42" label="Youth" tone="inverse" />
              <Stat value="6" label="Schools" tone="inverse" />
              <Stat value="2" label="Days" tone="inverse" />
            </div>

            <div className="mt-8">
              <Link
                to="/impact/i-am-somebody"
                className="inline-flex items-center gap-2 rounded-xl bg-aeem-gold px-5 py-3 text-sm font-semibold text-aeem-ink transition-colors hover:bg-aeem-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2 focus-visible:ring-offset-aeem-blue"
              >
                Read full report
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="order-1 min-h-[320px] lg:order-2 lg:min-h-[560px]">
            <img
              src="/assets/gallery/Participant_Group_Picture.jpg"
              alt="Participants at the I AM SOMEBODY youth empowerment workshop"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
    </Section>
  )
}
