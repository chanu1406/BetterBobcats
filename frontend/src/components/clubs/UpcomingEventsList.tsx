"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";
import type { ClubUpcomingEvent } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  upcomingEvents: ClubUpcomingEvent[];
};

function formatEventDate(startsAt: string, endsAt: string | null): string {
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

export function UpcomingEventsList({ club, upcomingEvents }: Props) {
  return (
    <Card className="rounded-xl">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming events
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-3">
            {upcomingEvents.map((ev) => (
              <Link
                key={ev.id}
                href={`/events?club=${club.id}`}
                className={cn(
                  "block p-4 rounded-xl border border-border",
                  "hover:bg-muted/50 transition-colors"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{ev.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatEventDate(ev.starts_at, ev.ends_at)}
                    </p>
                    {ev.location_name && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {ev.location_name}
                        {ev.location_type === "online" && ev.online_url && " · Online"}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {format(new Date(ev.starts_at), "MMM d")}
                  </Badge>
                </div>
              </Link>
            ))}
            <Link
              href={`/events?club=${club.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View all events
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-12 px-4 rounded-xl bg-muted/30"
            role="status"
          >
            <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm font-medium text-foreground mb-1">
              No upcoming events
            </p>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Check back later or contact the club for updates.
            </p>
            {club.profile?.contact_email_general ? (
              <Link
                href={`mailto:${club.profile.contact_email_general}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                Contact the club
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground">Check back later.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
