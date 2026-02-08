"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ExternalLink, MapPin } from "lucide-react";
import { formatEventDateTime } from "../lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";
import type { ClubUpcomingEvent } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  upcomingEvents: ClubUpcomingEvent[];
};

export function EventsSection({ club, upcomingEvents }: Props) {
  return (
    <Card>
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
                className="block p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <p className="font-medium text-foreground">{ev.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatEventDateTime(ev.starts_at, ev.ends_at)}
                </p>
                {ev.location_name && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    {ev.location_name}
                    {ev.location_type === "online" && ev.online_url && " · Online"}
                  </p>
                )}
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
          <p className="text-muted-foreground text-sm">
            No upcoming events. Check back later or contact the club.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
