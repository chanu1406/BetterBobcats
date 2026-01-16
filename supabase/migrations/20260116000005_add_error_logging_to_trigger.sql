-- Migration: Add error logging and fix potential issues in invite email trigger
-- This will help us see if the trigger is firing and if there are any errors

CREATE OR REPLACE FUNCTION enqueue_invite_email()
RETURNS TRIGGER AS $$
DECLARE
  v_club_name text;
  v_club_slug text;
  v_base_url text := 'https://betterbobcats.com';
  v_invite_url text;
  v_dashboard_url text;
  v_idempotency_key text;
  v_template text;
  v_payload jsonb;
BEGIN
  -- Determine template based on role
  IF NEW.role = 'admin' THEN
    v_template := 'club_approved_contact';
  ELSIF NEW.role = 'officer' THEN
    v_template := 'club_officer_invite';
  ELSE
    -- Unknown role, skip silently
    RETURN NEW;
  END IF;

  -- Get club information - use COALESCE to ensure we always have values
  SELECT 
    COALESCE(TRIM(name), 'Club') as name, 
    COALESCE(TRIM(slug), NEW.club_id::text) as slug 
  INTO v_club_name, v_club_slug
  FROM clubs
  WHERE id = NEW.club_id;

  -- Skip if club not found (shouldn't happen, but safety check)
  IF v_club_name IS NULL OR v_club_slug IS NULL THEN
    RAISE WARNING 'Club not found for invite %: club_id=%, role=%', NEW.id, NEW.club_id, NEW.role;
    RETURN NEW;
  END IF;

  -- Ensure values are not empty
  IF v_club_name = '' THEN
    v_club_name := 'Club';
  END IF;
  IF v_club_slug = '' THEN
    v_club_slug := NEW.club_id::text;
  END IF;

  -- Build URLs
  v_invite_url := v_base_url || '/invites?token=' || NEW.id::text;
  v_dashboard_url := v_base_url || '/dashboard';
  
  -- Generate idempotency key - make sure it's unique per role
  v_idempotency_key := NEW.role || '-invite-' || NEW.club_id::text || '-' || LOWER(NEW.email) || '-' || NEW.id::text;

  -- Build payload based on template
  IF v_template = 'club_approved_contact' THEN
    -- Admin/contact email payload
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'dashboard_url', v_dashboard_url || '/' || v_club_slug
    );
  ELSE
    -- Officer invite email payload
    v_payload := jsonb_build_object(
      'club_id', NEW.club_id::text,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'invite_id', NEW.id::text,
      'invite_url', v_invite_url,
      'dashboard_url', v_dashboard_url
    );
  END IF;

  -- Enqueue email with complete payload
  -- Use a try-catch pattern with exception handling
  BEGIN
    INSERT INTO email_outbox (
      to_email,
      template,
      payload,
      idempotency_key,
      created_by
    ) VALUES (
      NEW.email,
      v_template,
      v_payload,
      v_idempotency_key,
      NEW.created_by
    )
    ON CONFLICT (idempotency_key) DO NOTHING;
    
    -- Log success (for debugging)
    RAISE NOTICE 'Enqueued email: template=%, to_email=%, role=%', v_template, NEW.email, NEW.role;
  EXCEPTION
    WHEN OTHERS THEN
      -- Log error but don't fail the trigger
      RAISE WARNING 'Failed to enqueue email for invite %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The trigger should already exist, but ensure it's correct
-- (No need to recreate if it exists)
