"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  parseMeetingDays,
  formatTimeForDisplay,
  type DayOfWeek,
} from "@/app/clubs/[slug]/lib/utils";
import type { ClubProfile } from "@/lib/clubs";

const DAYS: { id: DayOfWeek; label: string }[] = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

type Props = {
  meetingDays: string | null | undefined;
  meetingLocation: string | null | undefined;
  meetingFrequency: string | null | undefined;
};

export function MeetingDayPills({
  meetingDays,
  meetingLocation,
  meetingFrequency,
}: Props) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const slots = parseMeetingDays(
    meetingDays ?? undefined,
    meetingLocation ?? undefined
  );

  const slotsByDay = new Map<
    DayOfWeek,
    { start?: string; end?: string; location?: string }[]
  >();
  slots.forEach((s) => {
    const list = slotsByDay.get(s.day) ?? [];
    list.push({
      start: s.start,
      end: s.end,
      location: s.location,
    });
    slotsByDay.set(s.day, list);
  });

  const hasAnySchedule =
    slots.length > 0 || meetingFrequency || meetingLocation;
  if (!hasAnySchedule) return null;

  const fallbackText =
    meetingFrequency || meetingLocation
      ? `${meetingFrequency?.replace("_", " ") || "Meets"}${meetingLocation ? ` · ${meetingLocation.replace(/_/g, " ")}` : ""}`
      : null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">
        Meeting schedule
      </p>
      <ToggleGroup
        type="single"
        value={selectedDay ?? undefined}
        onValueChange={(v) => setSelectedDay(v || null)}
        className="flex flex-wrap gap-1 justify-start"
      >
        {DAYS.map(({ id, label }) => {
          const daySlots = slotsByDay.get(id);
          const hasMeeting = !!daySlots?.length;
          const count = daySlots?.length ?? 0;
          const showBadge = count > 1;

          const popoverContent = hasMeeting ? (
            <div className="space-y-2">
              {daySlots!.map((slot, i) => (
                <div key={i} className="text-sm">
                  <p className="font-medium text-foreground">
                    {slot.start && slot.end
                      ? `${formatTimeForDisplay(slot.start)} – ${formatTimeForDisplay(slot.end)}`
                      : slot.start
                        ? formatTimeForDisplay(slot.start)
                        : "Scheduled"}
                  </p>
                  {slot.location && (
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {slot.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : fallbackText ? (
            <p className="text-sm text-muted-foreground">{fallbackText}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No meeting this day</p>
          );

          return (
            <Popover key={id}>
              <PopoverTrigger asChild>
                <ToggleGroupItem
                  value={id}
                  aria-label={`${label}${hasMeeting ? ": has meeting" : ""}`}
                  className={cn(
                    "relative min-w-[2.5rem] h-8 px-2 rounded-lg font-medium text-sm",
                    hasMeeting
                      ? "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground bg-primary/90 text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                >
                  {label}
                  {showBadge && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-1.5 -right-1 h-4 min-w-4 flex items-center justify-center rounded-full p-0 text-[10px] bg-background border border-border"
                    >
                      {count}
                    </Badge>
                  )}
                </ToggleGroupItem>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-56">
                <p className="text-xs font-medium text-muted-foreground mb-2 capitalize">
                  {label}
                </p>
                {popoverContent}
              </PopoverContent>
            </Popover>
          );
        })}
      </ToggleGroup>
    </div>
  );
}
