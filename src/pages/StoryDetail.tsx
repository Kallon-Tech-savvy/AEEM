import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, CheckCircle2 } from 'lucide-react';

const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // In a real app, we would fetch based on slug.
  // For MVP, we'll hardcode the "I AM SOMEBODY" content.
  const isIAmSomebody = slug === 'i-am-somebody';

  if (!isIAmSomebody) {
    return <div className="pt-40 px-6 max-w-7xl mx-auto">Story not found. <Link to="/impact" className="text-aeem-gold">Go back</Link></div>;
  }

  return (
    <>
      <Helmet>
        <title>I AM SOMEBODY Initiative | AEEM Case Study</title>
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link to="/impact" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-aeem-gold mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Impact
          </Link>

          <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">I AM SOMEBODY Initiative</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 italic">
            "A movement to instill agency, resilience, and leadership in the next generation of African scholars."
          </p>

          <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
            <img
               src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
               alt="I AM SOMEBODY workshop"
               className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 p-10 bg-gray-50 rounded-3xl">
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Participants</h4>
                <p className="text-2xl font-black">42 Students</p>
             </div>
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Partner Schools</h4>
                <p className="text-2xl font-black">6 Institutions</p>
             </div>
             <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-aeem-gold mb-2">Duration</h4>
                <p className="text-2xl font-black">2-Day Workshop</p>
             </div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
             <h2 className="text-3xl font-black text-aeem-charcoal">Overview</h2>
             <p>
               The "I AM SOMEBODY" initiative was designed as a high-impact empowerment program to address the critical gaps in traditional education. Beyond textbooks, we focused on the human element—leadership, civic awareness, and personal resilience.
             </p>

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

             <h2 className="text-3xl font-black text-aeem-charcoal">The Impact</h2>
             <p>
               Participants reported a significant increase in their confidence to lead school initiatives and a deeper understanding of their roles as active citizens in Sierra Leone. By training 42 participants from six different schools, AEEM created a cross-institutional network of youth leaders ready to advocate for educational equity.
             </p>

             <blockquote className="border-l-4 border-aeem-gold pl-8 py-4 italic text-2xl font-medium text-aeem-charcoal my-12">
               "This workshop changed how I view my future. I realized that my voice matters and that I have the power to create change in my community."
               <footer className="mt-4 text-sm font-bold text-gray-400">— Participant from Prince of Wales School</footer>
             </blockquote>
          </div>

          <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center">
             <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full font-bold hover:bg-aeem-gold hover:text-white transition-all">
                  <Share2 size={18} /> Share Impact
                </button>
             </div>
             <Link to="/get-involved" className="bg-aeem-charcoal text-white px-10 py-4 rounded-full font-bold hover:bg-aeem-gold transition-all">
                Support Similar Programs
             </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default StoryDetail;
