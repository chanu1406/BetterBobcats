"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, CheckCircle2 } from "lucide-react";
import { fetchClubRelevantRequests } from "@/lib/event-requests";
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
  const [clubId, setClubId] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);

  // Get slug from params
  useEffect(() => {
    params.then((p) => {
      setSlug(p.slug);
    });
  }, [params]);

  // Fetch club ID
  useEffect(() => {
    if (!slug) return;

    const fetchClub = async () => {
      const { data: clubData, error: clubError } = await supabase
        .from("clubs")
        .select("id")
        .eq("slug", slug)
        .single();

      if (!clubError && clubData) {
        setClubId(clubData.id);
      }
    };

    fetchClub();
  }, [slug]);

  // Fetch relevant requests with TanStack Query
  const {
    data: requests = [],
    isLoading: loading,
    error: queryError,
  } = useQuery({
    queryKey: ["club-relevant-requests", clubId],
    queryFn: () => fetchClubRelevantRequests(clubId!),
    enabled: !!clubId,
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const error = queryError
    ? queryError instanceof Error
      ? queryError.message
      : "Failed to load requests"
    : null;

  const handleFulfill = (requestId: string) => {
    if (!slug) return;
    // Navigate to create event page with request pre-filled
    router.push(`/dashboard/${slug}/events/new?fulfill=${requestId}`);
  };

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
                    <Button onClick={() => handleFulfill(request.id)}>
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
