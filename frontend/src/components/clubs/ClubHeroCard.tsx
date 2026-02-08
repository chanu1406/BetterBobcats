"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ensureUrl } from "@/app/clubs/[slug]/lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

function ClubBanner({
  src,
  alt,
  className,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
}) {
  const [error, setError] = useState(false);
  const resolvedSrc = src ? ensureUrl(src) : "";

  if (!resolvedSrc || error) {
    return (
      <div
        className={cn(
          "w-full h-40 sm:h-48 rounded-xl flex items-center justify-center",
          "bg-gradient-to-br from-primary/15 via-accent/10 to-primary/20",
          className
        )}
      >
        <Users className="h-16 w-16 text-primary/30" />
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={resolvedSrc}
      alt={alt}
      className={cn("w-full h-40 sm:h-48 object-cover rounded-xl", className)}
      onError={() => setError(true)}
    />
  );
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ClubHeroCard({ club, hasProfile }: Props) {
  const profile = club.profile;
  const bannerUrl = club.banner_url || profile?.thumbnail_url;

  return (
    <Card className="overflow-hidden border-0 shadow-none bg-transparent">
      <div className="relative rounded-xl overflow-hidden">
        <ClubBanner src={bannerUrl} alt={`${club.name} banner`} />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
          <div className="flex items-end gap-4">
            <Avatar className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl border-2 border-white/30 shrink-0 bg-white/10">
              <AvatarImage src={club.logo_url ? ensureUrl(club.logo_url) : undefined} alt="" />
              <AvatarFallback className="rounded-xl bg-white/20 text-white text-lg font-semibold">
                {getInitials(club.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight truncate drop-shadow-sm">
                {club.name}
              </h1>
              <p className="text-white/90 text-sm mt-1 line-clamp-2 drop-shadow-sm">
                {hasProfile && profile?.tagline
                  ? profile.tagline
                  : club.description || " "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        {hasProfile && profile?.recruiting_status && (
          <Badge
            variant="outline"
            className={cn(
              "font-medium",
              profile.recruiting_status === "open" &&
                "border-green-400 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200",
              profile.recruiting_status === "closed" &&
                "border-red-300 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200",
              profile.recruiting_status === "by_invite" &&
                "border-amber-400 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
            )}
          >
            {profile.recruiting_status === "open"
              ? "Recruiting"
              : profile.recruiting_status === "by_invite"
                ? "By invite"
                : "Not recruiting"}
          </Badge>
        )}
        {hasProfile && profile?.recognized_by_university !== false && (
          <Badge variant="secondary" className="text-xs font-medium">
            University recognized
          </Badge>
        )}
      </div>
    </Card>
  );
}
