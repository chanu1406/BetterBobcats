-- Migration: Add email enqueueing to approve_club_request and reject_club_request
-- This migration adds email job enqueueing functionality to the club request approval/rejection RPCs

-- Helper function to get the application base URL
-- Uses PostgreSQL configuration setting 'app.base_url' if available, otherwise defaults to a reasonable value
CREATE OR REPLACE FUNCTION public.get_app_base_url()
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce(
    nullif(current_setting('app.base_url', true), ''),
    'https://betterbobcats.com'  -- Default fallback URL
  );
$$;

ALTER FUNCTION public.get_app_base_url() OWNER TO postgres;

COMMENT ON FUNCTION public.get_app_base_url() IS 'Returns the base URL for the application. Can be configured via PostgreSQL setting app.base_url.';

-- Updated approve_club_request function with email enqueueing
CREATE OR REPLACE FUNCTION public.approve_club_request(
  p_request_id uuid,
  p_slug_override text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $$
declare
  v_request public.club_requests%rowtype;
  v_slug text;
  v_club_id uuid;
  v_base_url text;
  v_dashboard_url text;
  v_invite_record public.club_invites%rowtype;
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  -- Get base URL for constructing links
  v_base_url := public.get_app_base_url();
  v_dashboard_url := v_base_url || '/admin/clubs';

  select *
    into v_request
  from public.club_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'Request not found: %', p_request_id;
  end if;

  if v_request.status <> 'pending' then
    raise exception 'Request is not pending (status=%)', v_request.status;
  end if;

  v_slug := coalesce(nullif(trim(p_slug_override), ''), nullif(trim(v_request.slug_candidate), ''));
  if v_slug is null then
    raise exception 'Slug required (provide slug_override or slug_candidate)';
  end if;

  if exists (select 1 from public.clubs c where c.slug = v_slug) then
    raise exception 'Slug already exists: %', v_slug;
  end if;

  insert into public.clubs (name, description, website, slug, logo_url, banner_url)
  values (v_request.name, v_request.description, v_request.website, v_slug, v_request.logo_url, v_request.banner_url)
  returning id into v_club_id;

  -- Create membership for submitter if they exist
  if v_request.submitted_by is not null then
    insert into public.club_memberships (club_id, user_id, role)
    values (v_club_id, v_request.submitted_by, 'admin')
    on conflict (club_id, user_id) do nothing;
  end if;

  -- Copy tags
  insert into public.club_tags (club_id, tag)
  select v_club_id, lower(trim(t.tag))
  from public.club_request_tags t
  where t.request_id = p_request_id and trim(t.tag) <> ''
  on conflict do nothing;

  -- Copy majors
  insert into public.club_majors (club_id, major_id)
  select v_club_id, m.major_id
  from public.club_request_majors m
  where m.request_id = p_request_id
  on conflict do nothing;

  -- Copy major notes
  insert into public.club_major_notes (club_id, major_id, note)
  select v_club_id, n.major_id, n.note
  from public.club_request_major_notes n
  where n.request_id = p_request_id
  on conflict (club_id, major_id)
  do update set note = excluded.note;

  -- -----------------------------
  -- Invites (NEW ROLE RULES)
  -- contact_email -> admin (club owner)
  -- officer_emails[] -> officer
  -- -----------------------------

  -- Owner/admin invite
  insert into public.club_invites (club_id, email, role, request_id, created_by)
  values (
    v_club_id,
    trim(v_request.contact_email)::citext,
    'admin',
    p_request_id,
    auth.uid()
  )
  on conflict (club_id, email) do nothing;

  -- Officers invites
  insert into public.club_invites (club_id, email, role, request_id, created_by)
  select
    v_club_id,
    trim(email)::citext,
    'officer',
    p_request_id,
    auth.uid()
  from unnest(v_request.officer_emails) as email
  where email is not null
    and trim(email) <> ''
    and lower(trim(email)) <> lower(trim(v_request.contact_email))
  on conflict (club_id, email) do nothing;

  -- Update request status
  update public.club_requests
  set status = 'approved',
      reviewed_at = now(),
      reviewed_by = auth.uid(),
      updated_at = now()
  where id = p_request_id;

  -- -----------------------------
  -- Email Enqueueing
  -- -----------------------------

  -- 1) Enqueue contact approval email
  insert into public.email_outbox (
    to_email,
    template,
    payload,
    idempotency_key,
    created_by
  )
  values (
    trim(v_request.contact_email)::citext,
    'club_approved_contact',
    jsonb_build_object(
      'club_name', v_request.name,
      'club_slug', v_slug,
      'club_id', v_club_id,
      'dashboard_url', v_dashboard_url
    ),
    'approved_contact:' || p_request_id::text,
    auth.uid()
  )
  on conflict (idempotency_key) do nothing;

  -- 2) Enqueue officer invite emails for each officer invite created
  for v_invite_record in
    select *
    from public.club_invites
    where club_id = v_club_id
      and role = 'officer'
      and request_id = p_request_id
      and lower(email::text) <> lower(trim(v_request.contact_email))
  loop
    insert into public.email_outbox (
      to_email,
      template,
      payload,
      idempotency_key,
      created_by
    )
    values (
      v_invite_record.email::citext,
      'club_officer_invite',
      jsonb_build_object(
        'club_name', v_request.name,
        'club_slug', v_slug,
        'club_id', v_club_id,
        'invite_id', v_invite_record.id,
        'invite_url', v_base_url || '/auth/login?invite=' || v_invite_record.id::text,
        'dashboard_url', v_dashboard_url
      ),
      'officer_invite:' || v_invite_record.id::text,
      auth.uid()
    )
    on conflict (idempotency_key) do nothing;
  end loop;

  return v_club_id;
end;
$$;

ALTER FUNCTION public.approve_club_request(uuid, text) OWNER TO postgres;

-- Updated reject_club_request function with email enqueueing
CREATE OR REPLACE FUNCTION public.reject_club_request(
  p_request_id uuid,
  p_admin_message text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'auth'
AS $$
declare
  v_request public.club_requests%rowtype;
  v_base_url text;
  v_reapply_url text;
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  -- Get base URL for constructing links
  v_base_url := public.get_app_base_url();
  v_reapply_url := v_base_url || '/clubs/request';

  -- Lock and validate state
  select *
  into v_request
  from public.club_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'Request not found: %', p_request_id;
  end if;

  if v_request.status <> 'pending' then
    raise exception 'Request is not pending (status=%)', v_request.status;
  end if;

  -- Update request status
  update public.club_requests
  set status = 'rejected',
      admin_message = p_admin_message,
      reviewed_at = now(),
      reviewed_by = auth.uid(),
      updated_at = now()
  where id = p_request_id;

  -- Enqueue rejection email
  insert into public.email_outbox (
    to_email,
    template,
    payload,
    idempotency_key,
    created_by
  )
  values (
    trim(v_request.contact_email)::citext,
    'club_rejected_contact',
    jsonb_build_object(
      'club_name', v_request.name,
      'rejection_reason', coalesce(p_admin_message, 'Your club request has been rejected.'),
      'reapply_url', v_reapply_url
    ),
    'rejected_contact:' || p_request_id::text,
    auth.uid()
  )
  on conflict (idempotency_key) do nothing;
end;
$$;

ALTER FUNCTION public.reject_club_request(uuid, text) OWNER TO postgres;

-- Grant permissions on the new helper function
GRANT EXECUTE ON FUNCTION public.get_app_base_url() TO anon;
GRANT EXECUTE ON FUNCTION public.get_app_base_url() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_app_base_url() TO service_role;
