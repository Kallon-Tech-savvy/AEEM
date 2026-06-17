import React, { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Lightbulb, TrendingUp, Shield } from 'lucide-react'
import { getCanonical } from '../lib/seo'

// Lazy-load non-critical home sections for faster LCP on the hero
const ImpactStats   = lazy(() => import('../components/sections/ImpactStats'))
const PartnerTicker = lazy(() => import('../components/sections/PartnerTicker'))
const Pillars       = lazy(() => import('../components/sections/Pillars'))
const AwardSlider   = lazy(() => import('../components/sections/AwardSlider'))

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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-4 overflow-hidden bg-white dark:bg-aeem-charcoal">
        {/* Background glow effects */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-aeem-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aeem-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="hero-animate">
            <span className="inline-block py-2 px-6 rounded-full bg-aeem-gold/10 text-aeem-gold font-bold uppercase tracking-[0.4em] text-xs mb-8 border border-aeem-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              Welcome to the Movement
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tight text-aeem-charcoal dark:text-white drop-shadow-sm">
              Empowering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeem-gold via-yellow-400 to-aeem-gold bg-[length:200%_auto] animate-shimmer drop-shadow-md">Africa's</span> <br />
              Scholars.
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-xl leading-relaxed font-medium">
              We are a youth-led movement dedicated to expanding access to quality education
              across Africa through advocacy, mentorship, and community-led empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                to="/about"
                className="group px-8 py-4 bg-aeem-charcoal dark:bg-aeem-gold text-white dark:text-aeem-charcoal rounded-full font-black hover:bg-aeem-gold dark:hover:bg-white transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg"
              >
                Our Mission <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/get-involved"
                className="px-8 py-4 bg-white dark:bg-white/5 backdrop-blur-md border-2 border-gray-200 dark:border-white/10 text-aeem-charcoal dark:text-white rounded-full font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-all hover:scale-105 active:scale-95 text-lg"
              >
                Get Involved
              </Link>
            </div>
          </div>

             <div className="relative ">
               <picture>
                  <source
                    type="image/avif"
                    srcSet={`/assets/Illustrate-africa.avif `}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={`/assets/Illustrate-africa.webp`}
                    sizes="(min-width: 1024px) 40vw, 90vw"
                  />
                  <img
                    src="/assets/Illustrate-africa.jpg"
                    alt="AEEM Award Illustration"
                    className="w-full h-full object-cover"
                  />
               </picture>
             </div>
          </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-[#0f1115] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-aeem-charcoal dark:text-white leading-tight">
                Bridging the Gap in <br />
                <span className="text-aeem-gold">Educational Access</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                Africa's potential is its youth. Yet millions face systemic barriers to quality
                education. AEEM works at the intersection of policy advocacy and grassroots
                action to ensure every child has the tools to succeed.
              </p>
              <div className="space-y-4">
                {['Direct Community Empowerment', 'Educational Policy Advocacy', 'Youth Leadership Training'].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/10 flex items-center justify-center text-aeem-gold flex-shrink-0">
                      <Shield size={18} />
                    </div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative h-full min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-aeem-gold/20 to-transparent rounded-[3rem] -rotate-3 scale-105 z-0" />
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/assets/gallery/Image.webp `}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
                <img
                  src="/assets/gallery/Image.jpg"
                  alt="Students in a classroom"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative z-10"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-50 dark:bg-[#0f1115]" />}>
        <ImpactStats />
      </Suspense>

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

      <section className="py-24 bg-gray-50 dark:bg-[#0f1115]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#1a1d24] to-black rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative border border-white/10">
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
                <picture>
                  <source
                    type="image/avif"
                    srcSet={`/assets/gallery/Participant_Group_Picture.avif`}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <source
                    type="image/webp"
                    srcSet={`/assets/gallery/Participant_Group_Picture.webp`}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <img
                    src="/assets/gallery/Participant_Group_Picture.jpg"
                    alt="Youth empowerment workshop"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
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
