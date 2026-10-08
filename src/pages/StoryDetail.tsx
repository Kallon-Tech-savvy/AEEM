import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Loader2, Share2, Users, School, Calendar } from 'lucide-react'
import { supabase } from '../services/supabase'
import { getCanonical } from '../lib/seo'
import { Button, Card, Section } from '../components/ui'
import { IMPACT_STORY_DETAIL_FIELDS } from '../services/contentFields'
import type { ImpactStoryDetailItem } from '../types/content'

interface StoryData {
  title: string
  quote: string
  image: string
  fileName: string
  stats: {
    participants: string
    schools: string
    duration: string
  }
  overview: string
  focusAreas: string[]
  impact: string
  quoteText: string
  quoteAuthor: string
}

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [story, setStory] = useState<StoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [shareStatus, setShareStatus] = useState('')

  useEffect(() => {
    let active = true

    const fetchStory = async () => {
      if (!slug) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const { data, error } = await supabase
          .from('impact_stories')
          .select(IMPACT_STORY_DETAIL_FIELDS)
          .eq('slug', slug)
          .eq('published', true)
          .single()

        if (error) throw error

        const storyRow = data as unknown as ImpactStoryDetailItem

        if (active) {
          setStory({
            title: storyRow.title,
            quote: storyRow.summary ?? '',
            image: storyRow.cover_image_url ?? '',
            fileName: storyRow.file_name ?? '',
            stats: {
              participants: storyRow.participants_count != null ? `${storyRow.participants_count} Participants` : '',
              schools: storyRow.schools_count != null ? `${storyRow.schools_count} Institutions` : '',
              duration: storyRow.duration ?? '',
            },
            overview: storyRow.overview ?? '',
            focusAreas: storyRow.focus_areas ?? [],
            impact: storyRow.impact ?? '',
            quoteText: storyRow.quote_text ?? '',
            quoteAuthor: storyRow.quote_author ?? '',
          })
        }
      } catch (err) {
        console.error('Error fetching impact story:', err)
        if (active) {
          setStory(null)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchStory()

    return () => {
      active = false
    }
  }, [slug])

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: story?.title ?? 'AEEM Impact Story', url: window.location.href })
        setShareStatus('Story shared.')
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareStatus('Link copied to clipboard.')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setShareStatus('Sharing was cancelled or unavailable.')
    }
  }

  if (loading) {
    return (
      <Section className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-aeem-gold" size={32} aria-label="Loading impact report" />
      </Section>
    )
  }

  if (!story) {
    return (
      <Section spacing="large" containerNarrow className="bg-aeem-cream dark:bg-aeem-charcoal">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-gold">
            Impact Report
          </p>
          <h1 className="mt-4 text-3xl font-bold text-aeem-ink dark:text-white sm:text-4xl">
            Report not found.
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-aeem-ink/70 dark:text-white/70">
            This impact story does not exist, is unpublished, or is temporarily unavailable.
          </p>
          <Link
            to="/impact"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-aeem-forest bg-aeem-forest px-5 text-sm font-semibold text-white hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Our Impact
          </Link>
        </div>
      </Section>
    )
  }

  const canonicalUrl = getCanonical(`/impact/${slug}`)

  return (
    <>
      <Helmet>
        <title>{story.title} | AEEM Impact</title>
        <meta name="description" content={story.quote} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Section spacing="large" containerNarrow className="bg-aeem-cream dark:bg-aeem-charcoal">
        <Link
          to="/impact"
          className="inline-flex items-center gap-2 text-sm font-semibold text-aeem-ink/60 hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:text-white/60 dark:hover:text-aeem-gold-light"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Our Impact
        </Link>

        <h1 className="mt-6 text-4xl font-bold leading-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">
          {story.title}
        </h1>

        {story.quote && (
          <p className="mt-6 text-xl leading-8 text-aeem-ink/70 dark:text-white/70">
            {story.quote}
          </p>
        )}

        {story.image && (
          <figure className="mt-10 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
            <img src={story.image} alt={story.title} className="aspect-[16/8] w-full object-cover" />
          </figure>
        )}
      </Section>

      <Section containerNarrow>
        <div className="grid gap-6 sm:grid-cols-3">
          {story.stats.participants && (
            <Card className="p-6 text-center">
              <Users className="mx-auto text-aeem-forest dark:text-aeem-gold-light" size={24} />
              <p className="mt-2 text-sm font-semibold text-aeem-ink dark:text-white">
                {story.stats.participants}
              </p>
            </Card>
          )}
          {story.stats.schools && (
            <Card className="p-6 text-center">
              <School className="mx-auto text-aeem-forest dark:text-aeem-gold-light" size={24} />
              <p className="mt-2 text-sm font-semibold text-aeem-ink dark:text-white">
                {story.stats.schools}
              </p>
            </Card>
          )}
          {story.stats.duration && (
            <Card className="p-6 text-center">
              <Calendar className="mx-auto text-aeem-forest dark:text-aeem-gold-light" size={24} />
              <p className="mt-2 text-sm font-semibold text-aeem-ink dark:text-white">
                {story.stats.duration}
              </p>
            </Card>
          )}
        </div>

        {story.overview && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-aeem-ink dark:text-white">Overview</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-aeem-ink/80 dark:text-white/80">
              {story.overview}
            </p>
          </div>
        )}

        {story.impact && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-aeem-ink dark:text-white">Verified Impact</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-aeem-ink/80 dark:text-white/80">
              {story.impact}
            </p>
          </div>
        )}

        {story.quoteText && (
          <blockquote className="mt-12 rounded-2xl border-l-4 border-aeem-gold bg-aeem-cream/50 p-8 dark:bg-white/5">
            <p className="text-lg italic leading-relaxed text-aeem-ink dark:text-white">
              "{story.quoteText}"
            </p>
            {story.quoteAuthor && (
              <footer className="mt-4 text-sm font-semibold text-aeem-forest dark:text-aeem-gold-light">
                — {story.quoteAuthor}
              </footer>
            )}
          </blockquote>
        )}

        <div className="mt-12 border-t border-black/10 pt-6 dark:border-white/10">
          <Button type="button" variant="secondary" onClick={share}>
            <Share2 size={17} aria-hidden="true" />
            Share Report
          </Button>
          <p className="sr-only" aria-live="polite">{shareStatus}</p>
        </div>
      </Section>
    </>
  )
}
