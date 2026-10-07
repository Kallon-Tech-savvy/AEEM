-- AEEM schema patch
-- Adds impact-story detail fields required by the public impact story page.
-- Safe for an already-initialized production database.

alter table public.impact_stories
  add column if not exists file_name text,
  add column if not exists duration text,
  add column if not exists overview text,
  add column if not exists focus_areas text[] not null default '{}',
  add column if not exists impact text,
  add column if not exists quote_text text,
  add column if not exists quote_author text;
