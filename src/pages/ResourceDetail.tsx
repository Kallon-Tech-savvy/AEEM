import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Download, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Resource {
  id: string;
  title: string;
  slug: string;
  type: 'blog' | 'download' | 'policy' | 'guide';
  description: string;
  body: string;
  file_url?: string;
  category?: string;
  created_at: string;
}

const FALLBACK_RESOURCES: Record<string, Resource> = {
  'equity-report-2025': {
    id: 'r1',
    title: "Educational Equity Report 2025",
    slug: "equity-report-2025",
    type: "download",
    description: "An in-depth analysis of educational barriers in West Africa.",
    body: "<p>This comprehensive report examines the systemic challenges facing students across West Africa and proposes actionable policy reforms.</p><p>Systemic inequality remains the primary barrier to higher education access. Community-led mentorship programs show a 40% increase in student retention rates.</p>",
    category: "Policy",
    created_at: new Date().toISOString()
  },
  'youth-mentorship-power': {
    id: 'r2',
    title: "The Power of Youth Mentorship",
    slug: "youth-mentorship-power",
    type: "blog",
    description: "How mentorship programs are changing the academic landscape.",
    body: "<p>Mentorship is more than just guidance; it's a lifeline for students navigating complex educational landscapes with limited resources.</p>",
    category: "Education",
    created_at: new Date().toISOString()
  }
};

const ResourceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;
        setResource(data);
      } catch (err) {
        console.error('Error fetching resource:', err);
        if (slug && FALLBACK_RESOURCES[slug]) {
          setResource(FALLBACK_RESOURCES[slug]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-aeem-gold" size={48} />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="pt-40 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-black mb-6">Resource not found.</h1>
        <p className="text-gray-600 mb-8">The resource you are looking for does not exist or has been moved.</p>
        <Link to="/resources" className="inline-flex items-center gap-2 text-aeem-gold font-bold hover:underline">
          <ArrowLeft size={16} /> Go back to Resources
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${resource.title} | AEEM Resources`}</title>
        <meta name="description" content={resource.description} />
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-aeem-gold mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Knowledge Hub
          </Link>

          <div className="flex items-center gap-3 text-aeem-gold font-bold uppercase tracking-widest text-xs mb-6">
             <span className="px-3 py-1 bg-aeem-gold/10 rounded-md">{resource.category || resource.type}</span>
             <span className="flex items-center gap-1 text-gray-400"><Clock size={14} /> 8 min read</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
             {resource.title}
          </h1>

          <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
             <img
                src={resource.type === 'download' ? "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200" : "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200"}
                alt="Resource banner"
                className="w-full h-full object-cover"
             />
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
             <div dangerouslySetInnerHTML={{ __html: resource.body }} />

             {resource.type === 'download' && (
                <div className="my-16 p-10 bg-aeem-charcoal rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                   <div>
                      <h3 className="text-2xl font-black mb-2">Download Full Resource</h3>
                      <p className="text-gray-400">Get the complete material with all data and methodology.</p>
                   </div>
                   <a
                     href={resource.file_url || '#'}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-3 bg-aeem-gold text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shrink-0"
                   >
                      <Download size={20} /> Download PDF
                   </a>
                </div>
             )}
          </div>

          <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center">
             <div className="flex gap-4">
                <button className="p-3 rounded-full bg-gray-100 text-gray-400 hover:text-aeem-gold transition-all"><Share2 size={20} /></button>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 uppercase">Category:</span>
                <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-md">{resource.category || 'General'}</span>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourceDetail;
