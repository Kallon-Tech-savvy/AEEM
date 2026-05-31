import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Heart, Eye } from 'lucide-react';
import MasonryGallery from '../components/Gallery/MasonryGallery';

const About: React.FC = () => {
  const leadershipTeam = [
    {
      name: "Patrick P Williams",
      title: "Chief Executive Officer",
      bio: "",
      image: ""
    },
    {
      name: "Alhaji C. M. Kallon",
      title: "Chief operating Officer And Country Rep",
      bio: "",
      image: "/assets/gallery/kallon1.png"
    },
    {
      name: "Ann Moore",
      title: "Executive Director",
      bio: "",
      image: ""
    }
  ];

  const partners = [
    { name: "RCBank", sub: "Rokel Commercial Bank", url:"" },
    { name: "MAGE-SL", sub: "West Africa Youth Forum", url:"" },
    { name: "KWD", sub: "Kallon's World", url:"/assets/gallery/kallon1.png" },
    { name: "NYA", sub: "New Youth Africa", url:"" },
    { name: "ACC", sub: "Anti Corruption Commission", url:"" }
  ];

  return (
    <>
      <Helmet>
        <title>About AEEM | Our Mission & Team</title>
        <meta name="description" content="Learn about the Africa Education Empowerment Movement, our leadership, and our commitment to educational equity." />
      </Helmet>

      <section className="pt-40 pb-24 bg-aeem-focus/15 dark:bg-aeem-dark-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Who We Are</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-aeem-charcoal dark:text-white/90">
              Driven by <span className="text-aeem-gold">Purpose</span>, <br/>Defined by Action.
            </h1>
            <p className="text-xl text-aeem-charcoal dark:text-white/70 max-w-3xl mx-auto leading-relaxed">
              AEEM is a youth-led movement dedicated to dismantling the barriers that prevent quality education from reaching every child in Africa.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-aeem-bg dark:bg-aeem-focus/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: "Our Mission", text: "To expand access to quality education across Africa through advocacy, community empowerment, and accountable action." },
              { icon: Eye, title: "Our Vision", text: "A continent where every child, regardless of their background, has the resources and support to achieve their educational dreams." },
              { icon: Heart, title: "Our Values", text: "Integrity, inclusivity, community-led change, and radical transparency in everything we do." }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 bg-aeem-gold/10 rounded-2xl flex items-center justify-center text-aeem-gold mx-auto mb-6 group-hover:bg-aeem-gold group-hover:text-white transition-colors">
                   <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-aeem-charcoal dark:text-white/85">{item.title}</h3>
                <p className="text-aeem-charcoal dark:text-white/70 leading-relaxed text-sm md:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-aeem">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-aeem-charcoal dark:text-aeem-focus/60">Our Leadership</h2>
            <p className="text-aeem">The passionate team behind the movement.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member, i) => (
              <div key={i} className="bg-aeem rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                <div className="aspect-[4/5] relative overflow-hidden">
                   <img
                     src={member.image}
                     alt={member.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0"
                   />
                </div>
                <div className="p-6">
                   <h4 className="font-bold text-lg mb-1 text-aeem">{member.name}</h4>
                   <p className="text-aeem-gold text-xs font-bold uppercase tracking-wider mb-3">{member.title}</p>
                   <p className="text-aeem text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at AEEM Gallery */}
      <section className="py-24 bg-aeem overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Visual Journey</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Life at <span className="text-aeem-gold">AEEM</span></h2>
              <p className="text-lg text-aeem leading-relaxed">
                Moments from our workshops, community gatherings, and team sessions that define who we are.
              </p>
            </div>
          </div>

          <MasonryGallery />
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-aeem border-t border-aeem">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-xl font-bold mb-12 text-aeem uppercase tracking-widest">Trusted by Forward-Thinking Partners</h2>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-stretch justify-center">
              {partners.map((p, i) => (
                <div 
                  key={i} 
                  className="p-4 bg-aeem border border-aeem rounded-4xl hover:border-aeem-gold hover:bg-white hover:shadow-md transition-all group flex flex-col items-center justify-center min-h-[100px]"
                >
                  <img className='h-24' src={p.url} alt={`Partner Logo`} />
                  <span className="font-extrabold text-base text-gray-500 tracking-widest group-hover:text-aeem-gold transition-colors">{p.name}</span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 mt-1 text-center">{p.sub}</span>
                </div>
              ))}
           </div>
        </div>
      </section>
    </>
  );
};

export default About;
