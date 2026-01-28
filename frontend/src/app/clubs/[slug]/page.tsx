"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchClubBySlug } from "@/lib/clubs";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

export default function ClubProfilePage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : null;

  const { data: club, isLoading, error } = useQuery({
    queryKey: ["club-by-slug", slug],
    queryFn: () => fetchClubBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Invalid club link
          </h1>
          <Link href="/clubs">
            <Button variant="outline">Browse clubs</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Club not found
          </h1>
          <p className="text-muted-foreground mb-6">
            This club may no longer exist or the link is incorrect.
          </p>
          <Link href="/clubs">
            <Button variant="outline">Browse clubs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to clubs
        </Link>

        <div className="bg-card p-8 rounded-xl border-2 border-primary/20 shadow-lg">
          {club.logo_url && (
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={club.logo_url}
                alt={`${club.name} logo`}
                className="h-20 w-20 object-contain rounded-lg"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold text-primary mb-4">{club.name}</h1>
          <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap">
            {club.description || "No description available."}
          </p>
          {club.website && (
            <a
              href={club.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all hover:gap-3"
            >
              Visit website
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
