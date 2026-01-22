"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types/event";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek, isSameMonth, addWeeks, eachWeekOfInterval, addDays } from "date-fns";
import { Globe, MapPin, Video } from "lucide-react";

interface MonthGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventHover?: (event: CalendarEvent) => void;
}

export function MonthGrid({ currentDate, events, onDayClick, onEventClick, onEventHover }: MonthGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  const weeks = eachWeekOfInterval(
    { start: calendarStart, end: calendarEnd },
    { weekStartsOn: 0 }
  );

  // Group events by date
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((event) => {
      const eventDate = new Date(event.starts_at);
      const dateKey = format(eventDate, "yyyy-MM-dd");
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(event);
    });
    return map;
  }, [events]);

  const getLocationIcon = (locationType: string) => {
    switch (locationType) {
      case "online":
        return <Video className="h-3 w-3" />;
      case "off_campus":
        return <Globe className="h-3 w-3" />;
      default:
        return <MapPin className="h-3 w-3" />;
    }
  };

  const getClubColor = (clubId: string, index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-yellow-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
    ];
    return colors[index % colors.length];
  };

  const weekdayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-px border rounded-lg overflow-hidden">
        {/* Weekday headers */}
        {weekdayHeaders.map((day) => (
          <div
            key={day}
            className="bg-muted/50 p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {weeks.map((weekStart, weekIdx) => {
          const weekEnd = addDays(weekStart, 6);
          const weekDays = eachDayOfInterval({
            start: weekStart,
            end: weekEnd,
          });

          return weekDays.map((day, dayIdx) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayEvents = eventsByDate.get(dateKey) || [];
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());
            const isSelected = isSameDay(day, currentDate);

            return (
              <div
                key={`${weekIdx}-${dayIdx}`}
                className={cn(
                  "min-h-[120px] bg-background border border-border p-1 hover:bg-accent/50 transition-colors",
                  !isCurrentMonth && "opacity-40"
                )}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full h-full flex-col items-start p-1 font-normal hover:bg-transparent",
                    isToday && "bg-accent",
                    isSelected && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => onDayClick(day)}
                >
                  <div className={cn(
                    "text-sm font-medium mb-1",
                    isToday && "font-bold"
                  )}>
                    {format(day, "d")}
                  </div>
                  <div className="flex-1 w-full overflow-hidden space-y-0.5">
                    {dayEvents.slice(0, 3).map((event, idx) => (
                      <div
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className={cn(
                          "text-[10px] px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 text-white text-left",
                          getClubColor(event.club_id, idx)
                        )}
                        title={event.title}
                      >
                        <div className="flex items-center gap-0.5">
                          {getLocationIcon(event.location_type)}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div
                        className="text-[10px] px-1 py-0.5 text-muted-foreground cursor-pointer hover:text-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDayClick(day);
                        }}
                      >
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </Button>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
