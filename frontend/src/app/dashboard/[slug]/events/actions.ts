"use server";

import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface DeleteEventResult {
  ok: boolean;
  error?: string;
}

export async function deleteEvent(
  eventId: string,
  clubId: string,
  clubSlug: string
): Promise<DeleteEventResult> {
  try {
    const user = await requireUser();

    const supabase = await createClient();

    // Verify user is officer/admin of the club
    const { data: membership, error: membershipError } = await supabase
      .from("club_memberships")
      .select("role")
      .eq("club_id", clubId)
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
        error: "Only club admins and officers can delete events",
      };
    }

    // Verify the event belongs to this club
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("club_id")
      .eq("id", eventId)
      .single();

    if (eventError || !eventData) {
      return {
        ok: false,
        error: "Event not found",
      };
    }

    if (eventData.club_id !== clubId) {
      return {
        ok: false,
        error: "Event does not belong to this club",
      };
    }

    // Delete the event (cascade will handle event_majors and event_tags)
    const { error: deleteError } = await supabase
      .from("events")
      .delete()
      .eq("id", eventId);

    if (deleteError) {
      console.error("Error deleting event:", deleteError);
      return {
        ok: false,
        error: deleteError.message || "Failed to delete event",
      };
    }

    // Revalidate paths
    revalidatePath(`/dashboard/${clubSlug}/events`);

    return {
      ok: true,
    };
  } catch (err) {
    console.error("Unexpected error deleting event:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}

interface UpdateEventParams {
  event_id: string;
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

interface UpdateEventResult {
  ok: boolean;
  error?: string;
}

export async function updateEvent(
  params: UpdateEventParams
): Promise<UpdateEventResult> {
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
        error: "Only club admins and officers can update events",
      };
    }

    // Verify the event belongs to this club and hasn't passed
    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("club_id, ends_at, starts_at")
      .eq("id", params.event_id)
      .single();

    if (eventError || !eventData) {
      return {
        ok: false,
        error: "Event not found",
      };
    }

    if (eventData.club_id !== params.club_id) {
      return {
        ok: false,
        error: "Event does not belong to this club",
      };
    }

    // Check if event has passed (use ends_at if available, otherwise starts_at)
    const eventEndTime = eventData.ends_at
      ? new Date(eventData.ends_at)
      : new Date(eventData.starts_at);
    const now = new Date();

    if (eventEndTime < now) {
      return {
        ok: false,
        error: "Cannot edit events that have already passed",
      };
    }

    // Validate ends_at >= starts_at if both provided
    if (params.ends_at) {
      const startsAt = new Date(params.starts_at);
      const endsAt = new Date(params.ends_at);
      console.log("Server-side validation:", {
        starts_at: params.starts_at,
        ends_at: params.ends_at,
        startsAt: startsAt.toString(),
        endsAt: endsAt.toString(),
        startsAtTimestamp: startsAt.getTime(),
        endsAtTimestamp: endsAt.getTime(),
        comparison: endsAt < startsAt,
        difference: endsAt.getTime() - startsAt.getTime(),
      });
      if (endsAt < startsAt) {
        console.error("Server validation failed: End time is before start time");
        return {
          ok: false,
          error: "Event end time must be after start time",
        };
      }
    }

    // Update the event
    const { error: updateError } = await supabase
      .from("events")
      .update({
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
        updated_by: user.id,
      })
      .eq("id", params.event_id);

    if (updateError) {
      console.error("Error updating event:", updateError);
      return {
        ok: false,
        error: updateError.message || "Failed to update event",
      };
    }

    // Delete existing majors and insert new ones
    await supabase.from("event_majors").delete().eq("event_id", params.event_id);

    if (!params.is_all_majors && params.major_ids && params.major_ids.length > 0) {
      const majorInserts = params.major_ids.map((major_id) => ({
        event_id: params.event_id,
        major_id,
      }));

      const { error: majorsError } = await supabase
        .from("event_majors")
        .insert(majorInserts);

      if (majorsError) {
        console.error("Error updating event majors:", majorsError);
        // Continue even if majors fail - event is updated
      }
    }

    // Delete existing tags and insert new ones
    await supabase.from("event_tags").delete().eq("event_id", params.event_id);

    if (params.tags && params.tags.length > 0) {
      const tagInserts = params.tags
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0)
        .map((tag) => ({
          event_id: params.event_id,
          tag,
        }));

      if (tagInserts.length > 0) {
        const { error: tagsError } = await supabase
          .from("event_tags")
          .insert(tagInserts);

        if (tagsError) {
          console.error("Error updating event tags:", tagsError);
          // Continue even if tags fail - event is updated
        }
      }
    }

    // Revalidate paths
    revalidatePath(`/dashboard/${params.club_slug}/events`);

    return {
      ok: true,
    };
  } catch (err) {
    console.error("Unexpected error updating event:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
}
