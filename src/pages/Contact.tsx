import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Globe, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabase';
import { z } from 'zod';

const contactSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const [formData, setFormData] = useState<ContactFormData>({
    full_name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name as keyof ContactFormData]) {
      setFieldErrors({ ...fieldErrors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      const validatedData = contactSchema.parse(formData);
      const { error: supabaseError } = await supabase
        .from('inquiries')
        .insert([
          {
            inquiry_type: 'contact',
            ...validatedData
          }
        ]);

      if (supabaseError) throw supabaseError;
      setSubmitted(true);
      setFormData({ full_name: '', email: '', phone: '', message: '' });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Partial<Record<keyof ContactFormData, string>> = {};
        err.errors.forEach((e) => {
          const path = e.path[0] as keyof ContactFormData;
          if (path) errors[path] = e.message;
        });
        setFieldErrors(errors);
      } else {
        const errorMsg = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
        console.error('Submission error:', err);
        setError(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact AEEM | Get in Touch</title>
      </Helmet>

      <section className="pt-40 pb-24 bg-aeem-charcoal text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-aeem-gold/5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Get in Touch</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Contact <span className="text-aeem-gold">AEEM</span></h1>
            <p className="text-xl text-gray-400">
              Have questions or want to learn more about our initiatives? We're here to help. Reach out to our team directly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
               <div>
                  <h2 className="text-3xl font-black mb-8">Reach Us Directly</h2>
                  <div className="space-y-8">
                     <div className="flex gap-6">
                        <div className="w-14 h-14 bg-aeem-gold/10 rounded-2xl flex items-center justify-center text-aeem-gold shrink-0">
                           <Mail size={24} />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg mb-1">Email</h4>
                           <p className="text-gray-500">info@aeem.org</p>
                           <p className="text-gray-500 text-sm">Our team typically responds within 24 hours.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-14 h-14 bg-aeem-gold/10 rounded-2xl flex items-center justify-center text-aeem-gold shrink-0">
                           <Phone size={24} />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg mb-1">Phone</h4>
                           <p className="text-gray-500">+232 77 123456</p>
                           <p className="text-gray-500 text-sm">Mon - Fri, 9am - 5pm GMT.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="w-14 h-14 bg-aeem-gold/10 rounded-2xl flex items-center justify-center text-aeem-gold shrink-0">
                           <MapPin size={24} />
                        </div>
                        <div>
                           <h4 className="font-bold text-lg mb-1">Office</h4>
                           <p className="text-gray-500">Freetown, Sierra Leone</p>
                           <p className="text-gray-500 text-sm">The heart of our West African operations.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-gray-50 p-8 rounded-[2rem]">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
                     <Globe className="text-aeem-gold" size={24} /> Global Presence
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                     AEEM is expanding across the continent. If you're interested in starting a chapter in your region, please mention "New Chapter" in your message.
                  </p>
               </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-16 border border-gray-100 shadow-2xl">
               {submitted ? (
                  <div className="text-center py-12">
                     <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                     </div>
                     <h2 className="text-3xl font-black mb-4">Message Sent!</h2>
                     <p className="text-gray-600 mb-10">
                        Thank you for reaching out. We've received your message and will get back to you shortly.
                     </p>
                     <button
                        onClick={() => setSubmitted(false)}
                        className="px-10 py-4 bg-aeem-charcoal text-white rounded-full font-bold hover:bg-aeem-gold transition-colors"
                     >
                        Send Another Message
                     </button>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                     {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
                           {error}
                        </div>
                     )}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                           <input
                              required
                              name="full_name"
                              value={formData.full_name}
                              onChange={handleChange}
                              type="text"
                              className={`w-full bg-gray-50 border ${fieldErrors.full_name ? 'border-red-500' : 'border-transparent'} rounded-2xl px-6 py-4 focus:outline-none focus:bg-white focus:border-aeem-gold transition-all`}
                              placeholder="Your Name"
                           />
                           {fieldErrors.full_name && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle size={10} /> {fieldErrors.full_name}</p>}
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                           <input
                              required
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="email"
                              className={`w-full bg-gray-50 border ${fieldErrors.email ? 'border-red-500' : 'border-transparent'} rounded-2xl px-6 py-4 focus:outline-none focus:bg-white focus:border-aeem-gold transition-all`}
                              placeholder="email@example.com"
                           />
                           {fieldErrors.email && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle size={10} /> {fieldErrors.email}</p>}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Subject (Optional)</label>
                        <input
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           type="text"
                           className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 focus:outline-none focus:bg-white focus:border-aeem-gold transition-all"
                           placeholder="How can we help?"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Message</label>
                        <textarea
                           required
                           name="message"
                           value={formData.message}
                           onChange={handleChange}
                           rows={6}
                           className={`w-full bg-gray-50 border ${fieldErrors.message ? 'border-red-500' : 'border-transparent'} rounded-2xl px-6 py-4 focus:outline-none focus:bg-white focus:border-aeem-gold transition-all`}
                           placeholder="Tell us more..."
                        />
                        {fieldErrors.message && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle size={10} /> {fieldErrors.message}</p>}
                     </div>
                     <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-aeem-charcoal text-white py-5 rounded-2xl font-black text-lg hover:bg-aeem-gold transition-all shadow-xl flex items-center justify-center gap-3"
                     >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Send Message</>}
                     </button>
                  </form>
               )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
