import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Dashboard Activation Page
 * Handles the activation flow for club admins who click the email link
 * - If not logged in: redirects to signup/login with email prefilled
 * - If logged in: checks if user has access and redirects to dashboard
 */
export default async function ActivateDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { slug } = await params;
  const { email } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, redirect to signup/login with email prefilled
  if (!user) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const signupUrl = new URL("/auth/signup", baseUrl);
    if (email) {
      signupUrl.searchParams.set("email", email);
    }
    signupUrl.searchParams.set("next", `/dashboard/${slug}/activate${email ? `?email=${encodeURIComponent(email)}` : ""}`);
    
    redirect(signupUrl.toString());
  }

  // User is logged in - verify they have access to this club
  const { data: membership } = await supabase
    .from("club_memberships")
    .select("club_id, role")
    .eq("user_id", user.id)
    .single();

  // Check if club exists and user is a member
  const { data: club } = await supabase
    .from("clubs")
    .select("id, slug")
    .eq("slug", slug)
    .single();

  if (!club) {
    redirect(`/dashboard?error=club_not_found`);
  }

  // Check if user's email matches the contact email (for auto-membership)
  if (email && user.email && user.email.toLowerCase() === email.toLowerCase()) {
    // Check if they already have membership
    const { data: existingMembership } = await supabase
      .from("club_memberships")
      .select("id")
      .eq("club_id", club.id)
      .eq("user_id", user.id)
      .single();

    // If no membership exists, check if there's an invite for this email
    if (!existingMembership) {
      const { data: invite } = await supabase
        .from("club_invites")
        .select("id, role")
        .eq("club_id", club.id)
        .eq("email", email.toLowerCase())
        .is("accepted_at", null)
        .single();

      if (invite) {
        // Auto-accept the invite
        await supabase.rpc("accept_club_invite", {
          p_invite_id: invite.id,
        });
      }
    }
  }

  // Redirect to dashboard
  redirect(`/dashboard/${slug}`);
}