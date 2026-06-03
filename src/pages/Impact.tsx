import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Loader2 } from 'lucide-react';
import MasonryGallery from '../../dist/Gallery/MasonryGallery';
import { supabase } from '../services/supabase';
import { AwardSlider } from '../components/sections/AwardSlider';

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
    participants_count: 42,
    schools_count: 6,
    location: "Freetown, Sierra Leone"
  }
];

const Impact: React.FC = () => {
  const [stories, setStories] = useState<ImpactStory[]>([]);
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
          setStories(FALLBACK_STORIES as ImpactStory[]);
        }
      } catch (err) {
        console.error('Error fetching impact stories:', err);
        setStories(FALLBACK_STORIES as ImpactStory[]);
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
      </Helmet>

      <section className="pt-40 pb-24 bg-aeem">
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
            <p className="text-xl text-aeem-charcoal dark:text-aeem-dark-text leading-relaxed">
              We don't just advocate; we execute. Explore how our programs are transforming lives and empowering the next generation of African leaders.
            </p>
          </motion.div>
        </div>
      </section>
      
      <section className="py-24 bg-aeem-focus/5">
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
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={story.cover_image_url}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold text-aeem uppercase tracking-widest mb-6">
                      <span className="flex text-aeem-charcoal dark:text-white items-center gap-1.5"><MapPin size={14} className="text-aeem-gold" /> {story.location}</span>
                    </div>
                    <h2 className="text-3xl font-black mb-6 group-hover:text-aeem-gold transition-colors">{story.title}</h2>
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
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <AwardSlider />
      {/* Impact Gallery */}
      <section className="py-24 bg-aeem overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Impact in Action</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6">Our Work in <span className="text-aeem-gold">Pictures</span></h2>
              <p className="text-lg text-aeem-charcoal dark:text-white leading-relaxed">
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
