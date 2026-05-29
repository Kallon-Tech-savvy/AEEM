import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react';

const Impact: React.FC = () => {
  // Mock data for the MVP
  const stories = [
    {
      title: "I AM SOMEBODY Initiative",
      slug: "i-am-somebody",
      summary: "Our flagship 2-day empowerment workshop trained 42 participants from six schools, addressing leadership, civic awareness, and resilience.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      stats: { participants: 42, schools: 6, duration: "2 Days" },
      location: "Freetown, Sierra Leone"
    },
    {
      title: "Digital Literacy Campaign",
      slug: "digital-literacy",
      summary: "Bridging the digital divide by providing foundational computer skills to 150+ students in rural communities.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      stats: { participants: 156, schools: 4, duration: "Ongoing" },
      location: "Makeni, Sierra Leone"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Impact & Stories | AEEM</title>
        <meta name="description" content="Discover the real-world impact of AEEM's initiatives across Africa through case studies and participant stories." />
      </Helmet>

      <section className="pt-40 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Proven Execution</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Impact & <span className="text-aeem-gold">Stories</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We don't just advocate; we execute. Explore how our programs are transforming lives and empowering the next generation of African leaders.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {stories.map((story, i) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-aeem-gold" /> {story.location}</span>
                  </div>
                  <h2 className="text-3xl font-black mb-6 group-hover:text-aeem-gold transition-colors">{story.title}</h2>
                  <p className="text-gray-600 mb-10 line-clamp-3 leading-relaxed">{story.summary}</p>

                  <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-gray-50">
                    <div>
                      <div className="text-xl font-black text-aeem-charcoal">{story.stats.participants}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">Participants</div>
                    </div>
                    <div>
                      <div className="text-xl font-black text-aeem-charcoal">{story.stats.schools}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">Schools</div>
                    </div>
                    <div>
                      <div className="text-xl font-black text-aeem-charcoal">{story.stats.duration}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase">Duration</div>
                    </div>
                  </div>

                  <Link to={`/impact/${story.slug}`} className="mt-auto group/btn flex items-center gap-3 text-aeem-charcoal font-black">
                    Read Case Study <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform text-aeem-gold" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Impact;
