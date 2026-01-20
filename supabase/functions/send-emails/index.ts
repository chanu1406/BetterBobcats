// Supabase Edge Function: send-emails
// Processes email_outbox table and sends emails via Resend API

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const SEND_EMAILS_SECRET = Deno.env.get("SEND_EMAILS_SECRET");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "noreply@betterbobcats.com";
const FROM_NAME = Deno.env.get("FROM_NAME") || "BetterBobcats";

interface EmailRecord {
  id: string;
  to_email: string;
  template: string;
  payload: Record<string, any>;
  attempt_count: number;
}

interface ResendResponse {
  id?: string;
  error?: {
    message: string;
  };
}

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-worker-secret",
  };

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Verify secret header
    const workerSecret = req.headers.get("x-worker-secret");
    if (!workerSecret || workerSecret !== SEND_EMAILS_SECRET) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid worker secret" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate environment variables
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials are not set");
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Step 1: Select and lock up to 25 pending emails
    // The RPC function handles FOR UPDATE SKIP LOCKED and updates status to 'sending'
    const { data: emails, error: selectError } = await supabase.rpc(
      "select_pending_emails_for_sending",
      { p_limit: 25 }
    );

    let emailsData: EmailRecord[] = [];

    if (selectError) {
      // If RPC doesn't exist, fall back to direct query (less safe for concurrency)
      // This should not happen if migration is applied, but provides fallback
      const { data: directData, error: directError } = await supabase
        .from("email_outbox")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true })
        .limit(25);

      if (directError) {
        throw new Error(`Failed to select emails: ${directError.message}`);
      }

      emailsData = directData || [];

      // Step 2: Mark as sending and increment attempt_count (fallback only)
      const now = new Date().toISOString();
      for (const email of emailsData) {
        await supabase
          .from("email_outbox")
          .update({
            status: "sending",
            last_attempt_at: now,
            attempt_count: (email.attempt_count || 0) + 1,
          })
          .eq("id", email.id);
      }
    } else {
      // RPC function already updated status to 'sending'
      emailsData = (emails as EmailRecord[]) || [];
    }

    if (emailsData.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          processed: 0,
          message: "No pending emails to process",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Step 3-5: Process each email
    let successCount = 0;
    let failureCount = 0;

    for (const email of emailsData) {
      try {
        // Step 3: Send email via Resend
        const emailContent = renderEmailTemplate(
          email.template,
          email.payload
        );

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: `${FROM_NAME} <${FROM_EMAIL}>`,
            to: email.to_email,
            subject: emailContent.subject,
            html: emailContent.html,
            text: emailContent.text,
          }),
        });

        const result: ResendResponse = await resendResponse.json();

        if (!resendResponse.ok || result.error) {
          throw new Error(
            result.error?.message ||
              `Resend API error: ${resendResponse.statusText}`
          );
        }

        // Step 4: Mark as sent
        await supabase
          .from("email_outbox")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
          })
          .eq("id", email.id);

        successCount++;
      } catch (error) {
        // Step 5: Mark as failed
        const errorMessage =
          error instanceof Error ? error.message : String(error);

        await supabase
          .from("email_outbox")
          .update({
            status: "failed",
            error: errorMessage.substring(0, 500), // Limit error length
          })
          .eq("id", email.id);

        failureCount++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed: emails.length,
        successful: successCount,
        failed: failureCount,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

/**
 * Render email template based on template name and payload
 */
function renderEmailTemplate(
  template: string,
  payload: Record<string, any>
): { subject: string; html: string; text: string } {
  switch (template) {
    case "club_approved_contact":
      return renderClubApprovedContact(payload);

    case "club_rejected_contact":
      return renderClubRejectedContact(payload);

    case "club_officer_invite":
      return renderClubOfficerInvite(payload);

    case "club_member_invite":
      return renderClubMemberInvite(payload);

    case "event_request_fulfilled_creator":
      return renderEventRequestFulfilledCreator(payload);

    case "event_request_fulfilled_upvoter":
      return renderEventRequestFulfilledUpvoter(payload);

    default:
      throw new Error(`Unknown email template: ${template}`);
  }
}

/**
 * Render club approved contact email
 */
function renderClubApprovedContact(payload: {
  club_name: string;
  club_slug: string;
  club_id: string;
  dashboard_url: string;
  contact_email?: string;
}): { subject: string; html: string; text: string } {
  const subject = `Your club "${payload.club_name}" has been approved!`;
  // Build dashboard URL: dashboard_url/club_slug
  const dashboardLink = `${payload.dashboard_url}/${payload.club_slug}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Club Approved!</h1>
      <p>Great news! Your club request for <strong>${escapeHtml(
        payload.club_name
      )}</strong> has been approved.</p>
      <p>You can now access your club dashboard and start managing your club:</p>
      <p style="margin: 30px 0;">
        <a href="${escapeHtml(
          dashboardLink
        )}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Access Club Dashboard</a>
      </p>
      <p>Or copy and paste this link into your browser:</p>
      <p style="color: #666; font-size: 14px; word-break: break-all;">${escapeHtml(dashboardLink)}</p>
      <p>If you have any questions, please don't hesitate to reach out.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">BetterBobcats Team</p>
    </body>
    </html>
  `;

  const text = `
Club Approved!

Great news! Your club request for "${payload.club_name}" has been approved.

You can now access your club dashboard and start managing your club:
${dashboardLink}

If you have any questions, please don't hesitate to reach out.

BetterBobcats Team
  `.trim();

  return { subject, html, text };
}

/**
 * Render club rejected contact email
 */
function renderClubRejectedContact(payload: {
  club_name: string;
  rejection_reason: string;
  reapply_url: string;
}): { subject: string; html: string; text: string } {
  const subject = `Update on your club request: "${payload.club_name}"`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #dc2626;">Club Request Update</h1>
      <p>Thank you for your interest in creating a club on BetterBobcats.</p>
      <p>Unfortunately, your club request for <strong>${escapeHtml(
        payload.club_name
      )}</strong> could not be approved at this time.</p>
      ${payload.rejection_reason ? `<div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
        <p style="margin: 0;"><strong>Reason:</strong></p>
        <p style="margin: 10px 0 0 0;">${escapeHtml(payload.rejection_reason)}</p>
      </div>` : ""}
      <p>If you'd like to address the feedback and resubmit your request, you can do so here:</p>
      <p style="margin: 30px 0;">
        <a href="${escapeHtml(
          payload.reapply_url
        )}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Resubmit Club Request</a>
      </p>
      <p>If you have any questions, please don't hesitate to reach out.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">BetterBobcats Team</p>
    </body>
    </html>
  `;

  const text = `
