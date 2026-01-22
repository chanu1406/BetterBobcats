"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfDay, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types/event";
import { Globe, MapPin, Video, Calendar as CalendarIcon } from "lucide-react";

interface ListViewProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDayClick: (date: Date) => void;
}

export function ListView({ events, onEventClick, onDayClick }: ListViewProps) {
  const eventsByDate = useMemo(() => {
    const sorted = [...events].sort((a, b) => 
      new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
    );
    
    const grouped: Record<string, CalendarEvent[]> = {};
    sorted.forEach((event) => {
      const dateKey = format(startOfDay(new Date(event.starts_at)), "yyyy-MM-dd");
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    
    return grouped;
  }, [events]);

  const sortedDates = useMemo(() => {
    return Object.keys(eventsByDate).sort((a, b) => 
      new Date(a).getTime() - new Date(b).getTime()
    );
  }, [eventsByDate]);

  const getLocationIcon = (locationType: string) => {
    switch (locationType) {
      case "online":
        return <Video className="h-4 w-4" />;
      case "off_campus":
        return <Globe className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const formatEventTime = (event: CalendarEvent) => {
    const start = new Date(event.starts_at);
    const end = event.ends_at ? new Date(event.ends_at) : null;
    
    const startTime = format(start, "h:mm a");
    if (end) {
      const endTime = format(end, "h:mm a");
      return `${startTime} - ${endTime}`;
    }
    return startTime;
  };

  if (sortedDates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium mb-2">No events found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or search query
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedDates.map((dateKey) => {
        const date = new Date(dateKey);
        const dayEvents = eventsByDate[dateKey];
        const isToday = isSameDay(date, new Date());

        return (
          <div key={dateKey} className="space-y-4">
            <div
              className={cn(
                "sticky top-[120px] z-10 flex items-center gap-2 py-2 bg-background border-b cursor-pointer hover:text-primary transition-colors",
                isToday && "text-primary"
              )}
              onClick={() => onDayClick(date)}
            >
              <CalendarIcon className="h-4 w-4" />
              <h2 className="text-xl font-semibold">
                {isToday ? "Today" : format(date, "EEEE, MMMM d")}
              </h2>
              <Badge variant="secondary" className="ml-auto">
                {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            <div className="space-y-3">
              {dayEvents.map((event) => (
                <Card
                  key={event.id}
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-shadow",
                    event.status === "cancelled" && "opacity-50"
                  )}
                  onClick={() => onEventClick(event)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getLocationIcon(event.location_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg font-semibold line-clamp-1">
                            {event.title}
                          </h3>
                          {event.status === "cancelled" && (
                            <Badge variant="destructive">Cancelled</Badge>
                          )}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <span>{formatEventTime(event)}</span>
                          </div>
                          {event.location_name && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location_name}</span>
                            </div>
                          )}
                          {event.club_name && (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{event.club_name}</span>
                            </div>
                          )}
                          {event.tags.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap mt-2">
                              {event.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
