/**
 * Client-side helpers for fetching event requests (v2 + comments)
 */

import { createClient } from "@/lib/supabase/browser";
import type {
  EventRequest,
  EventRequestWithDetails,
  EventRequestComment,
  CreateEventRequestV2Params,
} from "@/types/event-request";

const supabase = createClient();

function isMissingEventRequestsView(error: any): boolean {
  if (!error) return false;
  return (
    error.code === "42P01" ||
    error.code === "PGRST116" ||
    error.status === 404 ||
    `${error.message || ""}`.includes("event_requests_with_counts") ||
    `${error.message || ""}`.includes("Could not find the table") ||
    `${error.details || ""}`.includes("event_requests_with_counts")
  );
}

async function attachVoteCountsAndTags(
  requests: EventRequest[]
): Promise<EventRequest[]> {
  if (!requests.length) return [];

  const requestIds = requests.map((request) => request.id);

  const [{ data: votes, error: votesError }, { data: tags, error: tagsError }] =
    await Promise.all([
      supabase
        .from("event_request_votes")
        .select("request_id")
        .in("request_id", requestIds),
      supabase
        .from("event_request_tags")
        .select("request_id, tag")
        .in("request_id", requestIds),
    ]);

  if (votesError) {
    console.warn("Error fetching event request votes:", votesError);
  }

  if (tagsError) {
    console.warn("Error fetching event request tags:", tagsError);
  }

  const voteCountById = new Map<string, number>();
  (votes || []).forEach((vote: any) => {
    voteCountById.set(
      vote.request_id,
      (voteCountById.get(vote.request_id) || 0) + 1
    );
  });

  const tagsById = new Map<string, string[]>();
  (tags || []).forEach((tagRow: any) => {
    const existing = tagsById.get(tagRow.request_id) || [];
    existing.push(tagRow.tag);
    tagsById.set(tagRow.request_id, existing);
  });

  return requests.map((request) => ({
    ...request,
    vote_count: voteCountById.get(request.id) || 0,
    tags: tagsById.get(request.id) || [],
  }));
}

