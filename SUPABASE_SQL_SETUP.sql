-- =====================================================
-- Sanjeevani Ayurvedic Hospital Database Setup
-- Run this SQL in Supabase SQL Editor
-- =====================================================

-- 1. Create Services Table
CREATE TABLE IF NOT EXISTS "services" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Treatments Table
CREATE TABLE IF NOT EXISTS "treatments" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Contact Messages Table
CREATE TABLE IF NOT EXISTS "contact_messages" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Settings Table
CREATE TABLE IF NOT EXISTS "settings" (
    id SERIAL PRIMARY KEY,
    hospital_name TEXT NOT NULL DEFAULT 'Sanjeevani Ayurvedic Hospital',
    contact_phone TEXT NOT NULL DEFAULT '+91 1234567890',
    contact_email TEXT NOT NULL DEFAULT 'info@sanjeevani.com',
    contact_address TEXT NOT NULL DEFAULT '123 Wellness Street, Ayurveda City, State - 123456',
    working_hours TEXT NOT NULL DEFAULT 'Mon - Sat: 9:00 AM - 6:00 PM',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Insert Initial Settings
INSERT INTO "settings" (hospital_name, contact_phone, contact_email, contact_address, working_hours)
VALUES (
    'Sanjeevani Ayurvedic Hospital',
    '+91 1234567890',
    'info@sanjeevani.com',
    '123 Wellness Street, Ayurveda City, State - 123456',
    'Mon - Sat: 9:00 AM - 6:00 PM'
);

-- 6. Insert Sample Services
INSERT INTO "services" (name, image) VALUES
('Panchakarma Therapy', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80'),
('Ayurvedic Massage', 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80'),
('Herbal Medicine', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80'),
('Stress Management', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80'),
('Joint Care', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80'),
('Wellness Programs', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80');

-- 7. Insert Sample Treatments
INSERT INTO "treatments" (name) VALUES
('Chronic Pain Management'),
('Digestive Disorders'),
('Skin Diseases'),
('Respiratory Problems'),
('Diabetes Management'),
('Weight Management'),
('Insomnia & Sleep Disorders'),
('Women''s Health Issues');

-- 8. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Create triggers for auto-updating updated_at
CREATE TRIGGER update_services_updated_at 
BEFORE UPDATE ON "services"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_treatments_updated_at 
BEFORE UPDATE ON "treatments"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at 
BEFORE UPDATE ON "contact_messages"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at 
BEFORE UPDATE ON "settings"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Enable Row Level Security (RLS)
ALTER TABLE "services" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "treatments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "contact_messages" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "settings" ENABLE ROW LEVEL SECURITY;

-- 11. Create RLS Policies - Allow all operations for now (you can restrict later)
CREATE POLICY "Allow all operations on services" 
ON "services" FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on treatments" 
ON "treatments" FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on contact_messages" 
ON "contact_messages" FOR ALL 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow all operations on settings" 
ON "settings" FOR ALL 
USING (true)
WITH CHECK (true);

-- =====================================================
-- Setup Complete!
-- =====================================================
-- You should now have:
-- - services table (empty, ready for admin to add)
-- - treatments table (empty, ready for admin to add)
-- - contact_messages table (empty, will be filled by website form)
-- - settings table with 1 row of initial data
-- - Auto-updating timestamps
-- - Row Level Security enabled
-- - Public can read services, treatments, settings
-- - Public can insert contact messages
-- - Authenticated users can manage all tables
-- =====================================================
