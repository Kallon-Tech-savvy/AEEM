import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Loader2 } from 'lucide-react'
import { supabase } from '../services/supabase'
import { Badge, Card, Container, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
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
      .select('id, title, slug, description, event_date, location, status, cover_image_url')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error }) => {
        if (!active) return
        if (error || !data) {
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
        <Loader2 className="animate-spin text-aeem-gold" size={32} aria-label="Loading event details" />
      </Section>
    )
  }

  if (!event) {
    return (
      <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
        <Container narrow className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-gold">
            Events
          </p>
          <h1 className="mt-4 text-3xl font-bold text-aeem-ink dark:text-white sm:text-4xl">
            Event not found.
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-aeem-ink/70 dark:text-white/70">
            This event does not exist, is unpublished, or is temporarily unavailable.
          </p>
          <Link
            to="/events"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-aeem-forest bg-aeem-forest px-5 text-sm font-semibold text-white hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Events
          </Link>
        </Container>
      </Section>
    )
  }

  const canonicalUrl = getCanonical(`/events/${event.slug}`)

  return (
    <>
      <Helmet>
        <title>{event.title} | AEEM Events</title>
        <meta name="description" content={event.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        {event.cover_image_url && (
          <meta
            property="og:image"
            content={
              event.cover_image_url.startsWith('http')
                ? event.cover_image_url
                : getCanonical(event.cover_image_url)
            }
          />
        )}
      </Helmet>

      <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
        <Container narrow>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-aeem-ink/60 hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:text-white/60 dark:hover:text-aeem-gold-light"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Events
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge>{event.status === 'upcoming' ? 'Upcoming Event' : 'Past Event'}</Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-aeem-ink/60 dark:text-white/60">
              <Calendar size={14} aria-hidden="true" />
              {formatDate(event.event_date)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-aeem-ink/60 dark:text-white/60">
              <MapPin size={14} aria-hidden="true" />
              {event.location}
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">
            {event.title}
          </h1>

          {event.cover_image_url && (
            <figure className="mt-10 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
              <img
                src={event.cover_image_url}
                alt={event.title}
                className="aspect-[16/8] w-full object-cover"
              />
            </figure>
          )}
        </Container>
      </Section>

      <Section>
        <Container narrow>
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-aeem-ink dark:text-white">About this Event</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-aeem-ink/80 dark:text-white/80">
              {event.description}
            </p>
          </Card>
        </Container>
      </Section>
    </>
  )
}
