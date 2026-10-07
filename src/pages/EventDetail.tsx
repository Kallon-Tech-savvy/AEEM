import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Loader2 } from 'lucide-react'
import { supabase } from '../services/supabase'
import { Badge, Card, Container, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
import { EVENT_DETAIL_FIELDS } from '../services/contentFields'
import type { EventListItem } from '../types/content'

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [event, setEvent] = useState<EventListItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    if (!slug) {
      setLoading(false)
      return
    }

    supabase
      .from('events')
      .select(EVENT_DETAIL_FIELDS)
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          console.error('Error fetching event:', error)
          setEvent(null)
        } else {
          setEvent(data as EventListItem)
        }
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return (
      <Section className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-aeem-gold" size={30} aria-label="Loading event" />
      </Section>
    )
  }

  if (!event) {
    return (
      <Section spacing="large" className="bg-aeem-cream">
        <Container narrow className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold">Events</p>
          <h1 className="mt-4 text-3xl font-bold text-aeem-ink sm:text-4xl">Event not found.</h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-aeem-ink/70">
            This event does not exist, is unpublished, or is temporarily unavailable.
          </p>
          <Link
            to="/events"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-aeem-forest px-5 text-sm font-semibold text-white hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Events
          </Link>
        </Container>
      </Section>
    )
  }

  const upcoming = event.status === 'upcoming' && new Date(event.event_date).getTime() >= Date.now()

  return (
    <>
      <Helmet>
        <title>{event.title} | AEEM Events</title>
        <meta name="description" content={event.description.slice(0, 155)} />
        <link rel="canonical" href={getCanonical(`/events/${event.slug}`)} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description.slice(0, 155)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getCanonical(`/events/${event.slug}`)} />
        {event.cover_image_url && (
          <meta
            property="og:image"
            content={event.cover_image_url.startsWith('http') ? event.cover_image_url : getCanonical(event.cover_image_url)}
          />
        )}
      </Helmet>

      <Section spacing="large" className="bg-aeem-forest text-white">
        <Container narrow>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Events
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Badge variant={upcoming ? 'success' : 'default'}>
              {upcoming ? 'Upcoming' : 'Completed'}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
              <Calendar size={15} aria-hidden="true" />
              {formatDate(event.event_date)}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {event.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/75 sm:text-xl">{event.description}</p>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/75">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-aeem-gold-light" aria-hidden="true" />
              {event.location}
            </span>
          </div>
        </Container>
      </Section>

      {event.cover_image_url && (
        <section aria-label="Event image" className="-mt-8 pb-8 sm:-mt-12 sm:pb-12">
          <Container>
            <Card className="overflow-hidden p-0">
              <img
                src={event.cover_image_url}
                alt={event.title}
                width={1600}
                height={900}
                className="aspect-[16/9] w-full object-cover"
              />
            </Card>
          </Container>
        </section>
      )}

      <Section>
        <Container narrow>
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold">Event record</p>
            <h2 className="mt-3 text-3xl font-bold text-aeem-ink">Event information</h2>
            <dl className="mt-8 divide-y divide-black/10 border-y border-black/10">
              <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-aeem-ink/60">Date</dt>
                <dd className="text-aeem-ink">{formatDate(event.event_date)}</dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-aeem-ink/60">Location</dt>
                <dd className="text-aeem-ink">{event.location}</dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-aeem-ink/60">Status</dt>
                <dd className="text-aeem-ink">{upcoming ? 'Upcoming' : 'Completed'}</dd>
              </div>
            </dl>
          </article>
        </Container>
      </Section>
    </>
  )
}
