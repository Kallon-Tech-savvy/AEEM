import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Heart, Eye } from 'lucide-react';

const About: React.FC = () => {
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
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
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
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-aeem-gold/10 rounded-2xl flex items-center justify-center text-aeem-gold mx-auto mb-6">
                   <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Leadership</h2>
            <p className="text-gray-600">The passionate team behind the movement.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm group">
                <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                   <img
                     src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=400`}
                     alt="Team member"
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale"
                   />
                </div>
                <div className="p-6">
                   <h4 className="font-bold text-lg mb-1">Team Member Name</h4>
                   <p className="text-aeem-gold text-sm font-semibold uppercase tracking-wider">Position / Title</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-2xl font-bold mb-12 text-gray-400">Trusted by Forward-Thinking Partners</h2>
           <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
              ))}
           </div>
        </div>
      </section>
    </>
  );
};

export default About;
