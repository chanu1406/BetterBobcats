"use server";

import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const STORAGE_BUCKET = "event-media";

interface CreateEventParams {
  club_id: string;
  club_slug: string;
  title: string;
  description: string;
  starts_at: string; // ISO string
  ends_at?: string | null; // ISO string
  timezone?: string | null;
  location_type: "on_campus" | "off_campus" | "online" | "hybrid";
  location_name?: string | null;
  location_address?: string | null;
  online_url?: string | null;
  visibility: "public" | "members_only" | "unlisted";
  status: "draft" | "published" | "cancelled";
  banner_url?: string | null;
  thumbnail_url?: string | null;
  is_all_majors: boolean;
  major_ids?: string[];
  tags?: string[];
  capacity?: number | null;
  requires_rsvp: boolean;
  rsvp_url?: string | null;
  is_featured: boolean;
  contact_email?: string | null;
}

interface CreateEventResult {
  ok: boolean;
  event_id?: string;
  error?: string;
}

export async function createEvent(
  params: CreateEventParams
): Promise<CreateEventResult> {
  try {
    const user = await requireUser();

    const supabase = await createClient();

    // Verify user is officer/admin of the club
    const { data: membership, error: membershipError } = await supabase
      .from("club_memberships")
      .select("role")
      .eq("club_id", params.club_id)
      .eq("user_id", user.id)
      .single();

    if (membershipError || !membership) {
      return {
        ok: false,
        error: "You are not a member of this club",
      };
    }

    if (membership.role !== "admin" && membership.role !== "officer") {
      return {
        ok: false,
        error: "Only club admins and officers can create events",
      };
    }

    // Validate ends_at >= starts_at if both provided
    if (params.ends_at) {
      const startsAt = new Date(params.starts_at);
      const endsAt = new Date(params.ends_at);
      if (endsAt < startsAt) {
        return {
          ok: false,
          error: "Event end time must be after start time",
        };
      }
    }

    // Create the event
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .insert({
        club_id: params.club_id,
        title: params.title.trim(),
        description: params.description.trim() || "",
        starts_at: params.starts_at,
        ends_at: params.ends_at || null,
        timezone: params.timezone?.trim() || null,
        location_type: params.location_type,
        location_name: params.location_name?.trim() || null,
        location_address: params.location_address?.trim() || null,
        online_url: params.online_url?.trim() || null,
        visibility: params.visibility,
        status: params.status,
        banner_url: params.banner_url?.trim() || null,
        thumbnail_url: params.thumbnail_url?.trim() || null,
        is_all_majors: params.is_all_majors,
        capacity: params.capacity || null,
        requires_rsvp: params.requires_rsvp,
        rsvp_url: params.rsvp_url?.trim() || null,
        is_featured: params.is_featured,
        contact_email: params.contact_email?.trim() || null,
        created_by: user.id,
      })
      .select("id")
      .single();

    if (eventError || !eventData) {
      console.error("Error creating event:", eventError);
      return {
        ok: false,
        error: eventError?.message || "Failed to create event",
      };
    }

    const eventId = eventData.id;

    // Insert majors if not all majors
    if (!params.is_all_majors && params.major_ids && params.major_ids.length > 0) {
      const majorInserts = params.major_ids.map((major_id) => ({
        event_id: eventId,
        major_id,
      }));

      const { error: majorsError } = await supabase
        .from("event_majors")
        .insert(majorInserts);

      if (majorsError) {
        console.error("Error inserting event majors:", majorsError);
        // Continue even if majors fail - event is created
      }
    }

    // Insert tags
    if (params.tags && params.tags.length > 0) {
      const tagInserts = params.tags
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0)
        .map((tag) => ({
          event_id: eventId,
          tag,
        }));

      if (tagInserts.length > 0) {
        const { error: tagsError } = await supabase
          .from("event_tags")
          .insert(tagInserts);

        if (tagsError) {
          console.error("Error inserting event tags:", tagsError);
          // Continue even if tags fail - event is created
        }
      }
    }

    // Revalidate paths
    revalidatePath(`/dashboard/${params.club_slug}/events`);

    return {
      ok: true,
      event_id: eventId,
    };
  } catch (err) {
    console.error("Unexpected error creating event:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}
