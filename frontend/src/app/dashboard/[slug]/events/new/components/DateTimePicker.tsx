"use client";

import * as React from "react";
import { Clock2Icon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateTimePickerProps {
  label?: string;
  startDate: Date | undefined;
  startTime: string;
  endDate?: Date | undefined;
  endTime?: string;
  onStartDateChange: (date: Date | undefined) => void;
  onStartTimeChange: (time: string) => void;
  onEndDateChange?: (date: Date | undefined) => void;
  onEndTimeChange?: (time: string) => void;
  disabled?: boolean;
  includeEndTime?: boolean;
  // For multi-day events: if true, shows a separate end date calendar
  allowMultiDay?: boolean;
}

export function DateTimePicker({
  label = "Date & Time",
  startDate,
  startTime,
  endDate,
  endTime = "",
  onStartDateChange,
  onStartTimeChange,
  onEndDateChange,
  onEndTimeChange,
  disabled = false,
  includeEndTime = false,
}: DateTimePickerProps) {
  return (
    <Card className="w-full py-4">
      <CardContent className="px-4">
        <div className="mb-4">
          <Label className="text-base font-semibold">{label}</Label>
        </div>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={onStartDateChange}
            className="bg-transparent p-0"
            disabled={disabled}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-6 border-t px-4 !pt-4">
        <div className="flex w-full flex-col gap-3">
          <Label htmlFor="time-from">
            Start Time <span className="text-destructive">*</span>
          </Label>
          <div className="relative flex w-full items-center gap-2">
            <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
            <Input
              id="time-from"
              type="time"
              step="1"
              value={startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
              disabled={disabled}
              className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
        {includeEndTime && (
          <div className="flex w-full flex-col gap-3">
            <Label htmlFor="time-to">End Time (optional)</Label>
            <div className="relative flex w-full items-center gap-2">
              <Clock2Icon className="text-muted-foreground pointer-events-none absolute left-2.5 size-4 select-none" />
              <Input
                id="time-to"
                type="time"
                step="1"
                value={endTime}
                onChange={(e) => onEndTimeChange?.(e.target.value)}
                disabled={disabled}
                className="appearance-none pl-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
