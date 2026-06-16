import { lazy, Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Users, Lightbulb, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Magnetic } from '../components/motion/Magnetic'

// --- Lazy-loaded Components ---
const ImpactStats = lazy(() => import('../components/sections/ImpactStats'))
const Pillars = lazy(() => import('../components/sections/Pillars'))

// Resolving named exports
const AwardSlider = lazy(() => 
  import('../components/sections/AwardSlider').then(m => ({ default: m.AwardSlider }))
)
const PartnerTicker = lazy(() => 
  import('../components/sections/PartnerTicker').then(m => ({ default: m.PartnerTicker }))
)

// --- Mobile optimization hook ---
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}

const MINI_STATS = [
  { val: '8',    label: 'Countries' },
  { val: '120+', label: 'Communities' },
  { val: '1.5k', label: 'People Empowered' },
]

export default function Home() {
  const isDesktop = useIsDesktop()

  return (
    <>
      <Helmet>
        <title>AEEM | Africa Education Empowerment Movement</title>
        <meta
          name="description"
          content="A Youth-led Organization Pioneering inclusive, equitable, and quality education across the continent through community-led action and innovative mentorship."
        />
      </Helmet>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-b from-gray-50 to-gray-200 dark:from-[#111] dark:to-aeem-charcoal relative min-h-screen flex items-center pt-20 overflow-hidden"
      >
        {/* Deep ambient glow behind content (Converted from blur to radial gradient) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-aeem-gold/15 dark:from-aeem-gold/10 to-transparent rounded-full pointer-events-none mix-blend-screen" />

        {/* Dot-grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.2] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
            color: 'var(--aeem-gold)'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-16">

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 text-aeem-gold font-bold uppercase tracking-[0.2em] text-xs mb-6 shadow-sm">
              Youth-Led Movement
            </span>

            <h1 className="text-aeem-charcoal dark:text-white text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tighter drop-shadow-md">
              Empowering the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeem-gold to-yellow-500">Future</span> of Africa
            </h1>

            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-lg mb-10 leading-relaxed font-medium">
              Pioneering inclusive, equitable, and quality education across the
              continent through community-led action and innovative mentorship.
            </p>

            <div className="flex flex-wrap gap-5">
              <Magnetic className="inline-flex">
                <Link
                  to="/impact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-aeem-gold to-yellow-500 text-aeem-charcoal rounded-full font-black hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all active:scale-95"
                >
                  Explore our Impact <ArrowRight size={18} />
                </Link>
              </Magnetic>
              <Magnetic className="inline-flex">
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-white/10 text-aeem-charcoal dark:text-white rounded-full font-bold hover:bg-white dark:hover:bg-white/10 hover:shadow-xl transition-all"
                >
                  Upcoming Events
                </Link>
              </Magnetic>
            </div>

            {/* Elevated Mini stats */}
            <div className="flex  justify-center gap-2 mt-16">
              {MINI_STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="flex-1 bg-white/60 dark:bg-black/30 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-2 md:p-4 shadow-sm text-center"
                >
                  <p className="text-3xl font-black text-aeem-gold drop-shadow-sm">{s.val}</p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest mt-1">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image column - Conditionally rendered via useIsDesktop */}
          {isDesktop && (
            <motion.div
              className="relative flex items-center justify-center perspective-[1000px]"
              initial={{ opacity: 0, scale: 0.90, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Deep back glow (Converted to radial gradients) */}
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-aeem-gold/20 to-transparent rounded-full" />
                <div className="absolute bottom-[20%] right-[20%] w-48 h-48 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-500/10 to-transparent rounded-full" />
              </div>

              {/* Added will-change-transform for hardware acceleration */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full max-w-[650px] mx-auto z-10 will-change-transform"
              >
                <picture>
                  <source srcSet="/assets/Illustrate africa.avif" type="image/avif" />
                  <img
                    src="/assets/Illustrate africa.avif"
                    alt="Africa rising from an open book — education igniting transformation across the continent"
                    className="w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.3)] select-none"
                    width={888}
                    height={941}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    draggable={false}
                  />
                </picture>

                {/* Shadow reflection (Converted to radial gradient) */}
                <div aria-hidden="true" className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-12 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-black/10 dark:from-aeem-gold/5 to-transparent rounded-[100%] pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tag-line strip */}
      <div className="bg-white dark:bg-[#0a0b0d] py-6 border-y border-gray-100 dark:border-white/5 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4">
            {['Youth-led', 'Education Access', 'Community Empowerment', 'Policy Advocacy'].map(
              (text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-aeem-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  <span className="text-gray-500 dark:text-gray-400 text-xs font-black uppercase tracking-[0.2em]">
                    {text}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#0f1115] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/5 p-10 md:p-14 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-aeem-charcoal dark:text-white">
                There are Invisible <span className="text-aeem-gold">Barriers</span> to Education
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 font-medium">
                And too many Youth across Africa are excluded by these barriers that are visible locally
                but invisible institutionally. From physical distance to systemic inequality,
                these obstacles prevent millions from reaching their full potential.
              </p>
              <div className="space-y-6">
                {[
                  'Socio-economic hurdles for marginalized youth',
                  'Lack of local representation in policy',
                  'Inadequate infrastructure and resources',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/10 flex items-center justify-center text-aeem-gold flex-shrink-0">
                      <Shield size={18} />
                    </div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative h-full min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-aeem-gold/20 to-transparent rounded-[3rem] -rotate-3 scale-105 z-0" />
              <img
                src="/assets/gallery/Image.jpg"
                alt="Students in a classroom"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-50 dark:bg-[#0f1115]" />}>
        <ImpactStats />
      </Suspense>

      {/* What AEEM Does (3D Cards) */}
      <section className="py-24 bg-white dark:bg-[#15181e] relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-gray-50 dark:from-[#0f1115] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block py-1.5 px-4 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-6">
              Methodology
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-aeem-charcoal dark:text-white">
              Our Approach to <span className="text-aeem-gold">Change</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 italic font-medium">
              "Fair access to quality education for every child through community-led action,
              clarity, and care."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users,     title: 'Advocate', desc: 'For fair quality education and local representation.' },
              { icon: Lightbulb, title: 'Empower',  desc: 'Marginalized communities through local leadership.' },
              { icon: TrendingUp,title: 'Build',    desc: 'Youth leadership and sustainable mentorship networks.' },
              { icon: Shield,    title: 'Support',  desc: 'Policy reform and track institutional accountability.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-[#1a1d24] p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/5 hover:border-aeem-gold/30 transition-all group relative overflow-hidden"
              >
                {/* Converted to radial gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-aeem-gold/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="w-16 h-16 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-aeem-gold mb-8 shadow-inner group-hover:bg-aeem-gold group-hover:text-white transition-colors duration-500">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-black mb-4 text-aeem-charcoal dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Impact */}
      <section className="py-24 bg-gray-50 dark:bg-[#0f1115]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#1a1d24] to-black rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative border border-white/10">
            {/* Ambient inner glow (Converted to radial gradient) */}
            <div className="absolute top-0 right-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-aeem-gold/10 to-transparent rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
              <div className="p-12 md:p-20 flex flex-col justify-center">
                <span className="inline-block w-max py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-aeem-gold font-bold uppercase tracking-[0.2em] text-xs mb-8">
                  Featured Case Study
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight drop-shadow-md">
                  I AM SOMEBODY <br />Initiative
                </h2>
                <p className="text-gray-300 text-lg mb-12 leading-relaxed font-medium">
                  Our flagship 2-day empowerment workshop for the first time implemented in 2025,
                  trained 42 participants from six schools, addressing leadership, civic awareness,
                  resilience, and public health.
                </p>
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                    <div className="text-3xl font-black text-white mb-1">42</div>
                    <div className="text-[8px] md:text-[10px] text-aeem-gold uppercase font-bold tracking-widest">Youth</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                    <div className="text-3xl font-black text-white mb-1">6</div>
                    <div className="text-[8px] md:text-[10px] text-aeem-gold uppercase font-bold tracking-widest">Schools</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
                    <div className="text-3xl font-black text-white mb-1">2</div>
                    <div className="text-[8px] md:text-[10px] text-aeem-gold uppercase font-bold tracking-widest">Days</div>
                  </div>
                </div>
                <Link
                  to="/impact/i-am-somebody"
                  className="group flex w-max items-center gap-3 px-6 py-3 bg-aeem-gold text-aeem-charcoal rounded-full font-bold hover:bg-white transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)]"
                >
                  Read Full Report{' '}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="relative h-[400px] lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1d24] via-transparent to-transparent z-10 hidden lg:block" />
                <img
                  src="/assets/gallery/Participant_Group_Picture.jpg"
                  alt="Youth empowerment workshop"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grouped Suspense blocks to avoid sequential flashes */}
      <Suspense fallback={<div className="min-h-[400px] w-full animate-pulse bg-gray-50/50 dark:bg-[#0f1115]/50" />}>
        <AwardSlider />
        <PartnerTicker />
        <Pillars />
      </Suspense>

      {/* Global CTA */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 dark:from-[#0f1115] dark:to-[#1a1d24] relative overflow-hidden">
        {/* Converted to radial gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-aeem-gold/10 to-transparent rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-aeem-charcoal dark:text-white mb-10 drop-shadow-sm">
            Ready to make a <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeem-gold to-yellow-500">difference?</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link
              to="/get-involved"
              className="px-10 py-5 bg-gradient-to-r from-aeem-gold to-yellow-500 text-aeem-charcoal rounded-full font-black hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 transition-all active:scale-95 text-lg"
            >
              Join the Movement
            </Link>
            <Link
              to="/contact"
              className="px-10 py-5 bg-white dark:bg-white/5 backdrop-blur-md border-2 border-gray-200 dark:border-white/10 text-aeem-charcoal dark:text-white rounded-full font-bold hover:bg-gray-50 dark:hover:bg-white/10 hover:shadow-xl transition-all active:scale-95 text-lg"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
