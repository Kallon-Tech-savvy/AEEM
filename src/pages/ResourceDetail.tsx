import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Download, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface Resource {
  id?: string;
  title: string;
  slug: string;
  type: 'blog' | 'download' | 'policy' | 'guide' | string;
  description?: string;
  summary?: string;
  body?: string;
  fullBody?: string;
  file_url?: string;
  category?: string;
  created_at?: string;
  readingTime?: string;
  isReport?: boolean;
  tags?: string[];
  image?: string;
  bulletPoints?: string[];
}

const FALLBACK_RESOURCES: Record<string, Resource> = {
  'equity-report-2025': {
    id: 'r1',
    title: 'Educational Equity Report 2025: Barriers & Breakthroughs',
    slug: 'equity-report-2025',
    type: 'download',
    description: 'An in-depth analysis of educational barriers in West Africa.',
    summary:
      'This comprehensive report examines the systemic challenges facing students across West Africa and proposes actionable policy reforms.',
    body:
      '<p>In 2025, AEEM conducted a wide-reaching research study across 24 school districts in the West African sub-region. The data highlighted that secondary-to-tertiary school drop-out rates remain exceptionally high, primarily driven by geographic exclusion, lack of local representation in curriculum design, and severe infrastructure deficiencies.</p><p>This policy briefing serves as a strategic roadmap for ministries of education, offering practical methods to integrate youth and student leadership directly into policy-making councils.</p>',
    readingTime: '12 min read',
    category: 'Policy Report',
    image:
      '',
    isReport: true,
    file_url: '',
    bulletPoints: [
      'Systemic inequality remains the primary barrier to higher education access.',
      'Community-led mentorship programs show a 40% increase in student retention rates.',
      'Digital literacy is no longer optional; it is a fundamental requirement for the modern workforce.',
    ],
    tags: ['Policy', '2025', 'Research'],
  },
  'youth-mentorship-power': {
    id: 'r2',
    title: 'The Power of Youth Mentorship in Africa',
    slug: 'youth-mentorship-power',
    type: 'blog',
    description: 'How mentorship programs are changing the academic landscape.',
    body:
      '<p>Mentorship is more than just guidance; it is a lifeline for students navigating complex educational landscapes with limited resources.</p>',
    readingTime: '6 min read',
    category: 'Education',
    image:
      '',
    tags: ['Education', 'Mentorship', 'Community'],
  },
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

    if (slug) {
      fetchResource();
    } else {
      setLoading(false);
    }
  }, [slug]);

  const handleDownload = () => {
    if (resource?.file_url) {
      window.open(resource.file_url, '_blank', 'noopener');
    } else {
      alert('Download link is unavailable.');
    }
  };

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
        <meta name="description" content={resource.description ?? resource.summary ?? ''} />
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-aeem-gold mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Knowledge Hub
          </Link>

          <div className="flex items-center gap-3 text-aeem-gold font-bold uppercase tracking-widest text-xs mb-6">
            <span className="px-3 py-1 bg-aeem-gold/10 rounded-md">{resource.category ?? resource.type}</span>
            <span className="flex items-center gap-1 text-gray-400"><Clock size={14} /> {resource.readingTime ?? '8 min read'}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            {resource.title}
          </h1>

          <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
            <img
              src={resource.image ?? (resource.type === 'download'
                ? ''
                : '')}
              alt={resource.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-0 w-full h-full opacity-[0.07] dark:opacity-[0.03] pointer-events-none z-1 mix-blend-luminosity select-none">
          <img 
          src="/assets/Illustrate africa.avif" 
            alt="" 
            className="w-full h-full object-contain"
          />
        </div>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            {resource.summary ? (
              <p className="text-xl font-medium text-aeem-charcoal dark:text-white mb-8">{resource.summary}</p>
            ) : null}

            {resource.body ? (
              <div dangerouslySetInnerHTML={{ __html: resource.body }} />
            ) : (
              <p className="text-base leading-relaxed text-aeem-charcoal dark:text-white">{resource.fullBody ?? resource.description}</p>
            )}

            {resource.bulletPoints?.length ? (
              <ul className="space-y-4 my-8">
                {resource.bulletPoints.map((point, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-aeem-gold/10 flex items-center justify-center text-aeem-gold shrink-0 mt-1">{index + 1}</div>
                    <span className="font-semibold text-aeem-charcoal dark:text-white">{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {resource.isReport && resource.file_url ? (
              <div className="my-16 p-10 bg-aeem rounded-[2.5rem] text-aeem flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/5">
                <div>
                  <h3 className="text-2xl font-black mb-2 text-aeem-gold">Download Full Resource</h3>
                  <p className="text-aeem-charcoal dark:text-white">Get the complete material with all data and methodology.</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-3 bg-aeem-gold text-white dark:text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shrink-0 shadow-lg shadow-aeem-gold/20"
                >
                  <Download size={24} /> Download PDF
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-20 pt-12 border-t border-aeem-focus flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Resource link copied to clipboard!');
              }}
              className="inline-flex items-center gap-3 px-4 py-3 rounded-full bg-aeem-focus/20 text-aeem-charcoal dark:text-white hover:bg-aeem-gold hover:text-white transition-all active:scale-95 shadow-sm"
              aria-label="Share"
            >
              <Share2 size={20} /> Share
            </button>

            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-sm font-bold text-aeem-gold uppercase">Tags:</span>
              {resource.tags?.length ? (
                resource.tags.map((tag) => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 bg-aeem rounded-md text-aeem-charcoal dark:text-white">
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">No tags available</span>
              )}
            </div>
          </div>
        </div>
        
      </section>
    </>
  );
};

export default ResourceDetail;
