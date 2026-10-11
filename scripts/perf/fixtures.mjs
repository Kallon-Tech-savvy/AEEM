// Representative rows for the fixture Supabase API. Column names follow the
// public tables the pages select from; values are plain, realistic text.

const body = (n) =>
  Array.from({ length: n }, (_, i) =>
    `<p>Paragraph ${i + 1}. AEEM works with schools and communities across Sierra Leone to widen access to quality education through mentorship and community-led action.</p>`,
  ).join('')

const events = [
  ['sample-event', 'Community Education Forum'],
  ['sample-event-two', 'Youth Mentorship Day'],
  ['sample-event-three', 'Teachers Roundtable'],
].map(([slug, title], i) => ({
  id: `00000000-0000-4000-8000-00000000010${i}`,
  title,
  slug,
  description: body(3),
  event_date: `2026-0${i + 3}-1${i}T10:00:00Z`,
  location: 'Freetown, Sierra Leone',
  status: i === 0 ? 'upcoming' : 'past',
  cover_image_url: '/assets/gallery/Activity.jpg',
  published: true,
}))

const resources = [
  ['sample-resource', 'Mentorship Starter Guide'],
  ['sample-resource-two', 'Community Action Toolkit'],
  ['sample-resource-three', 'Teacher Support Handbook'],
].map(([slug, title], i) => ({
  id: `00000000-0000-4000-8000-00000000020${i}`,
  title,
  slug,
  type: 'guide',
  category: 'Mentorship',
  description: 'A short practical guide for volunteers and teachers.',
  summary: 'What to do in your first month as a mentor.',
  body: body(4),
  full_body: body(8),
  file_url: null,
  reading_time: '6 min',
  tags: ['mentorship', 'schools'],
  image_url: '/assets/gallery/Mentorship.jpg',
  bullet_points: ['Listen first', 'Set one goal', 'Follow up weekly'],
  created_at: `2026-0${i + 1}-05T09:00:00Z`,
  published: true,
}))

const impact_stories = [
  ['sample-story', 'Mentorship in the Western Area'],
  ['sample-story-two', 'Girls in Leadership'],
  ['sample-story-three', 'Teachers Learning Together'],
].map(([slug, title], i) => ({
  id: `00000000-0000-4000-8000-00000000030${i}`,
  title,
  slug,
  summary: 'How a community programme changed attendance and confidence.',
  location: 'Freetown',
  participants_count: 120 + i * 40,
  schools_count: 6 + i,
  cover_image_url: '/assets/gallery/Group_Discussion.jpg',
  file_name: null,
  duration: '6 months',
  overview: body(3),
  focus_areas: ['Mentorship', 'Attendance'],
  impact: body(2),
  quote_text: 'The programme gave our students a reason to stay in school.',
  quote_author: 'Head teacher',
  published: true,
}))

export const TABLES = { events, resources, impact_stories }
