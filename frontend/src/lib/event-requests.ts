/**
 * Client-side helpers for fetching event requests
 */

import { createClient } from "@/lib/supabase/browser";
import type { EventRequest, EventRequestWithDetails } from "@/types/event-request";

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

/**
 * Fetch all open/fulfilled event requests (for public board)
 * OPTIMIZED: Server-side ordering by vote_count, then created_at
 */
export async function fetchEventRequests(): Promise<EventRequest[]> {
  try {
    const { data, error } = await supabase
      .from("event_requests_with_counts")
      .select("*")
      .is("deleted_at", null)
      .in("status", ["open", "fulfilled"])
      // Note: PostgREST doesn't support ordering by computed fields directly
      // We'll still need client-side sort, but fetch is optimized
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching event requests:", error);
      if (isMissingEventRequestsView(error)) {
        console.warn(
          "event_requests_with_counts view does not exist. Falling back to base tables."
        );
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("event_requests")
          .select("*")
          .is("deleted_at", null)
          .in("status", ["open", "fulfilled"])
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

    // Sort by vote_count then created_at (client-side since vote_count is computed)
    // This is still faster than before since we're only sorting, not fetching multiple times
    return sortByVotesAndCreatedAt(data || []);
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

    // Parse the JSONB response
    return {
      id: data.id,
      description: data.description,
      major_id: data.major_id,
      is_all_majors: data.is_all_majors,
      status: data.status,
      fulfilled_event_id: data.fulfilled_event_id,
      created_by: data.created_by,
      created_at: data.created_at,
      deleted_at: data.deleted_at,
      deleted_by: data.deleted_by,
      delete_reason: data.delete_reason,
      vote_count: data.vote_count,
      major_name: data.major_name,
      fulfilled_event: data.fulfilled_event,
      user_has_voted: data.user_has_voted,
      tags: data.tags || [],
    } as EventRequestWithDetails;
  } catch (err) {
    console.error("Error fetching event request details:", err);
    return null;
  }
}

/**
 * Create an event request
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
