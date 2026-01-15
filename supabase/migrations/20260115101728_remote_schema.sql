


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE OR REPLACE FUNCTION "public"."accept_club_invite"("p_invite_id" "uuid") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
declare
  v_inv public.club_invites%rowtype;
begin
  select *
  into v_inv
  from public.club_invites
  where id = p_invite_id
  for update;

  if not found then
    raise exception 'Invite not found';
  end if;

  -- Must match current user's email
  if (v_inv.email)::text <> public.current_user_email() then
    raise exception 'Not authorized to accept this invite';
  end if;

  if v_inv.accepted_at is not null then
    return v_inv.club_id;
  end if;

  update public.club_invites
  set accepted_at = now(),
      accepted_by = auth.uid()
  where id = p_invite_id;

  -- Insert membership but NEVER downgrade role
  insert into public.club_memberships (club_id, user_id, role)
  values (v_inv.club_id, auth.uid(), v_inv.role)
  on conflict (club_id, user_id)
  do update
     set role = case
       when public.role_rank(excluded.role) > public.role_rank(public.club_memberships.role)
         then excluded.role
       else public.club_memberships.role
     end;

  return v_inv.club_id;
end;
$$;


ALTER FUNCTION "public"."accept_club_invite"("p_invite_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."admin_get_club_summary"("p_club_id" "uuid") RETURNS TABLE("club_id" "uuid", "name" "text", "slug" "text", "is_active" boolean, "website" "text", "description" "text", "created_at" timestamp with time zone, "member_count" bigint, "event_count" bigint, "pending_invite_count" bigint)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  return query
  select
    c.id,
    c.name,
    c.slug,
    c.is_active,
    c.website,
    c.description,
    c.created_at,
    (select count(*) from public.club_memberships m where m.club_id = c.id) as member_count,
    (select count(*) from public.events e where e.club_id = c.id) as event_count,
    (select count(*) from public.club_invites i where i.club_id = c.id and i.accepted_at is null) as pending_invite_count
  from public.clubs c
  where c.id = p_club_id;
end;
$$;


ALTER FUNCTION "public"."admin_get_club_summary"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."admin_list_club_invites"("p_club_id" "uuid") RETURNS TABLE("id" "uuid", "email" "text", "role" "text", "invited_at" timestamp with time zone, "created_by" "uuid", "accepted_at" timestamp with time zone, "accepted_by" "uuid")
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  return query
  select
    i.id,
    i.email::text,
    i.role,
    i.created_at as invited_at,
    i.created_by,
    i.accepted_at,
    i.accepted_by
  from public.club_invites i
  where i.club_id = p_club_id
  order by i.created_at desc;
end;
$$;


ALTER FUNCTION "public"."admin_list_club_invites"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."admin_list_club_majors"("p_club_id" "uuid") RETURNS TABLE("major_id" "uuid", "major_name" "text", "note" "text")
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  return query
  select
    m.id,
    m.name,
    n.note
  from public.club_majors cm
  join public.majors m on m.id = cm.major_id
  left join public.club_major_notes n
    on n.club_id = cm.club_id and n.major_id = cm.major_id
  where cm.club_id = p_club_id
  order by m.name asc;
end;
$$;


ALTER FUNCTION "public"."admin_list_club_majors"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."admin_list_club_members"("p_club_id" "uuid") RETURNS TABLE("user_id" "uuid", "email" "text", "role" "text", "created_at" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  return query
  select
    m.user_id,
    u.email,
    m.role,
    m.created_at
  from public.club_memberships m
  left join auth.users u on u.id = m.user_id
  where m.club_id = p_club_id
  order by
    case when m.role='admin' then 0 when m.role='officer' then 1 else 2 end,
    m.created_at asc;
end;
$$;


ALTER FUNCTION "public"."admin_list_club_members"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."admin_list_club_tags"("p_club_id" "uuid") RETURNS TABLE("tag" "text")
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  return query
  select t.tag
  from public.club_tags t
  where t.club_id = p_club_id
  order by t.tag asc;
end;
$$;


ALTER FUNCTION "public"."admin_list_club_tags"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."approve_club_request"("p_request_id" "uuid", "p_slug_override" "text" DEFAULT NULL::"text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$declare
  v_request public.club_requests%rowtype;
  v_slug text;
  v_club_id uuid;
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

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

  update public.club_requests
  set status = 'approved',
      reviewed_at = now(),
      reviewed_by = auth.uid(),
      updated_at = now()
  where id = p_request_id;

  return v_club_id;
end;$$;


ALTER FUNCTION "public"."approve_club_request"("p_request_id" "uuid", "p_slug_override" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."auth_email"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
  select lower(coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  ));
$$;


ALTER FUNCTION "public"."auth_email"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."can_edit_club_request"("p_request_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE
    AS $$
  select exists (
    select 1
    from public.club_requests r
    where r.id = p_request_id
      and r.submitted_by = auth.uid()
      and r.status in ('pending', 'rejected')
  );
$$;


ALTER FUNCTION "public"."can_edit_club_request"("p_request_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."cleanup_rejected_club_requests"("p_older_than_days" integer DEFAULT 90, "p_dry_run" boolean DEFAULT true) RETURNS TABLE("would_delete_count" integer, "deleted_count" integer, "request_ids" "uuid"[])
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
declare
  v_ids uuid[];
  v_would int := 0;
  v_deleted int := 0;
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  select array_agg(id)
  into v_ids
  from public.club_requests
  where status = 'rejected'
    and reviewed_at is not null
    and reviewed_at < now() - (p_older_than_days || ' days')::interval;

  v_would := coalesce(array_length(v_ids, 1), 0);

  if v_would = 0 then
    would_delete_count := 0;
    deleted_count := 0;
    request_ids := ARRAY[]::uuid[];
    return next;
    return;
  end if;

  if p_dry_run then
    would_delete_count := v_would;
    deleted_count := 0;
    request_ids := v_ids;
    return next;
    return;
  end if;

  -- children first
  delete from public.club_request_major_notes where request_id = any(v_ids);
  delete from public.club_request_majors      where request_id = any(v_ids);
  delete from public.club_request_tags        where request_id = any(v_ids);

  -- parent
  delete from public.club_requests where id = any(v_ids);
  get diagnostics v_deleted = row_count;

  would_delete_count := v_would;
  deleted_count := v_deleted;
  request_ids := v_ids;
  return next;
end;
$$;


ALTER FUNCTION "public"."cleanup_rejected_club_requests"("p_older_than_days" integer, "p_dry_run" boolean) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."current_user_email"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
  select lower(
    coalesce(
      nullif(auth.jwt() ->> 'email', ''),
      nullif(current_setting('request.jwt.claim.email', true), ''),
      nullif(auth.jwt() -> 'user_metadata' ->> 'email', '')
    )
  );
$$;


ALTER FUNCTION "public"."current_user_email"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."deactivate_club"("p_club_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  update public.clubs
  set is_active = false
  where id = p_club_id;

  -- remove pending invite emails for this club
  delete from public.club_invites
  where club_id = p_club_id
    and accepted_at is null;
end;
$$;


ALTER FUNCTION "public"."deactivate_club"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."enforce_membership_role_precedence"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare
  existing_role text;
begin
  -- Only enforce on rows that have club_id/user_id
  if new.club_id is null or new.user_id is null then
    return new;
  end if;

  -- Normalize role text a bit
  new.role := lower(coalesce(new.role, 'member'));

  -- If an existing row is present, enforce precedence
  select m.role
    into existing_role
  from public.club_memberships m
  where m.club_id = new.club_id
    and m.user_id = new.user_id
  limit 1;

  if existing_role is not null then
    existing_role := lower(existing_role);

    -- If existing is higher or equal rank, ignore the new insert (prevents duplicates + downgrades)
    if public.role_rank(existing_role) >= public.role_rank(new.role) then
      return null; -- skip insert
    end if;

    -- If new is higher rank (e.g., admin over officer), upgrade existing row instead
    update public.club_memberships
       set role = new.role
     where club_id = new.club_id
       and user_id = new.user_id;

    return null; -- we handled it via update
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."enforce_membership_role_precedence"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."hard_delete_club"("p_club_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  delete from public.events where club_id = p_club_id;
  delete from public.club_tags where club_id = p_club_id;
  delete from public.club_majors where club_id = p_club_id;
  delete from public.club_major_notes where club_id = p_club_id;

  -- deletes all invite emails associated with this club (pending + accepted)
  delete from public.club_invites where club_id = p_club_id;

  delete from public.club_memberships where club_id = p_club_id;

  delete from public.clubs where id = p_club_id;
end;
$$;


ALTER FUNCTION "public"."hard_delete_club"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_club_admin"("p_club_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE
    AS $$
  select exists (
    select 1
    from public.club_memberships m
    where m.club_id = p_club_id
      and m.user_id = auth.uid()
      and m.role = 'admin'
  );
$$;


ALTER FUNCTION "public"."is_club_admin"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_club_member"("p_club_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE
    AS $$
  select exists (
    select 1
    from public.club_memberships m
    where m.club_id = p_club_id
      and m.user_id = auth.uid()
  );
$$;


ALTER FUNCTION "public"."is_club_member"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_club_officer"("p_club_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE
    AS $$
  select exists (
    select 1
    from public.club_memberships m
    where m.club_id = p_club_id
      and m.user_id = auth.uid()
      and m.role in ('admin','officer')
  );
$$;


ALTER FUNCTION "public"."is_club_officer"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."is_platform_admin"() RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
  select exists (
    select 1
    from public.platform_admins
    where user_id = auth.uid()
  );
$$;


ALTER FUNCTION "public"."is_platform_admin"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."list_club_members"("p_club_id" "uuid", "p_limit" integer DEFAULT 25, "p_offset" integer DEFAULT 0) RETURNS TABLE("user_id" "uuid", "email" "text", "role" "text", "created_at" timestamp with time zone, "total_count" bigint)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  -- Allow platform admins OR club admins to view full member list w/ emails
  if not (public.is_platform_admin() or public.is_club_admin(p_club_id)) then
    raise exception 'Not authorized';
  end if;

  return query
  select
    m.user_id,
    u.email::text,
    m.role,
    m.created_at,
    count(*) over() as total_count
  from public.club_memberships m
  left join auth.users u on u.id = m.user_id
  where m.club_id = p_club_id
  order by
    case when m.role = 'admin' then 0 when m.role = 'officer' then 1 else 2 end,
    m.created_at asc
  limit p_limit
  offset p_offset;
end;
$$;


ALTER FUNCTION "public"."list_club_members"("p_club_id" "uuid", "p_limit" integer, "p_offset" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."list_rejected_club_requests_for_cleanup"("p_older_than_days" integer DEFAULT 90, "p_limit" integer DEFAULT 20, "p_offset" integer DEFAULT 0) RETURNS TABLE("id" "uuid", "name" "text", "contact_email" "text", "reviewed_at" timestamp with time zone, "admin_message" "text", "total_count" bigint)
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  return query
  select
    r.id,
    r.name,
    r.contact_email,
    r.reviewed_at,
    r.admin_message,
    count(*) over() as total_count
  from public.club_requests r
  where r.status = 'rejected'
    and r.reviewed_at is not null
    and r.reviewed_at < now() - (p_older_than_days || ' days')::interval
  order by r.reviewed_at desc
  limit p_limit
  offset p_offset;
end;
$$;


ALTER FUNCTION "public"."list_rejected_club_requests_for_cleanup"("p_older_than_days" integer, "p_limit" integer, "p_offset" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."prevent_non_admin_request_admin_field_updates"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare
  v_resubmit text;
begin
  if public.is_platform_admin() then
    return new;
  end if;

  v_resubmit := current_setting('app.resubmit', true);

  -- Allow submitter to resubmit ONLY: rejected -> pending AND clears review/admin fields
  if v_resubmit = 'true' then
    if old.submitted_by = auth.uid()
       and old.status = 'rejected'
       and new.status = 'pending'
       and new.reviewed_by is null
       and new.reviewed_at is null
       and new.admin_message is null
       and new.submitted_by = old.submitted_by
    then
      return new;
    end if;
  end if;

  -- Otherwise, block admin-only fields
  if new.status <> old.status then
    raise exception 'Not allowed to change status';
  end if;

  if coalesce(new.admin_message,'') <> coalesce(old.admin_message,'') then
    raise exception 'Not allowed to change admin_message';
  end if;

  if new.reviewed_by is distinct from old.reviewed_by then
    raise exception 'Not allowed to change reviewed_by';
  end if;

  if new.reviewed_at is distinct from old.reviewed_at then
    raise exception 'Not allowed to change reviewed_at';
  end if;

  if new.submitted_by <> old.submitted_by then
    raise exception 'Not allowed to change submitted_by';
  end if;

  return new;
end;
$$;


ALTER FUNCTION "public"."prevent_non_admin_request_admin_field_updates"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reactivate_club"("p_club_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  update public.clubs
  set is_active = true
  where id = p_club_id;
end;
$$;


ALTER FUNCTION "public"."reactivate_club"("p_club_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."reject_club_request"("p_request_id" "uuid", "p_admin_message" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
declare
  v_status text;
begin
  if not public.is_platform_admin() then
    raise exception 'Not authorized';
  end if;

  -- Lock and validate state
  select status into v_status
  from public.club_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'Request not found: %', p_request_id;
  end if;

  if v_status <> 'pending' then
    raise exception 'Request is not pending (status=%)', v_status;
  end if;

  update public.club_requests
  set status = 'rejected',
      admin_message = p_admin_message,
      reviewed_at = now(),
      reviewed_by = auth.uid(),
      updated_at = now()
  where id = p_request_id;
end;
$$;


ALTER FUNCTION "public"."reject_club_request"("p_request_id" "uuid", "p_admin_message" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."remove_club_member"("p_club_id" "uuid", "p_user_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
declare
  v_target_role text;
  v_admin_count int;
begin
  if not (public.is_platform_admin() or public.is_club_admin(p_club_id)) then
    raise exception 'Not authorized';
  end if;

  -- prevent removing yourself (simple & safe)
  if p_user_id = auth.uid() then
    raise exception 'You cannot remove yourself';
  end if;

  select role into v_target_role
  from public.club_memberships
  where club_id = p_club_id and user_id = p_user_id;

  if not found then
    raise exception 'Membership not found';
  end if;

  -- if removing an admin, ensure at least one admin remains
  if v_target_role = 'admin' then
    select count(*) into v_admin_count
    from public.club_memberships
    where club_id = p_club_id and role = 'admin';

    if v_admin_count <= 1 then
      raise exception 'Cannot remove the last admin';
    end if;
  end if;

  delete from public.club_memberships
  where club_id = p_club_id
    and user_id = p_user_id;
end;
$$;


ALTER FUNCTION "public"."remove_club_member"("p_club_id" "uuid", "p_user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."resubmit_club_request"("p_request_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
declare
  v_req public.club_requests%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Must be logged in';
  end if;

  select *
    into v_req
  from public.club_requests
  where id = p_request_id
  for update;

  if not found then
    raise exception 'Request not found';
  end if;

  if v_req.submitted_by <> auth.uid() then
    raise exception 'Not authorized';
  end if;

  if v_req.status <> 'rejected' then
    raise exception 'Can only resubmit rejected requests';
  end if;

  -- allow controlled status/admin field change via trigger bypass
  perform set_config('app.resubmit', 'true', true);

  update public.club_requests
  set status = 'pending',
      admin_message = null,
      reviewed_at = null,
      reviewed_by = null,
      updated_at = now()
  where id = p_request_id;
end;
$$;


ALTER FUNCTION "public"."resubmit_club_request"("p_request_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."role_rank"("p_role" "text") RETURNS integer
    LANGUAGE "sql" IMMUTABLE
    AS $$
  select case lower(coalesce(p_role, ''))
    when 'admin'   then 2
    when 'officer' then 1
    when 'member'  then 0
    else -1
  end;
$$;


ALTER FUNCTION "public"."role_rank"("p_role" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_club_member_role"("p_club_id" "uuid", "p_user_id" "uuid", "p_role" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'auth'
    AS $$
declare
  v_current_role text;
  v_admin_count int;
begin
  if not (public.is_platform_admin() or public.is_club_admin(p_club_id)) then
    raise exception 'Not authorized';
  end if;

  if p_role not in ('admin','officer','member') then
    raise exception 'Invalid role: %', p_role;
  end if;

  select role into v_current_role
  from public.club_memberships
  where club_id = p_club_id and user_id = p_user_id;

  if not found then
    raise exception 'Membership not found';
  end if;

  -- Prevent demoting the last admin
  if v_current_role = 'admin' and p_role <> 'admin' then
    select count(*) into v_admin_count
    from public.club_memberships
    where club_id = p_club_id and role = 'admin';

    if v_admin_count <= 1 then
      raise exception 'Cannot demote the last admin';
    end if;
  end if;

  update public.club_memberships
  set role = p_role
  where club_id = p_club_id and user_id = p_user_id;
end;
$$;


ALTER FUNCTION "public"."set_club_member_role"("p_club_id" "uuid", "p_user_id" "uuid", "p_role" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."touch_club_request"("p_request_id" "uuid") RETURNS "void"
    LANGUAGE "sql"
    AS $$
  update public.club_requests
  set updated_at = now()
  where id = p_request_id;
$$;


ALTER FUNCTION "public"."touch_club_request"("p_request_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."touch_club_request_from_child"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare
  v_request_id uuid;
begin
  v_request_id := coalesce(new.request_id, old.request_id);
  update public.club_requests set updated_at = now() where id = v_request_id;
  return coalesce(new, old);
end; $$;


ALTER FUNCTION "public"."touch_club_request_from_child"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."club_invites" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "club_id" "uuid" NOT NULL,
    "email" "public"."citext" NOT NULL,
    "role" "text" DEFAULT 'officer'::"text" NOT NULL,
    "request_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_by" "uuid",
    "accepted_at" timestamp with time zone,
    "accepted_by" "uuid"
);


ALTER TABLE "public"."club_invites" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."club_major_notes" (
    "club_id" "uuid" NOT NULL,
    "major_id" "uuid" NOT NULL,
    "note" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."club_major_notes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."club_majors" (
    "club_id" "uuid" NOT NULL,
    "major_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."club_majors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."club_memberships" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "club_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role" "text" DEFAULT 'officer'::"text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."club_memberships" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."club_request_major_notes" (
    "request_id" "uuid" NOT NULL,
    "major_id" "uuid" NOT NULL,
    "note" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."club_request_major_notes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."club_request_majors" (
    "request_id" "uuid" NOT NULL,
    "major_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."club_request_majors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."club_request_tags" (
    "request_id" "uuid" NOT NULL,
    "tag" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."club_request_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."club_requests" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "website" "text",
    "slug_candidate" "text",
    "contact_email" "text" NOT NULL,
    "officer_emails" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "officer_phones" "text"[] DEFAULT '{}'::"text"[] NOT NULL,
    "logo_url" "text",
    "banner_url" "text",
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "admin_message" "text",
    "reviewed_at" timestamp with time zone,
    "reviewed_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "submitted_by" "uuid",
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "club_requests_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'approved'::"text", 'rejected'::"text"])))
);


ALTER TABLE "public"."club_requests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."club_tags" (
    "club_id" "uuid" NOT NULL,
    "tag" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."club_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."clubs" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "description" "text" NOT NULL,
    "website" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "slug" "text",
    "is_active" boolean DEFAULT true NOT NULL,
    "display_order" integer DEFAULT 0 NOT NULL,
    "logo_url" "text",
    "banner_url" "text"
);


ALTER TABLE "public"."clubs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."email_outbox" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "to_email" "public"."citext" NOT NULL,
    "template" "text" NOT NULL,
    "payload" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "attempt_count" integer DEFAULT 0 NOT NULL,
    "last_attempt_at" timestamp with time zone,
    "sent_at" timestamp with time zone,
    "error" "text",
    "idempotency_key" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_by" "uuid",
    CONSTRAINT "email_outbox_status_check" CHECK (("status" = ANY (ARRAY['pending'::"text", 'sending'::"text", 'sent'::"text", 'failed'::"text"])))
);


ALTER TABLE "public"."email_outbox" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "club_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "location" "text",
    "start_at" timestamp with time zone NOT NULL,
    "end_at" timestamp with time zone,
    "url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."majors" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."majors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."platform_admins" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."platform_admins" OWNER TO "postgres";


ALTER TABLE ONLY "public"."club_invites"
    ADD CONSTRAINT "club_invites_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."club_invites"
    ADD CONSTRAINT "club_invites_unique_club_email" UNIQUE ("club_id", "email");



ALTER TABLE ONLY "public"."club_major_notes"
    ADD CONSTRAINT "club_major_notes_pkey" PRIMARY KEY ("club_id", "major_id");



ALTER TABLE ONLY "public"."club_majors"
    ADD CONSTRAINT "club_majors_pkey" PRIMARY KEY ("club_id", "major_id");



ALTER TABLE ONLY "public"."club_memberships"
    ADD CONSTRAINT "club_memberships_club_id_user_id_key" UNIQUE ("club_id", "user_id");



ALTER TABLE ONLY "public"."club_memberships"
    ADD CONSTRAINT "club_memberships_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."club_request_major_notes"
    ADD CONSTRAINT "club_request_major_notes_pkey" PRIMARY KEY ("request_id", "major_id");



ALTER TABLE ONLY "public"."club_request_majors"
    ADD CONSTRAINT "club_request_majors_pkey" PRIMARY KEY ("request_id", "major_id");



ALTER TABLE ONLY "public"."club_request_tags"
    ADD CONSTRAINT "club_request_tags_pkey" PRIMARY KEY ("request_id", "tag");



ALTER TABLE ONLY "public"."club_requests"
    ADD CONSTRAINT "club_requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."club_tags"
    ADD CONSTRAINT "club_tags_pkey" PRIMARY KEY ("club_id", "tag");



ALTER TABLE ONLY "public"."clubs"
    ADD CONSTRAINT "clubs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."clubs"
    ADD CONSTRAINT "clubs_slug_unique" UNIQUE ("slug");



ALTER TABLE ONLY "public"."email_outbox"
    ADD CONSTRAINT "email_outbox_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."majors"
    ADD CONSTRAINT "majors_name_key" UNIQUE ("name");



ALTER TABLE ONLY "public"."majors"
    ADD CONSTRAINT "majors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."platform_admins"
    ADD CONSTRAINT "platform_admins_pkey" PRIMARY KEY ("user_id");



CREATE INDEX "club_invites_accepted_at_idx" ON "public"."club_invites" USING "btree" ("accepted_at");



CREATE INDEX "club_invites_club_id_idx" ON "public"."club_invites" USING "btree" ("club_id");



CREATE INDEX "club_invites_email_idx" ON "public"."club_invites" USING "btree" ("email");



CREATE INDEX "club_memberships_club_id_idx" ON "public"."club_memberships" USING "btree" ("club_id");



CREATE UNIQUE INDEX "club_memberships_unique_club_user" ON "public"."club_memberships" USING "btree" ("club_id", "user_id");



CREATE INDEX "club_memberships_user_id_idx" ON "public"."club_memberships" USING "btree" ("user_id");



CREATE INDEX "club_request_major_notes_request_id_idx" ON "public"."club_request_major_notes" USING "btree" ("request_id");



CREATE INDEX "club_request_majors_request_id_idx" ON "public"."club_request_majors" USING "btree" ("request_id");



CREATE INDEX "club_request_tags_request_id_idx" ON "public"."club_request_tags" USING "btree" ("request_id");



CREATE INDEX "club_requests_created_at_idx" ON "public"."club_requests" USING "btree" ("created_at" DESC);



CREATE INDEX "club_requests_status_idx" ON "public"."club_requests" USING "btree" ("status");



CREATE UNIQUE INDEX "email_outbox_idempotency_key_uniq" ON "public"."email_outbox" USING "btree" ("idempotency_key");



CREATE INDEX "email_outbox_pending_idx" ON "public"."email_outbox" USING "btree" ("created_at") WHERE ("status" = 'pending'::"text");



CREATE INDEX "email_outbox_status_idx" ON "public"."email_outbox" USING "btree" ("status");



CREATE INDEX "email_outbox_to_email_idx" ON "public"."email_outbox" USING "btree" ("to_email");



CREATE INDEX "events_club_id_start_at_idx" ON "public"."events" USING "btree" ("club_id", "start_at" DESC);



CREATE INDEX "idx_club_majors_club_id" ON "public"."club_majors" USING "btree" ("club_id");



CREATE INDEX "idx_club_majors_major_id" ON "public"."club_majors" USING "btree" ("major_id");



CREATE OR REPLACE TRIGGER "trg_club_requests_set_updated_at" BEFORE UPDATE ON "public"."club_requests" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_membership_role_precedence" BEFORE INSERT ON "public"."club_memberships" FOR EACH ROW EXECUTE FUNCTION "public"."enforce_membership_role_precedence"();



CREATE OR REPLACE TRIGGER "trg_prevent_non_admin_request_admin_field_updates" BEFORE UPDATE ON "public"."club_requests" FOR EACH ROW EXECUTE FUNCTION "public"."prevent_non_admin_request_admin_field_updates"();



CREATE OR REPLACE TRIGGER "trg_touch_request_major_notes" AFTER INSERT OR DELETE OR UPDATE ON "public"."club_request_major_notes" FOR EACH ROW EXECUTE FUNCTION "public"."touch_club_request_from_child"();



CREATE OR REPLACE TRIGGER "trg_touch_request_majors" AFTER INSERT OR DELETE OR UPDATE ON "public"."club_request_majors" FOR EACH ROW EXECUTE FUNCTION "public"."touch_club_request_from_child"();



CREATE OR REPLACE TRIGGER "trg_touch_request_tags" AFTER INSERT OR DELETE OR UPDATE ON "public"."club_request_tags" FOR EACH ROW EXECUTE FUNCTION "public"."touch_club_request_from_child"();



ALTER TABLE ONLY "public"."club_invites"
    ADD CONSTRAINT "club_invites_accepted_by_fkey" FOREIGN KEY ("accepted_by") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."club_invites"
    ADD CONSTRAINT "club_invites_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_invites"
    ADD CONSTRAINT "club_invites_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."club_invites"
    ADD CONSTRAINT "club_invites_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."club_requests"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."club_major_notes"
    ADD CONSTRAINT "club_major_notes_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_major_notes"
    ADD CONSTRAINT "club_major_notes_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_majors"
    ADD CONSTRAINT "club_majors_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_majors"
    ADD CONSTRAINT "club_majors_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_memberships"
    ADD CONSTRAINT "club_memberships_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_memberships"
    ADD CONSTRAINT "club_memberships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."club_request_major_notes"
    ADD CONSTRAINT "club_request_major_notes_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id");



ALTER TABLE ONLY "public"."club_request_major_notes"
    ADD CONSTRAINT "club_request_major_notes_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."club_requests"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_request_majors"
    ADD CONSTRAINT "club_request_majors_major_id_fkey" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id");



ALTER TABLE ONLY "public"."club_request_majors"
    ADD CONSTRAINT "club_request_majors_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."club_requests"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_request_tags"
    ADD CONSTRAINT "club_request_tags_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."club_requests"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."club_requests"
    ADD CONSTRAINT "club_requests_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."club_requests"
    ADD CONSTRAINT "club_requests_submitted_by_fkey" FOREIGN KEY ("submitted_by") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."club_tags"
    ADD CONSTRAINT "club_tags_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "public"."clubs"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."platform_admins"
    ADD CONSTRAINT "platform_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Enable read access for all users" ON "public"."club_majors" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."clubs" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."majors" FOR SELECT USING (true);



CREATE POLICY "admin_manage_club_invites" ON "public"."club_invites" USING ("public"."is_platform_admin"()) WITH CHECK ("public"."is_platform_admin"());



CREATE POLICY "admin_manage_clubs" ON "public"."clubs" USING ("public"."is_platform_admin"()) WITH CHECK ("public"."is_platform_admin"());



CREATE POLICY "admin_manage_majors" ON "public"."majors" USING ("public"."is_platform_admin"()) WITH CHECK ("public"."is_platform_admin"());



CREATE POLICY "admin_manage_memberships" ON "public"."club_memberships" USING ("public"."is_platform_admin"()) WITH CHECK ("public"."is_platform_admin"());



CREATE POLICY "admin_read_all_clubs" ON "public"."clubs" FOR SELECT USING ("public"."is_platform_admin"());



CREATE POLICY "club_admin_read_club_memberships" ON "public"."club_memberships" FOR SELECT TO "authenticated" USING (("public"."is_club_admin"("club_id") OR "public"."is_platform_admin"()));



ALTER TABLE "public"."club_invites" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."club_major_notes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."club_majors" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "club_members_manage_club_major_notes" ON "public"."club_major_notes" USING ("public"."is_club_member"("club_id")) WITH CHECK ("public"."is_club_member"("club_id"));



CREATE POLICY "club_members_manage_club_majors" ON "public"."club_majors" USING ("public"."is_club_member"("club_id")) WITH CHECK ("public"."is_club_member"("club_id"));



CREATE POLICY "club_members_manage_events" ON "public"."events" USING ("public"."is_club_member"("club_id")) WITH CHECK ("public"."is_club_member"("club_id"));



CREATE POLICY "club_members_manage_tags" ON "public"."club_tags" USING ("public"."is_club_member"("club_id")) WITH CHECK ("public"."is_club_member"("club_id"));



CREATE POLICY "club_members_select_events" ON "public"."events" FOR SELECT TO "authenticated" USING ("public"."is_club_member"("club_id"));



CREATE POLICY "club_members_update_club" ON "public"."clubs" FOR UPDATE USING ("public"."is_club_member"("id")) WITH CHECK ("public"."is_club_member"("id"));



ALTER TABLE "public"."club_memberships" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "club_officers_delete_events" ON "public"."events" FOR DELETE TO "authenticated" USING ("public"."is_club_officer"("club_id"));



CREATE POLICY "club_officers_insert_events" ON "public"."events" FOR INSERT TO "authenticated" WITH CHECK ("public"."is_club_officer"("club_id"));



CREATE POLICY "club_officers_update_clubs" ON "public"."clubs" FOR UPDATE TO "authenticated" USING ("public"."is_club_officer"("id")) WITH CHECK ("public"."is_club_officer"("id"));



CREATE POLICY "club_officers_update_events" ON "public"."events" FOR UPDATE TO "authenticated" USING ("public"."is_club_officer"("club_id")) WITH CHECK ("public"."is_club_officer"("club_id"));



ALTER TABLE "public"."club_request_major_notes" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "club_request_major_notes_select_owner_or_admin" ON "public"."club_request_major_notes" FOR SELECT TO "authenticated" USING (("public"."is_platform_admin"() OR (EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_major_notes"."request_id") AND ("r"."submitted_by" = "auth"."uid"()))))));



CREATE POLICY "club_request_major_notes_write_owner_or_admin" ON "public"."club_request_major_notes" TO "authenticated" USING (("public"."is_platform_admin"() OR "public"."can_edit_club_request"("request_id"))) WITH CHECK (("public"."is_platform_admin"() OR "public"."can_edit_club_request"("request_id")));



ALTER TABLE "public"."club_request_majors" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "club_request_majors_select_owner_or_admin" ON "public"."club_request_majors" FOR SELECT TO "authenticated" USING (("public"."is_platform_admin"() OR (EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_majors"."request_id") AND ("r"."submitted_by" = "auth"."uid"()))))));



CREATE POLICY "club_request_majors_write_owner_or_admin" ON "public"."club_request_majors" TO "authenticated" USING (("public"."is_platform_admin"() OR "public"."can_edit_club_request"("request_id"))) WITH CHECK (("public"."is_platform_admin"() OR "public"."can_edit_club_request"("request_id")));



ALTER TABLE "public"."club_request_tags" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "club_request_tags_select_owner_or_admin" ON "public"."club_request_tags" FOR SELECT TO "authenticated" USING (("public"."is_platform_admin"() OR "public"."can_edit_club_request"("request_id") OR (EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_tags"."request_id") AND ("r"."submitted_by" = "auth"."uid"()))))));



CREATE POLICY "club_request_tags_write_owner_or_admin" ON "public"."club_request_tags" TO "authenticated" USING (("public"."is_platform_admin"() OR "public"."can_edit_club_request"("request_id"))) WITH CHECK (("public"."is_platform_admin"() OR "public"."can_edit_club_request"("request_id")));



ALTER TABLE "public"."club_requests" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."club_tags" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."clubs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."email_outbox" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."events" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "invited_user_read_own_invites" ON "public"."club_invites" FOR SELECT USING ((("email")::"text" = "public"."current_user_email"()));



ALTER TABLE "public"."majors" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "platform_admin_manage_email_outbox" ON "public"."email_outbox" TO "authenticated" USING ("public"."is_platform_admin"()) WITH CHECK ("public"."is_platform_admin"());



ALTER TABLE "public"."platform_admins" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "platform_admins_read_self" ON "public"."platform_admins" FOR SELECT TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "platform_admins_service_role_all" ON "public"."platform_admins" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "public_read_active_clubs" ON "public"."clubs" FOR SELECT USING (("is_active" = true));



CREATE POLICY "public_read_club_major_notes" ON "public"."club_major_notes" FOR SELECT USING (true);



CREATE POLICY "public_read_club_majors" ON "public"."club_majors" FOR SELECT USING (true);



CREATE POLICY "public_read_club_tags" ON "public"."club_tags" FOR SELECT USING (true);



CREATE POLICY "public_read_events" ON "public"."events" FOR SELECT USING (true);



CREATE POLICY "public_read_majors" ON "public"."majors" FOR SELECT USING (true);



CREATE POLICY "read_own_memberships" ON "public"."club_memberships" FOR SELECT USING (("user_id" = "auth"."uid"()));



CREATE POLICY "read_own_platform_admin_row" ON "public"."platform_admins" FOR SELECT TO "authenticated" USING (("user_id" = "auth"."uid"()));



CREATE POLICY "submitter_delete_own_pending_requests" ON "public"."club_requests" FOR DELETE USING (((("submitted_by" = "auth"."uid"()) AND ("status" = 'pending'::"text")) OR "public"."is_platform_admin"()));



CREATE POLICY "submitter_insert_request" ON "public"."club_requests" FOR INSERT WITH CHECK ((("auth"."uid"() IS NOT NULL) AND ("submitted_by" = "auth"."uid"()) AND ("status" = 'pending'::"text")));



CREATE POLICY "submitter_manage_request_major_notes" ON "public"."club_request_major_notes" USING ((EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_major_notes"."request_id") AND ("public"."is_platform_admin"() OR (("r"."submitted_by" = "auth"."uid"()) AND ("r"."status" = 'pending'::"text"))))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_major_notes"."request_id") AND ("public"."is_platform_admin"() OR (("r"."submitted_by" = "auth"."uid"()) AND ("r"."status" = 'pending'::"text")))))));



CREATE POLICY "submitter_manage_request_majors" ON "public"."club_request_majors" USING ((EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_majors"."request_id") AND ("public"."is_platform_admin"() OR (("r"."submitted_by" = "auth"."uid"()) AND ("r"."status" = 'pending'::"text"))))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_majors"."request_id") AND ("public"."is_platform_admin"() OR (("r"."submitted_by" = "auth"."uid"()) AND ("r"."status" = 'pending'::"text")))))));



CREATE POLICY "submitter_manage_request_tags" ON "public"."club_request_tags" USING ((EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_tags"."request_id") AND ("public"."is_platform_admin"() OR (("r"."submitted_by" = "auth"."uid"()) AND ("r"."status" = 'pending'::"text"))))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."club_requests" "r"
  WHERE (("r"."id" = "club_request_tags"."request_id") AND ("public"."is_platform_admin"() OR (("r"."submitted_by" = "auth"."uid"()) AND ("r"."status" = 'pending'::"text")))))));



CREATE POLICY "submitter_read_own_requests" ON "public"."club_requests" FOR SELECT USING (("public"."is_platform_admin"() OR ("submitted_by" = "auth"."uid"())));



CREATE POLICY "submitter_update_own_requests" ON "public"."club_requests" FOR UPDATE USING (("public"."is_platform_admin"() OR (("submitted_by" = "auth"."uid"()) AND ("status" = ANY (ARRAY['pending'::"text", 'rejected'::"text"]))))) WITH CHECK (("public"."is_platform_admin"() OR (("submitted_by" = "auth"."uid"()) AND ("status" = ANY (ARRAY['pending'::"text", 'rejected'::"text"])))));



GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



REVOKE ALL ON FUNCTION "public"."accept_club_invite"("p_invite_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."accept_club_invite"("p_invite_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."accept_club_invite"("p_invite_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."accept_club_invite"("p_invite_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."admin_get_club_summary"("p_club_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."admin_get_club_summary"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."admin_get_club_summary"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_get_club_summary"("p_club_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."admin_list_club_invites"("p_club_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."admin_list_club_invites"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."admin_list_club_invites"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_list_club_invites"("p_club_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."admin_list_club_majors"("p_club_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."admin_list_club_majors"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."admin_list_club_majors"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_list_club_majors"("p_club_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."admin_list_club_members"("p_club_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."admin_list_club_members"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."admin_list_club_members"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_list_club_members"("p_club_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."admin_list_club_tags"("p_club_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."admin_list_club_tags"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."admin_list_club_tags"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."admin_list_club_tags"("p_club_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."approve_club_request"("p_request_id" "uuid", "p_slug_override" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."approve_club_request"("p_request_id" "uuid", "p_slug_override" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."approve_club_request"("p_request_id" "uuid", "p_slug_override" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."approve_club_request"("p_request_id" "uuid", "p_slug_override" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."auth_email"() TO "anon";
GRANT ALL ON FUNCTION "public"."auth_email"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."auth_email"() TO "service_role";



GRANT ALL ON FUNCTION "public"."can_edit_club_request"("p_request_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."can_edit_club_request"("p_request_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."can_edit_club_request"("p_request_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."cleanup_rejected_club_requests"("p_older_than_days" integer, "p_dry_run" boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."cleanup_rejected_club_requests"("p_older_than_days" integer, "p_dry_run" boolean) TO "anon";
GRANT ALL ON FUNCTION "public"."cleanup_rejected_club_requests"("p_older_than_days" integer, "p_dry_run" boolean) TO "authenticated";
GRANT ALL ON FUNCTION "public"."cleanup_rejected_club_requests"("p_older_than_days" integer, "p_dry_run" boolean) TO "service_role";



GRANT ALL ON FUNCTION "public"."current_user_email"() TO "anon";
GRANT ALL ON FUNCTION "public"."current_user_email"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."current_user_email"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."deactivate_club"("p_club_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."deactivate_club"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."deactivate_club"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."deactivate_club"("p_club_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."enforce_membership_role_precedence"() TO "anon";
GRANT ALL ON FUNCTION "public"."enforce_membership_role_precedence"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."enforce_membership_role_precedence"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."hard_delete_club"("p_club_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."hard_delete_club"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."hard_delete_club"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."hard_delete_club"("p_club_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_club_admin"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_club_admin"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_club_admin"("p_club_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_club_member"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_club_member"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_club_member"("p_club_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_club_officer"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_club_officer"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_club_officer"("p_club_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."is_platform_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_platform_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_platform_admin"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."list_club_members"("p_club_id" "uuid", "p_limit" integer, "p_offset" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."list_club_members"("p_club_id" "uuid", "p_limit" integer, "p_offset" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."list_club_members"("p_club_id" "uuid", "p_limit" integer, "p_offset" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."list_club_members"("p_club_id" "uuid", "p_limit" integer, "p_offset" integer) TO "service_role";



REVOKE ALL ON FUNCTION "public"."list_rejected_club_requests_for_cleanup"("p_older_than_days" integer, "p_limit" integer, "p_offset" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."list_rejected_club_requests_for_cleanup"("p_older_than_days" integer, "p_limit" integer, "p_offset" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."list_rejected_club_requests_for_cleanup"("p_older_than_days" integer, "p_limit" integer, "p_offset" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."list_rejected_club_requests_for_cleanup"("p_older_than_days" integer, "p_limit" integer, "p_offset" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."prevent_non_admin_request_admin_field_updates"() TO "anon";
GRANT ALL ON FUNCTION "public"."prevent_non_admin_request_admin_field_updates"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."prevent_non_admin_request_admin_field_updates"() TO "service_role";



REVOKE ALL ON FUNCTION "public"."reactivate_club"("p_club_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."reactivate_club"("p_club_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."reactivate_club"("p_club_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."reactivate_club"("p_club_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."reject_club_request"("p_request_id" "uuid", "p_admin_message" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."reject_club_request"("p_request_id" "uuid", "p_admin_message" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."reject_club_request"("p_request_id" "uuid", "p_admin_message" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."reject_club_request"("p_request_id" "uuid", "p_admin_message" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."remove_club_member"("p_club_id" "uuid", "p_user_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."remove_club_member"("p_club_id" "uuid", "p_user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."remove_club_member"("p_club_id" "uuid", "p_user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."remove_club_member"("p_club_id" "uuid", "p_user_id" "uuid") TO "service_role";



REVOKE ALL ON FUNCTION "public"."resubmit_club_request"("p_request_id" "uuid") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."resubmit_club_request"("p_request_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."resubmit_club_request"("p_request_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."resubmit_club_request"("p_request_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."role_rank"("p_role" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."role_rank"("p_role" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."role_rank"("p_role" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."set_club_member_role"("p_club_id" "uuid", "p_user_id" "uuid", "p_role" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."set_club_member_role"("p_club_id" "uuid", "p_user_id" "uuid", "p_role" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."set_club_member_role"("p_club_id" "uuid", "p_user_id" "uuid", "p_role" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_club_member_role"("p_club_id" "uuid", "p_user_id" "uuid", "p_role" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."touch_club_request"("p_request_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."touch_club_request"("p_request_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."touch_club_request"("p_request_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."touch_club_request_from_child"() TO "anon";
GRANT ALL ON FUNCTION "public"."touch_club_request_from_child"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."touch_club_request_from_child"() TO "service_role";



GRANT ALL ON TABLE "public"."club_invites" TO "anon";
GRANT ALL ON TABLE "public"."club_invites" TO "authenticated";
GRANT ALL ON TABLE "public"."club_invites" TO "service_role";



GRANT ALL ON TABLE "public"."club_major_notes" TO "anon";
GRANT ALL ON TABLE "public"."club_major_notes" TO "authenticated";
GRANT ALL ON TABLE "public"."club_major_notes" TO "service_role";



GRANT ALL ON TABLE "public"."club_majors" TO "anon";
GRANT ALL ON TABLE "public"."club_majors" TO "authenticated";
GRANT ALL ON TABLE "public"."club_majors" TO "service_role";



GRANT ALL ON TABLE "public"."club_memberships" TO "anon";
GRANT ALL ON TABLE "public"."club_memberships" TO "authenticated";
GRANT ALL ON TABLE "public"."club_memberships" TO "service_role";



GRANT ALL ON TABLE "public"."club_request_major_notes" TO "anon";
GRANT ALL ON TABLE "public"."club_request_major_notes" TO "authenticated";
GRANT ALL ON TABLE "public"."club_request_major_notes" TO "service_role";



GRANT ALL ON TABLE "public"."club_request_majors" TO "anon";
GRANT ALL ON TABLE "public"."club_request_majors" TO "authenticated";
GRANT ALL ON TABLE "public"."club_request_majors" TO "service_role";



GRANT ALL ON TABLE "public"."club_request_tags" TO "anon";
GRANT ALL ON TABLE "public"."club_request_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."club_request_tags" TO "service_role";



GRANT ALL ON TABLE "public"."club_requests" TO "anon";
GRANT ALL ON TABLE "public"."club_requests" TO "authenticated";
GRANT ALL ON TABLE "public"."club_requests" TO "service_role";



GRANT ALL ON TABLE "public"."club_tags" TO "anon";
GRANT ALL ON TABLE "public"."club_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."club_tags" TO "service_role";



GRANT ALL ON TABLE "public"."clubs" TO "anon";
GRANT ALL ON TABLE "public"."clubs" TO "authenticated";
GRANT ALL ON TABLE "public"."clubs" TO "service_role";



GRANT ALL ON TABLE "public"."email_outbox" TO "anon";
GRANT ALL ON TABLE "public"."email_outbox" TO "authenticated";
GRANT ALL ON TABLE "public"."email_outbox" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON TABLE "public"."majors" TO "anon";
GRANT ALL ON TABLE "public"."majors" TO "authenticated";
GRANT ALL ON TABLE "public"."majors" TO "service_role";



GRANT ALL ON TABLE "public"."platform_admins" TO "anon";
GRANT ALL ON TABLE "public"."platform_admins" TO "authenticated";
GRANT ALL ON TABLE "public"."platform_admins" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







