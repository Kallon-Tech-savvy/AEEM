import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Download, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

interface ResourceData {
  title: string;
  isReport: boolean;
  type: string;
  image: string;
  readingTime: string;
  summary: string;
  bulletPoints: string[];
  fullBody: string;
  tags: string[];
}

const RESOURCES_DB: Record<string, ResourceData> = {
  'equity-report-2025': {
    title: "Educational Equity Report 2025: Barriers & Breakthroughs",
    isReport: true,
    type: "Policy Report",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
    readingTime: "12 min read",
    summary: "This comprehensive report examines the systemic challenges facing students across West Africa and proposes actionable policy reforms.",
    bulletPoints: [
      "Systemic inequality remains the primary barrier to higher education access.",
      "Community-led mentorship programs show a 40% increase in student retention rates.",
      "Digital literacy is no longer optional; it is a fundamental requirement for the modern workforce."
    ],
    fullBody: "In 2025, AEEM conducted a wide-reaching research study across 24 school districts in the West African sub-region. The data highlighted that secondary-to-tertiary school drop-out rates remain exceptionally high, primarily driven by geographic exclusion, lack of local representation in curriculum design, and severe infrastructure deficiencies. This policy briefing serves as a strategic roadmap for ministries of education, offering practical methods to integrate youth and student leadership directly into policy-making councils.",
    tags: ["Policy", "2025", "Research"]
  },
  'youth-mentorship-power': {
    title: "The Transformative Power of Youth Mentorship in Africa",
    isReport: false,
    type: "Blog Post",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200",
    readingTime: "6 min read",
    summary: "Mentorship is more than just guidance; it's a lifeline for students navigating complex educational landscapes with limited resources.",
    bulletPoints: [
      "Fosters a culture of mutual support and peer-to-peer teaching.",
      "Provides role models who share similar cultural and structural backgrounds.",
      "Creates direct networking opportunities for secondary and tertiary level scholars."
    ],
    fullBody: "Through the \"I AM SOMEBODY\" initiative, AEEM has discovered that academic excellence is heavily tied to emotional guidance and psychological resilience. When young scholars are paired with mentors who have navigated the exact same scholastic systems and emerged successfully, their confidence rates grow exponentially. This article unpacks our core methodology for building cross-institutional mentorship cohorts, matching students with experts in their desired career fields.",
    tags: ["Education", "Mentorship", "Community"]
  },
  'aeem-expansion-2026': {
    title: "Press Release: AEEM Announces Multi-Region Chapter Expansion",
    isReport: false,
    type: "Press Release",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
    readingTime: "4 min read",
    summary: "AEEM officially establishes three brand new operations chapters in central and eastern regions, expanding our footprint to reach more marginalized youth.",
    bulletPoints: [
      "New administrative offices established to coordinate local activities.",
      "Recruited 50+ local volunteer educators and community coordinators.",
      "Partnership agreements signed with ten new local schools and learning centers."
    ],
    fullBody: "We are thrilled to officially announce the physical expansion of the Africa Education Empowerment Movement. To meet the massive request for educational support services, we have launched new coordinated operational centers. This expansion will enable us to double our youth seminar and mentorship capacity by the end of 2026, creating unified leadership networks spanning multiple districts.",
    tags: ["News", "Expansion", "2026"]
  },
  'advocacy-toolkit': {
    title: "Advocacy Toolkit for Schools & Student Leaders",
    isReport: true,
    type: "Guide / Toolkit",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200",
    readingTime: "15 min read",
    summary: "A comprehensive, step-by-step workbook and advocacy checklist designed specifically for youth-led community action.",
    bulletPoints: [
      "Effective strategy guides for meeting with local school boards and councils.",
      "Step-by-step frameworks for organizing community advocacy rallies safely.",
      "Social media templates and public speaking outlines for student spokespeople."
    ],
    fullBody: "Empowering young minds is not just about teaching them core academic subjects; it is about giving them the active agency and tools to organize their peers. This hands-on workbook acts as a modular guide that any student union or youth coordinator can deploy to start lobby groups for cleaner schools, better books, and fairer local guidelines. It includes mock letters to school authorities, guidance on legal rights, and structural communication methods.",
    tags: ["Guide", "Advocacy", "Toolkits"]
  }
};

const ResourceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resource, setResource] = useState<ResourceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchStory = async () => {
        try {
          setLoading(true);
          setError(null);
  
          //Try fetch from supabase
          const { data, error } = await supabase
            .from('resources')
            .select('*')
            .eq('slug', slug)
            .single();
  
            if(error){
              throw error;
            }
  
            if (data){
              setResource(data);
            } else {
              const localStory = slug ? RESOURCES_DB[slug] : null;
              setResource(localStory);
            }
        } catch {
          console.warn('Supabase fetch failed or missing. Falling back to local Stories database:', error);
          const localResource =slug ?  RESOURCES_DB[slug] : null;
          setResource(localResource);
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
  
  if (!resource) {
    return (
      <div className="pt-40 pb-24 text-center max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center">
        <p className="text-gray-500 mb-6 text-lg">Resource not found.</p>
        <Link to="/resources" className="inline-flex items-center gap-2 font-bold text-aeem-gold hover:underline">
          <ArrowLeft size={16} /> Back to Knowledge Hub
        </Link>
      </div>
    );
  }

  const handleDownload = () => {
    alert(`Downloading: ${resource.title}.pdf (Simulated)`);
  };

  return (
    <>
      <Helmet>
        <title>{resource.title} | AEEM Resources</title>
        <meta name="description" content={resource.summary} />
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-aeem-gold mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Knowledge Hub
          </Link>

          <div className="flex items-center gap-3 text-aeem-gold font-bold uppercase tracking-widest text-xs mb-6">
             <span className="px-3 py-1 bg-aeem-gold/10 rounded-md">{resource.type}</span>
             <span className="flex items-center gap-1 text-gray-500"><Clock size={14} /> {resource.readingTime}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
             {resource.title}
          </h1>

          <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl ">
             <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-full object-cover"
             />
          </div>

          <div className="prose prose-lg max-w-none text-aeem leading-relaxed">
             <p className="text-xl font-medium text-aeem mb-8">
                {resource.summary}
             </p>

             <h2 className="text-2xl font-black text-aeem mt-12 mb-6">Core Points & Highlights</h2>
             <p>{resource.fullBody}</p>

             <ul className="space-y-4 my-8">
                {resource.bulletPoints.map((point, index) => (
                  <li key={index} className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded-full bg-aeem-gold/10 flex items-center justify-center text-aeem-gold shrink-0 mt-1">
                        {index + 1}
                     </div>
                     <span className="font-semibold text-aeem">{point}</span>
                  </li>
                ))}
             </ul>

             {resource.isReport && (
                <div className="my-16 p-10 bg-aeem rounded-[2.5rem] text-aeem flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-white/5">
                   <div>
                      <h3 className="text-2xl font-black mb-2 text-aeem-gold">Download Full Resource</h3>
                      <p className="text-aeem text-sm">Get the complete digital file, charts, and methodologies.</p>
                   </div>
                   <button 
                     onClick={handleDownload}
                     className="flex items-center gap-3 bg-aeem-gold text-aeem px-8 py-4 rounded-full font-bold hover:bg-white hover:text-aeem-focus hover:scale-105 active:scale-95 transition-all shrink-0 shadow-lg shadow-aeem-gold/20"
                   >
                      <Download size={24} /> Download PDF
                   </button>
                </div>
             )}
          </div>

          <div className="mt-20 pt-12 border-t border-aeem-focus flex justify-between items-center">
             <div className="flex gap-4">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Resource link copied to clipboard!");
                  }}
                  className="p-3 rounded-full bg-aeem-focus/30 text-aeem hover:bg-aeem-gold hover:text-white transition-all active:scale-95 shadow-sm"
                  aria-label="Share"
                >
                  <Share2 size={20} />
                </button>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-aeem-gold uppercase">Tags:</span>
                {resource.tags.map((tag) => (
                  <span key={tag} className="text-xs font-bold px-3 py-1 bg-aeem rounded-md text-aeem">
                    {tag}
                  </span>
                ))}
             </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourceDetail;
