import { motion } from 'framer-motion'
import { ArrowRight, Shield, Users, Lightbulb, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/sections/Hero'
import ImpactStats from '../components/sections/ImpactStats'
import Pillars from '../components/sections/Pillars'
import GlobalReach from '../components/sections/GlobalReach'
import { WebGLGuard } from '../components/sections/WebGlGuard'
import { AwardSlider } from '../components/sections/AwardSlider'
import { PartnerTicker } from '../components/sections/PartnerSlide'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AEEM | Africa education Empowerment Movement</title>
        <meta name="description" content="A Youth-led Organization Pioneering inclusive, equitable, and quality education across the continent through community-led action and innovative mentorship." />
      </Helmet>
      <Hero />
      <div className="bg-aeem-bg dark:bg-aeem-charcoal py-8 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4">
            {['Youth-led', 'Education Access', 'Community Empowerment', 'Policy Advocacy'].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-aeem-gold rounded-full" />
                <span className="text-aeem-charcoal dark:text-white/60 text-xs font-bold uppercase tracking-widest">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <section className="py-24 bg-white dark:bg-aeem-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-aeem-charcoal dark:text-white">
                The Invisible <span className="text-aeem-gold">Barriers</span> to Education
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Too many Youth across Africa are excluded by barriers that are visible locally but invisible institutionally. From physical distance to systemic inequality, these obstacles prevent millions from reaching their full potential.
              </p>
              <div className="space-y-4">
                {[
                  "Lack of local representation in policy",
                  "Inadequate infrastructure and resources",
                  "Socio-economic hurdles for marginalized youth"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-aeem-gold/20 flex items-center justify-center text-aeem-gold">
                       <Shield size={14} />
                    </div>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-gray-100 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative z-10">
                 <img
                   src="/assets/gallery/Image.jpg"
                   alt="Students in a classroom"
                   className="w-full h-full object-cover"
                 />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-aeem-gold/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-aeem-gold/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      <ImpactStats />

      {/* What AEEM Does */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-aeem-charcoal dark:text-white">Our Approach to <span className="text-aeem-gold">Change</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 italic">"Fair access to quality education for every child through community-led action, clarity, and care."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Advocate", desc: "For fair quality education and local representation." },
              { icon: Lightbulb, title: "Empower", desc: "Marginalized communities through local leadership." },
              { icon: TrendingUp, title: "Build", desc: "Youth leadership and sustainable mentorship networks." },
              { icon: Shield, title: "Support", desc: "Policy reform and track institutional accountability." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-black/20 transition-all group"
              >
                <div className="w-14 h-14 bg-aeem-gold/10 rounded-xl flex items-center justify-center text-aeem-gold mb-6 group-hover:bg-aeem-gold group-hover:text-white transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-aeem-charcoal dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Impact - I AM SOMEBODY */}
      <section className="py-24 bg-aeem-focus/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-aeem-charcoal dark:bg-aeem-focus/30 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <span className="text-aeem-gold font-bold uppercase tracking-widest text-xs mb-4">Featured Impact</span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  I AM SOMEBODY <br/>Initiative
                </h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                  Our flagship 2-day empowerment workshop for the first time implemented in 2025, trained 42 participants from six schools, addressing leadership, civic awareness, resilience, and public health.
                </p>
                <div className="grid grid-cols-3 gap-8 mb-12">
                   <div>
                      <div className="text-3xl font-black text-white mb-1">42</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Participants</div>
                   </div>
                   <div>
                      <div className="text-3xl font-black text-white mb-1">6</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Schools</div>
                   </div>
                   <div>
                      <div className="text-3xl font-black text-white mb-1">2</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Day Workshop</div>
                   </div>
                </div>
                <Link to="/impact/i-am-somebody" className="group flex items-center gap-3 text-aeem-gold font-bold">
                  Read Case Study <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="relative h-[400px] lg:h-auto">
                <img
                   src="/assets/gallery/Participant_Group_Picture.jpg"
                   alt="Youth empowerment workshop"
                   className="w-full h-full object-cover transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <AwardSlider />
      <PartnerTicker />
      <Pillars />
      
      <WebGLGuard fallback={<div className="h-64 flex items-center justify-center text-gray-600 dark:text-gray-300">Interactive map unavailable</div>}>
        <GlobalReach />
      </WebGLGuard>

      {/* Get Involved CTA */}
      <section className="py-24 bg-aeem-gold/10">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-aeem-gold dark:text-aeem-bg mb-8">Ready to make a <br/>difference?</h2>
            <div className="flex flex-wrap justify-center gap-4">
                <Link to="/get-involved" className="px-10 py-4 bg-aeem-charcoal dark:bg-aeem-gold text-white rounded-full font-bold hover:scale-105 transition-all shadow-xl">
                  Join the Movement
                </Link>
                <Link to="/contact" className="px-10 py-4 border-2 dark:border-white border-aeem-focus text-aeem-charcoal dark:text-white rounded-full hover:scale-95 font-bold hover:bg-white hover:text-aeem-gold transition-all">
                  Partner With Us
                </Link>
            </div>
         </div>
      </section>
    </>
  )
}
