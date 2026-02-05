-- Add Meeting & Logistics, Outcomes, Events Preview, and Recognized by University

-- Enums for meeting logistics
DO $$ BEGIN
  CREATE TYPE public.club_profile_meeting_frequency AS ENUM ('weekly', 'biweekly', 'monthly', 'varies');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.club_profile_meeting_location AS ENUM ('online', 'on_campus', 'hybrid');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add columns to club_profiles
ALTER TABLE public.club_profiles
  ADD COLUMN IF NOT EXISTS meeting_frequency public.club_profile_meeting_frequency,
  ADD COLUMN IF NOT EXISTS meeting_location public.club_profile_meeting_location,
  ADD COLUMN IF NOT EXISTS meeting_days text,
  ADD COLUMN IF NOT EXISTS outcomes text,
  ADD COLUMN IF NOT EXISTS upcoming_highlights text,
  ADD COLUMN IF NOT EXISTS recognized_by_university boolean NOT NULL DEFAULT true;

-- Grant enum type usage
GRANT USAGE ON TYPE public.club_profile_meeting_frequency TO anon, authenticated;
GRANT USAGE ON TYPE public.club_profile_meeting_location TO anon, authenticated;
