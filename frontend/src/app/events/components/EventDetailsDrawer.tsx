"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import type { CalendarEvent } from "@/types/event";
import { MapPin, Video, Globe, ExternalLink, Calendar as CalendarIcon, Clock, Users, Tag } from "lucide-react";
import Image from "next/image";

interface EventDetailsDrawerProps {
  event: CalendarEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsDrawer({
  event,
  open,
  onOpenChange,
}: EventDetailsDrawerProps) {
  if (!event) return null;

  const formatEventTime = () => {
    const start = new Date(event.starts_at);
    const end = event.ends_at ? new Date(event.ends_at) : null;
    
    const startTime = format(start, "h:mm a");
    const endTime = end ? format(end, "h:mm a") : null;
    const date = format(start, "EEEE, MMMM d, yyyy");
    
    if (endTime) {
      return `${date} • ${startTime} - ${endTime}`;
    }
    return `${date} • ${startTime}`;
  };

  const getLocationIcon = () => {
    switch (event.location_type) {
      case "online":
        return <Video className="h-5 w-5 text-purple-600" />;
      case "off_campus":
        return <Globe className="h-5 w-5 text-orange-600" />;
      default:
        return <MapPin className="h-5 w-5 text-blue-600" />;
    }
  };

  const getLocationIconBg = () => {
    switch (event.location_type) {
      case "online":
        return "bg-purple-500/10";
      case "off_campus":
        return "bg-orange-500/10";
      default:
        return "bg-blue-500/10";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="px-6 pt-6 pb-4 border-b">
            <SheetHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <SheetTitle className="text-3xl font-bold mb-2 pr-8">
                    {event.title}
                  </SheetTitle>
                  {event.club_name && (
                    <SheetDescription className="text-base font-medium text-muted-foreground">
                      {event.club_name}
                    </SheetDescription>
                  )}
                </div>
                {event.status === "cancelled" && (
                  <Badge variant="destructive" className="shrink-0">
                    Cancelled
                  </Badge>
                )}
              </div>
            </SheetHeader>
          </div>

          {/* Content Section */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Event Banner */}
            {event.banner_url && (
              <div className="relative w-full h-56 rounded-xl overflow-hidden border shadow-sm">
                <Image
                  src={event.banner_url}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Date & Time Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2.5 shrink-0">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Date & Time
                    </div>
                    <div className="text-base font-semibold text-foreground">
                      {formatEventTime()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`rounded-lg ${getLocationIconBg()} p-2.5 shrink-0`}>
                    {getLocationIcon()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Location
                    </div>
                    {event.location_type === "online" && event.online_url ? (
                      <div>
                        <div className="text-base font-semibold text-foreground mb-3">
                          Online Event
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="gap-2"
                        >
                          <a
                            href={event.online_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Join Meeting
                          </a>
                        </Button>
                      </div>
                    ) : event.location_name ? (
                      <div>
                        <div className="text-base font-semibold text-foreground">
                          {event.location_name}
                        </div>
                        {event.location_address && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {event.location_address}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-base text-muted-foreground">
                        Location TBD
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <h3 className="font-semibold text-base">Description</h3>
                  </div>
                  {event.description && event.description.trim() !== "None" ? (
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {event.description}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No description provided
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tags Card */}
            {event.tags.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-semibold text-base">Tags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-sm font-medium px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Capacity & RSVP Card */}
            {(event.requires_rsvp || event.capacity) && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {event.capacity && (
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-green-500/10 p-2.5 shrink-0">
                          <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">
                            Capacity
                          </div>
                          <div className="text-base font-semibold text-foreground">
                            {event.capacity} attendees
                          </div>
                        </div>
                      </div>
                    )}
                    {event.requires_rsvp && event.rsvp_url && (
                      <Button asChild className="w-full gap-2" size="lg">
                        <a
                          href={event.rsvp_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          RSVP Now
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
