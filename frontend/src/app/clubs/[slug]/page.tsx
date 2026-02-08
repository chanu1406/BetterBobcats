"use client";

import { Suspense, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchClubWithProfile, fetchUpcomingClubEvents } from "@/lib/clubs";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import {
  TabsSectionShell,
  isValidSection,
} from "@/components/clubs/TabsSectionShell";
import { ClubHeroCard } from "@/components/clubs/ClubHeroCard";
import { UpcomingEventsList } from "@/components/clubs/UpcomingEventsList";
import { LeadershipGrid } from "@/components/clubs/LeadershipGrid";
import { MediaGallery } from "@/components/clubs/MediaGallery";
import { CareerAlignment } from "@/components/clubs/CareerAlignment";
import { ConductAccessibility } from "@/components/clubs/ConductAccessibility";
import { StickyActionBar } from "@/components/clubs/StickyActionBar";
import { ClubRightRail } from "@/components/clubs/ClubRightRail";
import { AboutSection } from "./components/AboutSection";
import { JoinSection } from "./components/JoinSection";

function ClubProfileContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const heroRef = useRef<HTMLDivElement>(null);
  const slug = typeof params?.slug === "string" ? params.slug : null;

  const sectionParam = searchParams.get("section") || "about";
  const activeSection = isValidSection(sectionParam) ? sectionParam : "about";

  const { data: club, isLoading, error } = useQuery({
    queryKey: ["club-with-profile", slug],
    queryFn: () => fetchClubWithProfile(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  const { data: upcomingEvents = [] } = useQuery({
    queryKey: ["club-upcoming-events", club?.id],
    queryFn: () => fetchUpcomingClubEvents(club!.id, 5),
    enabled: !!club?.id,
    staleTime: 2 * 60 * 1000,
  });

  const handleSectionChange = (value: string) => {
    if (!isValidSection(value)) return;
    router.replace(`/clubs/${slug}?section=${value}`, { scroll: false });
  };

  const switchToJoinSection = () => {
    handleSectionChange("join");
  };

  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Invalid club link</h1>
          <Link href="/clubs">
            <Button variant="outline">Browse clubs</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            <div className="min-w-0 space-y-6">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-52 w-full rounded-xl" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-32 rounded-md" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
            <aside className="hidden lg:block space-y-4">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </aside>
          </div>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Club not found</h1>
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

  const profile = club.profile;
  const hasProfile = profile && profile.published;
  const recruitingClosed = !!(hasProfile && profile?.recruiting_status === "closed");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="min-w-0">
            <Link
              href="/clubs"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to clubs
            </Link>

            <div className="space-y-6">
              <div ref={heroRef}>
                <ClubHeroCard club={club} hasProfile={!!hasProfile} />
              </div>

              <TabsSectionShell
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
              >
                <TabsContent value="about" className="mt-0">
                  <AboutSection club={club} hasProfile={!!hasProfile} />
                </TabsContent>
                <TabsContent value="events" className="mt-0">
                  <UpcomingEventsList club={club} upcomingEvents={upcomingEvents} />
                </TabsContent>
                <TabsContent value="join" className="mt-0">
                  <JoinSection club={club} hasProfile={!!hasProfile} />
                </TabsContent>
                <TabsContent value="leadership" className="mt-0">
                  <LeadershipGrid club={club} hasProfile={!!hasProfile} />
                </TabsContent>
                <TabsContent value="media" className="mt-0">
                  <MediaGallery club={club} hasProfile={!!hasProfile} />
                </TabsContent>
                <TabsContent value="career" className="mt-0">
                  <CareerAlignment club={club} hasProfile={!!hasProfile} />
                </TabsContent>
                <TabsContent value="conduct" className="mt-0">
                  <ConductAccessibility club={club} hasProfile={!!hasProfile} />
                </TabsContent>
              </TabsSectionShell>
            </div>
          </div>

          <aside
            className="hidden lg:block"
            aria-label="Club actions and info"
          >
            <div className="sticky top-24">
              <ClubRightRail
                club={club}
                hasProfile={!!hasProfile}
                recruitingClosed={recruitingClosed}
                onSwitchToJoin={switchToJoinSection}
                upcomingEvents={upcomingEvents}
              />
            </div>
          </aside>
        </div>
      </div>

      <StickyActionBar
        club={club}
        hasProfile={!!hasProfile}
        recruitingClosed={recruitingClosed}
        onSwitchToJoin={switchToJoinSection}
        heroRef={heroRef}
      />
    </div>
  );
}

export default function ClubProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              <div className="space-y-6">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-52 w-full rounded-xl" />
                <Skeleton className="h-48 w-full rounded-xl" />
              </div>
              <aside className="hidden lg:block space-y-4">
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-24 w-full rounded-xl" />
              </aside>
            </div>
          </div>
        </div>
      }
    >
      <ClubProfileContent />
    </Suspense>
  );
}
