import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Clock, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { SpotlightCard } from '../components/motion/SpotlightCard';

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  location: string;
  status: 'upcoming' | 'completed';
  cover_image_url: string;
}

const FALLBACK_EVENTS: Event[] = [
  {
    id: 'f-1',
    title: "AEEM Education Summit 2026",
    slug: "summit-2026",
    event_date: "2026-08-15",
    location: "HQ, Fort Street",
    status: "upcoming",
    cover_image_url: "/assets/gallery/Activity.jpg",
    description: "Bringing together policy makers, educators, and youth leaders to discuss the future of inclusive education in West Africa."
  },
  {
    id: 'f-3',
    title: "I AM SOMEBODY - Session 1",
    slug: "i-am-somebody-1",
    event_date: "2025-01-29",
    location: "HQ Fort Street",
    status: "completed",
    cover_image_url: "/assets/gallery/Activity.jpg",
    description: "Our inaugural empowerment workshop for 42 participants from six schools."
  }
];

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(FALLBACK_EVENTS);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setEvents(FALLBACK_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Events | AEEM</title>
      </Helmet>
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
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Participate</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Events</h1>
            <p className="text-xl text-aeem-charcoal dark:text-white max-w-2xl">
              Join our workshops, summits, and community gatherings to be part of the change.
            </p>
                </motion.div>
              </div>
            </section>

      <section className="py-16 bg-aeem">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="animate-spin text-aeem-gold" size={48} />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-black mb-12">Upcoming Events</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
                {events.filter(e => e.status === 'upcoming').map((event) => (
                  <SpotlightCard key={event.slug} className="group relative flex flex-col md:flex-row bg-aeem-focus/25 rounded-3xl overflow-hidden border border-aeem-border shadow-sm hover:shadow-xl transition-all">
                    <div className="w-full md:w-2/5 aspect-square md:aspect-auto overflow-hidden">
                       <img src={event.cover_image_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-8 md:w-3/5 flex flex-col">
                       <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-aeem-gold mb-4">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(event.event_date)}</span>
                          <span className="flex items-center gap-1 text-aeem-charcoal dark:text-white"><Clock size={12} /> 09:00 AM</span>
                       </div>
                       <h3 className="text-2xl font-black mb-4 group-hover:text-aeem-gold transition-colors">{event.title}</h3>
                       <p className="text-sm text-aeem-charcoal dark:text-white mb-8 leading-relaxed line-clamp-3">{event.description}</p>
                       <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-aeem-charcoal dark:text-white">
                             <MapPin size={14} className="text-aeem-gold" /> {event.location}
                          </div>
                          <Link to={`/events/${event.slug}`} className="p-3 bg-aeem-charcoal dark:bg-white text-aeem-focus rounded-full hover:bg-aeem-gold transition-colors">
                            <ArrowRight size={20} />
                          </Link>
                       </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>

              <h2 className="text-3xl font-black mb-12">Past Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {events.filter(e => e.status === 'completed').map((event) => (
                  <SpotlightCard key={event.slug} className="group transition-all">
                     <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                        <img src={event.cover_image_url} alt={event.title} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                     <p className="text-sm text-aeem-charcoal dark:text-white">{formatDate(event.event_date)} • {event.location}</p>
                  </SpotlightCard>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
