import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Loader2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { AwardSlider } from '../components/sections/AwardSlider';
import MasonryGallery from '../components/sections/MasonryGallery';
import { Container, Section, Stat, Card } from '../components/ui';
import { getCanonical } from '../lib/seo';
import { IMPACT_STORY_LIST_FIELDS } from '../services/contentFields';

interface ImpactStory {
  id: string;
  title: string;
  slug: string;
  summary: string;
  location: string;
  participants_count: number;
  schools_count: number;
  cover_image_url: string;
}

const FALLBACK_STORIES = [
  {
    title: 'I AM SOMEBODY Initiative',
    slug: 'i-am-somebody',
    summary:
      'Our flagship 2-day empowerment workshop trained 42 participants from six schools, addressing leadership, civic awareness, and resilience.',
    cover_image_url: '/assets/gallery/Activity.jpg',
    participants_count: 42,
    schools_count: 6,
    location: 'Freetown, Sierra Leone',
  },
];

const Impact: React.FC = () => {
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data, error } = await supabase
          .from('impact_stories')
          .select(
            IMPACT_STORY_LIST_FIELDS,
          )
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setStories(data && data.length > 0 ? data : (FALLBACK_STORIES as ImpactStory[]));
      } catch (error) {
        console.error('Error fetching impact stories:', error);
        setStories(FALLBACK_STORIES as ImpactStory[]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Impact & Stories | AEEM</title>
        <meta
          name="description"
          content="Explore AEEM programs, impact stories, evidence, and recognition from our work in education and youth empowerment."
        />
        <link rel="canonical" href={getCanonical('/impact')} />
      </Helmet>

      <header className="bg-aeem-forest text-white">
        <Container>
          <div className="max-w-4xl py-24 sm:py-28 lg:py-32">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-aeem-gold-light">
              Evidence & stories
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Impact that can be seen, measured, and understood.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Explore the programs, people, and outcomes behind AEEM&apos;s work.
              Where evidence is available, we show it alongside the story.
            </p>
          </div>
        </Container>
      </header>

      <Section aria-labelledby="impact-at-a-glance-heading">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold">
            At a glance
          </p>
          <h2
            id="impact-at-a-glance-heading"
            className="mt-3 text-3xl font-bold text-aeem-ink sm:text-4xl"
          >
            What we are able to report
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-aeem-ink/70">
            These figures are presented as program-level records, not as a
            substitute for a full organizational impact report.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <Stat value="42" label="Participants" detail="I AM SOMEBODY · 2025" />
          <Stat value="6" label="Schools represented" detail="I AM SOMEBODY · 2025" />
          <Stat value="2 days" label="Workshop duration" detail="I AM SOMEBODY · 2025" />
        </div>
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
        ) : stories.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {stories.map((story) => (
              <Card key={story.slug} className="overflow-hidden p-0">
                <div className="aspect-[16/9] bg-aeem-ink/5">
                  <img
                    src={story.cover_image_url}
                    alt={story.title}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-sm text-aeem-ink/65">
                    <MapPin size={16} className="text-aeem-gold" aria-hidden="true" />
                    <span>{story.location}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-aeem-ink">{story.title}</h3>
                  <p className="mt-3 leading-relaxed text-aeem-ink/70">{story.summary}</p>

                  <div className="my-6 grid grid-cols-2 gap-4 border-y border-aeem-ink/10 py-5">
                    <Stat value={String(story.participants_count)} label="Participants" />
                    <Stat value={String(story.schools_count)} label="Schools" />
                  </div>

                  <Link
                    to={`/impact/${story.slug}`}
                    className="inline-flex items-center gap-2 font-semibold text-aeem-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aeem-focus focus-visible:ring-offset-2"
                  >
                    Read the case study
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="py-12 text-aeem-ink/70">No published impact stories are available yet.</p>
        )}
      </Section>

      <Section aria-labelledby="recognition-heading">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold">
            Recognition
          </p>
          <h2 id="recognition-heading" className="mt-3 text-3xl font-bold text-aeem-ink sm:text-4xl">
            Recognition and institutional relationships
          </h2>
          <p className="mt-4 leading-relaxed text-aeem-ink/70">
            Recognition is useful context, but it is not the same as evidence of
            program outcomes. We keep the distinction explicit.
          </p>
        </div>
        <div className="mt-10">
          <AwardSlider />
        </div>
      </Section>

      <section className="bg-aeem-ink text-white" aria-labelledby="work-gallery-heading">
        <Container>
          <div className="py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aeem-gold-light">
              Work in context
            </p>
            <h2 id="work-gallery-heading" className="mt-3 text-3xl font-bold sm:text-4xl">
              People, programs, and activity
            </h2>
            <p className="mt-4 leading-relaxed text-white/70">
              A visual record of AEEM&apos;s activities and the communities around them.
            </p>
          </div>
          <div className="mt-10">
            <MasonryGallery />
          </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Impact;
