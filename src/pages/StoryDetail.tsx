import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface ImpactStory {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  location: string;
  participants_count: number;
  schools_count: number;
  cover_image_url: string;
}

const FALLBACK_STORY: ImpactStory = {
  id: 'fallback-1',
  title: "I AM SOMEBODY Initiative",
  slug: "i-am-somebody",
  summary: "Our flagship 2-day empowerment workshop trained 42 participants from six schools, addressing leadership, civic awareness, and resilience.",
  body: `<p>The "I AM SOMEBODY" initiative was designed as a high-impact empowerment program to address the critical gaps in traditional education. Beyond textbooks, we focused on the human element—leadership, civic awareness, and personal resilience.</p>
         <p>Participants reported a significant increase in their confidence to lead school initiatives and a deeper understanding of their roles as active citizens in Sierra Leone. By training 42 participants from six different schools, AEEM created a cross-institutional network of youth leaders ready to advocate for educational equity.</p>`,
  cover_image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
  participants_count: 42,
  schools_count: 6,
  location: "Freetown, Sierra Leone"
};

const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<ImpactStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const { data, error } = await supabase
          .from('impact_stories')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setStory(data);
      } catch (err) {
        console.error('Error fetching story:', err);
        if (slug === 'i-am-somebody') {
          setStory(FALLBACK_STORY);
        } else {
          setStory(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-aeem-gold" size={48} />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="pt-40 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-black mb-6">Story not found.</h1>
        <p className="text-gray-600 mb-8">The case study you are looking for does not exist or has been moved.</p>
        <Link to="/impact" className="inline-flex items-center gap-2 text-aeem-gold font-bold hover:underline">
          <ArrowLeft size={16} /> Go back to Impact
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${story.title} | AEEM Impact`}</title>
        <meta name="description" content={story.summary} />
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/impact" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-aeem-gold mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Impact
          </Link>

          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">{story.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 italic">
            "{story.summary}"
          </p>

          <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
            <img
               src={story.cover_image_url}
               alt={story.title}
               className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 p-10 bg-gray-50 rounded-3xl">
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Participants</h4>
                <p className="text-2xl font-black">{story.participants_count}+</p>
             </div>
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Partner Schools</h4>
                <p className="text-2xl font-black">{story.schools_count}</p>
             </div>
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Location</h4>
                <p className="text-2xl font-black">{story.location}</p>
             </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
             <div dangerouslySetInnerHTML={{ __html: story.body }} />

             {slug === 'i-am-somebody' && (
               <>
                 <h2 className="text-3xl font-black text-aeem-charcoal">Key Focus Areas</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 not-prose">
                    {[
                      "Leadership Development",
                      "Civic Awareness & Action",
                      "Mental Resilience & Grit",
                      "Public Health & Wellness",
                      "Adolescent Risk Prevention",
                      "Mentorship Networking"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl">
                        <CheckCircle2 className="text-aeem-gold" size={20} />
                        <span className="font-bold text-aeem-charcoal">{item}</span>
                      </div>
                    ))}
                 </div>
               </>
             )}
          </div>

          <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center">
             <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full font-bold hover:bg-aeem-gold hover:text-white transition-all">
                  <Share2 size={18} /> Share Impact
                </button>
             </div>
             <Link to="/get-involved" className="bg-aeem-charcoal text-white px-10 py-4 rounded-full font-bold hover:bg-aeem-gold transition-all text-center">
                Support Similar Programs
             </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoryDetail;
