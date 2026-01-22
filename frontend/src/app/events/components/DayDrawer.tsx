"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CalendarEvent } from "@/types/event";
import { MapPin, Video, Globe, Calendar as CalendarIcon } from "lucide-react";

interface DayDrawerProps {
  date: Date | null;
  events: CalendarEvent[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export function DayDrawer({
  date,
  events,
  open,
  onOpenChange,
  onEventClick,
}: DayDrawerProps) {
  if (!date) return null;

  const dayEvents = events.filter((event) => {
    const eventDate = new Date(event.starts_at);
    return isSameDay(eventDate, date);
  });

  const sortedEvents = [...dayEvents].sort((a, b) => {
    return (
      new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime()
    );
  });

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

  const isToday = isSameDay(date, new Date());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {isToday ? "Today" : format(date, "EEEE, MMMM d")}
          </SheetTitle>
          <SheetDescription>
            {sortedEvents.length} event{sortedEvents.length !== 1 ? "s" : ""} on this day
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {sortedEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No events scheduled for this day</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedEvents.map((event) => (
                <Card
                  key={event.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    onEventClick(event);
                    onOpenChange(false);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getLocationIcon(event.location_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold line-clamp-2">
                            {event.title}
                          </h3>
                          {event.status === "cancelled" && (
                            <Badge variant="destructive" className="flex-shrink-0">
                              Cancelled
                            </Badge>
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
                            <div className="flex items-center gap-2 mt-2">
                              <span className="font-medium text-foreground">
                                {event.club_name}
                              </span>
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
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
