import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Users, Heart, Briefcase, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';

const GetInvolved: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner' | 'donor'>('volunteer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            inquiry_type: activeTab,
            ...formData
          }
        ]);

      if (error) throw error;
      setSubmitted(true);
      setFormData({ full_name: '', email: '', phone: '', organization: '', message: '' });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to submit inquiry. Please try again.';
      console.error('Submission error:', err);
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'volunteer', icon: Users, title: 'Volunteer', desc: 'Lend your skills and time to our programs.' },
    { id: 'partner', icon: Briefcase, title: 'Partner', desc: 'Institutional collaborations for scale.' },
    { id: 'donor', icon: Heart, title: 'Give Monthly', desc: 'Sustainable funding for educational equity.' }
  ];

  return (
    <>
      <Helmet>
        <title>Get Involved | Join the AEEM Movement</title>
      </Helmet>

      <section className="pt-40 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Take Action</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Join the <span className="text-aeem-gold">Movement</span></h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a student, a professional, or an institution, there's a place for you in AEEM.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Tabs */}
            <div className="lg:col-span-4 space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as 'volunteer' | 'partner' | 'donor'); setSubmitted(false); }}
                  className={`w-full text-left p-8 rounded-3xl transition-all border-2 ${activeTab === tab.id ? 'border-aeem-gold bg-aeem-gold/5 shadow-lg shadow-aeem-gold/10' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${activeTab === tab.id ? 'bg-aeem-gold text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <tab.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tab.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tab.desc}</p>
                </button>
              ))}
            </div>

            {/* Form Area */}
            <div className="lg:col-span-8 bg-gray-50 rounded-[2.5rem] p-8 md:p-16 border border-gray-100">
              {submitted ? (
                <div className="text-center py-20">
                   <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} />
                   </div>
                   <h2 className="text-3xl font-black mb-4">Message Received!</h2>
                   <p className="text-gray-600 max-w-md mx-auto mb-10">
                     Thank you for your interest in AEEM. Our team will review your {activeTab} inquiry and get back to you within 48 hours.
                   </p>
                   <button
                     onClick={() => setSubmitted(false)}
                     className="px-10 py-4 bg-aeem-charcoal text-white rounded-full font-bold hover:bg-aeem-gold transition-colors"
                   >
                     Submit Another Request
                   </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Inquiry</h2>
                  <p className="text-gray-500 mb-12">Fill out the form below and we'll reach out to discuss how we can work together.</p>

                  {error && (
                    <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                          <input
                            required
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-aeem-gold transition-colors"
                            placeholder="John Doe"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                          <input
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-aeem-gold transition-colors"
                            placeholder="john@example.com"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number (Optional)</label>
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-aeem-gold transition-colors"
                            placeholder="+232 00 000000"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{activeTab === 'partner' ? 'Organization' : 'School / Organization'}</label>
                          <input
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-aeem-gold transition-colors"
                            placeholder="Your organization"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Your Message</label>
                       <textarea
                         required
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         rows={5}
                         className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-aeem-gold transition-colors"
                         placeholder="How would you like to contribute?"
                       />
                    </div>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-aeem-charcoal text-white py-5 rounded-2xl font-black text-lg hover:bg-aeem-gold transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? <><Loader2 className="animate-spin" /> Submitting...</> : <>Submit Inquiry <Sparkles size={20} /></>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetInvolved;
