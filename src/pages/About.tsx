import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Target, Heart, Eye } from 'lucide-react'
import MosaicGallery from '../components/sections/MasonryGallery'
import { getCanonical, SITE_URL } from '../lib/seo'
import { partners } from '../data/Partner'
import { Section, Card } from '../components/ui'

const leadershipTeam = [
  { name: 'Patrick P Williams', title: 'Chief Executive Officer', image: '/assets/gallery/CEO.jpg', fileName: 'CEO' },
  { name: 'Ann Ambrose', title: 'Executive Director', image: '/assets/gallery/ED.jpg', fileName: 'ED' },
  { name: 'Alhaji C. M. Kallon', title: 'Chief Operating Officer', image: '/assets/gallery/COO.jpg', fileName: 'COO' },
  { name: 'Chrispin Vandi', title: 'Secretary General', image: '/assets/gallery/SG.jpg', fileName: 'SG' },
]

const purpose = [
  { icon: Target, title: 'Our Mission', text: 'To expand access to quality education across Africa through advocacy, community empowerment, and accountable action.' },
  { icon: Eye, title: 'Our Vision', text: 'A continent where every child, regardless of their background, has the resources and support to achieve their educational dreams.' },
  { icon: Heart, title: 'Our Values', text: 'Integrity, inclusivity, community-led change, and radical transparency in everything we do.' },
]

const About: React.FC = () => (
  <>
    <Helmet>
      <title>About AEEM | Our Mission, Values & Leadership</title>
      <meta name="description" content="Learn about the Africa Education Empowerment Movement, our mission, values, leadership, and work to advance educational equity." />
      <link rel="canonical" href={getCanonical('/about')} />
      <meta property="og:title" content="About AEEM | Our Mission, Values & Leadership" />
      <meta property="og:description" content="Learn about the Africa Education Empowerment Movement, our mission, values, leadership, and work." />
      <meta property="og:url" content={getCanonical('/about')} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${SITE_URL}/assets/logo_converted.avif`} />
    </Helmet>

    <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-aeem-gold">Who we are</p>
        <h1 className="text-4xl font-extrabold leading-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">
          A youth-led movement working toward educational equity across Africa.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300 sm:text-xl">
          AEEM is a youth-led movement dedicated to bridging the barriers that prevent quality education from reaching every child in Africa.
        </p>
      </div>
    </Section>

    <Section aria-labelledby="purpose-heading">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aeem-gold">Our purpose</p>
        <h2 id="purpose-heading" className="text-3xl font-bold text-aeem-ink dark:text-white sm:text-4xl">What guides the work</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {purpose.map(({ icon: Icon, title, text }) => (
          <Card key={title} className="p-7 sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-aeem-forest/10 text-aeem-forest dark:bg-aeem-gold/10 dark:text-aeem-gold">
              <Icon size={24} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-aeem-ink dark:text-white">{title}</h3>
            <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">{text}</p>
          </Card>
        ))}
      </div>
    </Section>

    <Section aria-labelledby="approach-heading" className="bg-aeem-forest text-white">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aeem-gold-light">How we work</p>
            <h2 id="approach-heading" className="text-3xl font-bold sm:text-4xl">Community-led action, advocacy, and empowerment.</h2>
          </div>
          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-white/85 sm:text-lg">
            <p>AEEM describes its work through advocacy, community empowerment, and accountable action. These are the practical expressions of its mission to expand access to quality education.</p>
            <p>The work is grounded in the people and communities AEEM serves, with education and mentorship positioned as tools for participation, leadership, and opportunity.</p>
          </div>
        </div>
    </Section>

    <Section aria-labelledby="leadership-heading className="bg-gray-50 dark:bg-[#15181e]">
      <div className="mb-12 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aeem-gold">Leadership</p>
        <h2 id="leadership-heading" className="text-3xl font-bold text-aeem-ink dark:text-white sm:text-4xl">The people responsible for the movement.</h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">AEEM's leadership team provides the organizational direction behind its work.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {leadershipTeam.map((member) => (
          <article key={member.name} className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
            <div className="aspect-[4/5] overflow-hidden bg-gray-200 dark:bg-gray-800">
              <picture>
                <source type="image/webp" srcSet={`/assets/gallery/${member.fileName}.webp`} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                <img src={member.image} alt={member.name} width={360} height={450} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </picture>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-aeem-ink dark:text-white">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-aeem-forest dark:text-aeem-gold-light">{member.title}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>

    <Section aria-labelledby="life-heading">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aeem-gold">Life at AEEM</p>
        <h2 id="life-heading" className="text-3xl font-bold text-aeem-ink dark:text-white sm:text-4xl">The work is carried by people.</h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">Moments from workshops, community gatherings, mentorship, and team sessions show the human side of the movement.</p>
      </div>
      <MosaicGallery />
    </Section>

    <Section aria-labelledby="partners-heading" className="bg-gray-50 dark:bg-[#15181e]">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-aeem-gold">Relationships</p>
        <h2 id="partners-heading" className="text-3xl font-bold text-aeem-ink dark:text-white sm:text-4xl">Partners and institutional relationships</h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">Organizations represented in AEEM's current partner data.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {partners.map((partner) => (
          <div key={partner.name} className="flex min-h-[128px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-5 text-center dark:border-white/10 dark:bg-white/[0.03]">
            <img src={partner.url} alt={`${partner.name} logo`} width={160} height={80} loading="lazy" decoding="async" className="h-16 w-full object-contain opacity-80" />
            <span className="mt-3 text-sm font-semibold text-aeem-ink dark:text-white">{partner.name}</span>
            <span className="mt-1 text-[10px] leading-tight text-gray-500">{partner.sub}</span>
          </div>
        ))}
      </div>
    </Section>
  </>
)

export default About
