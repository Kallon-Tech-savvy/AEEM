import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight, Loader2 } from 'lucide-react'
import { supabase } from '../services/supabase'
import { Badge, Button, Card, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
import type { EventListItem } from '../types/content'

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export default function Events() {
  const [events, setEvents] = useState<EventListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    supabase
      .from('events')
      .select('id, title, slug, description, event_date, location, status, cover_image_url')
      .eq('published', true)
      .order('event_date', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          console.error('Error fetching events:', error)
          setEvents([])
        } else {
          setEvents((data ?? []) as unknown as EventListItem[])
        }
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const canonicalUrl = getCanonical('/events')

  return (
    <>
      <Helmet>
        <title>Events & Gatherings | AEEM</title>
        <meta
          name="description"
          content="Explore AEEM convening dates, workshops, and gatherings across African education networks."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-forest dark:text-aeem-gold-light">
            Convenings & Gatherings
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">
            AEEM Events
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-ink/75 dark:text-white/75">
            Bringing together educators, community leaders, researchers, and advocates to shape equitable education access.
          </p>
      </Section>

      <Section>
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <Loader2 className="animate-spin text-aeem-gold" size={32} aria-label="Loading events" />
            </div>
          ) : events.length === 0 ? (
            <Card className="p-12 text-center">
              <h2 className="text-2xl font-bold text-aeem-ink dark:text-white">No upcoming events scheduled</h2>
              <p className="mt-2 text-aeem-ink/70 dark:text-white/70">
                Check back soon or sign up to receive announcements about upcoming convenings and workshops.
              </p>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card key={event.id} className="flex flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <Badge>{event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}</Badge>
                      <span className="inline-flex items-center gap-1 text-xs text-aeem-ink/60 dark:text-white/60">
                        <Calendar size={13} aria-hidden="true" />
                        {formatDate(event.event_date)}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-aeem-ink dark:text-white">
                      {event.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-aeem-ink/75 dark:text-white/75">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-black/10 pt-4 dark:border-white/10">
                    <div className="mb-4 flex items-center gap-1.5 text-xs text-aeem-ink/60 dark:text-white/60">
                      <MapPin size={13} aria-hidden="true" />
                      <span>{event.location}</span>
                    </div>
                    <Link to={`/events/${event.slug}`}>
                      <Button variant="secondary" className="w-full justify-between">
                        <span>Event details</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
      </Section>
    </>
  )
}
