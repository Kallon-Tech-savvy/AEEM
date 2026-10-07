import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Calendar, MapPin, ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { Badge, Card, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
import { EVENT_LIST_FIELDS } from '../services/contentFields'
import type { EventListItem } from '../types/content'

const isUpcoming = (event: Event) =>
  event.status === 'upcoming' && new Date(event.event_date).getTime() >= Date.now()

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default function Events() {
  const [events, setEvents] = useState<EventListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    supabase
      .from('events')
      .select(EVENT_LIST_FIELDS)
      .eq('published', true)
      .order('event_date', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          console.error('Error fetching events:', error)
          setError(true)
        } else {
          setEvents((data ?? []) as EventListItem[])
        }
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const upcoming = useMemo(
    () => events.filter(isUpcoming).sort((a, b) => +new Date(a.event_date) - +new Date(b.event_date)),
    [events],
  )

  const past = useMemo(
    () => events.filter(event => !isUpcoming(event)),
    [events],
  )

  return (
    <>
      <Helmet>
        <title>Events | AEEM</title>
        <meta
          name="description"
          content="Explore AEEM workshops, summits, and community gatherings."
        />
        <link rel="canonical" href={getCanonical('/events')} />
        <meta property="og:title" content="Events | AEEM" />
        <meta property="og:description" content="Upcoming and past events from AEEM." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Section spacing="large" className="bg-aeem-forest text-white">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aeem-gold-light">
            Participate
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Events and gatherings.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Workshops, summits, and community activities connected to AEEM&apos;s work.
          </p>
        </div>
      </Section>

      <Section aria-labelledby="upcoming-events-heading">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold">
            Participate
          </p>
          <h2 id="upcoming-events-heading" className="mt-3 text-3xl font-bold text-aeem-ink sm:text-4xl">
            Upcoming events
          </h2>
        </div>

        {loading ? (
          <div className="flex min-h-48 items-center justify-center" role="status">
            <Loader2 className="animate-spin text-aeem-gold" size={30} aria-hidden="true" />
            <span className="sr-only">Loading events</span>
          </div>
        ) : error ? (
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-aeem-ink">Events are temporarily unavailable.</h3>
            <p className="mt-3 leading-7 text-aeem-ink/70">
              We could not load the event archive right now. Please try again later.
            </p>
          </Card>
        ) : upcoming.length === 0 ? (
          <p className="border-y border-black/10 py-8 text-aeem-ink/70">
            There are no upcoming events currently published.
          </p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {upcoming.map(event => (
              <Card key={event.slug} className="overflow-hidden p-0">
                {event.cover_image_url && (
                  <img
                    src={event.cover_image_url}
                    alt=""
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                )}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="success">Upcoming</Badge>
                    <span className="inline-flex items-center gap-1.5 text-sm text-aeem-ink/60">
                      <Calendar size={15} aria-hidden="true" />
                      {formatDate(event.event_date)}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-aeem-ink">{event.title}</h3>
                  <p className="mt-3 line-clamp-3 leading-7 text-aeem-ink/70">{event.description}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5">
                    <span className="inline-flex items-center gap-1.5 text-sm text-aeem-ink/65">
                      <MapPin size={15} className="text-aeem-gold" aria-hidden="true" />
                      {event.location}
                    </span>
                    <Link
                      to={`/events/${event.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-aeem-forest px-5 text-sm font-semibold text-white transition-colors hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus"
                    >
                      Event details <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>

      <Section spacing="large" className="bg-aeem-cream" aria-labelledby="past-events-heading">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold">
            Archive
          </p>
          <h2 id="past-events-heading" className="mt-3 text-3xl font-bold text-aeem-ink sm:text-4xl">
            Past events
          </h2>
        </div>

        {!loading && !error && past.length === 0 ? (
          <p className="border-y border-black/10 py-8 text-aeem-ink/70">
            No completed events are currently published.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map(event => (
              <Card key={event.slug} interactive className="flex h-full flex-col overflow-hidden p-0">
                {event.cover_image_url && (
                  <img
                    src={event.cover_image_url}
                    alt=""
                    width={960}
                    height={640}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge>Completed</Badge>
                    <span className="text-sm text-aeem-ink/55">{formatDate(event.event_date)}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-aeem-ink">{event.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-aeem-ink/70">{event.description}</p>
                  <div className="mt-auto pt-6">
                    <Link
                      to={`/events/${event.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus"
                    >
                      View event <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
