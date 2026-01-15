import Link from "next/link";
import { notFound } from "next/navigation";
import { requirePlatformAdmin } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RequestDetails from "./components/RequestDetails";
import RequestReviewActions from "./components/RequestReviewActions";
import type { ClubRequest } from "@/types/clubRequest";

export const metadata = {
  title: "Request Details - Admin - BetterBobcats",
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
 * Club Request Detail/Review Page
 * Protected by admin layout (requirePlatformAdmin)
 * Displays full request data and allows approve/reject actions
 */
export default async function ClubRequestDetailPage({ params }: PageProps) {
  // Enforce platform admin access
  await requirePlatformAdmin();

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

  // Fetch tags
  const { data: tagsData, error: tagsError } = await supabase
    .from("club_request_tags")
    .select("tag")
    .eq("request_id", id);

  const tags = tagsData?.map((row) => row.tag) || [];

  // Fetch majors with notes
  // First get all majors for this request
  const { data: majorsData, error: majorsError } = await supabase
    .from("club_request_majors")
    .select("major_id")
    .eq("request_id", id);

  const majorIds = majorsData?.map((row) => row.major_id) || [];

  // Fetch major names and notes
  let majorsWithNotes: Array<{
    major_id: string;
    major_name: string;
    note: string | null;
  }> = [];

  if (majorIds.length > 0) {
    // Get major names
    const { data: majorsInfo, error: majorsInfoError } = await supabase
      .from("majors")
      .select("id, name")
      .in("id", majorIds);

    // Get major notes
    const { data: notesData, error: notesError } = await supabase
      .from("club_request_major_notes")
      .select("major_id, note")
      .eq("request_id", id);

    const notesMap = new Map(
      notesData?.map((row) => [row.major_id, row.note]) || []
    );

    // Combine majors with their notes
    majorsWithNotes =
      majorsInfo?.map((major) => ({
        major_id: major.id,
        major_name: major.name,
        note: notesMap.get(major.id) || null,
      })) || [];
  }

  // Build the request object
  const request: ClubRequest = {
    id: requestData.id,
    name: requestData.name,
    description: requestData.description,
    website: requestData.website,
    slug_candidate: requestData.slug_candidate,
    contact_email: requestData.contact_email,
    officer_emails: requestData.officer_emails || [],
    officer_phones: requestData.officer_phones || [],
    logo_url: requestData.logo_url,
    banner_url: requestData.banner_url,
    status: requestData.status as "pending" | "approved" | "rejected",
    admin_message: requestData.admin_message,
    reviewed_at: requestData.reviewed_at,
    reviewed_by: requestData.reviewed_by,
    created_at: requestData.created_at,
    updated_at: requestData.updated_at,
    submitted_by: requestData.submitted_by,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusVariant = (status: ClubRequest["status"]) => {
    switch (status) {
      case "pending":
        return "outline" as const;
      case "approved":
        return "default" as const;
      case "rejected":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb and Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/admin"
              className="hover:text-foreground transition-colors"
            >
              Admin
            </Link>
            <span>/</span>
            <Link
              href="/admin/club-requests"
              className="hover:text-foreground transition-colors"
            >
              Club Requests
            </Link>
            <span>/</span>
            <span className="text-foreground">Request Details</span>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/club-requests">← Back to Requests</Link>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-5xl font-semibold text-foreground mb-3">
                {request.name}
              </h1>
              <div className="flex items-center gap-3">
                <Badge variant={getStatusVariant(request.status)}>
                  {request.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created: {formatDate(request.created_at)}
                </span>
                <span className="text-sm text-muted-foreground">
                  Updated: {formatDate(request.updated_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Request Details */}
          <div>
            <RequestDetails
              request={request}
              tags={tags}
              majors={majorsWithNotes}
            />
          </div>

          {/* Right Column: Assets + Actions */}
          <div>
            <RequestReviewActions request={request} />
          </div>
        </div>
      </div>
    </div>
  );
}
