import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe } from 'lucide-react';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import { FloatingInput, FloatingTextarea, SubmitButton } from '../components/motion/FormField';
import { SpotlightCard } from '../components/motion/SpotlightCard';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
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
        .insert([{ inquiry_type: 'contact', ...formData }]);

      if (error) throw error;
      setSubmitted(true);
      setFormData({ full_name: '', email: '', phone: '', message: '' });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      console.error('Submission error:', err);
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact AEEM | Get in Touch</title>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-[#afb] dark:from-[#111] to-aeem-bg dark:to-aeem-charcoal text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-full md:w-[60%] h-full pointer-events-none opacity-[0.5] dark:opacity-[0.1] mix-blend-screen z-0">
          <img 
            src="/assets/Illustrate Africa 2.png" 
            alt="" 
            className="w-full h-full object-fill md:object-contain object-right-top drop-shadow-2xl"
          />
        </div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-aeem-gold/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-6">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight drop-shadow-lg">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-aeem-gold to-yellow-300">AEEM</span>
            </h1>
            <p className="text-xl text-zinc-800 dark:text-gray-300 mb-12 leading-relaxed font-medium">
              Have questions or want to learn more about our initiatives? We're here to help. Reach out to our team directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-gray-50 dark:bg-[#0f1115] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-8">
               <div>
                  <h2 className="text-3xl font-black mb-10 text-aeem-charcoal dark:text-white drop-shadow-sm">Reach Us Directly</h2>
                  <div className="space-y-6">
                     {[
                       { icon: Mail, title: "Email", value: "africaseducationempowermentmov@gmail.com", sub: "We reply within 24 hours." },
                       { icon: Phone, title: "Phone", value: "+232 76 406 281", sub: "Mon - Fri, 9am - 5pm GMT." },
                       { icon: MapPin, title: "Office", value: "Freetown, Sierra Leone", sub: "The heart of our operations." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 p-6 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-14 h-14 bg-gradient-to-br from-aeem-gold/20 to-aeem-gold/5 border border-aeem-gold/20 rounded-2xl flex items-center justify-center text-aeem-gold shrink-0 shadow-inner">
                             <item.icon size={24} />
                          </div>
                          <div>
                             <h4 className="font-black text-lg mb-1 text-aeem-charcoal dark:text-white">{item.title}</h4>
                             <p className="text-gray-800 dark:text-gray-200 font-bold">{item.value}</p>
                             <p className="text-gray-500 text-sm font-medium mt-1">{item.sub}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="p-8 rounded-[2rem] bg-gradient-to-br from-aeem-charcoal to-[#1a1d24] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10">
                    <Globe size={150} />
                  </div>
                  <h3 className="font-black text-xl mb-4 flex items-center gap-3 relative z-10">
                     <Globe className="text-aeem-gold" size={24} /> Global Presence
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed font-medium relative z-10">
                     AEEM is expanding across the continent. If you're interested in starting a chapter in your region, please mention <span className="text-aeem-gold font-bold">"New Chapter"</span> in your message.
                  </p>
               </div>
            </div>

            {/* Glassmorphic Form Card */}
            <div className="lg:col-span-7">
               <SpotlightCard className="relative bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-14 border border-gray-200 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                 {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="text-center py-16"
                    >
                       <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-green-50 dark:ring-green-900/10 shadow-inner">
                          <CheckCircle2 size={48} />
                       </div>
                       <h2 className="text-3xl font-black mb-4 text-aeem-charcoal dark:text-white">Message Sent!</h2>
                       <p className="text-gray-600 dark:text-gray-300 mb-10 font-medium">
                          Thank you for reaching out. We've received your message and will get back to you shortly.
                       </p>
                       <button
                          onClick={() => setSubmitted(false)}
                          className="px-10 py-4 bg-aeem-charcoal dark:bg-white text-white dark:text-aeem-charcoal rounded-full font-bold hover:bg-aeem-gold dark:hover:bg-aeem-gold dark:hover:text-white transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-95"
                       >
                          Send Another Message
                       </button>
                    </motion.div>
                 ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                       {error && (
                          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 text-sm font-bold rounded-r-xl">
                             {error}
                          </div>
                       )}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FloatingInput
                             required
                             id="full_name"
                             label="Full Name"
                             name="full_name"
                             value={formData.full_name}
                             onChange={handleChange}
                             type="text"
                             placeholder="Your Name"
                          />
                          <FloatingInput
                             required
                             id="email"
                             label="Email Address"
                             name="email"
                             value={formData.email}
                             onChange={handleChange}
                             type="email"
                             placeholder="email@example.com"
                          />
                       </div>
                       <FloatingInput
                          id="phone"
                          label="Phone / Subject"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          type="text"
                          placeholder="How can we help?"
                       />
                       <FloatingTextarea
                          required
                          id="message"
                          label="Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          placeholder="Tell us more about your inquiry..."
                       />
                       <SubmitButton isSubmitting={isSubmitting} submitted={submitted}>
                          {isSubmitting ? 'Sending...' : <><Send size={20} /> Send Message</>}
                       </SubmitButton>
                    </form>
                 )}
               </SpotlightCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;