function sortByVotesAndCreatedAt(requests: EventRequest[]): EventRequest[] {
  return [...requests].sort((a, b) => {
    const votesA = a.vote_count || 0;
    const votesB = b.vote_count || 0;
    if (votesB !== votesA) {
      return votesB - votesA;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

/** Statuses visible on the public feed */
const VISIBLE_STATUSES = [
  "open",
  "planned",
  "scheduled",
  "fulfilled",
  "not_planned",
  "closed",
] as const;

/**
 * Fetch event requests (for public feed). Supports filtering by status; default includes all visible statuses.
 * Sort is applied client-side (trending, top, new, recently active).
 */
export async function fetchEventRequests(filters?: {
  status?: string[];
  type?: string[];
  major_ids?: string[];
  q?: string;
}): Promise<EventRequest[]> {
  try {
    let query = supabase
      .from("event_requests_with_counts")
      .select("*")
      .is("deleted_at", null)
      .in("status", filters?.status?.length ? filters.status : [...VISIBLE_STATUSES])
      .order("created_at", { ascending: false });

    if (filters?.type?.length) {
      query = query.in("request_type", filters.type);
    }
    if (filters?.major_ids?.length) {
      query = query.or(
        `is_all_majors.eq.true,major_id.in.(${filters.major_ids.join(",")})`
      );
    }
    if (filters?.q?.trim()) {
      const q = filters.q.trim().toLowerCase();
      query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching event requests:", error);
      if (isMissingEventRequestsView(error)) {
        console.warn(
          "event_requests_with_counts view does not exist. Falling back to base tables."
        );
        let fallbackQuery = supabase
          .from("event_requests")
          .select("*")
          .is("deleted_at", null)
          .in("status", filters?.status?.length ? filters.status : [...VISIBLE_STATUSES])
          .order("created_at", { ascending: false });
        if (filters?.type?.length) {
          fallbackQuery = fallbackQuery.in("request_type", filters.type);
        }
        if (filters?.major_ids?.length) {
          fallbackQuery = fallbackQuery.or(
            `is_all_majors.eq.true,major_id.in.(${filters.major_ids.join(",")})`
          );
        }
        const { data: fallbackData, error: fallbackError } = await fallbackQuery;
        if (fallbackError) throw fallbackError;
        const hydrated = await attachVoteCountsAndTags(
          (fallbackData || []) as EventRequest[]
        );
        return sortByVotesAndCreatedAt(hydrated);
      }
      throw error;
    }

    return (data || []) as EventRequest[];
  } catch (err) {
    console.error("Error fetching event requests:", err);
    throw err;
  }
}

/**
 * Fetch event request details with related data (OPTIMIZED - single RPC call)
 */
export async function fetchEventRequestDetails(
  requestId: string
): Promise<EventRequestWithDetails | null> {
  try {
    // Single RPC call that returns everything
    const { data, error } = await supabase.rpc("get_event_request_details", {
      p_request_id: requestId,
    });

    if (error || !data) {
      console.error("Error fetching event request details:", error);
      return null;
    }

    return {
      id: data.id,
      title: data.title ?? "",
      subtitle: data.subtitle ?? null,
      description: data.description ?? "",
      major_id: data.major_id,
      is_all_majors: data.is_all_majors,
      status: data.status,
      fulfilled_event_id: data.fulfilled_event_id,
      created_by: data.created_by,
      created_at: data.created_at,
      deleted_at: data.deleted_at,
      deleted_by: data.deleted_by,
      delete_reason: data.delete_reason,
      request_type: data.request_type ?? "other",
      time_pref_days: data.time_pref_days ?? null,
      time_pref_windows: data.time_pref_windows ?? null,
      location_pref: data.location_pref ?? "either",
      suggested_club_id: data.suggested_club_id ?? null,
      merged_into_id: data.merged_into_id ?? null,
      last_activity_at: data.last_activity_at ?? null,
      vote_count: data.vote_count ?? 0,
      comment_count: data.comment_count ?? 0,
      major_name: data.major_name ?? null,
      fulfilled_event: data.fulfilled_event ?? null,
      user_has_voted: data.user_has_voted ?? false,
      tags: Array.isArray(data.tags) ? data.tags : [],
    } as EventRequestWithDetails;
  } catch (err) {
    console.error("Error fetching event request details:", err);
    return null;
  }
}

/**
 * Create an event request (legacy; use createEventRequestV2 for new fields)
 */
export async function createEventRequest(params: {
  description: string;
  major_id: string | null;
  is_all_majors: boolean;
  tags: string[];
}): Promise<string> {
  try {
    const { data, error } = await supabase.rpc("create_event_request", {
      p_description: params.description,
      p_major_id: params.major_id,
      p_is_all_majors: params.is_all_majors,
      p_tags: params.tags,
    });

    if (error) {
      console.error("Error creating event request:", error);
      throw error;
    }

    return data as string;
  } catch (err) {
    console.error("Error creating event request:", err);
    throw err;
  }
}

/**
 * Create an event request (v2: title, type, time/location prefs, etc.)
 */
export async function createEventRequestV2(
  params: CreateEventRequestV2Params
): Promise<string> {
  try {
    const { data, error } = await supabase.rpc("create_event_request_v2", {
      p_title: params.title.trim(),
      p_description: params.description ?? "",
      p_subtitle: params.subtitle ?? null,
      p_request_type: params.request_type ?? "other",
      p_major_id: params.major_id,
      p_is_all_majors: params.is_all_majors,
      p_tags: params.tags ?? [],
      p_time_pref_days: params.time_pref_days ?? null,
      p_time_pref_windows: params.time_pref_windows ?? null,
      p_location_pref: params.location_pref ?? "either",
      p_suggested_club_id: params.suggested_club_id ?? null,
    });

    if (error) {
      console.error("Error creating event request (v2):", error);
      throw error;
    }

    return data as string;
  } catch (err) {
    console.error("Error creating event request (v2):", err);
    throw err;
  }
}

/**
 * Update request status (admin / club officer). Optionally link event when setting scheduled/fulfilled.
 */
export async function updateRequestStatus(
  requestId: string,
  status: string,
  fulfilledEventId?: string | null
): Promise<void> {
  try {
    const { error } = await supabase.rpc("update_request_status", {
      p_request_id: requestId,
      p_status: status,
      p_fulfilled_event_id: fulfilledEventId ?? null,
    });
    if (error) throw error;
  } catch (err) {
    console.error("Error updating request status:", err);
    throw err;
  }
}

/**
 * Merge source request into canonical (platform admin only). Transfers votes and marks source closed.
 */
export async function mergeRequests(
  sourceRequestId: string,
  canonicalRequestId: string
): Promise<void> {
  try {
    const { error } = await supabase.rpc("merge_requests", {
      p_source_request_id: sourceRequestId,
      p_canonical_request_id: canonicalRequestId,
    });
    if (error) throw error;
  } catch (err) {
    console.error("Error merging requests:", err);
    throw err;
  }
}

/**
 * Search requests by title/description (for duplicate detection)
 */
export async function searchEventRequests(query: string): Promise<EventRequest[]> {
  if (!query || query.trim().length < 2) return [];
  try {
    const { data, error } = await supabase
      .from("event_requests_with_counts")
      .select("*")
      .is("deleted_at", null)
      .or(`title.ilike.%${query.trim()}%,description.ilike.%${query.trim()}%`)
      .limit(10)
      .order("vote_count", { ascending: false });

    if (error) {
      console.warn("Error searching event requests:", error);
      return [];
    }
    return (data || []) as EventRequest[];
  } catch (err) {
    console.warn("Error searching event requests:", err);
    return [];
  }
}

/**
 * Delete an event request (soft delete)
 */
export async function deleteEventRequest(
  requestId: string,
  reason?: string
): Promise<void> {
  try {
    const { error } = await supabase.rpc("delete_event_request", {
      p_request_id: requestId,
      p_reason: reason || null,
    });

    if (error) {
      console.error("Error deleting event request:", error);
      throw error;
    }
  } catch (err) {
    console.error("Error deleting event request:", err);
    throw err;
  }
}

/**
 * Toggle vote on an event request
 */
export async function toggleEventRequestVote(
  requestId: string
): Promise<boolean> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Must be authenticated to vote");
    }

    // Check if user has already voted
    const { data: existingVote } = await supabase
      .from("event_request_votes")
      .select("user_id")
      .eq("request_id", requestId)
      .eq("user_id", user.id)
      .single();

    if (existingVote) {
      // Remove vote
      const { error } = await supabase
        .from("event_request_votes")
        .delete()
        .eq("request_id", requestId)
        .eq("user_id", user.id);

      if (error) throw error;
      return false; // Vote removed
    } else {
      // Add vote
      const { error } = await supabase.from("event_request_votes").insert({
        request_id: requestId,
        user_id: user.id,
      });

      if (error) throw error;
      return true; // Vote added
    }
  } catch (err) {
    console.error("Error toggling vote:", err);
    throw err;
  }
}

/**
 * Fetch event requests relevant to a club (for club dashboard)
 */
export async function fetchClubRelevantRequests(
  clubId: string
): Promise<EventRequest[]> {
  try {
    // Get club's majors
    const { data: clubMajors } = await supabase
      .from("club_majors")
      .select("major_id")
      .eq("club_id", clubId);

    const majorIds = clubMajors?.map((cm) => cm.major_id) || [];

    // Build OR condition for matching requests
    // - is_all_majors=true OR major_id in club's majors
    let query = supabase
      .from("event_requests_with_counts")
      .select("*")
      .is("deleted_at", null)
      .eq("status", "open");

    if (majorIds.length > 0) {
      // Use OR filter: is_all_majors=true OR major_id in (list)
      query = query.or(
        `is_all_majors.eq.true,major_id.in.(${majorIds.join(",")})`
      );
    } else {
      // Only show "all majors" requests if club has no majors
      query = query.eq("is_all_majors", true);
    }

    const { data, error } = await query
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching club relevant requests:", error);
      if (isMissingEventRequestsView(error)) {
        console.warn(
          "event_requests_with_counts view does not exist. Falling back to base tables."
        );

        let fallbackQuery = supabase
          .from("event_requests")
          .select("*")
          .is("deleted_at", null)
          .eq("status", "open");

        if (majorIds.length > 0) {
          fallbackQuery = fallbackQuery.or(
            `is_all_majors.eq.true,major_id.in.(${majorIds.join(",")})`
          );
        } else {
          fallbackQuery = fallbackQuery.eq("is_all_majors", true);
        }

        const { data: fallbackData, error: fallbackError } = await fallbackQuery
          .order("created_at", { ascending: false });

        if (fallbackError) {
          throw fallbackError;
        }

        const hydrated = await attachVoteCountsAndTags(
          (fallbackData || []) as EventRequest[]
        );
        return sortByVotesAndCreatedAt(hydrated);
      }
      throw error;
    }

    // Sort by vote_count client-side since it's a computed field
    return sortByVotesAndCreatedAt(data || []);
  } catch (err) {
    console.error("Error fetching club relevant requests:", err);
    throw err;
  }
}

