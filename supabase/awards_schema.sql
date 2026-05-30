-- AEEM Awards Table
CREATE TABLE awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verification_code TEXT UNIQUE NOT NULL, -- e.g., AEEM-2026-LDR-001
  recipient_name TEXT NOT NULL,
  award_type TEXT NOT NULL, -- e.g., Leadership, Academic Excellence, Community Impact
  issue_date DATE NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}', -- For extra details like school, grade, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- Public read access for verification
CREATE POLICY "Public read for awards verification" ON awards FOR SELECT USING (TRUE);
