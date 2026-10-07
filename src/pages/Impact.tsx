import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, Loader2, Users, School } from 'lucide-react'
import { supabase } from '../services/supabase'
import { Button, Card, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
import type { ImpactStoryListItem } from '../types/content'

export default function Impact() {
  const [stories, setStories] = useState<ImpactStoryListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    supabase
      .from('impact_stories')
      .select('id, title, slug, summary, location, participants_count, schools_count, cover_image_url')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          console.error('Error fetching impact stories:', error)
          setStories([])
        } else {
          setStories((data as ImpactStoryListItem[]) ?? [])
        }
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const canonicalUrl = getCanonical('/impact')

  return (
    <>
      <Helmet>
        <title>Our Impact & Evidence | AEEM</title>
        <meta
          name="description"
          content="Evidence-based impact stories and verified outcomes from AEEM educational initiatives across Africa."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-forest dark:text-aeem-gold-light">
            Verified Outcomes & Field Work
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">
            Our Impact
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-ink/75 dark:text-white/75">
            Transparent reporting on educational programs, community reach, and institutional partnerships.
          </p>
      </Section>

      <Section>
        <Container>
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <Loader2 className="animate-spin text-aeem-gold" size={32} aria-label="Loading impact stories" />
            </div>
          ) : stories.length === 0 ? (
            <Card className="p-12 text-center">
              <h2 className="text-2xl font-bold text-aeem-ink dark:text-white">No impact stories published yet</h2>
              <p className="mt-2 text-aeem-ink/70 dark:text-white/70">
                Check back soon as we publish field reports and verified outcome metrics.
              </p>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <Card key={story.id} className="flex flex-col justify-between overflow-hidden p-6">
                  <div>
                    {story.cover_image_url && (
                      <img
                        src={story.cover_image_url}
                        alt={story.title}
                        className="-mx-6 -mt-6 mb-6 aspect-[16/9] w-[calc(100%+3rem)] object-cover"
                      />
                    )}
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-aeem-gold">
                      {story.location}
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-aeem-ink dark:text-white">
                      {story.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-aeem-ink/75 dark:text-white/75">
                      {story.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-black/10 pt-4 dark:border-white/10">
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-aeem-ink/60 dark:text-white/60">
                      {story.participants_count != null && (
                        <span className="inline-flex items-center gap-1">
                          <Users size={13} aria-hidden="true" />
                          {story.participants_count} Participants
                        </span>
                      )}
                      {story.schools_count != null && (
                        <span className="inline-flex items-center gap-1">
                          <School size={13} aria-hidden="true" />
                          {story.schools_count} Institutions
                        </span>
                      )}
                    </div>
                    <Link to={`/impact/${story.slug}`}>
                      <Button variant="secondary" className="w-full justify-between">
                        <span>Read report</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
