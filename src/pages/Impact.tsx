import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Loader2 } from 'lucide-react';
import MasonryGallery from '../components/sections/MasonryGallery';
import { supabase } from '../services/supabase';
import { AwardSlider } from '../components/sections/AwardSlider';
import { SpotlightCard } from '../components/motion/SpotlightCard';
import { getCanonical } from '../lib/seo';

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
    cover_image_url: "/assets/gallery/Activity.jpg",
    fileName: "Activity",
    participants_count: 42,
    schools_count: 6,
    location: "Freetown, Sierra Leone"
  }
];

const Impact: React.FC = () => {
  const [stories, setStories] = useState<(ImpactStory & { fileName?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data, error } = await supabase
          .from('impact_stories')
          .select('id, title, slug, summary, location, participants_count, schools_count, cover_image_url')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setStories(data);
        } else {
          setStories(FALLBACK_STORIES as (ImpactStory & { fileName?: string })[]);
        }
      } catch (err) {
        console.error('Error fetching impact stories:', err);
        setStories(FALLBACK_STORIES as (ImpactStory & { fileName?: string })[]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Impact & Stories | AEEM</title>
        <meta name="description" content="Discover the real-world impact of AEEM's initiatives across Africa through case studies and participant stories." />
        <link rel="canonical" href={getCanonical('/impact')} />
      </Helmet>

      <section className="pt-40 pb-24 min-h-[520px] bg-gradient-to-b from-[#8db89b] dark:from-[#111] to-aeem-bg dark:to-aeem-charcoal text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-full md:w-[60%] h-full pointer-events-none opacity-[0.5] dark:opacity-[0.1] mix-blend-screen z-0">
          <img 
            src="/assets/Illustrate Africa 2_converted.avif" 
            alt="" 
            width={960}
            height={800}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-fill md:object-contain object-right-top drop-shadow-2xl"
          />
        </div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-aeem-gold/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="hero-animate">
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Proven Execution</span>
          </div>
          <h1 className="hero-animate hero-animate-delay-1 text-5xl md:text-7xl font-black mb-8 leading-tight">
            Impact & <span className="text-aeem-gold">Stories</span>
          </h1>
          <p className="hero-animate hero-animate-delay-2 text-xl text-aeem-charcoal dark:text-aeem-dark-text leading-relaxed font-medium">
            We don't just advocate; we execute. Explore how our programs are transforming lives and empowering the next generation of African leaders.
          </p>
        </div>
      </section>
  
      <section className="py-16 bg-aeem-focus/5">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="animate-spin text-aeem-gold" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {stories.map((story, i) => (
                <motion.div
                  key={story.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col h-full bg-aeem rounded-[2.5rem] overflow-hidden border border-aeem-border shadow-sm hover:shadow-2xl transition-all"
                >
                  <SpotlightCard className="h-full">
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {story.fileName ? (
                      <picture>
                        <img
                          src={story.cover_image_url}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </picture>
                    ) : (
                      <img
                        src={story.cover_image_url}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold text-aeem uppercase tracking-widest mb-6">
                      <span className="flex text-aeem-charcoal dark:text-white items-center gap-1.5"><MapPin size={14} className="text-aeem-gold" /> {story.location}</span>
                    </div>
                    <h2 className="text-3xl font-black mb-6 group-hover:text-aeem-gold transition-colors text-aeem-charcoal dark:text-white">{story.title}</h2>
                    <p className="text-aeem-charcoal dark:text-white mb-10 line-clamp-3 leading-relaxed">{story.summary}</p>

                    <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-y border-aeem-focus dark:border-aeem-border">
                      <div>
                        <div className="text-xl font-black text-aeem-focus">{story.participants_count}</div>
                        <div className="text-[10px] text-aeem-charcoal dark:text-white font-bold uppercase">Participants</div>
                      </div>
                      <div>
                        <div className="text-xl font-black text-aeem-focus">{story.schools_count}</div>
                        <div className="text-[10px] text-aeem-charcoal dark:text-white font-bold uppercase">Schools</div>
                      </div>
                    </div>

                    <Link to={`/impact/${story.slug}`} className="mt-auto group/btn flex items-center gap-3 text-aeem-charcoal dark:text-aeem-dark-text font-black">
                      Read Case Study <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform text-aeem-gold" />
                    </Link>
                  </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <AwardSlider />
      {/* Impact Gallery */}
      <section className="py-16 bg-aeem overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Impact in Action</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-aeem-charcoal dark:text-white">Our Work in <span className="text-aeem-gold">Pictures</span></h2>
              <p className="text-lg text-aeem-charcoal dark:text-white leading-relaxed font-medium">
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