Club Request Update

Thank you for your interest in creating a club on BetterBobcats.

Unfortunately, your club request for "${payload.club_name}" could not be approved at this time.

${payload.rejection_reason ? `Reason:\n${payload.rejection_reason}\n` : ""}
If you'd like to address the feedback and resubmit your request, you can do so here:
${payload.reapply_url}

If you have any questions, please don't hesitate to reach out.

BetterBobcats Team
  `.trim();

  return { subject, html, text };
}

/**
 * Render club officer invite email
 */
function renderClubOfficerInvite(payload: {
  club_name: string;
  club_slug: string;
  club_id: string;
  invite_id: string;
  invite_url: string;
  dashboard_url: string;
}): { subject: string; html: string; text: string } {
  const subject = `You've been invited to join ${payload.club_name} as an officer`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Club Officer Invitation</h1>
      <p>You've been invited to join <strong>${escapeHtml(
        payload.club_name
      )}</strong> as an officer on BetterBobcats!</p>
      <p>As an officer, you'll be able to help manage the club, create events, and engage with members.</p>
      <p style="margin: 30px 0;">
        <a href="${escapeHtml(
          payload.invite_url
        )}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Accept Invitation</a>
      </p>
      <p>Or copy and paste this link into your browser:</p>
      <p style="color: #666; font-size: 14px; word-break: break-all;">${escapeHtml(
        payload.invite_url
      )}</p>
      <p>If you didn't expect this invitation, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">BetterBobcats Team</p>
    </body>
    </html>
  `;

  const text = `