/**
 * Fulfill an event request by linking it to an event
 */
export async function fulfillEventRequest(
  requestId: string,
  eventId: string
): Promise<void> {
  try {
    const { error } = await supabase.rpc("fulfill_event_request", {
      p_request_id: requestId,
      p_event_id: eventId,
    });

    if (error) {
      console.error("Error fulfilling event request:", error);
      throw error;
    }
  } catch (err) {
    console.error("Error fulfilling event request:", err);
    throw err;
  }
}

/**
 * Fetch a single event request by ID
 */
export async function fetchEventRequest(
  requestId: string
): Promise<EventRequest | null> {
  try {
    const { data, error } = await supabase
      .from("event_requests_with_counts")
      .select("*")
      .eq("id", requestId)
      .single();

    if (error || !data) {
      if (isMissingEventRequestsView(error)) {
        console.warn(
          "event_requests_with_counts view does not exist. Falling back to base tables."
        );

        const { data: fallbackData, error: fallbackError } = await supabase
          .from("event_requests")
          .select("*")
          .eq("id", requestId)
          .single();

        if (fallbackError || !fallbackData) {
          console.error("Error fetching event request:", fallbackError);
          return null;
        }

        const [hydrated] = await attachVoteCountsAndTags([
          fallbackData as EventRequest,
        ]);
        return hydrated || null;
      }

      console.error("Error fetching event request:", error);
      return null;
    }

    return data as EventRequest;
  } catch (err) {
    console.error("Error fetching event request:", err);
    return null;
  }
}

