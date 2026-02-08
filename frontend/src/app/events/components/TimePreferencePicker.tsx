"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";

const DAYS = [
  { value: "mon", label: "Mon" },
  { value: "tue", label: "Tue" },
  { value: "wed", label: "Wed" },
  { value: "thu", label: "Thu" },
  { value: "fri", label: "Fri" },
  { value: "sat", label: "Sat" },
  { value: "sun", label: "Sun" },
] as const;

const WINDOWS = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
] as const;

interface TimePreferencePickerProps {
  days?: string[];
  windows?: ("morning" | "afternoon" | "evening")[];
  onDaysChange: (days: string[]) => void;
  onWindowsChange: (windows: ("morning" | "afternoon" | "evening")[]) => void;
}

export function TimePreferencePicker({
  days = [],
  windows = [],
  onDaysChange,
  onWindowsChange,
}: TimePreferencePickerProps) {
  const handleDaysChange = (value: string[]) => {
    onDaysChange(value);
  };

  const handleWindowsChange = (value: string[]) => {
    onWindowsChange(
      value as ("morning" | "afternoon" | "evening")[]
    );
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs text-muted-foreground">Preferred days</Label>
      <ToggleGroup
        type="multiple"
        value={days}
        onValueChange={handleDaysChange}
        className="flex flex-wrap gap-1 justify-start"
      >
        {DAYS.map((d) => (
          <ToggleGroupItem
            key={d.value}
            value={d.value}
            className="text-xs px-2 py-1 h-8"
          >
            {d.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Label className="text-xs text-muted-foreground">Preferred time</Label>
      <ToggleGroup
        type="multiple"
        value={windows}
        onValueChange={handleWindowsChange}
        className="flex flex-wrap gap-1 justify-start"
      >
        {WINDOWS.map((w) => (
          <ToggleGroupItem
            key={w.value}
            value={w.value}
            className="text-xs px-2 py-1 h-8"
          >
            {w.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
