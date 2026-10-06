import { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
import Hero from '../components/sections/Hero'
import HomeProblem from '../components/sections/HomeProblem'
import HomeApproach from '../components/sections/HomeApproach'
import HomeFeaturedImpact from '../components/sections/HomeFeaturedImpact'

const ImpactStats = lazy(() => import('../components/sections/ImpactStats'))
const PartnerTicker = lazy(() => import('../components/sections/PartnerTicker'))
const Pillars = lazy(() => import('../components/sections/Pillars'))
const AwardSlider = lazy(() => import('../components/sections/AwardSlider'))

const ctaLink =
  'inline-flex min-h-12 items-center justify-center rounded-xl border px-6 text-base font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AEEM | Empowering the Future of Africa through Education</title>
        <meta
          name="description"
          content="Africa Education Empowerment Movement (AEEM) is a youth-led nonprofit bridging educational barriers in Africa through advocacy, mentorship, and community-led action."
        />
        <link rel="canonical" href={getCanonical('/')} />
      </Helmet>

      <Hero />
      <HomeProblem />

      <Suspense fallback={<div className="h-56 w-full bg-white dark:bg-aeem-charcoal" />}>
        <ImpactStats />
      </Suspense>

      <HomeApproach />
      <HomeFeaturedImpact />

      <Suspense fallback={<div className="min-h-[400px] w-full bg-aeem-cream dark:bg-[#0f1115]" />}>
        <AwardSlider />
        <PartnerTicker />
        <Pillars />
      </Suspense>

      <Section className="bg-aeem-cream text-center dark:bg-aeem-charcoal">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aeem-gold">Get involved</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-aeem-ink dark:text-white sm:text-5xl">
            Help build a future where every child can learn, lead and thrive.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-aeem-ink/70 dark:text-gray-400">
            Join AEEM as a volunteer, partner, advocate, mentor, or supporter.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/get-involved"
              className={`${ctaLink} border-aeem-forest bg-aeem-forest text-white hover:border-aeem-forest-dark hover:bg-aeem-forest-dark`}
            >
              Join the Movement <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className={`${ctaLink} border-aeem-forest bg-transparent text-aeem-forest hover:bg-aeem-forest/5 dark:border-aeem-gold dark:text-aeem-gold dark:hover:bg-aeem-gold/10`}
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
