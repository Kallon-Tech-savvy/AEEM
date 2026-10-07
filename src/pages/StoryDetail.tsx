import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Link2, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabase';
import { getCanonical } from '../lib/seo';
import { Badge, Button, Card, Container, Section, Stat } from '../components/ui';

interface StoryData {
  title: string;
  quote: string;
  image: string;
  fileName: string;
  stats: {
    participants: string;
    schools: string;
    duration: string;
  };
  overview: string;
  focusAreas: string[];
  impact: string;
  quoteText: string;
  quoteAuthor: string;
}

const STORIES_DB: Record<string, StoryData> = {
  'i-am-somebody': {
    title: 'I AM SOMEBODY Initiative',
    quote: 'A movement to instill agency, resilience, and leadership in the next generation of African scholars.',
    image: '/assets/gallery/Activity.jpg',
    fileName: 'Activity',
    stats: {
      participants: '42 Students',
      schools: '6 Institutions',
      duration: '2-Day Workshop',
    },
    overview:
      'The “I AM SOMEBODY” initiative was designed as an empowerment program focused on leadership, civic awareness, personal resilience, and public health beyond the traditional classroom.',
    focusAreas: [
      'Leadership Development',
      'Civic Awareness & Action',
      'Mental Resilience & Grit',
      'Public Health & Wellness',
      'Adolescent Risk Prevention',
      'Mentorship Networking',
    ],
    impact:
      'Participants reported a significant increase in their confidence to lead school initiatives and a deeper understanding of their roles as active citizens in Sierra Leone. By training 42 participants from six different schools, AEEM created a cross-institutional network of youth leaders ready to advocate for educational equity.',
    quoteText:
      'This workshop changed how I view my future. I realized that my voice matters and that I have the power to create change in my community.',
    quoteAuthor: 'Participant from Prince of Wales School',
  },
};

const linkButtonClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-aeem-forest bg-aeem-forest px-5 text-sm font-semibold text-white transition-colors duration-150 hover:border-aeem-forest-dark hover:bg-aeem-forest-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2';

const StoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared' | 'error'>('idle');

  useEffect(() => {
    let active = true;

    const fetchStory = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('impact_stories')
          .select('title, summary, coverImage:cover_image_url, file_name, participantsCount:participants_count, schoolsCount:schools_count, duration, overview, focusAreas:focus_areas, impact, quoteText:quote_text, quoteAuthor:quote_author')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) throw error;

        if (active) {
          setStory({
            title: data.title,
            quote: data.summary,
            image: data.coverImage ?? '',
            fileName: data.file_name ?? '',
            stats: {
              participants: data.participantsCount != null ? `${data.participantsCount} Participants` : '',
              schools: data.schoolsCount != null ? `${data.schoolsCount} Institutions` : '',
              duration: data.duration ?? '',
            },
            overview: data.overview ?? '',
            focusAreas: data.focusAreas ?? [],
            impact: data.impact ?? '',
            quoteText: data.quoteText ?? '',
            quoteAuthor: data.quoteAuthor ?? '',
          });
        }
      } catch (error) {
        console.warn('Story fetch failed; rendering fallback.', error);

        if (active) {
          setStory(slug ? STORIES_DB[slug] ?? null : null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    if (slug) {
      void fetchStory();
    } else {
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: story?.title ?? 'AEEM impact story',
          url,
        });
        setShareStatus('shared');
        return;
      }

      await navigator.clipboard.writeText(url);
      setShareStatus('copied');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setShareStatus('error');
    }
  };

  if (loading) {
    return (
      <main className="min-h-[70vh]">
        <Section className="flex min-h-[70vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-aeem-gold" aria-label="Loading story" />
        </Section>
      </main>
    );
  }

  if (!story) {
    return (
      <main className="min-h-[70vh]">
        <Section className="flex min-h-[70vh] items-center justify-center text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Impact story
            </p>
            <h1 className="mt-3 text-3xl font-bold text-aeem-ink dark:text-white">
              Story not found
            </h1>
            <p className="mx-auto mt-4 max-w-md text-gray-600 dark:text-gray-300">
              The requested story is not currently available.
            </p>
            <Link to="/impact" className={linkButtonClass + ' mt-8'}>
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Impact
            </Link>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{story.title} | AEEM Case Study</title>
        <meta name="description" content={story.quote.slice(0, 155)} />
        <meta property="og:title" content={story.title} />
        <meta property="og:description" content={story.quote.slice(0, 155)} />
        <meta property="og:image" content={story.image.startsWith('http') ? story.image : getCanonical(story.image)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={getCanonical(`/impact/${slug}`)} />
        <link rel="canonical" href={getCanonical(`/impact/${slug}`)} />
      </Helmet>

      <main>
        <Section spacing="large" className="pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-4xl">
            <Link
              to="/impact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Impact
            </Link>

            <div className="mt-10">
              <Badge>Impact story</Badge>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-aeem-ink sm:text-5xl lg:text-6xl dark:text-white">
                {story.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
                {story.quote}
              </p>
            </div>
          </div>
        </Section>

        <section aria-label="Featured story image" className="pb-12 sm:pb-16 lg:pb-20">
          <Container>
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-gray-100 dark:border-white/10 dark:bg-gray-900">
              <img
                src={story.image}
                alt={story.title}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Container>
        </section>

        <Section spacing="compact" aria-label="Program facts">
          <div className="grid gap-8 border-y border-black/10 py-8 sm:grid-cols-3 dark:border-white/10">
            <Stat value={story.stats.participants} label="Participants" />
            <Stat value={story.stats.schools} label="Schools / institutions" />
            <Stat value={story.stats.duration} label="Duration" />
          </div>
        </Section>

        <Section containerNarrow>
          <article className="space-y-16">
            <section aria-labelledby="overview-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aeem-gold">
                Program
              </p>
              <h2
                id="overview-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-aeem-ink dark:text-white"
              >
                Overview
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                {story.overview}
              </p>
            </section>

            <section aria-labelledby="focus-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aeem-gold">
                Intervention
              </p>
              <h2
                id="focus-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-aeem-ink dark:text-white"
              >
                Key focus areas
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {story.focusAreas.map((item) => (
                  <Card key={item} className="p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-aeem-forest"
                        size={20}
                        aria-hidden="true"
                      />
                      <span className="font-semibold text-aeem-ink dark:text-white">{item}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section aria-labelledby="outcome-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aeem-gold">
                Reported outcome
              </p>
              <h2
                id="outcome-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-aeem-ink dark:text-white"
              >
                What changed
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                {story.impact}
              </p>
              <p className="mt-4 border-l-2 border-aeem-gold pl-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
                The repository currently does not publish a formal measurement method or source
                metadata for this outcome statement. It is therefore presented as a reported
                outcome, not as an independently verified impact metric.
              </p>
            </section>

            <section aria-labelledby="voice-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-aeem-gold">
                Participant voice
              </p>
              <h2
                id="voice-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-aeem-ink dark:text-white"
              >
                In their words
              </h2>

              <blockquote className="mt-8 border-l-4 border-aeem-gold bg-aeem-cream px-6 py-6 dark:bg-aeem-forest-dark sm:px-8">
                <p className="text-xl font-medium leading-8 text-aeem-ink dark:text-white sm:text-2xl">
                  “{story.quoteText}”
                </p>
                <footer className="mt-5 text-sm font-semibold text-gray-600 dark:text-gray-300">
                  — {story.quoteAuthor}
                </footer>
              </blockquote>
            </section>
          </article>
        </Section>

        <Section spacing="compact" className="border-t border-black/10 dark:border-white/10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-aeem-ink dark:text-white">
                Share this story
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
                {shareStatus === 'copied' && 'Link copied to your clipboard.'}
                {shareStatus === 'shared' && 'Share dialog opened.'}
                {shareStatus === 'error' && 'Sharing was not completed.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={handleShare}>
                <Link2 size={16} aria-hidden="true" />
                Share story
              </Button>
              <Link to="/get-involved" className={linkButtonClass}>
                Support similar programs
              </Link>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default StoryDetail;
