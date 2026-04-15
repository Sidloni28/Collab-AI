-- ================================================
-- Collab AI — Supabase Database Schema
-- Run this in your Supabase SQL Editor:
-- https://supabase.com → Project → SQL Editor
-- ================================================

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'creator' CHECK (role IN ('brand', 'creator', 'admin')),
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  company TEXT,
  niche TEXT,
  social_platform TEXT,
  social_handle TEXT,
  followers INTEGER DEFAULT 0,
  rating INTEGER DEFAULT 0,
  bio TEXT,
  profile_image TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies: Users can read all profiles but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. CAMPAIGNS TABLE
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  budget INTEGER NOT NULL DEFAULT 0,
  spend INTEGER NOT NULL DEFAULT 0,
  deadline TIMESTAMPTZ,
  type TEXT DEFAULT 'Paid' CHECK (type IN ('Paid', 'Barter')),
  category TEXT DEFAULT '',
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'Pending', 'Planning')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. COLLABORATIONS TABLE
CREATE TABLE IF NOT EXISTS collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  type TEXT DEFAULT 'Paid' CHECK (type IN ('Paid', 'Barter')),
  compensation INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Active', 'Completed', 'Pending', 'Declined')),
  posts_per_month INTEGER DEFAULT 1,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Completed', 'Failed')),
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DELIVERABLES TABLE
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collaboration_id UUID NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  filename TEXT DEFAULT '',
  url TEXT NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FEEDBACK TABLE
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for all new tables
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR CAMPAIGNS
CREATE POLICY "Public can view active campaigns" ON campaigns FOR SELECT USING (status = 'Active');
CREATE POLICY "Brands can manage their own campaigns" ON campaigns FOR ALL USING (auth.uid() = brand_id);

-- POLICIES FOR COLLABORATIONS
CREATE POLICY "Users can view their own collaborations" ON collaborations 
  FOR SELECT USING (auth.uid() = creator_id OR auth.uid() = brand_id);
CREATE POLICY "Brands can invite creators" ON collaborations FOR INSERT WITH CHECK (auth.uid() = brand_id);
CREATE POLICY "Brands/Creators can update their collaborations" ON collaborations 
  FOR UPDATE USING (auth.uid() = creator_id OR auth.uid() = brand_id);

-- POLICIES FOR PAYMENTS
CREATE POLICY "Users can view their own payments" ON payments 
  FOR SELECT USING (auth.uid() = creator_id OR auth.uid() = brand_id);

-- POLICIES FOR DELIVERABLES
CREATE POLICY "Users can view their collaboration deliverables" ON deliverables 
  FOR SELECT USING (
    auth.uid() = creator_id OR 
    auth.uid() IN (SELECT brand_id FROM collaborations WHERE id = collaboration_id)
  );
CREATE POLICY "Creators can upload deliverables" ON deliverables FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- POLICIES FOR FEEDBACK
CREATE POLICY "Feedback is viewable by everyone" ON feedback FOR SELECT USING (true);
CREATE POLICY "Users can post feedback" ON feedback FOR INSERT WITH CHECK (auth.uid() = from_user_id);

-- 7. AUTO-PROFILES TRIGGER (KEEPING EXISTING)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'creator'),
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.email, '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
