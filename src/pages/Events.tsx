import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';

const Events: React.FC = () => {
  const events = [
    {
      title: "AEEM Education Summit 2026",
      slug: "summit-2026",
      date: "August 15, 2026",
      time: "09:00 AM",
      location: "Freetown City Council Hall",
      type: "upcoming",
      image: "https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&q=80&w=800",
      desc: "Bringing together policy makers, educators, and youth leaders to discuss the future of inclusive education in West Africa."
    },
    {
      title: "Youth Leadership Workshop",
      slug: "leadership-workshop",
      date: "September 22, 2026",
      time: "10:30 AM",
      location: "Makeni University Campus",
      type: "upcoming",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
      desc: "A hands-on training session for student leaders focused on advocacy and community organizing."
    },
    {
      title: "I AM SOMEBODY - Session 1",
      slug: "i-am-somebody-1",
      date: "January 10, 2026",
      location: "Prince of Wales School",
      type: "completed",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      desc: "Our inaugural empowerment workshop for 42 participants from six schools."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Events | AEEM</title>
      </Helmet>

      <section className="pt-40 pb-24 bg-aeem-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Participate</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Events</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Join our workshops, summits, and community gatherings to be part of the change.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-12">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {events.filter(e => e.type === 'upcoming').map((event) => (
              <div key={event.slug} className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="w-full md:w-2/5 aspect-square md:aspect-auto overflow-hidden">
                   <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8 md:w-3/5 flex flex-col">
                   <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-aeem-gold mb-4">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                      <span className="flex items-center gap-1 text-gray-400"><Clock size={12} /> {event.time}</span>
                   </div>
                   <h3 className="text-2xl font-black mb-4 group-hover:text-aeem-gold transition-colors">{event.title}</h3>
                   <p className="text-sm text-gray-500 mb-8 leading-relaxed line-clamp-3">{event.desc}</p>
                   <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                         <MapPin size={14} className="text-aeem-gold" /> {event.location}
                      </div>
                      <Link to={`/events/${event.slug}`} className="p-3 bg-aeem-charcoal text-white rounded-full hover:bg-aeem-gold transition-colors">
                        <ArrowRight size={20} />
                      </Link>
                   </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-black mb-12">Past Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.filter(e => e.type === 'completed').map((event) => (
              <div key={event.slug} className="group grayscale hover:grayscale-0 transition-all">
                 <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                 <p className="text-sm text-gray-500">{event.date} • {event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;