Club Officer Invitation

You've been invited to join "${payload.club_name}" as an officer on BetterBobcats!

As an officer, you'll be able to help manage the club, create events, and engage with members.

Accept your invitation here:
${payload.invite_url}

If you didn't expect this invitation, you can safely ignore this email.

BetterBobcats Team
  `.trim();

  return { subject, html, text };
}

/**
 * Render club member invite email (for admin-invited members)
 */
function renderClubMemberInvite(payload: {
  club_name: string;
  club_slug: string;
  club_id: string;
  role: string;
  invite_url: string;
}): { subject: string; html: string; text: string } {
  const roleDisplay = payload.role === "admin" ? "an admin" : payload.role === "officer" ? "an officer" : "a member";
  const roleCapitalized = payload.role.charAt(0).toUpperCase() + payload.role.slice(1);
  const subject = `You've been invited to join ${payload.club_name} as ${roleDisplay}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Club Invitation</h1>
      <p>You've been invited to join <strong>${escapeHtml(
        payload.club_name
      )}</strong> as ${roleDisplay} on BetterBobcats!</p>
      <p>As ${roleDisplay}, you'll be able to:</p>
      <ul style="margin: 20px 0; padding-left: 20px;">
        ${payload.role === "admin" 
          ? "<li>Manage club settings and members</li><li>Create and manage events</li><li>Invite new members</li><li>Full administrative access</li>"
          : payload.role === "officer"
          ? "<li>Help manage the club</li><li>Create and manage events</li><li>Engage with members</li>"
          : "<li>Participate in club activities</li><li>Attend events</li><li>Connect with other members</li>"
        }
      </ul>
      <p style="margin: 30px 0;">
        <a href="${escapeHtml(
          payload.invite_url
        )}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Accept Invitation</a>
      </p>
      <p>Or copy and paste this link into your browser:</p>
      <p style="color: #666; font-size: 14px; word-break: break-all;">${escapeHtml(
        payload.invite_url
      )}</p>
      <p>If you didn't expect this invitation, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">BetterBobcats Team</p>
    </body>
    </html>
  `;

  const text = `
Club Invitation

You've been invited to join "${payload.club_name}" as ${roleDisplay} on BetterBobcats!

As ${roleDisplay}, you'll be able to:
${payload.role === "admin" 
  ? "- Manage club settings and members\n- Create and manage events\n- Invite new members\n- Full administrative access"
  : payload.role === "officer"
  ? "- Help manage the club\n- Create and manage events\n- Engage with members"
  : "- Participate in club activities\n- Attend events\n- Connect with other members"
}

Accept your invitation here:
${payload.invite_url}

If you didn't expect this invitation, you can safely ignore this email.

