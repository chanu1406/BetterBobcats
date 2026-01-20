"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addDays, isSameWeek } from "date-fns";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types/event";
import { Globe, MapPin, Video } from "lucide-react";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDayClick: (date: Date) => void;
}

export function WeekView({ currentDate, events, onEventClick, onDayClick }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

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

  return (
    <div className="flex-1 h-full">
      <div className="grid grid-cols-7 gap-4 h-full">
        {weekDays.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const dayEvents = eventsByDate.get(dateKey) || [];
          const isToday = isSameDay(day, new Date());

          return (
            <div key={index} className="flex flex-col">
              <div
                className={cn(
                  "text-center p-2 font-medium border-b cursor-pointer hover:bg-accent",
                  isToday && "bg-primary text-primary-foreground"
                )}
                onClick={() => onDayClick(day)}
              >
                <div className="text-xs text-muted-foreground">
                  {format(day, "EEE")}
                </div>
                <div className="text-lg">{format(day, "d")}</div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 p-2">
                {dayEvents.map((event) => (
                  <Card
                    key={event.id}
                    className={cn(
                      "p-2 cursor-pointer hover:bg-accent transition-colors",
                      event.status === "cancelled" && "opacity-50"
                    )}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {getLocationIcon(event.location_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {event.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(event.starts_at), "h:mm a")}
                        </div>
                        {event.club_name && (
                          <div className="text-xs text-muted-foreground truncate">
                            {event.club_name}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
                {dayEvents.length === 0 && (
                  <div className="text-xs text-center text-muted-foreground py-4">
                    No events
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
