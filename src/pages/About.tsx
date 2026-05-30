import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Heart, Eye } from 'lucide-react';
import MasonryGallery from '../components/Gallery/MasonryGallery';

const About: React.FC = () => {
  const leadershipTeam = [
    {
      name: "Alimamy Kallon",
      title: "Founder & Executive Director",
      bio: "An educational advocate with over a decade of community organization experience across Sierra Leone.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Aminata Sesay",
      title: "Director of Operations & Programs",
      bio: "Oversees programmatic frameworks, logistics, and partner school networks across the West African region.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Dr. John Kamara",
      title: "Policy & Research Advisor",
      bio: "A research academic specializing in sub-Saharan educational systems and institutional reform strategies.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Chernor Bah",
      title: "Youth Advocacy Coordinator",
      bio: "A passionate student mobilizer leading civic engagement workshops and student representation initiatives.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const partners = [
    { name: "FREETOWN", sub: "Education Council" },
    { name: "WAYF", sub: "West Africa Youth Forum" },
    { name: "SLTA", sub: "Teachers Association" },
    { name: "GFE", sub: "Global Fund for Education" },
    { name: "SUMMIT", sub: "Educational Coalition" }
  ];

  return (
    <>
      <Helmet>
        <title>About AEEM | Our Mission & Team</title>
        <meta name="description" content="Learn about the Africa Education Empowerment Movement, our leadership, and our commitment to educational equity." />
      </Helmet>

      <section className="pt-40 pb-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Who We Are</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-aeem-charcoal">
              Driven by <span className="text-aeem-gold">Purpose</span>, <br/>Defined by Action.
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AEEM is a youth-led movement dedicated to dismantling the barriers that prevent quality education from reaching every child in Africa.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
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
                <h3 className="text-2xl font-bold mb-4 text-aeem-charcoal">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-aeem-charcoal">Our Leadership</h2>
            <p className="text-gray-600">The passionate team behind the movement.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((member, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                   <img
                     src={member.image}
                     alt={member.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0"
                   />
                </div>
                <div className="p-6">
                   <h4 className="font-bold text-lg mb-1 text-aeem-charcoal">{member.name}</h4>
                   <p className="text-aeem-gold text-xs font-bold uppercase tracking-wider mb-3">{member.title}</p>
                   <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at AEEM Gallery */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Visual Journey</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Life at <span className="text-aeem-gold">AEEM</span></h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Moments from our workshops, community gatherings, and team sessions that define who we are.
              </p>
            </div>
          </div>

          <MasonryGallery />
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-xl font-bold mb-12 text-gray-400 uppercase tracking-widest">Trusted by Forward-Thinking Partners</h2>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-stretch justify-center">
              {partners.map((p, i) => (
                <div 
                  key={i} 
                  className="p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:border-aeem-gold hover:bg-white hover:shadow-md transition-all group flex flex-col items-center justify-center min-h-[100px]"
                >
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
