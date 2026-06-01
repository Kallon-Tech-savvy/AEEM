-- AEEM MVP Database Schema

-- 1. Events Table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT,
  status TEXT CHECK (status IN ('upcoming', 'completed')) DEFAULT 'upcoming',
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Event Registrations Table
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  school_or_org TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Prevent duplicate registrations for the same event with the same email
  UNIQUE(event_id, email)
);

-- 3. Impact Stories Table
CREATE TABLE impact_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  body TEXT NOT NULL,
  program_name TEXT,
  location TEXT,
  participants_count INTEGER DEFAULT 0,
  schools_count INTEGER DEFAULT 0,
  funding_source TEXT,
  cover_image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Resources Table
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT CHECK (type IN ('blog', 'download', 'policy', 'guide')) NOT NULL,
  description TEXT,
  file_url TEXT,
  body TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Inquiries Table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_type TEXT CHECK (inquiry_type IN ('volunteer', 'partner', 'contact', 'donor')) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Partners Table
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Subscriptions Table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Awards Table
CREATE TABLE awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verification_code TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  award_type TEXT NOT NULL,
  issue_date DATE NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Gallery Table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  caption TEXT,
  image_url TEXT UNIQUE NOT NULL,
  category TEXT DEFAULT 'general',
  width INTEGER,
  height INTEGER,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public read for events" ON events FOR SELECT USING (TRUE);
CREATE POLICY "Public read for impact_stories" ON impact_stories FOR SELECT USING (published = TRUE);
CREATE POLICY "Public read for resources" ON resources FOR SELECT USING (published = TRUE);
CREATE POLICY "Public read for partners" ON partners FOR SELECT USING (visible = TRUE);
CREATE POLICY "Public read for awards" ON awards FOR SELECT USING (TRUE);
CREATE POLICY "Public read for gallery" ON gallery FOR SELECT USING (TRUE);

-- Public insert access for forms
CREATE POLICY "Public insert for event registrations" ON event_registrations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert for inquiries" ON inquiries FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert for subscriptions" ON subscriptions FOR INSERT WITH CHECK (TRUE);
