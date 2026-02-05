/**
 * send-emails — Supabase Edge Function
 * Picks up pending rows from email_outbox, renders template, sends via Resend, then marks sent/failed.
 * Invoked by POST /api/send-emails (x-worker-secret) or cron.
 */

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
        processed: emailsData.length,
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
  const dashboardLink = `${payload.dashboard_url}/${payload.club_slug}`;

  const inner = `
    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">Great news! Your club request for <strong>${escapeHtml(payload.club_name)}</strong> has been approved.</p>
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #334155; line-height: 1.6;">You can now access your club dashboard and start managing your club.</p>
    ${ctaButton(dashboardLink, "Access Club Dashboard")}
    <p style="margin: 0 0 6px 0; font-size: 14px; color: #64748b;">Or copy and paste this link:</p>
    <p style="margin: 0; font-size: 13px; color: #94a3b8; word-break: break-all;">${escapeHtml(dashboardLink)}</p>
    <p style="margin: 24px 0 0 0; font-size: 15px; color: #64748b; line-height: 1.5;">If you have any questions, we're here to help.</p>
  `;
  const html = emailLayout(inner);

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

  const reasonBlock = payload.rejection_reason
    ? `<div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
        <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: #991b1b;">Reason</p>
        <p style="margin: 0; font-size: 15px; color: #7f1d1d; line-height: 1.5;">${escapeHtml(payload.rejection_reason)}</p>
      </div>`
    : "";

  const inner = `
    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">Thank you for your interest in creating a club on BetterBobcats.</p>
    <p style="margin: 0 0 20px 0; font-size: 16px; color: #334155; line-height: 1.6;">Unfortunately, your club request for <strong>${escapeHtml(payload.club_name)}</strong> could not be approved at this time.</p>
    ${reasonBlock}
    <p style="margin: 0 0 8px 0; font-size: 16px; color: #334155; line-height: 1.6;">If you'd like to address the feedback and resubmit, use the button below.</p>
    ${ctaButton(payload.reapply_url, "Resubmit Club Request")}
    <p style="margin: 24px 0 0 0; font-size: 15px; color: #64748b; line-height: 1.5;">If you have any questions, we're here to help.</p>
  `;
  const html = emailLayout(inner);

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

  const bullets = bulletList([
    "Help manage the club and members",
    "Create and manage events",
    "Engage with the community",
  ]);

  const inner = `
    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">You've been invited to join <strong>${escapeHtml(payload.club_name)}</strong> as an officer on BetterBobcats.</p>
    <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #475569;">As an officer, you'll be able to:</p>
    ${bullets}
    ${ctaButton(payload.invite_url, "Accept Invitation")}
    <p style="margin: 0 0 6px 0; font-size: 14px; color: #64748b;">Or copy and paste this link:</p>
    <p style="margin: 0; font-size: 13px; color: #94a3b8; word-break: break-all;">${escapeHtml(payload.invite_url)}</p>
    <p style="margin: 24px 0 0 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">If you didn't expect this invitation, you can safely ignore this email.</p>
  `;
  const html = emailLayout(inner);

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
  const subject = `You've been invited to join ${payload.club_name} as ${roleDisplay}`;

  const bulletItems =
    payload.role === "admin"
      ? ["Manage club settings and members", "Create and manage events", "Invite new members", "Full administrative access"]
      : payload.role === "officer"
      ? ["Help manage the club", "Create and manage events", "Engage with members"]
      : ["Participate in club activities", "Attend events", "Connect with other members"];
  const bullets = bulletList(bulletItems);

  const inner = `
    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">You've been invited to join <strong>${escapeHtml(payload.club_name)}</strong> as ${roleDisplay} on BetterBobcats.</p>
    <p style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #475569;">As ${roleDisplay}, you'll be able to:</p>
    ${bullets}
    ${ctaButton(payload.invite_url, "Accept Invitation")}
    <p style="margin: 0 0 6px 0; font-size: 14px; color: #64748b;">Or copy and paste this link:</p>
    <p style="margin: 0; font-size: 13px; color: #94a3b8; word-break: break-all;">${escapeHtml(payload.invite_url)}</p>
    <p style="margin: 24px 0 0 0; font-size: 14px; color: #94a3b8; line-height: 1.5;">If you didn't expect this invitation, you can safely ignore this email.</p>
  `;
  const html = emailLayout(inner);

  const text = `
Club Invitation

You've been invited to join "${payload.club_name}" as ${roleDisplay} on BetterBobcats!

As ${roleDisplay}, you'll be able to:
${bulletItems.map((i) => `- ${i}`).join("\n")}

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
  const snippet = payload.request_description_snippet + (payload.request_description_snippet.length >= 200 ? "..." : "");
  const dateTime = new Date(payload.starts_at).toLocaleString();

  const inner = `
    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">Great news! Your event request has been fulfilled by <strong>${escapeHtml(payload.club_name)}</strong>.</p>
    <div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: #1e40af;">Your request</p>
      <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.5;">${escapeHtml(snippet)}</p>
    </div>
    <p style="margin: 24px 0 8px 0; font-size: 15px; font-weight: 600; color: #475569;">Event details</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 24px 0;">
      <tr><td style="padding: 4px 0; font-size: 14px; color: #64748b;">Title</td><td style="padding: 4px 0; font-size: 15px; color: #1e293b;">${escapeHtml(payload.event_title)}</td></tr>
      <tr><td style="padding: 4px 0; font-size: 14px; color: #64748b;">Club</td><td style="padding: 4px 0; font-size: 15px; color: #1e293b;">${escapeHtml(payload.club_name)}</td></tr>
      <tr><td style="padding: 4px 0; font-size: 14px; color: #64748b;">Date &amp; time</td><td style="padding: 4px 0; font-size: 15px; color: #1e293b;">${escapeHtml(dateTime)}</td></tr>
      <tr><td style="padding: 4px 0; font-size: 14px; color: #64748b;">Location</td><td style="padding: 4px 0; font-size: 15px; color: #1e293b;">${escapeHtml(locationText)}</td></tr>
    </table>
    ${ctaButton(payload.event_url, "View Event")}
    <p style="margin: 24px 0 0 0; font-size: 15px; color: #64748b; line-height: 1.5;">Thank you for helping make BetterBobcats better!</p>
  `;
  const html = emailLayout(inner);

  const text = `
