import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Award, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Awards: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Recognition & Awards | AEEM</title>
        <meta name="description" content="AEEM's future cryptographic verification and award system for educational excellence." />
      </Helmet>

      <section className="pt-40 pb-24 bg-white overflow-hidden relative">
        <div className="absolute top-40 right-0 w-1/2 h-1/2 bg-aeem-gold/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Verification System</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Recognition & <span className="text-aeem-gold">Awards</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              We are building a revolutionary verification system to honor educational excellence and community impact across Africa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8">
                  <div className="w-20 h-20 bg-aeem-gold/10 rounded-full flex items-center justify-center text-aeem-gold">
                    <Lock size={40} />
                  </div>
               </div>
               <h2 className="text-3xl font-black mb-6">Verification Coming Soon</h2>
               <p className="text-gray-600 mb-8 leading-relaxed">
                 Our cryptographic award verification system is currently in development. Phase 2 of the AEEM platform will introduce immutable proof of achievement for students, mentors, and partner schools.
               </p>
               <ul className="space-y-4 mb-10">
                 {[
                   "Secure, verifiable digital certificates",
                   "Blockchain-backed impact reporting",
                   "Institutional merit verification",
                   "Public achievement profiles"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                       <ShieldCheck size={12} />
                     </div>
                     <span className="text-sm font-semibold text-gray-700">{item}</span>
                   </div>
                 ))}
               </ul>
               <Link to="/get-involved" className="inline-flex items-center gap-3 bg-aeem-charcoal text-white px-8 py-4 rounded-full font-bold hover:bg-aeem-gold transition-colors group">
                 Get Notified <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </Link>
            </div>

            <div className="space-y-12">
               <div>
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-4">
                    <Award className="text-aeem-gold" size={28} />
                    Excellence Awards
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Annual recognition for schools and youth leaders who demonstrate exceptional commitment to educational empowerment and local community growth.
                  </p>
               </div>
               <div>
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-4">
                    <ShieldCheck className="text-aeem-gold" size={28} />
                    Verification Standards
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our rigorous standards ensure that every award represents genuine impact and verified progress toward educational equity.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-16">Future-Ready Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { phase: "Phase 1", title: "Public Trust", desc: "Establishing credibility and community engagement (Current)." },
              { phase: "Phase 2", title: "Verification", desc: "Cryptographic award system and merit tracking." },
              { phase: "Phase 3", title: "Accountability", desc: "Field reporting and institutional dashboards." }
            ].map((step, i) => (
              <div key={i} className={`p-8 rounded-2xl border-2 transition-all ${i === 1 ? 'border-aeem-gold bg-aeem-gold/5 shadow-lg' : 'border-gray-100 grayscale'}`}>
                <span className="text-xs font-bold uppercase tracking-widest mb-4 block">{step.phase}</span>
                <h4 className="text-xl font-bold mb-4">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Awards;
