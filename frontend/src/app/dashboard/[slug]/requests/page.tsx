"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, CheckCircle2 } from "lucide-react";
import { fetchClubRelevantRequests, fulfillEventRequest } from "@/lib/event-requests";
import { createClient } from "@/lib/supabase/browser";
import type { EventRequest } from "@/types/event-request";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

interface ClubRequestsPageProps {
  params: Promise<{ slug: string }>;
}

export default function ClubRequestsPage({ params }: ClubRequestsPageProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const supabase = createClient();

  const [requests, setRequests] = useState<EventRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clubId, setClubId] = useState<string | null>(null);
  const [fulfillingId, setFulfillingId] = useState<string | null>(null);

  useEffect(() => {
    loadClubAndRequests();
  }, []);

  const loadClubAndRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get slug from params
      const { slug } = await params;

      // Fetch club
      const { data: clubData, error: clubError } = await supabase
        .from("clubs")
        .select("id")
        .eq("slug", slug)
        .single();

      if (clubError || !clubData) {
        throw new Error("Club not found");
      }

      setClubId(clubData.id);

      // Fetch relevant requests
      const data = await fetchClubRelevantRequests(clubData.id);
      setRequests(data);
    } catch (err) {
      console.error("Error loading requests:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load requests"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFulfill = async (requestId: string) => {
    if (!clubId) return;

    // Get slug from params
    const { slug } = await params;

    // Navigate to create event page with request pre-filled
    // We'll pass the request ID as a query parameter
    router.push(`/dashboard/${slug}/events/new?fulfill=${requestId}`);
  };

  if (error) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
            <Button onClick={loadClubAndRequests} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Event Requests</h1>
        <p className="text-muted-foreground mt-2">
          Browse and fulfill event requests relevant to your club
        </p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No relevant event requests at this time.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      {request.description.length > 100
                        ? request.description.substring(0, 100) + "..."
                        : request.description}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {request.is_all_majors ? (
                        <Badge variant="outline">All Majors</Badge>
                      ) : request.major_id ? (
                        <Badge variant="outline">Major</Badge>
                      ) : null}
                      {request.tags &&
                        request.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {request.vote_count || 0}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleFulfill(request.id)}
                      disabled={fulfillingId === request.id}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Fulfill
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
