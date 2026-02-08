"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  ExternalLink,
  Globe,
  Instagram,
  Github,
  Linkedin,
  MessageCircle,
  Mail,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { JoinCTA } from "./JoinCTA";
import { NextMeetingCard } from "./NextMeetingCard";
import { MeetingDayPills } from "./MeetingDayPills";
import { SecondaryStatsCard } from "./SecondaryStatsCard";
import { ensureUrl } from "@/app/clubs/[slug]/lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";
import type { ClubProfileLinkType } from "@/lib/clubs";
import type { ClubUpcomingEvent } from "@/lib/clubs";

const LINK_CONFIG: Record<
  ClubProfileLinkType,
  { icon: React.ReactNode; label: string }
> = {
  website: { icon: <Globe className="h-4 w-4" />, label: "Website" },
  instagram: { icon: <Instagram className="h-4 w-4" />, label: "Instagram" },
  github: { icon: <Github className="h-4 w-4" />, label: "GitHub" },
  linkedin: { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn" },
  discord: { icon: <MessageCircle className="h-4 w-4" />, label: "Discord" },
  linktree: { icon: <ExternalLink className="h-4 w-4" />, label: "Linktree" },
  other: { icon: <ExternalLink className="h-4 w-4" />, label: "Link" },
};

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
  recruitingClosed: boolean;
  onSwitchToJoin: () => void;
  upcomingEvents: ClubUpcomingEvent[];
};

function formatEventDateTime(startsAt: string, endsAt: string | null): string {
  try {
    const start = new Date(startsAt);
    const end = endsAt ? new Date(endsAt) : null;
    const dateStr = format(start, "EEE, MMM d");
    const timeStr = format(start, "h:mm a");
    if (end && format(end, "yyyy-MM-dd") !== format(start, "yyyy-MM-dd")) {
      return `${dateStr}, ${timeStr} – ${format(end, "EEE, MMM d, h:mm a")}`;
    }
    if (end) {
      return `${dateStr}, ${timeStr} – ${format(end, "h:mm a")}`;
    }
    return `${dateStr} at ${timeStr}`;
  } catch {
    return startsAt;
  }
}

export function ClubRightRail({
  club,
  hasProfile,
  recruitingClosed,
  onSwitchToJoin,
  upcomingEvents,
}: Props) {
  const profile = club.profile;
  const firstEvent = upcomingEvents[0];
  const hasLinks =
    (club.links?.length ?? 0) > 0 || !!club.website;

  return (
    <aside className="space-y-4" aria-label="Club actions and info">
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-base font-semibold text-foreground">
            Join this club
          </h2>
        </CardHeader>
        <CardContent className="pt-0">
          <JoinCTA
            club={club}
            hasProfile={hasProfile}
            recruitingClosed={recruitingClosed}
            onSwitchToJoin={onSwitchToJoin}
            stacked
            omitWebsite
          />
        </CardContent>
      </Card>

      <NextMeetingCard profile={profile} hasProfile={!!hasProfile} />

      {hasProfile && profile && (
        <Card>
          <CardContent className="pt-4">
            <MeetingDayPills
              meetingDays={profile.meeting_days}
              meetingLocation={profile.meeting_location}
              meetingFrequency={profile.meeting_frequency}
            />
          </CardContent>
        </Card>
      )}

      <SecondaryStatsCard profile={profile} hasProfile={!!hasProfile} />

      {hasLinks && (
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-semibold text-foreground">
              Connect
            </h3>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col gap-2">
            {club.website && (
              <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
                <a
                  href={ensureUrl(club.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                >
                  <Globe className="h-4 w-4 shrink-0" />
                  Website
                </a>
              </Button>
            )}
            {club.links?.map((link) => {
              const href = ensureUrl(link.url);
              if (!href) return null;
              const config = LINK_CONFIG[link.link_type] ?? LINK_CONFIG.other;
              return (
                <Button
                  key={link.id}
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start gap-2"
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={config.label}
                  >
                    {config.icon}
                    {config.label}
                  </a>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            Next event
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          {firstEvent ? (
            <Link
              href={`/events?club=${club.id}`}
              className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <p className="font-medium text-foreground text-sm">
                {firstEvent.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatEventDateTime(firstEvent.starts_at, firstEvent.ends_at)}
              </p>
              {firstEvent.location_name && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {firstEvent.location_name}
                </p>
              )}
              <p className="text-xs text-primary font-medium mt-2">
                View all events →
              </p>
            </Link>
          ) : (
            <div className="py-4 text-center">
              <p className="text-sm text-muted-foreground">
                No upcoming events
              </p>
              {profile?.contact_email_general && (
                <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
                  <a href={`mailto:${profile.contact_email_general}`}>
                    <Mail className="h-3.5 w-3.5 mr-1" />
                    Contact club
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}
