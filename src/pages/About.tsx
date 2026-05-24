import { Button } from '../components/Button'
import FeatureCard from '../components/FeatureCard'
import ImpactBadge from '../components/ImpactBadge'
import SectionHeader from '../components/SectionHeader'
import PartnerStrip from '../components/PartnerStrip'
import { AEEM_MISSION_TEXT } from '../constants/copy'
import MasonryLayout from '../components/MasonryLayout'
import BrutalistMedia from '../components/BrutalistMedia'

export type Accent = 'gold' | 'jade' | 'berry'

const metrics = [
  { value: '400+', label: 'Learners reached' },
  { value: '8', label: 'Community partners' },
  { value: '82%', label: 'Stakeholder confidence' },
  { value: '4', label: 'Focused access layers' },
]

const pillars = [
  {
    title: 'Fair Access to Quality Education',
    description: "Eliminate barriers to education, bringing fair access to quality education as every child's right.",
  },
  {
    title: 'Skills and Self-Empowerment',
    description: 'Give youth the space and training to build their own tools for leadership, governance, and industry.',
  },
  {
    title: 'Educational Advocacy',
    description: 'Drive policy reforms that are truly beneficial to children and youth.',
  },
  {
    title: 'Gender Equity and Equality',
    description: 'Empower women and girls to access quality education and lead in their communities.',
  },
]

const spotlights: { title: string; description: string; accent: Accent }[] = [
  {
    title: 'Immersive Experience Programs',
    description:
      'Programs where youth and adolescents immerse themselves to experience the pain points and feelings of those affected, learning how to spot, prevent, and respond to common challenges.',
    accent: 'berry',
  },
  {
    title: 'Mentorship Programs',
    description:
      'We invite the most experienced subject matter experts to guide adolescents and youth on career paths, governance, industry, and creative craftsmanship.',
    accent: 'gold',
  },
  {
    title: 'Youth Summits and Awards',
    description:
      'We gather youth for collaborations, ideations, and recognitions — discussing the most pressing problems affecting young people.',
    accent: 'jade',
  },
]

export default function About() {
  return (
    <main className="site-canvas-dark">
      {/* ================= HERO SECTION ================= */}
      <header className='hero-panel premium-editorial-grid' aria-label="Introduction">
        <div className='hero-copy fade-in-up'>
          <p className='label-caps'>Africa Education Empowerment Movement</p>
          <h1 className='cinematic-headline'>
            Transforming lives and transforming every child's <span className='editorial-text'>right to learn.</span>
          </h1>
          <p className='hero-text'>{AEEM_MISSION_TEXT}</p>
          <div className='hero-actions'>
            <Button variant='primary' as='a' href='/about'>About</Button>
            <Button variant='secondary' as='a' href='#impact'>See impact</Button>
          </div>
        </div>

        <div className='hero-patterns structural-glow' aria-hidden='true'>
          <div className='hero-geometry hero-geometry--small' />
          <div className='hero-geometry hero-geometry--large' />
        </div>
      </header>

      <section className='hero-metrics bento-impact-strip' id='impact' aria-label='AEEM snapshot stats'>
        {metrics.map((metric) => (
          <ImpactBadge key={metric.label} value={metric.value} label={metric.label} />
        ))}
      </section>

      <BrutalistMedia label='I AM SOMEBODY' metadata='Activity photo' src={'../../public/media/Activity.jpg'} alt={''} />
      <section className='section-block spotlight-block overlay-mesh'>
        <SectionHeader
          title='Feel the movement in every detail'
          description='We are impacting change, creating a new way for African youth to lead and take responsibility.'
        />
        <div className='spotlight-overlays' aria-hidden='true'>
          <div className='spotlight-wave'></div>
        </div>
        <div className='spotlight-media visual-frame' aria-hidden='true'>
          <div className='spotlight-grid-shape'></div>
        </div>
        <div className='spotlight-grid dynamic-luxury-cards'>
          {spotlights.map((spotlight) => (
            <FeatureCard
              key={spotlight.title}
              title={spotlight.title}
              description={spotlight.description}
              accent={spotlight.accent}
            />
          ))}
        </div>
      </section>

      <MasonryLayout />

      <section className='section-block structural-alignment-zone alignment-minimal'>
        <SectionHeader
          title='Key Areas'
          description='We address these core areas through stakeholder engagements, advocating for reforms, and facilitating programs to ensure year-round impact for beneficiaries.'
        />
        <div className='cards-grid dynamic-luxury-cards'>
          {pillars.map((pillar) => (
            <article key={pillar.title} className='info-card glass-premium-card micro-glow-interaction'>
              <h3 className='card-title-editorial'>{pillar.title}</h3>
              <p className='card-text-muted'>{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <PartnerStrip />
    </main>
  )
}