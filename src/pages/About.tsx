import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Heart, Eye } from 'lucide-react';
import MosaicGallery from '../components/sections/MasonryGallery';
import { partners } from '../data/Partner';

const About: React.FC = () => {
  const leadershipTeam = [
    {
      name: "Patrick P Williams",
      title: "Chief Executive Officer",
      image: "/assets/gallery/CEO.jpg"
    },
    {
      name: "Ann Ambrose",
      title: "Executive Director",
      image: "/assets/gallery/ED.jpg"
    },
    {
      name: "Alhaji C. M. Kallon",
      title: "Chief Operating Officer",
      image: "/assets/gallery/kallon1.png"
    },
    {
      name: "Chrispin Vandi",
      title: "Secretary General",
      image: "/assets/gallery/SG.jpg"
    },
  ];

  return (
    <>
      <Helmet>
        <title>About AEEM | Our Mission & Team</title>
        <meta name="description" content="Learn about the Africa Education Empowerment Movement, our leadership, and our commitment to educational equity." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-aeem-charcoal dark:to-[#0f1115] overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-aeem-gold/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-aeem-gold/10 text-aeem-gold border border-aeem-gold/20 font-bold uppercase tracking-[0.3em] text-xs mb-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              Who We Are
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-aeem-charcoal dark:text-white drop-shadow-sm">
              Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeem-gold to-yellow-400 drop-shadow-md">Purpose</span>, <br/>Defined by Action.
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              AEEM is a youth-led movement dedicated to bridging the barriers that prevent quality education from reaching every child in Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 relative bg-white dark:bg-[#0f1115]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Our Mission", text: "To expand access to quality education across Africa through advocacy, community empowerment, and accountable action." },
              { icon: Eye, title: "Our Vision", text: "A continent where every child, regardless of their background, has the resources and support to achieve their educational dreams." },
              { icon: Heart, title: "Our Values", text: "Integrity, inclusivity, community-led change, and radical transparency in everything we do." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group bg-gray-50/50 dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-aeem-gold/20 to-aeem-gold/5 border border-aeem-gold/20 rounded-2xl flex items-center justify-center text-aeem-gold mx-auto mb-8 group-hover:from-aeem-gold group-hover:to-yellow-500 group-hover:text-white transition-all shadow-sm">
                   <item.icon size={36} className="drop-shadow-sm" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-aeem-charcoal dark:text-white tracking-tight">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#15181e] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-aeem-charcoal dark:text-white drop-shadow-sm">Our Leadership</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">The passionate team behind the movement.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {leadershipTeam.map((member, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-[#1a1d24] rounded-[2rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-white/5 group"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-gray-200 dark:bg-gray-800">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                   <img
                     src={member.image}
                     alt={member.name}
                     width={360}
                     height={450}
                     loading="lazy"
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                   />
                </div>
                <div className="p-8 text-center relative z-20 bg-white dark:bg-[#1a1d24]">
                   <h4 className="font-black text-xl mb-1 text-aeem-charcoal dark:text-white">{member.name}</h4>
                   <p className="text-aeem-gold text-xs font-bold uppercase tracking-widest">{member.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at AEEM Gallery */}
      <section className="py-24 bg-white dark:bg-[#0f1115] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block drop-shadow-sm">Visual Journey</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-aeem-charcoal dark:text-white">Life at <span className="text-aeem-gold">AEEM</span></h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Moments from our workshops, community gatherings, and team sessions that define who we are.
              </p>
            </div>
          </div>
          <MosaicGallery />
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#15181e] border-t border-gray-200 dark:border-white/5 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-sm font-black mb-12 text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Trusted by Forward-Thinking Partners</h2>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-stretch justify-center">
              {partners.map((p, i) => (
                <div 
                  key={i} 
                  className="p-6 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl hover:border-aeem-gold/50 hover:bg-gray-50 dark:hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] transition-all group flex flex-col items-center justify-center min-h-[120px]"
                >
                  <img
                    src={p.url}
                    alt={`${p.name} Logo`}
                    width={160}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className='h-20 object-contain mix-blend-multiply dark:mix-blend-normal opacity-80 group-hover:opacity-100 transition-opacity'
                  />
                  <span className="font-extrabold text-sm text-gray-500 dark:text-gray-400 tracking-widest group-hover:text-aeem-gold transition-colors mt-3">{p.name}</span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-600 mt-1 text-center">{p.sub}</span>
                </div>
              ))}
           </div>
        </div>
      </section>
    </>
  );
};

export default About;