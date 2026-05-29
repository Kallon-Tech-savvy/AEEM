import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Award as AwardIcon, ShieldCheck, Lock, ArrowRight, Search, Loader2, CheckCircle2, XCircle, Building2, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Award } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const Awards: React.FC = () => {
  const [searchCode, setSearchCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedAward, setVerifiedAward] = useState<Award | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setIsVerifying(true);
    setError(null);
    setVerifiedAward(null);

    try {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('verification_code', searchCode.trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('No award found with this verification code.');
        } else {
          throw error;
        }
      } else {
        setVerifiedAward(data);
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      setError('An error occurred during verification. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Recognition & Awards | AEEM Verification System</title>
        <meta name="description" content="Verify AEEM educational excellence awards and explore our recognition standards." />
      </Helmet>

      <section className="pt-40 pb-24 bg-aeem-charcoal text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-aeem-gold/5 -skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Trust & Accountability</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Recognition & <span className="text-aeem-gold">Awards</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-10">
              Our verifiable recognition system honors educational excellence and community impact across Africa with radical transparency.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Verification Tool */}
            <div className="lg:col-span-7">
               <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-16 border border-gray-100 shadow-sm">
                  <h2 className="text-3xl font-black mb-6">Award Verification</h2>
                  <p className="text-gray-500 mb-10 leading-relaxed">
                    Enter the unique verification code found on the AEEM certificate to validate its authenticity and view official award details.
                  </p>

                  <form onSubmit={handleVerify} className="relative mb-12">
                    <div className="relative group">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-aeem-gold transition-colors" size={24} />
                      <input
                        required
                        type="text"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                        placeholder="e.g., AEEM-2026-LDR-001"
                        className="w-full pl-16 pr-40 py-6 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:border-aeem-gold transition-all text-lg font-bold tracking-wider shadow-sm"
                      />
                      <button
                        disabled={isVerifying}
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-aeem-charcoal text-white px-8 py-3.5 rounded-xl font-black hover:bg-aeem-gold transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {isVerifying ? <Loader2 className="animate-spin" size={20} /> : 'Verify'}
                      </button>
                    </div>
                  </form>

                  <AnimatePresence mode="wait">
                    {verifiedAward && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-3xl p-10 border-2 border-green-500/20 shadow-xl shadow-green-500/5"
                      >
                        <div className="flex items-center gap-4 text-green-600 font-black uppercase tracking-[0.2em] text-xs mb-8">
                           <CheckCircle2 size={20} /> Award Authenticity Verified
                        </div>

                        <div className="space-y-8">
                           <div>
                              <h3 className="text-4xl font-black text-aeem-charcoal mb-2">{verifiedAward.recipient_name}</h3>
                              <p className="text-aeem-gold font-bold text-xl">{verifiedAward.award_title}</p>
                           </div>

                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-gray-50">
                              <div className="flex gap-4">
                                 <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                                    <Building2 size={20} />
                                 </div>
                                 <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Institution</p>
                                    <p className="font-bold text-aeem-charcoal">{verifiedAward.institution || 'AEEM Global'}</p>
                                 </div>
                              </div>
                              <div className="flex gap-4">
                                 <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                                    <Calendar size={20} />
                                 </div>
                                 <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Issue Date</p>
                                    <p className="font-bold text-aeem-charcoal">{new Date(verifiedAward.issue_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                 </div>
                              </div>
                           </div>

                           <div className="flex gap-4">
                                 <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                                    <FileText size={20} />
                                 </div>
                                 <div>
                                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Citation</p>
                                    <p className="text-gray-600 leading-relaxed italic">{verifiedAward.description}</p>
                                 </div>
                           </div>

                           <div className="pt-4">
                              <button className="w-full py-4 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-500 hover:bg-aeem-gold hover:text-white hover:border-aeem-gold transition-all flex items-center justify-center gap-2">
                                 <FileText size={18} /> Download Verification Record
                              </button>
                           </div>
                        </div>
                      </motion.div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center"
                      >
                        <XCircle className="text-red-500 mx-auto mb-4" size={40} />
                        <h4 className="font-bold text-red-900 mb-2">Verification Failed</h4>
                        <p className="text-red-700 text-sm">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>

            {/* Sidebar / Info */}
            <div className="lg:col-span-5 space-y-8">
               <div className="bg-aeem-gold p-10 rounded-[2.5rem] text-white">
                  <h3 className="text-2xl font-black mb-6">Our Standards</h3>
                  <div className="space-y-6">
                     {[
                       { title: "Academic Rigor", desc: "Recognizing students who show exceptional growth and perseverance." },
                       { title: "Leadership", desc: "Honoring those who lead community change initiatives." },
                       { title: "Innovation", desc: "Celebrating creative solutions to educational barriers." }
                     ].map((std, i) => (
                       <div key={i} className="flex gap-4">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-1">
                             <CheckCircle2 size={14} />
                          </div>
                          <div>
                             <h4 className="font-bold mb-1">{std.title}</h4>
                             <p className="text-sm text-white/70 leading-relaxed">{std.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="p-10 border border-gray-100 rounded-[2.5rem]">
                  <Lock className="text-aeem-gold mb-6" size={32} />
                  <h3 className="text-xl font-black mb-4 text-aeem-charcoal">Cryptographic Proof</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    We are transitioning to a blockchain-backed system to provide immutable proof of achievement that students can carry throughout their careers.
                  </p>
                  <Link to="/contact" className="text-aeem-gold font-bold text-sm flex items-center gap-2 group">
                    Learn about Phase 2 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Awards;
