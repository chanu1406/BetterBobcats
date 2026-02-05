"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DAYS = [
  { key: "Mon", label: "Mon" },
  { key: "Tue", label: "Tue" },
  { key: "Wed", label: "Wed" },
  { key: "Thu", label: "Thu" },
  { key: "Fri", label: "Fri" },
  { key: "Sat", label: "Sat" },
  { key: "Sun", label: "Sun" },
] as const;

const DAY_ALIASES: Record<string, string> = {
  mon: "Mon",
  monday: "Mon",
  tue: "Tue",
  tues: "Tue",
  tuesday: "Tue",
  wed: "Wed",
  wednesday: "Wed",
  thu: "Thu",
  thur: "Thu",
  thurs: "Thu",
  thursday: "Thu",
  fri: "Fri",
  friday: "Fri",
  sat: "Sat",
  saturday: "Sat",
  sun: "Sun",
  sunday: "Sun",
};

export type DayTimeMap = Record<string, { start: string; end: string }>;

function parseValue(value: string): DayTimeMap {
  if (!value?.trim()) return {};
  const map: DayTimeMap = {};
  for (const part of value.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    if (trimmed.includes(":")) {
      const colonIdx = trimmed.indexOf(":");
      const dayPart = trimmed.slice(0, colonIdx).trim();
      const timePart = trimmed.slice(colonIdx + 1).trim();
      const key = DAY_ALIASES[dayPart.toLowerCase()] ?? DAYS.find((d) => d.key.toLowerCase() === dayPart.toLowerCase()?.slice(0, 3))?.key;
      if (!key) continue;
      if (timePart.includes("-")) {
        const [start, end] = timePart.split("-").map((s) => s.trim());
        if (start && /^\d{1,2}:\d{2}$/.test(start) && end && /^\d{1,2}:\d{2}$/.test(end)) {
          map[key] = { start, end };
        } else {
          map[key] = { start: start && /^\d{1,2}:\d{2}$/.test(start) ? start : "", end: "" };
        }
      } else if (timePart && /^\d{1,2}:\d{2}$/.test(timePart)) {
        map[key] = { start: timePart, end: "" };
      } else {
        map[key] = { start: "", end: "" };
      }
    } else {
      const key = DAY_ALIASES[trimmed.toLowerCase()] ?? DAYS.find((d) => d.key.toLowerCase() === trimmed.toLowerCase()?.slice(0, 3))?.key;
      if (key) map[key] = { start: "", end: "" };
    }
  }
  return map;
}

function serializeValue(map: DayTimeMap): string {
  return DAYS.filter((d) => map[d.key] !== undefined)
    .map((d) => {
      const { start, end } = map[d.key];
      if (!start && !end) return d.key;
      if (start && end) return `${d.key}:${start}-${end}`;
      return `${d.key}:${start}`;
    })
    .join(", ");
}

function formatTime(t: string): string {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  if (h === 0) return `12:${m.toString().padStart(2, "0")}am`;
  if (h === 12) return `12:${m.toString().padStart(2, "0")}pm`;
  if (h < 12) return `${h}:${m.toString().padStart(2, "0")}am`;
  return `${h - 12}:${m.toString().padStart(2, "0")}pm`;
}

function formatTimeRangeForDisplay(start: string, end: string): string {
  if (!start) return "";
  if (!end) return formatTime(start);
  return `${formatTime(start)} – ${formatTime(end)}`;
}

interface MeetingDaysBarProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function MeetingDaysBar({
  value,
  onChange,
  disabled = false,
}: MeetingDaysBarProps) {
  const [openDay, setOpenDay] = useState<string | null>(null);
  const dayTimes = parseValue(value);

  const toggleDay = (key: string) => {
    if (disabled) return;
    const isSelected = key in dayTimes;
    if (isSelected) {
      const next = { ...dayTimes };
      delete next[key];
      onChange(serializeValue(next));
      setOpenDay(null);
    } else {
      const next = { ...dayTimes, [key]: { start: "", end: "" } };
      onChange(serializeValue(next));
      setOpenDay(key);
    }
  };

  const setTimeRange = (key: string, start: string, end: string) => {
    const next = { ...dayTimes, [key]: { start, end } };
    onChange(serializeValue(next));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 p-1.5 rounded-lg bg-muted/40 border border-border/60">
        {DAYS.map((day) => {
          const isSelected = day.key in dayTimes;
          const { start = "", end = "" } = dayTimes[day.key] ?? {};
          const hasTime = start || end;

          return (
            <div key={day.key} className="flex-1 min-w-0 flex flex-col items-center gap-1.5">
              <Popover
                open={openDay === day.key}
                onOpenChange={(open) => setOpenDay(open ? day.key : null)}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isSelected) toggleDay(day.key);
                    }}
                    disabled={disabled}
                    className={cn(
                      "w-full flex flex-col items-center justify-center gap-0.5 py-3 px-1 rounded-md text-sm font-medium transition-all",
                      "border-2",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "disabled:opacity-50 disabled:pointer-events-none",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                        : "border-transparent bg-background/80 hover:bg-muted/60 hover:border-muted-foreground/20"
                    )}
                  >
                    <span className="font-semibold">{day.label}</span>
                    {isSelected && hasTime && (
                      <span className={cn(
                        "text-[10px] font-normal opacity-90",
                        !isSelected && "text-muted-foreground"
                      )}>
                        {formatTimeRangeForDisplay(start, end)}
                      </span>
                    )}
                    {isSelected && !hasTime && (
                      <span className="text-[10px] font-normal opacity-75">
                        Set time
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="center"
                  side="bottom"
                  className="w-64"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">
                      {DAYS.find((d) => d.key === day.key)?.label} meeting time
                    </Label>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`${day.key}-start`} className="text-xs text-muted-foreground">Start</Label>
                        <div className="relative mt-1">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          <Input
                            id={`${day.key}-start`}
                            type="time"
                            step="300"
                            value={start}
                            onChange={(e) => setTimeRange(day.key, e.target.value, end)}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor={`${day.key}-end`} className="text-xs text-muted-foreground">End</Label>
                        <div className="relative mt-1">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          <Input
                            id={`${day.key}-end`}
                            type="time"
                            step="300"
                            value={end}
                            onChange={(e) => setTimeRange(day.key, start, e.target.value)}
                            className="pl-9"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setTimeRange(day.key, "", "");
                          setOpenDay(null);
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear time
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          toggleDay(day.key);
                          setOpenDay(null);
                        }}
                        className="text-xs text-destructive hover:underline"
                      >
                        Remove day
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          );
        })}
      </div>
      {Object.keys(dayTimes).length > 0 && (
        <p className="text-xs text-muted-foreground">
          Click a selected day to set start and end time
        </p>
      )}
    </div>
  );
}
