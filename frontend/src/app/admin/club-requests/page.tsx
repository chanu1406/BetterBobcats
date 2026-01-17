import Link from "next/link";
import { requirePlatformAdmin } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FiltersBar from "./components/FiltersBar";
import ClubRequestsTable from "./components/ClubRequestsTable";
import type { ClubRequest } from "@/types/clubRequest";

export const metadata = {
  title: "Club Requests - Admin - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  searchParams: Promise<{
    status?: string;
    q?: string;
    sort?: string;
  }>;
}

/**
 * Club Requests Management Page
 * Protected by admin layout (requirePlatformAdmin)
 * Lists and filters club requests from the database
 */
export default async function ClubRequestsPage({ searchParams }: PageProps) {
  // Enforce platform admin access
  await requirePlatformAdmin();

  // Parse search params (Next.js 15 uses async searchParams)
  const params = await searchParams;
  const statusParam = params.status || "pending";
  const searchQuery = params.q || "";
  const sortParam = params.sort || "updated";

  // Create Supabase client
  const supabase = await createClient();

  // Build query
  let query = supabase
    .from("club_requests")
    .select(
      "id, name, description, contact_email, officer_emails, slug_candidate, status, created_at, updated_at"
    )
    .limit(50);

  // Apply status filter (default to "pending", show all if status=all)
  if (statusParam !== "all") {
    query = query.eq("status", statusParam);
  }

  // Apply search filter (name, contact_email, or slug_candidate)
  if (searchQuery.trim()) {
    const searchPattern = searchQuery.trim();
    query = query.or(
      `name.ilike.%${searchPattern}%,contact_email.ilike.%${searchPattern}%,slug_candidate.ilike.%${searchPattern}%`
    );
  }

  // Apply sorting
  if (sortParam === "created") {
    query = query.order("created_at", { ascending: false });
  } else {
    // Default to updated_at desc
    query = query.order("updated_at", { ascending: false });
  }

  // Execute query
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching club requests:", error);
    // Return error state
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle>Club Requests</CardTitle>
              <CardDescription>
                Review and approve clubs to publish them on BetterBobcats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
                Error loading club requests: {error.message}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const requests: ClubRequest[] = (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    website: null, // Not selected
    slug_candidate: row.slug_candidate,
    contact_email: row.contact_email,
    officer_emails: row.officer_emails || [],
    officer_phones: [], // Not selected
    logo_url: null, // Not selected
    banner_url: null, // Not selected
    status: row.status as "pending" | "approved" | "rejected",
    admin_message: null, // Not selected
    reviewed_at: null, // Not selected
    reviewed_by: null, // Not selected
    created_at: row.created_at,
    updated_at: row.updated_at,
    submitted_by: null, // Not selected
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Club Requests
            </h1>
            <p className="text-muted-foreground text-base">
              Review and approve clubs to publish them on BetterBobcats
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Filters and Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Club Requests</CardTitle>
                <CardDescription className="mt-1">
                  {requests.length} request{requests.length !== 1 ? "s" : ""} found
                  {statusParam !== "all" && ` (${statusParam})`}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="mb-6">
              <FiltersBar
                status={statusParam}
                search={searchQuery}
                sort={sortParam}
              />
            </div>

            {/* Table */}
            <ClubRequestsTable requests={requests} />

            {/* TODO: Add pagination when there are more than 50 requests */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
