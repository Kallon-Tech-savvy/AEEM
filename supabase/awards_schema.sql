-- AEEM Award System Schema Extension

-- 8. Awards Table
CREATE TABLE awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verification_code TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  award_title TEXT NOT NULL,
  category TEXT CHECK (category IN ('academic', 'leadership', 'community', 'innovation')) NOT NULL,
  issue_date DATE DEFAULT CURRENT_DATE,
  institution TEXT,
  description TEXT,
  metadata JSONB,
  verification_status TEXT CHECK (verification_status IN ('verified', 'revoked', 'pending')) DEFAULT 'verified',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- Public read access for verified awards
CREATE POLICY "Public read for verified awards" ON awards FOR SELECT USING (verification_status = 'verified');

-- Index for fast verification lookups
CREATE INDEX idx_awards_verification_code ON awards (verification_code);

-- Seed some mock awards for testing
INSERT INTO awards (verification_code, recipient_name, award_title, category, institution, description)
VALUES
('AEEM-2026-LDR-001', 'Amadu Kamara', 'Youth Leadership Excellence', 'leadership', 'Prince of Wales School', 'Recognized for outstanding commitment to community-led advocacy.'),
('AEEM-2026-ACA-042', 'Mariama Sesay', 'Academic Resilience Award', 'academic', 'Freetown Secondary School for Girls', 'Awarded for exceptional perseverance and academic achievement.'),
('AEEM-2026-INN-112', 'Sahr Gando', 'Digital Innovation Catalyst', 'innovation', 'Saint Edwards Secondary School', 'Honored for pioneering student-led digital literacy initiatives.');
