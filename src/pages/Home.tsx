import { motion } from 'framer-motion'
import { ArrowRight, Shield, Users, Lightbulb, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import ImpactStats from '../components/sections/ImpactStats'
import Pillars from '../components/sections/Pillars'
import GlobalReach from '../components/sections/GlobalReach'
import { Helmet } from 'react-helmet-async'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AEEM | Empowering Minds. Transforming Futures.</title>
        <meta name="description" content="AEEM expands access to quality education across Africa through advocacy, community empowerment, and accountable action." />
      </Helmet>

      <Hero />

      {/* Trust Strip */}
      <div className="bg-aeem-charcoal py-8 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-8 md:gap-4">
            {['Youth-led', 'Education Access', 'Community Empowerment', 'Policy Advocacy'].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-aeem-gold rounded-full" />
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                The Invisible <span className="text-aeem-gold">Barriers</span> to Education
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Too many learners across Africa are excluded by barriers that are visible locally but invisible institutionally. From physical distance to systemic inequality, these obstacles prevent millions from reaching their full potential.
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
                    <span className="font-semibold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl relative z-10">
                 <img
                   src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Approach to <span className="text-aeem-gold">Change</span></h2>
            <p className="text-lg text-gray-600 italic">"Fair access to quality education for every child through community-led action, clarity, and care."</p>
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
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-aeem-gold/10 rounded-xl flex items-center justify-center text-aeem-gold mb-6 group-hover:bg-aeem-gold group-hover:text-white transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Impact - I AM SOMEBODY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-aeem-charcoal rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <span className="text-aeem-gold font-bold uppercase tracking-widest text-xs mb-4">Featured Impact</span>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  I AM SOMEBODY <br/>Initiative
                </h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                  Our flagship 2-day empowerment workshop trained 42 participants from six schools, addressing leadership, civic awareness, resilience, and public health.
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
                   src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
                   alt="Youth empowerment workshop"
                   className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pillars />
      <GlobalReach />

      {/* Get Involved CTA */}
      <section className="py-24 bg-aeem-gold">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8">Ready to make a <br/>difference?</h2>
            <div className="flex flex-wrap justify-center gap-4">
                <Link to="/get-involved" className="px-10 py-4 bg-aeem-charcoal text-white rounded-full font-bold hover:scale-105 transition-all shadow-xl">
                  Join the Movement
                </Link>
                <Link to="/contact" className="px-10 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-aeem-gold transition-all">
                  Partner With Us
                </Link>
            </div>
         </div>
      </section>
    </>
  )
}
