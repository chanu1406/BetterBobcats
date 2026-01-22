-- Migration: Create Event Request RPC Functions
-- Functions: create_event_request, delete_event_request, fulfill_event_request, email_for_user

-- ============================================================================
-- 1. HELPER FUNCTION: Get email for a user_id (SECURITY DEFINER)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.email_for_user(p_user_id uuid)
RETURNS citext
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
STABLE
AS $$
DECLARE
  v_email citext;
BEGIN
  SELECT email INTO v_email
  FROM auth.users
  WHERE id = p_user_id;
  
  RETURN v_email;
END;
$$;

-- Grant execute
GRANT EXECUTE ON FUNCTION public.email_for_user(uuid) TO authenticated;

-- ============================================================================
-- 2. RPC: CREATE_EVENT_REQUEST
-- ============================================================================

CREATE OR REPLACE FUNCTION public.create_event_request(
  p_description text,
  p_major_id uuid DEFAULT NULL,
  p_is_all_majors boolean DEFAULT false,
  p_tags text[] DEFAULT ARRAY[]::text[]
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $$
DECLARE
  v_request_id uuid;
  v_tag text;
BEGIN
  -- Validate: must have either major_id OR is_all_majors=true
  IF p_major_id IS NULL AND NOT p_is_all_majors THEN
    RAISE EXCEPTION 'Either major_id must be provided or is_all_majors must be true';
  END IF;

  -- Validate: cannot have both major_id and is_all_majors=true
  IF p_major_id IS NOT NULL AND p_is_all_majors THEN
    RAISE EXCEPTION 'Cannot specify both major_id and is_all_majors=true';
  END IF;

  -- Validate: must be authenticated
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated to create event requests';
  END IF;

  -- Insert request
  INSERT INTO public.event_requests (
    description,
    major_id,
    is_all_majors,
    created_by
  ) VALUES (
    trim(p_description),
    p_major_id,
    p_is_all_majors,
    auth.uid()
  )
  RETURNING id INTO v_request_id;

  -- Insert tags (normalized by trigger)
  IF p_tags IS NOT NULL AND array_length(p_tags, 1) > 0 THEN
    FOREACH v_tag IN ARRAY p_tags
    LOOP
      -- Skip empty tags
      IF trim(v_tag) <> '' THEN
        INSERT INTO public.event_request_tags (request_id, tag)
        VALUES (v_request_id, trim(v_tag))
        ON CONFLICT (request_id, tag) DO NOTHING;
      END IF;
    END LOOP;
  END IF;

  RETURN v_request_id;
END;
$$;

-- Grant execute
GRANT EXECUTE ON FUNCTION public.create_event_request(text, uuid, boolean, text[]) TO authenticated;

-- ============================================================================
-- 3. RPC: DELETE_EVENT_REQUEST (Soft Delete)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.delete_event_request(
  p_request_id uuid,
  p_reason text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $$
DECLARE
  v_request public.event_requests%ROWTYPE;
BEGIN
  -- Get request
  SELECT * INTO v_request
  FROM public.event_requests
  WHERE id = p_request_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event request not found';
  END IF;

  -- Check permissions: creator OR platform admin
  IF v_request.created_by != auth.uid() AND NOT public.is_platform_admin() THEN
    RAISE EXCEPTION 'Not authorized to delete this request';
  END IF;

  -- Soft delete
  UPDATE public.event_requests
  SET 
    deleted_at = now(),
    deleted_by = auth.uid(),
    delete_reason = p_reason
  WHERE id = p_request_id;
END;
$$;

-- Grant execute
GRANT EXECUTE ON FUNCTION public.delete_event_request(uuid, text) TO authenticated;

-- ============================================================================
-- 4. RPC: FULFILL_EVENT_REQUEST
-- ============================================================================

CREATE OR REPLACE FUNCTION public.fulfill_event_request(
  p_request_id uuid,
  p_event_id uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $$
DECLARE
  v_request public.event_requests%ROWTYPE;
  v_event public.events%ROWTYPE;
  v_club_id uuid;
  v_creator_email citext;
  v_upvoter_email citext;
  v_user_record RECORD;
  v_base_url text := 'https://betterbobcats.com';
  v_event_url text;
  v_idempotency_key text;
  v_payload jsonb;
  v_club_name text;
  v_club_slug text;
BEGIN
  -- Lock request row FOR UPDATE
  SELECT * INTO v_request
  FROM public.event_requests
  WHERE id = p_request_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event request not found';
  END IF;

  -- Check if already fulfilled
  IF v_request.status = 'fulfilled' THEN
    RAISE EXCEPTION 'Event request is already fulfilled';
  END IF;

  -- Get event
  SELECT * INTO v_event
  FROM public.events
  WHERE id = p_event_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event not found';
  END IF;

  v_club_id := v_event.club_id;

  -- Check permissions: must be officer/admin of event's club OR platform admin
  IF NOT public.is_platform_admin() AND NOT (
    public.is_club_officer(v_club_id) OR public.is_club_admin(v_club_id)
  ) THEN
    RAISE EXCEPTION 'Not authorized to fulfill this request. Must be officer/admin of the event''s club.';
  END IF;

  -- Get club info for email
  SELECT name, slug INTO v_club_name, v_club_slug
  FROM public.clubs
  WHERE id = v_club_id;

  IF v_club_name IS NULL THEN
    v_club_name := 'Club';
  END IF;
  IF v_club_slug IS NULL THEN
    v_club_slug := v_club_id::text;
  END IF;

  -- Build event URL
  v_event_url := v_base_url || '/events'; -- Adjust if you have event detail pages

  -- Update request status
  UPDATE public.event_requests
  SET 
    status = 'fulfilled',
    fulfilled_event_id = p_event_id
  WHERE id = p_request_id;

  -- Link event to request
  UPDATE public.events
  SET request_id = p_request_id
  WHERE id = p_event_id AND request_id IS NULL;

  -- Enqueue email for creator
  v_creator_email := public.email_for_user(v_request.created_by);
  IF v_creator_email IS NOT NULL THEN
    v_idempotency_key := 'req_fulfilled_creator:' || p_request_id::text;
    v_payload := jsonb_build_object(
      'request_id', p_request_id::text,
      'request_description_snippet', left(v_request.description, 200),
      'event_id', p_event_id::text,
      'event_title', v_event.title,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'starts_at', v_event.starts_at::text,
      'location_name', v_event.location_name,
      'location_type', v_event.location_type,
      'event_url', v_event_url
    );

    INSERT INTO public.email_outbox (
      to_email,
      template,
      payload,
      idempotency_key,
      created_by
    ) VALUES (
      v_creator_email,
      'event_request_fulfilled_creator',
      v_payload,
      v_idempotency_key,
      auth.uid()
    )
    ON CONFLICT (idempotency_key) DO NOTHING;
  END IF;

  -- Enqueue emails for upvoters (skip creator if they also upvoted)
  FOR v_user_record IN
    SELECT DISTINCT erv.user_id
    FROM public.event_request_votes erv
    WHERE erv.request_id = p_request_id
      AND erv.user_id != v_request.created_by -- Skip creator
  LOOP
    v_upvoter_email := public.email_for_user(v_user_record.user_id);
    IF v_upvoter_email IS NULL THEN
      CONTINUE; -- Skip if no email found
    END IF;
    
    v_idempotency_key := 'req_fulfilled_upvoter:' || p_request_id::text || ':' || v_user_record.user_id::text;
    
    v_payload := jsonb_build_object(
      'request_id', p_request_id::text,
      'request_description_snippet', left(v_request.description, 200),
      'event_id', p_event_id::text,
      'event_title', v_event.title,
      'club_name', v_club_name,
      'club_slug', v_club_slug,
      'starts_at', v_event.starts_at::text,
      'location_name', v_event.location_name,
      'location_type', v_event.location_type,
      'event_url', v_event_url
    );

    INSERT INTO public.email_outbox (
      to_email,
      template,
      payload,
      idempotency_key,
      created_by
    ) VALUES (
      v_upvoter_email,
      'event_request_fulfilled_upvoter',
      v_payload,
      v_idempotency_key,
      auth.uid()
    )
    ON CONFLICT (idempotency_key) DO NOTHING;
  END LOOP;

  RETURN p_event_id;
END;
$$;

-- Grant execute
GRANT EXECUTE ON FUNCTION public.fulfill_event_request(uuid, uuid) TO authenticated;
