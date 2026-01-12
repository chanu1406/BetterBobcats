import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ClubRequest } from "@/types/clubRequest";

export const metadata = {
  title: "My Club Requests - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * My Club Requests Page
 * Shows all club requests submitted by the logged-in user
 */
export default async function MyClubRequestsPage() {
  // Enforce authentication
  const user = await requireUser("/clubs/my-requests");

  // Fetch user's club requests
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("club_requests")
    .select(
      "id, name, description, website, slug_candidate, contact_email, officer_emails, officer_phones, logo_url, banner_url, status, admin_message, reviewed_at, reviewed_by, created_at, updated_at, submitted_by"
    )
    .eq("submitted_by", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching club requests:", error);
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <Card>
            <CardHeader>
              <CardTitle>My Club Requests</CardTitle>
              <CardDescription>
                View the status of your club requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
                Error loading your requests: {error.message}
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
    website: row.website,
    slug_candidate: row.slug_candidate,
    contact_email: row.contact_email,
    officer_emails: row.officer_emails || [],
    officer_phones: row.officer_phones || [],
    logo_url: row.logo_url,
    banner_url: row.banner_url,
    status: row.status as "pending" | "approved" | "rejected",
    admin_message: row.admin_message,
    reviewed_at: row.reviewed_at,
    reviewed_by: row.reviewed_by,
    created_at: row.created_at,
    updated_at: row.updated_at,
    submitted_by: row.submitted_by,
  }));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending Review</Badge>;
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">Rejected</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              My Club Requests
            </h1>
            <p className="text-muted-foreground text-base">
              View and track the status of your club requests
            </p>
          </div>
          <Link href="/clubs/request">
            <Button>Submit New Request</Button>
          </Link>
        </div>

        {/* Requests List */}
        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                You haven't submitted any club requests yet.
              </p>
              <Link href="/clubs/request">
                <Button>Submit Your First Request</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">{request.name}</CardTitle>
                        {getStatusBadge(request.status)}
                      </div>
                      <CardDescription className="mt-2">
                        {request.description}
                      </CardDescription>
                    </div>
                    {request.status === "pending" && (
                      <Link href={`/clubs/request/edit/${request.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Submitted:
                      </span>{" "}
                      <span className="text-foreground">
                        {formatDate(request.created_at)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Last Updated:
                      </span>{" "}
                      <span className="text-foreground">
                        {formatDate(request.updated_at)}
                      </span>
                    </div>
                    {request.website && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-muted-foreground">
                          Website:
                        </span>{" "}
                        <a
                          href={request.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {request.website}
                        </a>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Contact Email:
                      </span>{" "}
                      <span className="text-foreground">
                        {request.contact_email}
                      </span>
                    </div>
                    {request.slug_candidate && (
                      <div>
                        <span className="font-medium text-muted-foreground">
                          Proposed Slug:
                        </span>{" "}
                        <span className="text-foreground">
                          {request.slug_candidate}
                        </span>
                      </div>
                    )}
                  </div>

                  {request.status === "rejected" && request.admin_message && (
                    <>
                      <Separator />
                      <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                        <h4 className="font-medium text-destructive mb-2">
                          Admin Message
                        </h4>
                        <p className="text-sm text-destructive">
                          {request.admin_message}
                        </p>
                        {request.reviewed_at && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Reviewed on: {formatDate(request.reviewed_at)}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {request.status === "approved" && request.reviewed_at && (
                    <>
                      <Separator />
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">
                          Approved
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Your club request has been approved! The club will be
                          visible on BetterBobcats soon.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Reviewed on: {formatDate(request.reviewed_at)}
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
