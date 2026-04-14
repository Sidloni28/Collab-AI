-- Seed Data for Collab AI
-- Run this AFTER schema.sql in Supabase SQL Editor

DO $$
DECLARE
  brand_uid UUID := '7d924db3-161f-40c4-8e65-9ebc02cb0a00';   -- Siddarth Loni (Brand)
  creator_uid UUID := '8ae02634-54ad-4684-af2b-8b860f7a6dc5'; -- Illuminate Gaming YT (Creator)
  camp1_id UUID;
  camp2_id UUID;
  camp3_id UUID;
  collab1_id UUID;
  collab2_id UUID;
BEGIN

-- Campaigns (inserted one at a time to capture IDs)
INSERT INTO public.campaigns (brand_id, title, description, budget, spend, deadline, type, category, status)
VALUES (brand_uid, 'Summer Collection 2024', 'Promote our new summer fashion line with Instagram reels and TikTok videos', 50000, 35000, '2024-08-31', 'Paid', 'Product Marketing', 'Active')
RETURNING id INTO camp1_id;

INSERT INTO public.campaigns (brand_id, title, description, budget, spend, deadline, type, category, status)
VALUES (brand_uid, 'Fall Fashion Week', 'Cover Fashion Week events and create behind-the-scenes content', 75000, 0, '2024-09-15', 'Paid', 'Event Coverage', 'Planning')
RETURNING id INTO camp2_id;

INSERT INTO public.campaigns (brand_id, title, description, budget, spend, deadline, type, category, status)
VALUES (brand_uid, 'Winter Holiday Deals', 'Create gift guide content and holiday promotional posts', 60000, 22000, '2024-12-31', 'Barter', 'Content Creation', 'Active')
RETURNING id INTO camp3_id;

-- Collaborations
INSERT INTO public.collaborations (creator_id, campaign_id, brand_id, type, compensation, status, start_date, end_date, posts_per_month)
VALUES (creator_uid, camp1_id, brand_uid, 'Paid', 3000, 'Active', '2024-10-01', '2024-12-31', 4)
RETURNING id INTO collab1_id;

INSERT INTO public.collaborations (creator_id, campaign_id, brand_id, type, compensation, status, start_date, end_date, posts_per_month)
VALUES (creator_uid, camp3_id, brand_uid, 'Barter', 1500, 'Pending', '2024-10-15', '2024-11-30', 2)
RETURNING id INTO collab2_id;

-- Payments
INSERT INTO public.payments (brand_id, creator_id, campaign_id, amount, status, date)
VALUES
  (brand_uid, creator_uid, camp1_id, 3000, 'Completed', '2024-10-01'),
  (brand_uid, creator_uid, camp1_id, 2500, 'Completed', '2024-10-15'),
  (brand_uid, creator_uid, camp3_id, 4000, 'Pending', '2024-10-20');

-- Deliverables
INSERT INTO public.deliverables (collaboration_id, creator_id, type, filename, url, status)
VALUES
  (collab1_id, creator_uid, 'video', 'summer-reel-1.mp4', 'https://youtube.com/example1', 'Approved'),
  (collab1_id, creator_uid, 'image', 'product-shoot.jpg', 'https://instagram.com/example2', 'Pending'),
  (collab2_id, creator_uid, 'video', 'holiday-unboxing.mp4', 'https://tiktok.com/example3', 'Pending');

-- Feedback
INSERT INTO public.feedback (from_user_id, to_user_id, campaign_id, rating, comment)
VALUES
  (brand_uid, creator_uid, camp1_id, 5, 'Excellent work! Great engagement rates and professional content delivery.'),
  (brand_uid, creator_uid, camp3_id, 4, 'Great collaboration, very responsive and creative. Would love to work again.');

END $$;
