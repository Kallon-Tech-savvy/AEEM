import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search, BookOpen, FileText, Newspaper, ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { Badge, Card, Section } from '../components/ui'
import { RESOURCE_LIST_FIELDS } from '../services/contentFields'
import type { ResourceListItem } from '../types/content'

const iconFor = (r: ResourceListItem) => {
  const v = `${r.type ?? ''} ${r.category ?? ''}`.toLowerCase()
  if (v.includes('policy') || v.includes('report')) return FileText
  if (v.includes('news') || v.includes('press')) return Newspaper
  return BookOpen
}

const labelFor = (r: ResourceListItem) => r.category ?? r.type ?? 'Resource'

export default function Resources() {
  const [resources, setResources] = useState<ResourceListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    let active = true
    supabase.from('resources').select(RESOURCE_LIST_FIELDS).eq('published', true).order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) {
          console.error('Error fetching resources:', error)
          setError(true)
        } else setResources((data ?? []) as ResourceListItem[])
        setLoading(false)
      })
    return () => { active = false }
  }, [])

  const categories = useMemo(() => [
    'All', ...Array.from(new Set(resources.map(r => r.category).filter(Boolean) as string[]))
  ], [resources])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter(r => {
      const text = [r.title, r.description, r.summary, r.category, r.type, ...(r.tags ?? [])]
        .filter(Boolean).join(' ').toLowerCase()
      return (!q || text.includes(q)) && (category === 'All' || r.category === category)
    })
  }, [resources, query, category])

  const featured = filtered[0]

  return <>
    <Helmet>
      <title>Knowledge Hub | AEEM</title>
      <meta name="description" content="Reports, guides, policy resources, research and stories from the Africa Education Empowerment Movement." />
      <link rel="canonical" href="/resources" />
      <meta property="og:title" content="Knowledge Hub | AEEM" />
      <meta property="og:description" content="Explore AEEM's published resources, reports, guides and knowledge." />
      <meta property="og:type" content="website" />
    </Helmet>

    <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-aeem-gold">Knowledge Hub</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">Knowledge for action.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-ink/70 dark:text-white/70">
          Explore AEEM's published materials, from research and policy resources to practical guides and stories from our work.
        </p>
      </div>
    </Section>

    <Section spacing="compact" className="border-y border-black/10 bg-white dark:border-white/10 dark:bg-aeem-charcoal">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-aeem-ink/50 dark:text-white/50" size={18} />
          <label htmlFor="resource-search" className="sr-only">Search resources</label>
          <input id="resource-search" type="search" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search the knowledge hub"
            className="min-h-11 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm text-aeem-ink outline-none focus:border-aeem-focus focus:ring-2 focus:ring-aeem-focus/20 dark:border-white/15 dark:bg-white/[0.03] dark:text-white" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter resources by category">
          {categories.map(item => (
            <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item}
              className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus ${category === item ? 'border-aeem-forest bg-aeem-forest text-white' : 'border-gray-300 bg-white text-aeem-ink hover:border-aeem-forest dark:border-white/15 dark:bg-transparent dark:text-white'}`}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </Section>

    <Section aria-labelledby="resource-results-heading">
      <div className="flex items-end justify-between gap-6">
        <div><p className="text-sm font-semibold text-aeem-gold">Published resources</p><h2 id="resource-results-heading" className="mt-2 text-2xl font-bold text-aeem-ink dark:text-white sm:text-3xl">Browse the archive</h2></div>
        {!loading && !error && <p className="text-sm text-aeem-ink/60 dark:text-white/60">{filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}</p>}
      </div>

      {loading ? <div className="flex min-h-64 items-center justify-center"><Loader2 className="animate-spin text-aeem-gold" size={32} aria-label="Loading resources" /></div>
      : error ? <Card className="mt-10 p-8"><h3 className="text-xl font-semibold text-aeem-ink dark:text-white">The knowledge hub is temporarily unavailable.</h3><p className="mt-3 leading-7 text-aeem-ink/70 dark:text-white/70">We could not load published resources right now. Please try again later.</p></Card>
      : filtered.length === 0 ? <Card className="mt-10 p-8"><h3 className="text-xl font-semibold text-aeem-ink dark:text-white">No resources match your search.</h3><p className="mt-3 leading-7 text-aeem-ink/70 dark:text-white/70">Try a different search term or category.</p></Card>
      : <>
        {featured && <Card className="mt-10 overflow-hidden"><div className="grid lg:grid-cols-2">
          {featured.image_url ? <img src={featured.image_url} alt="" className="h-full min-h-64 w-full object-cover" loading="lazy" /> : <div className="flex min-h-64 items-end bg-aeem-forest p-8"><span className="text-6xl font-bold text-white/15" aria-hidden="true">AEEM</span></div>}
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3"><Badge>{labelFor(featured)}</Badge>{featured.created_at && <span className="text-sm text-aeem-ink/60 dark:text-white/60">{new Date(featured.created_at).getFullYear()}</span>}</div>
            <h3 className="mt-5 text-2xl font-bold leading-tight text-aeem-ink dark:text-white sm:text-3xl">{featured.title}</h3>
            <p className="mt-4 leading-7 text-aeem-ink/70 dark:text-white/70">{featured.summary ?? featured.description}</p>
            <Link to={`/resources/${featured.slug}`} className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-aeem-forest bg-aeem-forest px-5 text-sm font-semibold text-white hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus">Read resource <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div></Card>}
        {filtered.length > 1 && <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.slice(1).map(resource => {
          const Icon = iconFor(resource)
          return <Card key={resource.slug} interactive className="flex h-full flex-col p-6">
            <div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-aeem-forest/5 text-aeem-forest dark:bg-white/5 dark:text-aeem-gold-light"><Icon size={21} aria-hidden="true" /></div>{resource.created_at && <span className="text-sm text-aeem-ink/50 dark:text-white/50">{new Date(resource.created_at).getFullYear()}</span>}</div>
            <div className="mt-6"><Badge>{labelFor(resource)}</Badge><h3 className="mt-4 text-xl font-semibold leading-snug text-aeem-ink dark:text-white">{resource.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-aeem-ink/70 dark:text-white/70">{resource.summary ?? resource.description}</p></div>
            <Link to={`/resources/${resource.slug}`} className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus dark:text-aeem-gold-light">View resource <ArrowRight size={15} aria-hidden="true" /></Link>
          </Card>
        })}</div>}
      </>}
    </Section>
  </>
}
