-- Complete the MVP schema tables that were intentionally left out of 001.
-- Safe to run after 001_initial_schema.sql; all objects are idempotent.

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  role TEXT CHECK (role IN ('customer','assistant','agent','system')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  channel TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  text TEXT,
  external_url TEXT,
  received_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_briefings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  morning_brief TEXT,
  evening_summary TEXT,
  top3_priorities TEXT[],
  telegram_message_id INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conversations_lead ON conversations(lead_id, created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_channel ON conversations(channel, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_project ON reviews(project_id);
CREATE INDEX IF NOT EXISTS idx_reviews_channel ON reviews(channel, received_at DESC);
CREATE INDEX IF NOT EXISTS idx_daily_briefings_date ON daily_briefings(date DESC);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_briefings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS owner_full ON conversations;
DROP POLICY IF EXISTS owner_full ON reviews;
DROP POLICY IF EXISTS owner_full ON daily_briefings;

CREATE POLICY owner_full ON conversations
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY owner_full ON reviews
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY owner_full ON daily_briefings
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS anon_insert_conversations ON conversations;

CREATE POLICY anon_insert_conversations ON conversations
  FOR INSERT TO anon
  WITH CHECK (channel = 'website');
