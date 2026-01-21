-- Migration: Fix Club Invites RLS Policy
-- Allows club admins and officers to create invites for their club
-- Fixes issue where club admins/officers couldn't invite members

-- ============================================================================
-- 1. CREATE POLICY FOR CLUB ADMINS/OFFICERS TO CREATE INVITES
-- ============================================================================

CREATE POLICY "club_admins_officers_create_invites" 
ON "public"."club_invites" 
FOR INSERT 
TO "authenticated" 
WITH CHECK (
  "public"."is_platform_admin"() 
  OR "public"."is_club_admin"("club_id") 
  OR "public"."is_club_officer"("club_id")
);

-- ============================================================================
-- 2. CREATE POLICY FOR CLUB ADMINS/OFFICERS TO READ INVITES
-- ============================================================================

CREATE POLICY "club_admins_officers_read_invites" 
ON "public"."club_invites" 
FOR SELECT 
TO "authenticated" 
USING (
  "public"."is_platform_admin"() 
  OR "public"."is_club_admin"("club_id") 
  OR "public"."is_club_officer"("club_id")
  OR (("email")::"text" = "public"."current_user_email"())
);

-- ============================================================================
-- 3. CREATE POLICY FOR CLUB ADMINS/OFFICERS TO UPDATE INVITES
-- ============================================================================

CREATE POLICY "club_admins_officers_update_invites" 
ON "public"."club_invites" 
FOR UPDATE 
TO "authenticated" 
USING (
  "public"."is_platform_admin"() 
  OR "public"."is_club_admin"("club_id") 
  OR "public"."is_club_officer"("club_id")
)
WITH CHECK (
  "public"."is_platform_admin"() 
  OR "public"."is_club_admin"("club_id") 
  OR "public"."is_club_officer"("club_id")
);

-- ============================================================================
-- 4. CREATE POLICY FOR CLUB ADMINS/OFFICERS TO DELETE INVITES
-- ============================================================================

CREATE POLICY "club_admins_officers_delete_invites" 
ON "public"."club_invites" 
FOR DELETE 
TO "authenticated" 
USING (
  "public"."is_platform_admin"() 
  OR "public"."is_club_admin"("club_id") 
  OR "public"."is_club_officer"("club_id")
);
