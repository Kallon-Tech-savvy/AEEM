import React from 'react'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Briefcase, FileText, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, Card, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'

const PressKit: React.FC = () => (
  <>
    <Helmet>
      <title>Press Kit | AEEM</title>
      <meta name="description" content="AEEM media resources, organizational information, brand assets, and contact information for journalists and partners." />
      <link rel="canonical" href={getCanonical('/press-kit')} />
      <meta property="og:title" content="Press Kit | AEEM" />
      <meta property="og:description" content="Media resources, organizational information, brand assets, and contact information for AEEM." />
      <meta property="og:url" content={getCanonical('/press-kit')} />
    </Helmet>

    <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
      <div className="max-w-3xl">
        <Badge>Media resources</Badge>
        <h1 className="mt-5 text-4xl font-bold leading-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">Press resources for understanding AEEM.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-ink/70 dark:text-white/70">
          Use this page as a starting point for organizational context, approved visual identity assets, and media inquiries.
        </p>
      </div>
    </Section>

    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-gold">Organization</p>
          <h2 className="mt-3 text-2xl font-bold text-aeem-ink dark:text-white sm:text-3xl">Start with the facts.</h2>
          <p className="mt-4 max-w-xl leading-7 text-aeem-ink/70 dark:text-white/70">
            For current organizational information, programs, impact evidence, and leadership context, use the primary pages on this site. Downloadable briefing and fact-sheet files are not currently published in the repository, so this page does not present placeholder download buttons.
          </p>
          <div className="mt-7 space-y-3">
            <Link to="/about" className="flex items-center justify-between rounded-2xl border border-black/10 p-5 text-aeem-ink transition-colors hover:border-aeem-forest dark:border-white/10 dark:text-white dark:hover:border-aeem-gold">
              <span className="flex items-center gap-4"><Briefcase size={20} aria-hidden="true" /><span><span className="block font-semibold">About AEEM</span><span className="text-sm text-aeem-ink/60 dark:text-white/60">Mission, values, leadership, and relationships.</span></span></span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/impact" className="flex items-center justify-between rounded-2xl border border-black/10 p-5 text-aeem-ink transition-colors hover:border-aeem-forest dark:border-white/10 dark:text-white dark:hover:border-aeem-gold">
              <span className="flex items-center gap-4"><FileText size={20} aria-hidden="true" /><span><span className="block font-semibold">Impact and evidence</span><span className="text-sm text-aeem-ink/60 dark:text-white/60">Programs, stories, and reported outcomes.</span></span></span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-aeem-forest/5 text-aeem-forest dark:bg-aeem-gold/10 dark:text-aeem-gold-light"><ImageIcon size={21} aria-hidden="true" /></div>
            <div>
              <h2 className="text-xl font-bold text-aeem-ink dark:text-white">Brand assets</h2>
              <p className="mt-2 text-sm leading-6 text-aeem-ink/65 dark:text-white/65">The current AEEM logo is available directly from the site. Additional packaged logo formats should be published here only when an authoritative asset pack exists.</p>
              <a href="/assets/AEEM_logo.png" download className="mt-5 inline-flex items-center rounded-xl bg-aeem-forest px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus">
                Download current logo
              </a>
            </div>
          </div>
        </Card>
      </div>
    </Section>

    <Section className="bg-aeem-forest text-white">
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-gold-light">Media inquiries</p>
          <h2 className="mt-3 text-3xl font-bold">Need an interview, statement, or additional material?</h2>
          <p className="mt-4 leading-7 text-white/75">Contact AEEM directly and explain what you need, your deadline, and the context in which the material will be used.</p>
        </div>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-aeem-forest hover:bg-aeem-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">Contact AEEM <ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </Section>
  </>
)

export default PressKit