/**
 * Fetch request IDs the current user has voted for (for feed vote state)
 */
export async function fetchMyVoteRequestIds(
  requestIds: string[]
): Promise<Set<string>> {
  if (requestIds.length === 0) return new Set();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return new Set();
    const { data, error } = await supabase
      .from("event_request_votes")
      .select("request_id")
      .eq("user_id", user.id)
      .in("request_id", requestIds);
    if (error) return new Set();
    return new Set((data ?? []).map((r: { request_id: string }) => r.request_id));
  } catch {
    return new Set();
  }
}

/**
 * Fetch comments for a request (non-deleted only)
 */
export async function fetchEventRequestComments(
  requestId: string
): Promise<EventRequestComment[]> {
  try {
    const { data, error } = await supabase
      .from("event_request_comments")
      .select("id, request_id, user_id, body, created_at, updated_at, deleted_at")
      .eq("request_id", requestId)
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
    return (data || []) as EventRequestComment[];
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
}

/**
 * Create a comment on a request
 */
export async function createEventRequestComment(
  requestId: string,
  body: string
): Promise<string> {
  try {
    const { data, error } = await supabase.rpc("create_event_request_comment", {
      p_request_id: requestId,
      p_body: body.trim(),
    });
    if (error) throw error;
    return data as string;
  } catch (err) {
    console.error("Error creating comment:", err);
    throw err;
  }
}

/**
 * Soft-delete a comment (creator or platform admin)
 */
export async function deleteEventRequestComment(commentId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc("delete_event_request_comment", {
      p_comment_id: commentId,
    });
    if (error) throw error;
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
}
