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

        if (error) throw error;
        setStories((data ?? []) as unknown as ImpactStoryListItem[]);
      } catch (error) {
        console.error('Error fetching impact stories:', error);
        setError(true);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

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

      <Section spacing="large" className="bg-aeem-cream" aria-labelledby="stories-heading">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold">
              Impact stories
            </p>
            <h2 id="stories-heading" className="mt-3 text-3xl font-bold text-aeem-ink sm:text-4xl">
              From program activity to human outcomes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-aeem-ink/70">
              Each story should connect an identified need to an intervention and,
              where evidence exists, a measurable or documented outcome.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24" role="status" aria-live="polite">
            <Loader2 className="h-8 w-8 animate-spin text-aeem-gold" aria-hidden="true" />
            <span className="sr-only">Loading impact stories</span>
          </div>
        ) : error ? (
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-aeem-ink">Impact stories are temporarily unavailable.</h3>
            <p className="mt-3 leading-7 text-aeem-ink/70">
              We could not load the published story archive right now. Please try again later.
            </p>
          </Card>
        ) : stories.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {stories.map((story) => (
              <Card key={story.slug} className="overflow-hidden p-0">
                <div className="aspect-[16/9] bg-aeem-ink/5">
                  {story.cover_image_url ? (
                    <img
                      src={story.cover_image_url}
                      alt={story.title}
                      width={1280}
                      height={720}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-aeem-forest" aria-hidden="true" />
                  )}
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-sm text-aeem-ink/65">
                    <MapPin size={16} className="text-aeem-gold" aria-hidden="true" />
                    <span>{story.location}</span>
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
      </Section>
    </>
  )
}
