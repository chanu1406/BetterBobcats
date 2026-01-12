"use server";

import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { normalizeClubRequestEmails } from "@/lib/email-utils";

const STORAGE_BUCKET = "club-assets";

interface SubmitClubRequestParams {
  name: string;
  description: string;
  website?: string | null;
  slug_candidate?: string | null;
  contact_email: string;
  officer_emails: string[];
  officer_phones: string[];
  logo_url?: string | null;
  banner_url?: string | null;
  tags: string[];
  major_ids: string[];
  major_notes: Record<string, string>;
}

interface SubmitResult {
  ok: boolean;
  request_id?: string;
  error?: string;
}

/**
 * Server action to submit a club request
 * Inserts into club_requests and related tables
 */
export async function submitClubRequest(
  params: SubmitClubRequestParams
): Promise<SubmitResult> {
  try {
    // Ensure user is authenticated
    const user = await requireUser();
    const supabase = await createClient();

    // Validate required fields
    if (!params.name?.trim()) {
      return { ok: false, error: "Club name is required" };
    }
    if (!params.description?.trim()) {
      return { ok: false, error: "Description is required" };
    }
    if (!params.contact_email?.trim()) {
      return { ok: false, error: "Contact email is required" };
    }
    if (!params.officer_emails || params.officer_emails.length === 0) {
      return { ok: false, error: "At least one officer email is required" };
    }

    // Normalize and deduplicate emails
    let normalizedEmails;
    try {
      normalizedEmails = normalizeClubRequestEmails(
        params.contact_email,
        params.officer_emails
      );
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Invalid email format",
      };
    }

    if (normalizedEmails.officer_emails.length === 0) {
      return {
        ok: false,
        error:
          "At least one officer email is required (after removing duplicates and the contact email)",
      };
    }

    // Insert into club_requests
    const { data: requestData, error: requestError } = await supabase
      .from("club_requests")
      .insert({
        name: params.name.trim(),
        description: params.description.trim(),
        website: params.website?.trim() || null,
        slug_candidate: params.slug_candidate?.trim() || null,
        contact_email: normalizedEmails.contact_email,
        officer_emails: normalizedEmails.officer_emails,
        officer_phones: params.officer_phones.filter((p) => p.trim()) || [],
        logo_url: params.logo_url?.trim() || null,
        banner_url: params.banner_url?.trim() || null,
        submitted_by: user.id,
        status: "pending",
      })
      .select("id")
      .single();

    if (requestError || !requestData) {
      console.error("Error creating club request:", requestError);
      return {
        ok: false,
        error: requestError?.message || "Failed to create club request",
      };
    }

    const requestId = requestData.id;

    // Insert tags (trimmed, lowercase)
    if (params.tags && params.tags.length > 0) {
      const tagInserts = params.tags
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0)
        .map((tag) => ({
          request_id: requestId,
          tag,
        }));

      if (tagInserts.length > 0) {
        const { error: tagsError } = await supabase
          .from("club_request_tags")
          .insert(tagInserts);

        if (tagsError) {
          console.error("Error inserting tags:", tagsError);
          // Continue even if tags fail - request is created
        }
      }
    }

    // Insert majors
    if (params.major_ids && params.major_ids.length > 0) {
      const majorInserts = params.major_ids.map((major_id) => ({
        request_id: requestId,
        major_id,
      }));

      const { error: majorsError } = await supabase
        .from("club_request_majors")
        .insert(majorInserts);

      if (majorsError) {
        console.error("Error inserting majors:", majorsError);
        // Continue even if majors fail - request is created
      }
    }

    // Insert major notes (only non-empty notes)
    if (params.major_notes && Object.keys(params.major_notes).length > 0) {
      const noteInserts = Object.entries(params.major_notes)
        .filter(([_, note]) => note && note.trim().length > 0)
        .map(([major_id, note]) => ({
          request_id: requestId,
          major_id,
          note: note.trim(),
        }));

      if (noteInserts.length > 0) {
        const { error: notesError } = await supabase
          .from("club_request_major_notes")
          .insert(noteInserts);

        if (notesError) {
          console.error("Error inserting major notes:", notesError);
          // Continue even if notes fail - request is created
        }
      }
    }

    // Revalidate paths
    revalidatePath("/clubs/my-requests");
    revalidatePath("/admin/club-requests");

    return { ok: true, request_id: requestId };
  } catch (error) {
    console.error("Unexpected error submitting club request:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

interface UploadImageParams {
  request_id: string;
  file: File;
  type: "logo" | "banner";
}

interface UploadImageResult {
  ok: boolean;
  url?: string;
  error?: string;
}

/**
 * Server action to upload an image for a club request
 * Uploads to Supabase Storage and returns the public URL
 */
export async function uploadRequestImage(
  params: UploadImageParams
): Promise<UploadImageResult> {
  try {
    await requireUser();
    const supabase = await createClient();

    // Validate file
    if (!params.file.type.startsWith("image/")) {
      return { ok: false, error: "File must be an image" };
    }

    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (params.file.size > maxSize) {
      return { ok: false, error: "Image must be ≤ 2 MB" };
    }

    // Read file as array buffer
    const arrayBuffer = await params.file.arrayBuffer();
    const fileExtension = params.file.name.split(".").pop() || (params.type === "logo" ? "png" : "jpg");
    const storagePath = `club-requests/${params.request_id}/${params.type}.${fileExtension}`;

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, arrayBuffer, {
        contentType: params.file.type,
        upsert: true,
      });

    if (uploadError || !data) {
      console.error("Error uploading image:", uploadError);
      return {
        ok: false,
        error: uploadError?.message || "Failed to upload image",
      };
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);

    // Update club request with image URL
    const updateField = params.type === "logo" ? "logo_url" : "banner_url";
    const { error: updateError } = await supabase
      .from("club_requests")
      .update({ [updateField]: publicUrl })
      .eq("id", params.request_id);

    if (updateError) {
      console.error("Error updating request with image URL:", updateError);
      // Still return success since upload worked
    }

    return { ok: true, url: publicUrl };
  } catch (error) {
    console.error("Unexpected error uploading image:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

interface UpdateClubRequestParams {
  request_id: string;
  name: string;
  description: string;
  website?: string | null;
  slug_candidate?: string | null;
  contact_email: string;
  officer_emails: string[];
  officer_phones: string[];
  tags: string[];
  major_ids: string[];
  major_notes: Record<string, string>;
}

interface UpdateResult {
  ok: boolean;
  error?: string;
}

/**
 * Server action to update a club request
 * Updates club_requests and related tables
 */
export async function updateClubRequest(
  params: UpdateClubRequestParams
): Promise<UpdateResult> {
  try {
    // Ensure user is authenticated
    const user = await requireUser();
    const supabase = await createClient();

    // Validate required fields
    if (!params.name?.trim()) {
      return { ok: false, error: "Club name is required" };
    }
    if (!params.description?.trim()) {
      return { ok: false, error: "Description is required" };
    }
    if (!params.contact_email?.trim()) {
      return { ok: false, error: "Contact email is required" };
    }
    if (!params.officer_emails || params.officer_emails.length === 0) {
      return { ok: false, error: "At least one officer email is required" };
    }

    // Normalize and deduplicate emails
    let normalizedEmails;
    try {
      normalizedEmails = normalizeClubRequestEmails(
        params.contact_email,
        params.officer_emails
      );
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : "Invalid email format",
      };
    }

    if (normalizedEmails.officer_emails.length === 0) {
      return {
        ok: false,
        error:
          "At least one officer email is required (after removing duplicates and the contact email)",
      };
    }

    // Verify the request exists and belongs to the user
    const { data: existingRequest, error: fetchError } = await supabase
      .from("club_requests")
      .select("id, status, submitted_by")
      .eq("id", params.request_id)
      .single();

    if (fetchError || !existingRequest) {
      return { ok: false, error: "Club request not found" };
    }

    // Only allow editing pending requests
    if (existingRequest.status !== "pending") {
      return {
        ok: false,
        error: "Only pending requests can be edited",
      };
    }

    // Verify the user owns this request
    if (existingRequest.submitted_by !== user.id) {
      return {
        ok: false,
        error: "You can only edit your own requests",
      };
    }

    // Update club_requests
    const { error: updateError } = await supabase
      .from("club_requests")
      .update({
        name: params.name.trim(),
        description: params.description.trim(),
        website: params.website?.trim() || null,
        slug_candidate: params.slug_candidate?.trim() || null,
        contact_email: normalizedEmails.contact_email,
        officer_emails: normalizedEmails.officer_emails,
        officer_phones: params.officer_phones.filter((p) => p.trim()) || [],
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.request_id);

    if (updateError) {
      console.error("Error updating club request:", updateError);
      return {
        ok: false,
        error: updateError.message || "Failed to update club request",
      };
    }

    // Delete existing tags and insert new ones
    await supabase
      .from("club_request_tags")
      .delete()
      .eq("request_id", params.request_id);

    if (params.tags && params.tags.length > 0) {
      const tagInserts = params.tags
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0)
        .map((tag) => ({
          request_id: params.request_id,
          tag,
        }));

      if (tagInserts.length > 0) {
        const { error: tagsError } = await supabase
          .from("club_request_tags")
          .insert(tagInserts);

        if (tagsError) {
          console.error("Error updating tags:", tagsError);
          // Continue even if tags fail - request is updated
        }
      }
    }

    // Delete existing majors and insert new ones
    await supabase
      .from("club_request_majors")
      .delete()
      .eq("request_id", params.request_id);

    if (params.major_ids && params.major_ids.length > 0) {
      const majorInserts = params.major_ids.map((major_id) => ({
        request_id: params.request_id,
        major_id,
      }));

      const { error: majorsError } = await supabase
        .from("club_request_majors")
        .insert(majorInserts);

      if (majorsError) {
        console.error("Error updating majors:", majorsError);
        // Continue even if majors fail - request is updated
      }
    }

    // Delete existing major notes and insert new ones
    await supabase
      .from("club_request_major_notes")
      .delete()
      .eq("request_id", params.request_id);

    if (params.major_notes && Object.keys(params.major_notes).length > 0) {
      const noteInserts = Object.entries(params.major_notes)
        .filter(([_, note]) => note && note.trim().length > 0)
        .map(([major_id, note]) => ({
          request_id: params.request_id,
          major_id,
          note: note.trim(),
        }));

      if (noteInserts.length > 0) {
        const { error: notesError } = await supabase
          .from("club_request_major_notes")
          .insert(noteInserts);

        if (notesError) {
          console.error("Error updating major notes:", notesError);
          // Continue even if notes fail - request is updated
        }
      }
    }

    // Revalidate paths
    revalidatePath("/clubs/my-requests");
    revalidatePath(`/clubs/request/edit/${params.request_id}`);

    return { ok: true };
  } catch (error) {
    console.error("Unexpected error updating club request:", error);
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
