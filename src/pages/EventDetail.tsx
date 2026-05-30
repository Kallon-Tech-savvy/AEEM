import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { supabase } from '../services/supabase';

interface EventType {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  event_date: string;
  location: string | null;
  cover_image_url: string | null;
  status: 'upcoming' | 'completed';
}

const FALLBACK_EVENTS: Record<string, EventType> = {
  'summit-2026': {
    id: 'f-1',
    title: "AEEM Education Summit 2026",
    slug: "summit-2026",
    event_date: "2026-08-15",
    location: "Freetown City Council Hall",
    status: "upcoming",
    cover_image_url: "https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&q=80&w=1200",
    description: "Bringing together policy makers, educators, and youth leaders to discuss the future of inclusive education in West Africa."
  },
  'leadership-workshop': {
    id: 'f-2',
    title: "Youth Leadership Workshop",
    slug: "leadership-workshop",
    event_date: "2026-09-22",
    location: "Makeni University Campus",
    status: "upcoming",
    cover_image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
    description: "A hands-on training session for student leaders focused on advocacy and community organizing."
  }
};

const EventDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event:', err);
        if (slug && FALLBACK_EVENTS[slug]) {
          setEvent(FALLBACK_EVENTS[slug]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchEvent();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{ event_id: event.id, ...formData }]);

      if (error) throw error;
      setSubmitted(true);
      setFormData({ full_name: '', email: '', phone: '', school_or_org: '', message: '' });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to register. Please try again.';
      console.error('Registration error:', err);
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-aeem-gold" />
      </div>
    );
  }

  // ── Not found state ────────────────────────────────────────────────────────
  if (!event) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="text-gray-500 mb-6">Event not found.</p>
        <Link to="/events" className="inline-flex items-center gap-2 font-bold text-aeem-gold hover:underline">
          <ArrowLeft size={16} /> Back to Events
        </Link>
      </div>
    );
  }

  // ── Event detail ───────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>{`${event.title} | AEEM Events`}</title>
        <meta name="description" content={event.description || "Join AEEM's upcoming events and workshops."} />
      </Helmet>

      <section className="pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-aeem-gold mb-12 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Events
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Event Info */}
            <div>
              <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                <img
                  src={event.cover_image_url ?? 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&q=80&w=1200'}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{event.title}</h1>

              <div className="flex flex-wrap gap-8 mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-aeem-gold/10 rounded-full flex items-center justify-center text-aeem-gold">
                    <Calendar size={18} />
                  </div>
                  <span className="font-bold">
                    {new Date(event.event_date).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>

                {event.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-aeem-gold/10 rounded-full flex items-center justify-center text-aeem-gold">
                      <MapPin size={18} />
                    </div>
                    <span className="font-bold">{event.location}</span>
                  </div>
                )}
              </div>

              {event.description && (
                <div className="prose prose-lg text-gray-600">
                  <p>{event.description}</p>
                </div>
              )}
            </div>

            {/* Right — Registration Form */}
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
                  <Link
                    to="/events"
                    className="inline-block px-10 py-4 bg-aeem-charcoal text-white rounded-full font-bold hover:bg-aeem-gold transition-colors"
                  >
                    View Other Events
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black mb-2">Register Now</h2>
                  <p className="text-gray-500 mb-8">Secure your spot at {event.title}.</p>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

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
                      className="w-full py-5 bg-aeem-gold text-white rounded-2xl font-black text-lg hover:bg-aeem-charcoal transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? <Loader2 className="animate-spin" />
                        : <><Sparkles size={20} /> Register for Event</>
                      }
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