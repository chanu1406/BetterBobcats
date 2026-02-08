"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import {
  parseMeetingDays,
  formatTimeForDisplay,
  type DayOfWeek,
} from "@/app/clubs/[slug]/lib/utils";
import type { ClubProfile } from "@/lib/clubs";

const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

type Props = {
  profile: ClubProfile | null;
  hasProfile: boolean;
};

export function NextMeetingCard({ profile, hasProfile }: Props) {
  if (!hasProfile || !profile) return null;

  const slots = parseMeetingDays(
    profile.meeting_days ?? undefined,
    profile.meeting_location ?? undefined
  );
  const frequency = profile.meeting_frequency?.replace("_", " ") ?? null;
  const location = profile.meeting_location?.replace(/_/g, " ") ?? null;

  const hasAny =
    slots.length > 0 || frequency || location;
  if (!hasAny) return null;

  const firstSlot = slots[0];
  const primaryLine =
    firstSlot?.start && firstSlot?.end
      ? `${DAY_LABELS[firstSlot.day]} ${formatTimeForDisplay(firstSlot.start)} – ${formatTimeForDisplay(firstSlot.end)}`
      : firstSlot?.start
        ? `${DAY_LABELS[firstSlot.day]} at ${formatTimeForDisplay(firstSlot.start)}`
        : firstSlot
          ? `${DAY_LABELS[firstSlot.day]}`
          : frequency
            ? `${frequency}${location ? ` · ${location}` : ""}`
            : location
              ? location
              : null;

  if (!primaryLine) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          Next meeting
        </h3>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <p className="text-sm font-medium text-foreground leading-snug">
          {primaryLine}
        </p>
        {firstSlot?.location && (
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {firstSlot.location}
          </p>
        )}
        {!firstSlot?.location && location && (
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {location}
          </p>
        )}
        {frequency && !firstSlot && (
          <p className="text-xs text-muted-foreground">{frequency}</p>
        )}
      </CardContent>
    </Card>
  );
}
