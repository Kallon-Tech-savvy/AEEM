import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface StoryData {
  title: string;
  quote: string;
  image: string;
  stats: {
    participants: string;
    schools: string;
    duration: string;
  };
  overview: string;
  focusAreas: string[];
  impact: string;
  quoteText: string;
  quoteAuthor: string;
}

const STORIES_DB: Record<string, StoryData> = {
  'i-am-somebody': {
    title: "I AM SOMEBODY Initiative",
    quote: "A movement to instill agency, resilience, and leadership in the next generation of African scholars.",
    image: "/assets/gallery/Activity.jpg",
    stats: {
      participants: "42 Students",
      schools: "6 Institutions",
      duration: "2-Day Workshop"
    },
    overview: 'The "I AM SOMEBODY" initiative was designed as a high-impact empowerment program to address the critical gaps in traditional education. Beyond textbooks, we focused on the human element—leadership, civic awareness, and personal resilience.',
    focusAreas: [
      "Leadership Development",
      "Civic Awareness & Action",
      "Mental Resilience & Grit",
      "Public Health & Wellness",
      "Adolescent Risk Prevention",
      "Mentorship Networking"
    ],
    impact: "Participants reported a significant increase in their confidence to lead school initiatives and a deeper understanding of their roles as active citizens in Sierra Leone. By training 42 participants from six different schools, AEEM created a cross-institutional network of youth leaders ready to advocate for educational equity.",
    quoteText: "This workshop changed how I view my future. I realized that my voice matters and that I have the power to create change in my community.",
    quoteAuthor: "Participant from Prince of Wales School"
  }
};

const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(null);

        //Try fetch from supabase
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .eq('slug', slug)
          .single();

          if(error){
            throw error;
          }

          if (data){
            setStory(data);
          } else {
            const localStory = slug ? STORIES_DB[slug] : null;
            setStory(localStory);
          }
      } catch {
        console.warn('Supabase fetch failed or missing. Falling back to local Stories database:', error);
        const localStory =slug ?  STORIES_DB[slug] : null;
        setStory(localStory);
      }finally {
        setLoading(false)
      }
    };

    if (slug) fetchStory();
  }, [slug, error]);

  if(loading){
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-aeem-gold' />
      </div>
    )
  }

  if (!story) {
    return (
      <div className="pt-40 pb-24 text-center max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center">
        <p className="text-gray-500 mb-6 text-lg">Story not found.</p>
        <Link to="/impact" className="inline-flex items-center gap-2 font-bold text-aeem-gold hover:underline">
          <ArrowLeft size={16} /> Back to Impact
        </Link>
      </div>
    );
  }

// Story
  return (
    <>
      <Helmet>
        <title>{story.title} | AEEM Case Study</title>
        <meta name="description" content={story.quote} />
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/impact" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-aeem-gold mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Impact
          </Link>

          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">{story.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 italic">
            "{story.quote}"
          </p>

          <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl bg-gray-100">
            <img
               src={story.image}
               alt={story.title}
               className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 p-10 bg-aeem rounded-3xl">
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Participants</h4>
                <p className="text-2xl font-black text-aeem-charcoal dark:text-white ">{story.stats.participants}</p>
             </div>
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Communities / Schools</h4>
                <p className="text-2xl font-black text-aeem-charcoal dark:text-white ">{story.stats.schools}</p>
             </div>
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Duration</h4>
                <p className="text-2xl font-black text-aeem-charcoal dark:text-white ">{story.stats.duration}</p>
             </div>
          </div>
            <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.07] dark:opacity-[0.03] pointer-events-none z-1 mix-blend-luminosity select-none">
          <img 
            src="/assets/Illustrate africa.avif" 
            alt="" 
            className="w-full h-full object-contain"
          />
        </div>
          <div className="prose prose-lg max-w-none text-gray-500 leading-relaxed space-y-8">
             <h2 className="text-3xl font-black text-aeem">Overview</h2>
             <p>{story.overview}</p>

             <h2 className="text-3xl font-black text-aeem">Key Focus Areas</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose">
                {story.focusAreas.map((item, i) => (
                   <div key={i} className="flex items-center gap-3 p-4 bg-aeem-focus/20 border border-gray-100 rounded-xl shadow-sm hover:border-aeem-gold/50 transition-colors">
                     <CheckCircle2 className="text-aeem-gold" size={20} />
                     <span className="font-bold text-aeem">{item}</span>
                   </div>
                ))}
             </div>

             <h2 className="text-3xl font-black text-aeem mt-12">The Impact</h2>
             <p>{story.impact}</p>

             <blockquote className="border-l-4 border-aeem-gold pl-8 py-4 italic text-2xl font-medium text-aeem my-12 bg-aeem-gold/15 rounded-r-2xl pr-6">
                "{story.quoteText}"
                <footer className="mt-4 text-sm font-bold text-aeem">— {story.quoteAuthor}</footer>
             </blockquote>
          </div>

          <div className="mt-20 pt-12 border-t border-aeem-gold flex justify-between items-center">
             <div className="flex gap-4">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-aeem-focus/70 text-aeem rounded-full font-bold hover:bg-aeem-gold hover:text-white transition-all active:scale-95"
                >
                  <Share2 size={18} /> Share Impact
                </button>
             </div>
             <Link to="/get-involved" className="bg-aeem-focus/20 text-aeem px-10 py-4 rounded-full font-bold hover:bg-aeem-gold transition-all hover:scale-105 active:scale-95">
                Support Similar Programs
             </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoryDetail;
