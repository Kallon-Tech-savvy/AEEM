import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { supabase } from '../services/supabase';

const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    school_or_org: '',
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
      // In a real app, we'd fetch the event ID first. For MVP, we'll use a placeholder UUID if we don't have one.
      const { error } = await supabase
        .from('event_registrations')
        .insert([
          {
            event_id: '00000000-0000-0000-0000-000000000000', // Placeholder
            ...formData
          }
        ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock event data
  const event = {
    title: slug === 'summit-2026' ? "AEEM Education Summit 2026" : "Youth Leadership Workshop",
    date: slug === 'summit-2026' ? "August 15, 2026" : "September 22, 2026",
    location: slug === 'summit-2026' ? "Freetown City Council Hall" : "Makeni University Campus",
    image: slug === 'summit-2026'
      ? "https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&q=80&w=1200"
      : "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200"
  };

  return (
    <>
      <Helmet>
        <title>{event.title} | AEEM Events</title>
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/events" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-aeem-gold mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Events
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
             <div>
                <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                   <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{event.title}</h1>
                <div className="flex flex-wrap gap-8 mb-12">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-aeem-gold/10 rounded-full flex items-center justify-center text-aeem-gold">
                         <Calendar size={18} />
                      </div>
                      <span className="font-bold">{event.date}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-aeem-gold/10 rounded-full flex items-center justify-center text-aeem-gold">
                         <MapPin size={18} />
                      </div>
                      <span className="font-bold">{event.location}</span>
                   </div>
                </div>
                <div className="prose prose-lg text-gray-600">
                   <p>Join us for this transformative experience as we gather the brightest minds and most passionate advocates to reshape the educational landscape of Africa.</p>
                   <p>The event will feature keynote speeches, interactive workshops, and networking sessions designed to spark innovation and foster collaboration between students, educators, and policy makers.</p>
                </div>
             </div>

             <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 sticky top-32">
                {submitted ? (
                   <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                         <CheckCircle2 size={40} />
                      </div>
                      <h2 className="text-3xl font-black mb-4">Registration Confirmed!</h2>
                      <p className="text-gray-600 mb-10">
                         Thank you for registering. You will receive a confirmation email with further details shortly.
                      </p>
                      <Link to="/events" className="inline-block px-10 py-4 bg-aeem-charcoal text-white rounded-full font-bold hover:bg-aeem-gold transition-colors">
                         View Other Events
                      </Link>
                   </div>
                ) : (
                   <>
                      <h2 className="text-3xl font-black mb-8">Register Now</h2>
                      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}
                      <form onSubmit={handleSubmit} className="space-y-6">
                         <input
                            required
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:border-aeem-gold transition-colors"
                         />
                         <input
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:border-aeem-gold transition-colors"
                         />
                         <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:border-aeem-gold transition-colors"
                         />
                         <input
                            name="school_or_org"
                            value={formData.school_or_org}
                            onChange={handleChange}
                            placeholder="School or Organization"
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:border-aeem-gold transition-colors"
                         />
                         <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="What do you hope to learn?"
                            rows={3}
                            className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:border-aeem-gold transition-colors"
                         />
                         <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full py-5 bg-aeem-gold text-white rounded-2xl font-black text-lg hover:bg-aeem-charcoal transition-all shadow-xl flex items-center justify-center gap-3"
                         >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Sparkles size={20} /> Register for Event</>}
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

export default EventDetail;
