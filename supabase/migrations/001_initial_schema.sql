-- AEEM initial application schema
-- Branch: aeem-v2-foundation
--
-- This migration establishes the database contract used by the public website.
-- Public visitors may read published content and submit inquiries.
-- Public visitors may not read or mutate inquiry records or unpublished content.
--
-- Staff/admin access should use a future authenticated role/policy model.
-- Do not expose the service-role key to the browser.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Content: events
-- ---------------------------------------------------------------------------

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 200),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null check (char_length(trim(description)) between 1 and 5000),
  event_date timestamptz not null,
  location text not null check (char_length(trim(location)) between 1 and 300),
  status text not null default 'upcoming'
    check (status in ('upcoming', 'completed')),
  cover_image_url text,
  file_name text,
  duration text,
  overview text,
  focus_areas text[] not null default '{}',
  impact text,
  quote_text text,
  quote_author text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_published_date_idx
  on public.events (published, event_date desc);

-- ---------------------------------------------------------------------------
-- Content: resources
-- ---------------------------------------------------------------------------

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 250),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  type text,
  category text,
  description text,
  summary text,
  body text,
  full_body text,
  file_url text,
  reading_time text,
  tags text[] not null default '{}',
  image_url text,
  bullet_points text[] not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resources_published_date_idx
  on public.resources (published, created_at desc);

create index if not exists resources_category_idx
  on public.resources (category)
  where published = true;

-- ---------------------------------------------------------------------------
-- Content: impact stories
-- ---------------------------------------------------------------------------

create table if not exists public.impact_stories (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 1 and 250),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  summary text not null check (char_length(trim(summary)) between 1 and 5000),
  location text not null check (char_length(trim(location)) between 1 and 300),
  participants_count integer not null default 0 check (participants_count >= 0),
  schools_count integer not null default 0 check (schools_count >= 0),
  cover_image_url text,
  file_name text,
  duration text,
  overview text,
  focus_areas text[] not null default '{}',
  impact text,
  quote_text text,
  quote_author text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists impact_stories_published_date_idx
  on public.impact_stories (published, created_at desc);

-- ---------------------------------------------------------------------------
-- Engagement: inquiries
-- ---------------------------------------------------------------------------

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null
    check (inquiry_type in ('contact', 'volunteer', 'partner', 'donor')),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(trim(email)) between 3 and 320),
  email_normalized text not null check (email_normalized = lower(trim(email_normalized))),
  phone text,
  phone_normalized text,
  organization text check (organization is null or char_length(trim(organization)) <= 250),
  message text not null check (char_length(trim(message)) between 10 and 3000),
  submission_key text not null check (submission_key ~ '^[0-9a-f]{64}$'),
  created_at timestamptz not null default now(),

  -- Authoritative idempotency boundary.
  constraint inquiries_submission_key_unique
    unique (inquiry_type, submission_key)
);

create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);

create index if not exists inquiries_email_normalized_idx
  on public.inquiries (email_normalized);

-- ---------------------------------------------------------------------------
-- Shared updated_at trigger
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists resources_set_updated_at on public.resources;
create trigger resources_set_updated_at
before update on public.resources
for each row execute function public.set_updated_at();

drop trigger if exists impact_stories_set_updated_at on public.impact_stories;
create trigger impact_stories_set_updated_at
before update on public.impact_stories
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.events enable row level security;
alter table public.resources enable row level security;
alter table public.impact_stories enable row level security;
alter table public.inquiries enable row level security;

-- Public website: published content only.
drop policy if exists "public_read_published_events" on public.events;
create policy "public_read_published_events"
on public.events
for select
to anon, authenticated
using (published = true);

drop policy if exists "public_read_published_resources" on public.resources;
create policy "public_read_published_resources"
on public.resources
for select
to anon, authenticated
using (published = true);

drop policy if exists "public_read_published_impact_stories" on public.impact_stories;
create policy "public_read_published_impact_stories"
on public.impact_stories
for select
to anon, authenticated
using (published = true);

-- Public website: submission only.
-- There is intentionally NO SELECT/UPDATE/DELETE policy for inquiries.
drop policy if exists "public_submit_inquiries" on public.inquiries;
create policy "public_submit_inquiries"
on public.inquiries
for insert
to anon
with check (true);

-- No public mutation policies exist for content.
-- Future staff/admin policies must be explicit and role-scoped.
