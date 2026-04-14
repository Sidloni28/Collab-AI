-- ================================================
-- FIX: Deliverables Storage & Table Security
-- Run this in your Supabase SQL Editor:
-- https://supabase.com → Project → SQL Editor
-- ================================================

-- 1. Ensure the 'deliverables' bucket exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('deliverables', 'deliverables', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- 2. STORAGE POLICIES
-- Allow Creators to upload deliverables
DROP POLICY IF EXISTS "Creators can upload deliverables" ON storage.objects;
CREATE POLICY "Creators can upload deliverables" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'deliverables' AND 
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Allow both Brand and Creator to read deliverables via Signed URLs
-- (The createSignedUrl requires select permission)
DROP POLICY IF EXISTS "Parties involved can read deliverables" ON storage.objects;
CREATE POLICY "Parties involved can read deliverables" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'deliverables' AND (
      (storage.foldername(name))[1] = auth.uid()::text OR
      EXISTS (
        SELECT 1 FROM public.collaborations c
        WHERE c.brand_id = auth.uid() 
        AND c.creator_id::text = (storage.foldername(name))[1]
      )
    )
  );

-- 3. TABLE POLICIES (public.deliverables)
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;

-- Allow creator to insert into deliverables table
DROP POLICY IF EXISTS "Creators can insert own deliverable records" ON deliverables;
CREATE POLICY "Creators can insert own deliverable records" ON deliverables
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

-- Allow creator and brand to view the records
DROP POLICY IF EXISTS "Involved parties can view deliverable records" ON deliverables;
CREATE POLICY "Involved parties can view deliverable records" ON deliverables
  FOR SELECT USING (
    auth.uid() = creator_id OR 
    EXISTS (SELECT 1 FROM collaborations WHERE id = collaboration_id AND brand_id = auth.uid())
  );
