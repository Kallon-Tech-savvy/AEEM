import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react'
import { supabase } from '../services/supabase'
import { Badge, Button, Card, Section } from '../components/ui'
import { getCanonical } from '../lib/seo'
import type { ResourceListItem } from '../types/content'

export default function Resources() {
  const [resources, setResources] = useState<ResourceListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    supabase
      .from('resources')
      .select('id, title, slug, type, description, summary, category, created_at, tags, image_url')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .then(({ data, error: supabaseError }) => {
        if (!active) return
        if (supabaseError) {
          console.error('Error fetching resources:', supabaseError)
          setError(true)
        } else {
          setResources((data ?? []) as unknown as ResourceListItem[])
        }
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const canonicalUrl = getCanonical('/resources')

  return (
    <>
      <Helmet>
        <title>Knowledge Hub & Resources | AEEM</title>
        <meta
          name="description"
          content="Access AEEM research papers, policy briefs, toolkits, and educational resources."
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Section spacing="large" className="bg-aeem-cream dark:bg-aeem-charcoal">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-aeem-forest dark:text-aeem-gold-light">
          Research & Open Access
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-aeem-ink dark:text-white sm:text-5xl lg:text-6xl">
          Knowledge Hub
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-aeem-ink/75 dark:text-white/75">
          Publications, framework documents, and research materials for educators and policy advocates.
        </p>
      </Section>

      <Section>
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="animate-spin text-aeem-gold" size={32} aria-label="Loading resources" />
          </div>
        ) : error ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold text-aeem-ink dark:text-white">Resources are temporarily unavailable</h2>
            <p className="mt-2 text-aeem-ink/70 dark:text-white/70">
              We could not load the knowledge hub resources right now. Please try again later.
            </p>
          </Card>
        ) : resources.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold text-aeem-ink dark:text-white">No resources available at this time</h2>
            <p className="mt-2 text-aeem-ink/70 dark:text-white/70">
              Check back soon as we publish open access materials and research documentation.
            </p>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource.id} className="flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Badge>{resource.category ?? resource.type ?? 'Resource'}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-aeem-ink/60 dark:text-white/60">
                      <BookOpen size={13} aria-hidden="true" />
                      {new Date(resource.created_at).getFullYear()}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-aeem-ink dark:text-white">
                    {resource.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-aeem-ink/75 dark:text-white/75">
                    {resource.summary ?? resource.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-black/10 pt-4 dark:border-white/10">
                  <Link to={`/resources/${resource.slug}`}>
                    <Button variant="secondary" className="w-full justify-between">
                      <span>Read resource</span>
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
