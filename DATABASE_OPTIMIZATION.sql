-- Database Optimization for Supabase
-- Run these queries in your Supabase SQL Editor to improve performance

-- 1. Add indexes for frequently queried columns
-- These indexes will speed up ORDER BY and WHERE clauses

-- Index for services table
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at);

-- Index for treatments table
CREATE INDEX IF NOT EXISTS idx_treatments_created_at ON treatments(created_at);

-- Index for contact_messages table
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);

-- 2. Add composite index for contact messages (for admin portal queries)
CREATE INDEX IF NOT EXISTS idx_contact_messages_read_created ON contact_messages(read, created_at DESC);

-- 3. Analyze tables to update statistics (helps query planner)
ANALYZE services;
ANALYZE treatments;
ANALYZE contact_messages;
ANALYZE settings;

-- 4. Optional: Enable Row Level Security (RLS) if not already enabled
-- This is a security best practice for Supabase
-- Note: Run these separately if needed, not in a transaction

-- ALTER TABLE services ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 5. Create policies for public read access (if RLS is enabled)
-- Uncomment these if you enable RLS above

-- CREATE POLICY "Allow public read access to services" ON services
--   FOR SELECT USING (true);

-- CREATE POLICY "Allow public read access to treatments" ON treatments
--   FOR SELECT USING (true);

-- CREATE POLICY "Allow public read access to settings" ON settings
--   FOR SELECT USING (true);

-- CREATE POLICY "Allow public insert to contact_messages" ON contact_messages
--   FOR INSERT WITH CHECK (true);

-- Note: VACUUM commands cannot run in Supabase SQL Editor (transaction block)
-- Supabase automatically handles VACUUM operations
-- If you need to manually VACUUM, use the Supabase CLI or contact support
