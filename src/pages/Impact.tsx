import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import MasonryGallery from '../components/Gallery/MasonryGallery';
import { supabase } from '../services/supabase';

interface ImpactStory {
  id: string;
  title: string;
  slug: string;
  summary: string;
  location: string;
  participants_count: number;
  schools_count: number;
  cover_image_url: string;
}

const FALLBACK_STORIES = [
  {
    title: "I AM SOMEBODY Initiative",
    slug: "i-am-somebody",
    summary: "Our flagship 2-day empowerment workshop trained 42 participants from six schools, addressing leadership, civic awareness, and resilience.",
    cover_image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    participants_count: 42,
    schools_count: 6,
    location: "Freetown, Sierra Leone"
  },
  {
    title: "Digital Literacy Campaign",
    slug: "digital-literacy",
    summary: "Bridging the digital divide by providing foundational computer skills to 150+ students in rural communities.",
    cover_image_url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    participants_count: 156,
    schools_count: 4,
    location: "Makeni, Sierra Leone"
  }
];

const Impact: React.FC = () => {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['impact_stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('impact_stories')
        .select('id, title, slug, summary, location, participants_count, schools_count, cover_image_url')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data && data.length > 0) ? (data as ImpactStory[]) : (FALLBACK_STORIES as ImpactStory[]);
    },
    initialData: FALLBACK_STORIES as ImpactStory[]
  });

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

      <section className="py-24 bg-white dark:bg-aeem-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="animate-spin text-aeem-gold" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {stories?.map((story, i) => (
                <motion.div
                  key={story.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col h-full bg-white dark:bg-white/5 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={story.cover_image_url}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-aeem-gold" /> {story.location}</span>
                    </div>
                    <h2 className="text-3xl font-black mb-6 group-hover:text-aeem-gold transition-colors dark:text-aeem-white">{story.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 line-clamp-3 leading-relaxed">{story.summary}</p>

                    <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-y border-gray-50 dark:border-white/10">
                      <div>
                        <div className="text-xl font-black text-aeem-charcoal dark:text-aeem-white">{story.participants_count}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">Participants</div>
                      </div>
                      <div>
                        <div className="text-xl font-black text-aeem-charcoal dark:text-aeem-white">{story.schools_count}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">Schools</div>
                      </div>
                    </div>

                    <Link to={`/impact/${story.slug}`} className="mt-auto group/btn flex items-center gap-3 text-aeem-charcoal dark:text-aeem-white font-black">
                      Read Case Study <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform text-aeem-gold" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Gallery */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Impact in Action</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Our Work in <span className="text-aeem-gold">Pictures</span></h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Transparency is at our core. Here is a look at our latest initiatives and the participants we serve.
              </p>
            </div>
          </div>

          <MasonryGallery />
        </div>
      </section>
    </>
  );
};

export default Impact;