BetterBobcats Team
  `.trim();

  return { subject, html, text };
}

/**
 * Render event request fulfilled creator email
 */
function renderEventRequestFulfilledCreator(payload: {
  request_id: string;
  request_description_snippet: string;
  event_id: string;
  event_title: string;
  club_name: string;
  club_slug: string;
  starts_at: string;
  location_name: string | null;
  location_type: string;
  event_url: string;
}): { subject: string; html: string; text: string } {
  const subject = `Your event request has been fulfilled: ${payload.event_title}`;

  const locationText = payload.location_name
    ? payload.location_name
    : payload.location_type === "online"
    ? "Online Event"
    : "Location TBD";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Event Request Fulfilled!</h1>
      <p>Great news! Your event request has been fulfilled by <strong>${escapeHtml(
        payload.club_name
      )}</strong>.</p>
      <div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>Your Request:</strong></p>
        <p style="margin: 0; color: #666;">${escapeHtml(
          payload.request_description_snippet
        )}${payload.request_description_snippet.length >= 200 ? "..." : ""}</p>
      </div>
      <h2 style="color: #2563eb; margin-top: 30px;">Event Details</h2>
      <p><strong>Title:</strong> ${escapeHtml(payload.event_title)}</p>
      <p><strong>Club:</strong> ${escapeHtml(payload.club_name)}</p>
      <p><strong>Date & Time:</strong> ${new Date(
        payload.starts_at
      ).toLocaleString()}</p>
      <p><strong>Location:</strong> ${escapeHtml(locationText)}</p>
      <p style="margin: 30px 0;">
        <a href="${escapeHtml(
          payload.event_url
        )}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Event</a>
      </p>
      <p>Thank you for helping make BetterBobcats better!</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">BetterBobcats Team</p>
    </body>
    </html>
  `;

  const text = `
Event Request Fulfilled!

Great news! Your event request has been fulfilled by "${payload.club_name}".

Your Request:
${payload.request_description_snippet}${payload.request_description_snippet.length >= 200 ? "..." : ""}

Event Details:
Title: ${payload.event_title}
Club: ${payload.club_name}
Date & Time: ${new Date(payload.starts_at).toLocaleString()}
Location: ${locationText}

View Event: ${payload.event_url}

Thank you for helping make BetterBobcats better!

BetterBobcats Team
  `.trim();

  return { subject, html, text };
}

/**
 * Render event request fulfilled upvoter email
 */
function renderEventRequestFulfilledUpvoter(payload: {
  request_id: string;
  request_description_snippet: string;
  event_id: string;
  event_title: string;
  club_name: string;
  club_slug: string;
  starts_at: string;
  location_name: string | null;
  location_type: string;
  event_url: string;
}): { subject: string; html: string; text: string } {
  const subject = `An event you upvoted has been created: ${payload.event_title}`;

  const locationText = payload.location_name
    ? payload.location_name
    : payload.location_type === "online"
    ? "Online Event"
    : "Location TBD";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb;">Event You Upvoted Has Been Created!</h1>
      <p>Great news! An event request you upvoted has been fulfilled by <strong>${escapeHtml(
        payload.club_name
      )}</strong>.</p>
      <div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>Request You Upvoted:</strong></p>
        <p style="margin: 0; color: #666;">${escapeHtml(
          payload.request_description_snippet
        )}${payload.request_description_snippet.length >= 200 ? "..." : ""}</p>
      </div>
      <h2 style="color: #2563eb; margin-top: 30px;">Event Details</h2>
      <p><strong>Title:</strong> ${escapeHtml(payload.event_title)}</p>
      <p><strong>Club:</strong> ${escapeHtml(payload.club_name)}</p>
      <p><strong>Date & Time:</strong> ${new Date(
        payload.starts_at
      ).toLocaleString()}</p>
      <p><strong>Location:</strong> ${escapeHtml(locationText)}</p>
      <p style="margin: 30px 0;">
        <a href="${escapeHtml(
          payload.event_url
        )}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Event</a>
      </p>
      <p>Thank you for your support!</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">BetterBobcats Team</p>
    </body>
    </html>
  `;

  const text = `
Event You Upvoted Has Been Created!

Great news! An event request you upvoted has been fulfilled by "${payload.club_name}".

Request You Upvoted:
${payload.request_description_snippet}${payload.request_description_snippet.length >= 200 ? "..." : ""}

Event Details:
Title: ${payload.event_title}
Club: ${payload.club_name}
Date & Time: ${new Date(payload.starts_at).toLocaleString()}
Location: ${locationText}

View Event: ${payload.event_url}

Thank you for your support!

BetterBobcats Team
  `.trim();

  return { subject, html, text };
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
