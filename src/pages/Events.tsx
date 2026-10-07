import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '../services/supabase';
import { getCanonical } from '../lib/seo';
import { Badge, Card, Container, Section } from '../components/ui';

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
    title: 'AEEM Education Summit 2026',
    slug: 'summit-2026',
    event_date: '2026-08-15',
    location: 'HQ, Fort Street',
    status: 'completed',
    cover_image_url: '/assets/gallery/Activity.jpg',
    description:
      'A gathering for policymakers, educators, and youth leaders focused on the future of inclusive education in West Africa.',
  },
  {
    id: 'f-3',
    title: 'I AM SOMEBODY - Session 1',
    slug: 'i-am-somebody-1',
    event_date: '2025-01-29',
    location: 'HQ, Fort Street',
    status: 'completed',
    cover_image_url: '/assets/gallery/Activity.jpg',
    description: 'An empowerment workshop for 42 participants from six schools.',
  },
];

const EventSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.03]">
    <div className="aspect-[16/9] animate-pulse bg-gray-200 dark:bg-gray-800" />
    <div className="space-y-4 p-6">
      <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
    </div>
  </div>
);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const isUpcoming = (event: Event) => {
  const eventDate = new Date(`${event.event_date}T23:59:59`);
  return event.status === 'upcoming' && eventDate.getTime() >= Date.now();
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('event_date', { ascending: false });

        if (error) throw error;

        if (active) {
          setEvents(data && data.length > 0 ? (data as Event[]) : FALLBACK_EVENTS);
        }
      } catch (error) {
        console.warn('Events fetch failed; rendering fallback.', error);

        if (active) setEvents(FALLBACK_EVENTS);
      } finally {
        if (active) setLoading(false);
      }
    };

    void fetchEvents();

    return () => {
      active = false;
    };
  }, []);

  const upcomingEvents = useMemo(() => events.filter(isUpcoming), [events]);
  const pastEvents = useMemo(() => events.filter((event) => !isUpcoming(event)), [events]);

  return (
    <>
      <Helmet>
        <title>Events | AEEM</title>
        <meta
          name="description"
          content="Explore AEEM workshops, summits, and community gatherings supporting educational access and youth empowerment."
        />
        <meta property="og:title" content="Events | Africa Education Empowerment Movement" />
        <meta
          property="og:description"
          content="Upcoming and past educational events from AEEM."
        />
        <link rel="canonical" href={getCanonical('/events')} />
      </Helmet>

      <main>
        <section className="border-b border-black/10 bg-aeem-forest text-white dark:border-white/10">
          <Container>
            <div className="grid min-h-[440px] items-center gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
              <div className="max-w-2xl">
                <Badge variant="default" className="border-white/20 bg-white/10 text-white">
                  Participate
                </Badge>
                <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
                  Events
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
                  Workshops, summits, and community gatherings where people come together to learn,
                  exchange ideas, and act.
                </p>
              </div>

              <div className="hidden lg:flex lg:justify-end" aria-hidden="true">
                <div className="max-w-md border-l border-aeem-gold/60 pl-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-gold">
                    From activity to impact
                  </p>
                  <p className="mt-4 text-2xl font-semibold leading-9 text-white">
                    Events are part of the work, not the evidence of the work.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Section aria-labelledby="upcoming-heading">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aeem-gold">
                Participate
              </p>
              <h2
                id="upcoming-heading"
                className="mt-2 text-3xl font-bold tracking-tight text-aeem-ink dark:text-white"
              >
                Upcoming events
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <EventSkeleton />
              <EventSkeleton />
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {upcomingEvents.map((event) => (
                <Card key={event.slug} className="overflow-hidden">
                  <div className="grid md:grid-cols-[0.85fr_1.15fr]">
                    <img
                      src={event.cover_image_url}
                      alt=""
                      width={720}
                      height={480}
                      loading="lazy"
                      className="aspect-[4/3] h-full w-full object-cover"
                    />
                    <div className="flex flex-col p-6 sm:p-8">
                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                        <span className="inline-flex items-center gap-2">
                          <Calendar size={14} aria-hidden="true" />
                          {formatDate(event.event_date)}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin size={14} aria-hidden="true" />
                          {event.location}
                        </span>
                      </div>

                      <h3 className="mt-5 text-2xl font-bold tracking-tight text-aeem-ink dark:text-white">
                        {event.title}
                      </h3>
                      <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>

                      <Link
                        to={`/events/${event.slug}`}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-aeem-forest hover:text-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2 dark:text-aeem-gold"
                      >
                        View event details
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-10 p-8 sm:p-10">
              <p className="text-lg font-semibold text-aeem-ink dark:text-white">
                No upcoming events are currently listed.
              </p>
              <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-300">
                Check back for new workshops, summits, and community activities.
              </p>
            </Card>
          )}
        </Section>

        <Section
          aria-labelledby="past-heading"
          className="border-t border-black/10 dark:border-white/10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aeem-gold">
              Archive
            </p>
            <h2
              id="past-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-aeem-ink dark:text-white"
            >
              Past events
            </h2>
          </div>

          {loading ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <EventSkeleton key={item} />
              ))}
            </div>
          ) : pastEvents.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <Card key={event.slug} className="overflow-hidden">
                  <img
                    src={event.cover_image_url}
                    alt=""
                    width={640}
                    height={480}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                      <span>{formatDate(event.event_date)}</span>
                      <span>{event.location}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-aeem-ink dark:text-white">
                      {event.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {event.description}
                    </p>
                    <Link
                      to={`/events/${event.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-aeem-forest hover:text-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2 dark:text-aeem-gold"
                    >
                      View details
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : null}
        </Section>
      </main>
    </>
  );
};

export default Events;
