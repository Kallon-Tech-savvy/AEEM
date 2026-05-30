import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding events...');
  const { error: eventsError } = await supabase.from('events').upsert([
    {
      title: 'AEEM Education Summit 2026',
      slug: 'summit-2026',
      description: 'Bringing together policy makers, educators, and youth leaders to discuss the future of inclusive education in West Africa.',
      event_date: '2026-08-15',
      location: 'Freetown City Council Hall',
      status: 'upcoming',
      cover_image_url: '/assets/gallery/Participant_Group_Picture.jpg'
    },
    {
      title: 'Youth Leadership Workshop',
      slug: 'leadership-workshop',
      description: 'A hands-on training session for student leaders focused on advocacy and community organizing.',
      event_date: '2026-09-22',
      location: 'Makeni University Campus',
      status: 'upcoming',
      cover_image_url: '/assets/gallery/Group_Discussion.jpg'
    },
    {
      title: 'I AM SOMEBODY - Session 1',
      slug: 'i-am-somebody-1',
      description: 'Our inaugural empowerment workshop for 42 participants from six schools.',
      event_date: '2026-01-10',
      location: 'Prince of Wales School',
      status: 'completed',
      cover_image_url: '/assets/gallery/Teacher_and_Student.jpg'
    }
  ], { onConflict: 'slug' });
  if (eventsError) console.error('Events error:', eventsError);

  console.log('Seeding impact stories...');
  const { error: storiesError } = await supabase.from('impact_stories').upsert([
    {
      title: 'I AM SOMEBODY Initiative',
      slug: 'i-am-somebody',
      summary: 'Our flagship 2-day empowerment workshop trained 42 participants from six schools, addressing leadership, civic awareness, and resilience.',
      body: 'The "I AM SOMEBODY" initiative was designed as a high-impact empowerment program to address the critical gaps in traditional education.',
      program_name: 'I AM SOMEBODY',
      location: 'Freetown, Sierra Leone',
      participants_count: 42,
      schools_count: 6,
      published: true,
      cover_image_url: '/assets/gallery/AEEMTEAM_Photo.jpg'
    }
  ], { onConflict: 'slug' });
  if (storiesError) console.error('Stories error:', storiesError);

  console.log('Seeding awards...');
  const { error: awardsError } = await supabase.from('awards').upsert([
    {
      verification_code: 'AEEM-2026-LDR-001',
      recipient_name: 'John Kamara',
      award_type: 'Leadership Excellence',
      issue_date: '2026-01-15',
      description: 'For exceptional leadership during the I AM SOMEBODY summit.',
      metadata: { school: 'Prince of Wales', city: 'Freetown' }
    }
  ], { onConflict: 'verification_code' });
  if (awardsError) console.error('Awards error:', awardsError);

  console.log('Seeding gallery...');
  const galleryItems = [
    { title: 'Team AEEM', caption: 'The core team behind the AEEM movement.', image_url: '/assets/gallery/AEEMTEAM_Photo.jpg', category: 'impact' },
    { title: 'Interactive Sessions', caption: 'Engaging activities during the workshop.', image_url: '/assets/gallery/Activity.jpg', category: 'workshop' },
    { title: 'Recognizing Excellence', caption: 'Award ceremony for outstanding participants.', image_url: '/assets/gallery/Award.jpg', category: 'event' },
    { title: 'Youth Leaders', caption: 'Empowered students ready to lead.', image_url: '/assets/gallery/Boys_Fram.jpg', category: 'impact' },
    { title: 'Future Leaders', caption: 'Supporting the next generation of female leaders.', image_url: '/assets/gallery/Girls_Fram.jpg', category: 'impact' },
    { title: 'Group Discussions', caption: 'Collaborative learning in action.', image_url: '/assets/gallery/Group_Discussion.jpg', category: 'workshop' },
    { title: 'Celebrating Success', caption: 'Moments of achievement.', image_url: '/assets/gallery/Mage_Award.jpg', category: 'event' },
    { title: 'Dedicated Participants', caption: 'Focused on growth and learning.', image_url: '/assets/gallery/Male_Participant.jpg', category: 'workshop' },
    { title: 'The AEEM Family', caption: 'A collective effort for educational change.', image_url: '/assets/gallery/Participant_Group_Picture.jpg', category: 'impact' },
    { title: 'Mentorship Matters', caption: 'Building bridges between teachers and students.', image_url: '/assets/gallery/Teacher_and_Student.jpg', category: 'workshop' },
    { title: 'Our Brand', caption: 'Africa Education Empowerment Movement.', image_url: '/assets/gallery/AEEM.jpg', category: 'general' }
  ];

  const { error: galleryError } = await supabase.from('gallery').upsert(galleryItems, { onConflict: 'image_url' });
  if (galleryError) console.error('Gallery error:', galleryError);

  console.log('Seeding completed.');
}

seed();
