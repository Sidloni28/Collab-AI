-- ================================================
-- FIX: RLS Policies for Collaborations
-- Run this in your Supabase SQL Editor:
-- https://supabase.com → Project → SQL Editor
-- ================================================

-- 1. Enable RLS on all relevant tables (if not already enabled)
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- 2. POLICIES FOR 'collaborations'
-- Allow everyone to see collaborations (or restrict to involved parties)
DROP POLICY IF EXISTS "Collaborations are viewable by involved parties" ON collaborations;
CREATE POLICY "Collaborations are viewable by involved parties" ON collaborations
  FOR SELECT USING (auth.uid() = creator_id OR auth.uid() = brand_id);

-- IMPORTANT: Allow creators to APPLY for campaigns
DROP POLICY IF EXISTS "Creators can insert own applications" ON collaborations;
CREATE POLICY "Creators can insert own applications" ON collaborations
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- Allow brands to UPDATE collaboration status (Accept/Decline)
DROP POLICY IF EXISTS "Brands can update their own collaborations" ON collaborations;
CREATE POLICY "Brands can update their own collaborations" ON collaborations
  FOR UPDATE USING (auth.uid() = brand_id);

-- 3. POLICIES FOR 'campaigns'
DROP POLICY IF EXISTS "Campaigns are viewable by everyone" ON campaigns;
CREATE POLICY "Campaigns are viewable by everyone" ON campaigns
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Brands can manage their own campaigns" ON campaigns;
CREATE POLICY "Brands can manage their own campaigns" ON campaigns
  FOR ALL USING (auth.uid() = brand_id);

-- 4. POLICIES FOR 'deliverables'
DROP POLICY IF EXISTS "Deliverables are viewable by involved parties" ON deliverables;
CREATE POLICY "Deliverables are viewable by involved parties" ON deliverables
  FOR SELECT USING (
    auth.uid() = creator_id OR 
    EXISTS (SELECT 1 FROM collaborations WHERE id = collaboration_id AND brand_id = auth.uid())
  );

DROP POLICY IF EXISTS "Creators can insert own deliverables" ON deliverables;
CREATE POLICY "Creators can insert own deliverables" ON deliverables
  FOR INSERT WITH CHECK (auth.uid() = creator_id);
