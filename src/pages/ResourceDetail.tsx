import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Download, BookOpen } from 'lucide-react';

const ResourceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Mock data
  const isReport = slug === 'equity-report-2025';

  return (
    <>
      <Helmet>
        <title>{isReport ? 'Educational Equity Report 2025' : 'Youth Mentorship Power'} | AEEM Resources</title>
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-aeem-gold mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Knowledge Hub
          </Link>

          <div className="flex items-center gap-3 text-aeem-gold font-bold uppercase tracking-widest text-xs mb-6">
             <span className="px-3 py-1 bg-aeem-gold/10 rounded-md">{isReport ? 'Policy Report' : 'Blog Post'}</span>
             <span className="flex items-center gap-1 text-gray-400"><Clock size={14} /> 8 min read</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
             {isReport ? 'Educational Equity Report 2025: Barriers & Breakthroughs' : 'The Transformative Power of Youth Mentorship in Africa'}
          </h1>

          <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
             <img
                src={isReport ? "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200" : "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200"}
                alt="Resource banner"
                className="w-full h-full object-cover"
             />
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
             <p className="text-xl font-medium text-aeem-charcoal mb-8">
                {isReport
                   ? "This comprehensive report examines the systemic challenges facing students across West Africa and proposes actionable policy reforms."
                   : "Mentorship is more than just guidance; it's a lifeline for students navigating complex educational landscapes with limited resources."
                }
             </p>

             <h2 className="text-2xl font-black text-aeem-charcoal mt-12 mb-6">Summary of Findings</h2>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

             <ul className="space-y-4 my-8">
                <li className="flex gap-4">
                   <div className="w-6 h-6 rounded-full bg-aeem-gold/10 flex items-center justify-center text-aeem-gold shrink-0 mt-1">1</div>
                   <span>Systemic inequality remains the primary barrier to higher education access.</span>
                </li>
                <li className="flex gap-4">
                   <div className="w-6 h-6 rounded-full bg-aeem-gold/10 flex items-center justify-center text-aeem-gold shrink-0 mt-1">2</div>
                   <span>Community-led mentorship programs show a 40% increase in student retention rates.</span>
                </li>
                <li className="flex gap-4">
                   <div className="w-6 h-6 rounded-full bg-aeem-gold/10 flex items-center justify-center text-aeem-gold shrink-0 mt-1">3</div>
                   <span>Digital literacy is no longer optional; it is a fundamental requirement for the modern workforce.</span>
                </li>
             </ul>

             {isReport && (
                <div className="my-16 p-10 bg-aeem-charcoal rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                   <div>
                      <h3 className="text-2xl font-black mb-2">Download Full Report</h3>
                      <p className="text-gray-400">Get the complete 45-page PDF with all data and methodology.</p>
                   </div>
                   <button className="flex items-center gap-3 bg-aeem-gold text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shrink-0">
                      <Download size={20} /> Download PDF
                   </button>
                </div>
             )}
          </div>

          <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center">
             <div className="flex gap-4">
                <button className="p-3 rounded-full bg-gray-100 text-gray-400 hover:text-aeem-gold transition-all"><Share2 size={20} /></button>
             </div>
             <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 uppercase">Tags:</span>
                <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-md">Policy</span>
                <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-md">2026</span>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourceDetail;
