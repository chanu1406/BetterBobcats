import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import EditClubRequestForm from "../components/EditClubRequestForm";
import type { Major } from "@/types/major";

export const metadata = {
  title: "Edit Club Request - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Edit Club Request Page
 * Allows users to edit their pending club requests
 */
export default async function EditClubRequestPage({ params }: PageProps) {
  // Enforce authentication
  const user = await requireUser("/clubs/request/edit");

  // Get the id from params (Next.js 15 uses async params)
  const { id } = await params;

  // Validate UUID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  // Create Supabase client
  const supabase = await createClient();

  // Fetch request data
  const { data: requestData, error: requestError } = await supabase
    .from("club_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (requestError || !requestData) {
    console.error("Error fetching club request:", requestError);
    notFound();
  }

  // Verify the user owns this request
  if (requestData.submitted_by !== user.id) {
    redirect("/clubs/my-requests");
  }

  // Only allow editing pending requests
  if (requestData.status !== "pending") {
    redirect("/clubs/my-requests");
  }

  // Fetch tags
  const { data: tagsData } = await supabase
    .from("club_request_tags")
    .select("tag")
    .eq("request_id", id);

  const tags = tagsData?.map((row) => row.tag) || [];

  // Fetch majors with notes
  const { data: majorsData } = await supabase
    .from("club_request_majors")
    .select("major_id")
    .eq("request_id", id);

  const majorIds = majorsData?.map((row) => row.major_id) || [];

  // Fetch major notes
  let majorNotes: Record<string, string> = {};
  if (majorIds.length > 0) {
    const { data: notesData } = await supabase
      .from("club_request_major_notes")
      .select("major_id, note")
      .eq("request_id", id);

    if (notesData) {
      majorNotes = notesData.reduce(
        (acc, row) => {
          acc[row.major_id] = row.note;
          return acc;
        },
        {} as Record<string, string>
      );
    }
  }

  // Fetch all majors for the form
  const { data: majors, error: majorsError } = await supabase
    .from("majors")
    .select("id, name, created_at")
    .order("name");

  if (majorsError) {
    console.error("Error fetching majors:", majorsError);
  }

  const majorsList: Major[] = majors || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <EditClubRequestForm
          requestId={id}
          initialData={{
            name: requestData.name,
            description: requestData.description,
            website: requestData.website || "",
            slug_candidate: requestData.slug_candidate || "",
            contact_email: requestData.contact_email,
            officer_emails: requestData.officer_emails || [],
            officer_phones: requestData.officer_phones || [],
            tags,
            is_all_majors: requestData.is_all_majors || false,
            major_ids: majorIds,
            major_notes: majorNotes,
            logo_url: requestData.logo_url,
            banner_url: requestData.banner_url,
          }}
          majors={majorsList}
        />
      </div>
    </div>
  );
}
