"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

export function MeetingSchedulePills({
  meetingDays,
  meetingLocation,
  meetingFrequency,
}: Props) {
  const slots = parseMeetingDays(
    meetingDays ?? undefined,
    meetingLocation ?? undefined
  );

  const slotsByDay = new Map<DayOfWeek, { start?: string; end?: string; location?: string }[]>();
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
    <TooltipProvider delayDuration={200}>
      <div
        className="flex flex-wrap gap-1"
        role="group"
        aria-label="Meeting schedule by day"
      >
        {DAYS.map(({ id, label }) => {
          const daySlots = slotsByDay.get(id);
          const hasMeeting = !!daySlots?.length;

          const tooltipContent = hasMeeting ? (
            <div className="space-y-1 text-sm">
              {daySlots!.map((slot, i) => (
                <p key={i} className="font-medium">
                  {slot.start && slot.end
                    ? `${formatTimeForDisplay(slot.start)} – ${formatTimeForDisplay(slot.end)}`
                    : slot.start
                      ? formatTimeForDisplay(slot.start)
                      : "Scheduled"}
                  {slot.location && (
                    <span className="block text-muted-foreground font-normal text-xs mt-0.5">
                      {slot.location}
                    </span>
                  )}
                </p>
              ))}
            </div>
          ) : fallbackText ? (
            <p className="text-sm">{fallbackText}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No meeting</p>
          );

          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "inline-flex h-8 min-w-[2.5rem] items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    hasMeeting
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  )}
                  aria-pressed={hasMeeting}
                  aria-label={`${label}${hasMeeting ? ": has meeting" : ""}`}
                >
                  {label}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                {tooltipContent}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
