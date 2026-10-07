import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Download, Loader2, Share2 } from 'lucide-react'
import { supabase } from '../services/supabase'
import { Badge, Button, Card, Container, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
import { sanitizeHtml } from '../lib/sanitizeHtml'

interface Resource {
  title: string
  slug: string
  type?: string
  description?: string
  summary?: string
  body?: string
  fullBody?: string
  file_url?: string
  category?: string
  created_at?: string
  readingTime?: string
  tags?: string[]
  image?: string
  bulletPoints?: string[]
}

export default function ResourceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [resource, setResource] = useState<Resource | null>(null)
  const [loading, setLoading] = useState(true)
  const [shareStatus, setShareStatus] = useState('')

  useEffect(() => {
    let active = true
    if (!slug) { setLoading(false); return }
    supabase.from('resources').select('*').eq('slug', slug).eq('published', true).single()
      .then(({ data, error }) => {
        if (!active) return
        if (error) console.error('Error fetching resource:', error)
        setResource(error ? null : data as Resource)
        setLoading(false)
      })
    return () => { active = false }
  }, [slug])

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: resource?.title ?? 'AEEM Resource', url: window.location.href })
        setShareStatus('Resource shared.')
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareStatus('Link copied to clipboard.')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setShareStatus('Sharing was cancelled or unavailable.')
    }
  }

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="animate-spin text-aeem-gold" size={32} aria-label="Loading resource" /></div>

  if (!resource) return <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal"><Container narrow className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-gold">Knowledge Hub</p>
    <h1 className="mt-4 text-3xl font-bold text-aeem-ink dark:text-white sm:text-4xl">Resource not found.</h1>
    <p className="mx-auto mt-4 max-w-xl leading-7 text-aeem-ink/70 dark:text-white/70">This resource does not exist, is unpublished, or is temporarily unavailable.</p>
    <Link to="/resources" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-aeem-forest bg-aeem-forest px-5 text-sm font-semibold text-white hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus"><ArrowLeft size={16} aria-hidden="true" />Back to Knowledge Hub</Link>
  </Container></Section>

  const description = resource.description ?? resource.summary ?? ''
  const year = resource.created_at ? new Date(resource.created_at).getFullYear() : null
  const type = resource.category ?? resource.type ?? 'Resource'
  const canonicalUrl = getCanonical(`/resources/${resource.slug}`)
  const safeBody = resource.body ? sanitizeHtml(resource.body) : ''

  return <>
    <Helmet>
      <title>{resource.title} | AEEM Knowledge Hub</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={resource.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonicalUrl} />
      {resource.image && <meta property="og:image" content={resource.image.startsWith('http') ? resource.image : `${getCanonical(resource.image)}`} />
    </Helmet>

    <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
      <Container narrow>
        <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-aeem-ink/60 hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:text-white/60 dark:hover:text-aeem-gold-light"><ArrowLeft size={16} aria-hidden="true" />Back to Knowledge Hub</Link>
        <div className="mt-10 flex flex-wrap items-center gap-3"><Badge>{type}</Badge>{year && <span className="text-sm text-aeem-ink/60 dark:text-white/60">{year}</span>}{resource.readingTime && <span className="inline-flex items-center gap-1.5 text-sm text-aeem-ink/60 dark:text-white/60"><Clock size={14} aria-hidden="true" />{resource.readingTime}</span>}</div>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">{resource.title}</h1>
        {resource.summary && <p className="mt-6 text-xl leading-8 text-aeem-ink/70 dark:text-white/70">{resource.summary}</p>}
        {resource.image && <figure className="mt-10 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10"><img src={resource.image} alt="" className="aspect-[16/8] w-full object-cover" /></figure>}
      </Container>
    </Section>

    <Section><Container narrow>
      <article className="prose prose-lg max-w-none text-aeem-ink dark:prose-invert">
        {safeBody ? <div dangerouslySetInnerHTML={{ __html: safeBody }} /> : resource.fullBody ? <p className="whitespace-pre-line leading-8">{resource.fullBody}</p> : resource.description ? <p className="leading-8">{resource.description}</p> : null}
        {resource.bulletPoints?.length ? <ul>{resource.bulletPoints.map((point, i) => <li key={i}>{point}</li>)}</ul> : null}
      </article>

      {resource.file_url && <Card className="mt-12 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="text-xl font-semibold text-aeem-ink dark:text-white">Download this resource</h2><p className="mt-1 text-sm text-aeem-ink/65 dark:text-white/65">Open the published file in a new tab.</p></div>
        <Button type="button" onClick={() => window.open(resource.file_url, '_blank', 'noopener,noreferrer')}><Download size={17} aria-hidden="true" />Download</Button>
      </Card>}

      <div className="mt-12 flex flex-col gap-6 border-t border-black/10 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">{resource.tags?.length ? <><span className="mr-1 text-xs font-semibold uppercase tracking-[0.12em] text-aeem-ink/50 dark:text-white/50">Topics</span>{resource.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}</> : null}</div>
        <div><Button type="button" variant="secondary" onClick={share}><Share2 size={17} aria-hidden="true" />Share</Button><p className="sr-only" aria-live="polite">{shareStatus}</p></div>
      </div>
    </Container></Section>
  </>
}
