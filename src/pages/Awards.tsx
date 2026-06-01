import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Search, Loader2, CheckCircle2, XCircle, Calendar, FileText, Tag } from 'lucide-react';
import { supabase } from '../services/supabase';

interface AwardData {
  id: string;
  verification_code: string;
  recipient_name: string;
  award_type: string;
  issue_date: string;
  description: string;
  metadata: {
    photo_url?: string;
    identity_ref?: string;
    category?: string;
    [key: string]: unknown;
  };
}

const Awards: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AwardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('verification_code', code.trim().toUpperCase())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Invalid verification code. Please check and try again.');
        } else {
          throw error;
        }
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('An error occurred during verification. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Recognition & Awards | AEEM</title>
        <meta name="description" content="AEEM's future cryptographic verification and award system for educational excellence." />
      </Helmet>

      <section className="pt-40 pb-24 bg-aeem overflow-hidden relative">
        <div className="absolute top-40 right-0 w-1/2 h-1/2 bg-aeem-gold/5 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Verification System</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Recognition & <span className="text-aeem-gold">Awards</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              We are building a revolutionary verification system to honor educational excellence and community impact across Africa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-aeem-gold/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="bg-aeem-focus/10 p-8 md:p-12 rounded-[2.5rem] shadow-soft border border-aeem-border">
               <h2 className="text-3xl font-black mb-6">Verify Achievement</h2>
               <p className="text-aeem mb-8 leading-relaxed">
                 Enter the unique verification code found on your AEEM certificate to validate its authenticity.
               </p>

               <form onSubmit={handleVerify} className="relative mb-8">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g., AEEM-2026-LDR-001"
                    className="w-full pl-6 pr-16 bg-aeem-focus/10 py-5 rounded-2xl border border-aeem-border focus:outline-none focus:border-aeem-gold transition-all font-bold tracking-wider uppercase"
                  />
                  <button
                    disabled={loading}
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-aeem-gold/50 text-white rounded-xl flex items-center justify-center hover:bg-aeem-gold transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                  </button>
               </form>

               {error && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex dark:bg-black/50 items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 mb-8"
                 >
                   <XCircle size={20} />
                   <span className="text-sm font-bold">{error}</span>
                 </motion.div>
               )}

               {result && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="bg-green-50/50 rounded-[2rem] border border-green-100 overflow-hidden"
                 >
                    <div className="p-6 bg-green-50 border-b border-green-100 flex items-center justify-between">
                       <div className="flex items-center gap-2 text-green-700 font-bold">
                          <CheckCircle2 size={20} />
                          Verified Achievement
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-white px-3 py-1 rounded-full shadow-sm">
                          ID: {result.verification_code}
                       </span>
                    </div>

                    <div className="p-8">
                       <div className="flex items-start gap-6 mb-8">
                          <div className="w-24 h-24 rounded-2xl bg-aeem p-1 shadow-sm border border-aeem-border flex-shrink-0 overflow-hidden">
                             <img
                               src={result.metadata.photo_url || "/assets/logo.jpg"}
                               alt={result.recipient_name}
                               className="w-full h-full object-cover rounded-xl"
                             />
                          </div>
                          <div>
                             <h3 className="text-2xl font-black text-aeem mb-1">{result.recipient_name}</h3>
                             <p className="text-aeem-gold font-bold uppercase tracking-widest text-xs">{result.award_type}</p>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-white dark:bg-black flex items-center justify-center text-aeem-gold shadow-sm border border-gray-50">
                                <Calendar size={18} />
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Issue Date</p>
                                <p className="text-sm font-black text-aeem">{new Date(result.issue_date).toLocaleDateString()}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-aeem-focus/70 flex items-center justify-center text-aeem-gold shadow-sm border border-gray-50">
                                <Tag size={18} />
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Category</p>
                                <p className="text-sm font-black text-aeem">{result.metadata.category || "Excellence"}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 sm:col-span-2">
                             <div className="w-10 h-10 rounded-full bg-aeem-focus/70 flex items-center justify-center text-aeem-gold shadow-sm border border-gray-50">
                                <FileText size={18} />
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase">Identity Reference</p>
                                <p className="text-sm font-black text-aeem">{result.metadata.identity_ref || "N/A"}</p>
                             </div>
                          </div>
                       </div>

                       <div className="p-6 bg-aeem rounded-2xl border border-gray-100">
                          <p className="text-sm text-gray-500 leading-relaxed italic">
                             "{result.description}"
                          </p>
                       </div>
                    </div>
                 </motion.div>
               )}

               {!result && !error && (
                 <div className="text-center py-8 grayscale opacity-50">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       <ShieldCheck size={32} />
                    </div>
                    <p className="text-sm font-bold text-gray-400">Waiting for verification code...</p>
                 </div>
               )}
            </div>

            <div className="lg:sticky lg:top-32 space-y-12">
               <div className="bg-aeem-gold/10 p-10 rounded-[2.5rem] border border-gray-100 shadow-soft">
                  <h3 className="text-2xl font-black mb-6 flex items-center gap-4">
                    <Award className="text-aeem-gold" size={28} />
                    Excellence Awards
                  </h3>
                  <p className="text-aeem leading-relaxed mb-8">
                    Annual recognition for schools and youth leaders who demonstrate exceptional commitment to educational empowerment and local community growth.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Secure, verifiable digital certificates",
                      "Institutional merit verification",
                      "Public achievement profiles"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <ShieldCheck size={16} />
                        </div>
                        <span className="text-sm font-semibold text-aeem-gold/90">{item}</span>
                      </div>
                    ))}
                  </ul>
               </div>

               <div className="px-10">
                  <h3 className="text-2xl font-black mb-4 flex items-center gap-4">
                    <ShieldCheck className="text-aeem-gold" size={28} />
                    Verification Standards
                  </h3>
                  <p className="text-aeem leading-relaxed">
                    Our rigorous standards ensure that every award represents genuine impact and verified progress toward educational equity. Every certificate is cryptographically signed and stored in our secure database.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="py-24 bg-aeem">
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