Event Request Fulfilled!

Great news! Your event request has been fulfilled by "${payload.club_name}".

Your Request:
${snippet}

Event Details:
Title: ${payload.event_title}
Club: ${payload.club_name}
Date & Time: ${dateTime}
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
  const snippet = payload.request_description_snippet + (payload.request_description_snippet.length >= 200 ? "..." : "");
  const dateTime = new Date(payload.starts_at).toLocaleString();

  const inner = `
    <p style="margin: 0 0 20px 0; font-size: 16px; color: #1e293b; line-height: 1.6;">An event request you upvoted has been fulfilled by <strong>${escapeHtml(payload.club_name)}</strong>.</p>
    <div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: #1e40af;">Request you upvoted</p>
      <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.5;">${escapeHtml(snippet)}</p>
    </div>
    <p style="margin: 24px 0 8px 0; font-size: 15px; font-weight: 600; color: #475569;">Event details</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 24px 0;">
      <tr><td style="padding: 4px 0; font-size: 14px; color: #64748b;">Title</td><td style="padding: 4px 0; font-size: 15px; color: #1e293b;">${escapeHtml(payload.event_title)}</td></tr>
      <tr><td style="padding: 4px 0; font-size: 14px; color: #64748b;">Club</td><td style="padding: 4px 0; font-size: 15px; color: #1e293b;">${escapeHtml(payload.club_name)}</td></tr>
      <tr><td style="padding: 4px 0; font-size: 14px; color: #64748b;">Date &amp; time</td><td style="padding: 4px 0; font-size: 15px; color: #1e293b;">${escapeHtml(dateTime)}</td></tr>
      <tr><td style="padding: 4px 0; font-size: 14px; color: #64748b;">Location</td><td style="padding: 4px 0; font-size: 15px; color: #1e293b;">${escapeHtml(locationText)}</td></tr>
    </table>
    ${ctaButton(payload.event_url, "View Event")}
    <p style="margin: 24px 0 0 0; font-size: 15px; color: #64748b; line-height: 1.5;">Thank you for your support!</p>
  `;
  const html = emailLayout(inner);

  const text = `
Event You Upvoted Has Been Created!

Great news! An event request you upvoted has been fulfilled by "${payload.club_name}".

Request You Upvoted:
${snippet}

Event Details:
Title: ${payload.event_title}
Club: ${payload.club_name}
Date & Time: ${dateTime}
Location: ${locationText}

View Event: ${payload.event_url}

Thank you for your support!

BetterBobcats Team
  `.trim();

  return { subject, html, text };
}

/**
 * Shared email layout — Calendly-style: centered white card, branding, clear footer.
 * Uses table-based layout for broad email client support.
 */
function emailLayout(innerContent: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>BetterBobcats</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #e5e7eb; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #e5e7eb;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
          <!-- Header with branding -->
          <tr>
            <td style="padding: 32px 40px 24px 40px; border-radius: 12px 12px 0 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
                <td style="width: 36px; height: 36px; background-color: #2563eb; border-radius: 8px; vertical-align: middle;"></td>
                <td style="padding-left: 12px; vertical-align: middle;"><span style="font-size: 22px; font-weight: 700; color: #1e293b; letter-spacing: -0.02em;">BetterBobcats</span></td>
              </tr></table>
              <div style="height: 4px; width: 48px; background-color: #2563eb; border-radius: 2px; margin-top: 16px;"></div>
            </td>
          </tr>
          <!-- Main content -->
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              ${innerContent}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 32px 40px; border-top: 1px solid #f1f5f9; border-radius: 0 0 12px 12px;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">Sent from BetterBobcats</p>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">UC Merced student clubs & events</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/** Primary CTA button — single, prominent. */
function ctaButton(href: string, label: string): string {
  return `
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 28px 0;">
  <tr>
    <td style="text-align: center;">
      <a href="${escapeHtml(href)}" style="display: inline-block; padding: 14px 28px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">${escapeHtml(label)}</a>
    </td>
  </tr>
</table>`.trim();
}

/** Bulleted list container. */
function bulletList(items: string[]): string {
  const lis = items
    .map(
      (item) =>
        `<li style="margin: 8px 0; color: #334155; font-size: 15px; line-height: 1.5;">${escapeHtml(item)}</li>`
    )
    .join("");
  return `<ul style="margin: 12px 0 24px 0; padding-left: 22px; color: #334155;">${lis}</ul>`;
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
