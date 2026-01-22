"use client";

import { useState, useTransition, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteEvent } from "../actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  ends_at: string | null;
  location_name: string | null;
  location_type: "on_campus" | "off_campus" | "online" | "hybrid";
  online_url: string | null;
  visibility: "public" | "members_only" | "unlisted";
  status: "draft" | "published" | "cancelled";
  banner_url: string | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

interface EventsListProps {
  events: Event[];
  clubId: string;
  clubSlug: string;
  onEventChange?: () => void;
}

export default function EventsList({ events, clubId, clubSlug, onEventChange }: EventsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const [deletedEventIds, setDeletedEventIds] = useState<Set<string>>(new Set());

  // Optimistically remove deleted events from the list
  const visibleEvents = useMemo(() => {
    return events.filter((event) => !deletedEventIds.has(event.id));
  }, [events, deletedEventIds]);

  const handleDelete = useCallback(async (eventId: string) => {
    setDeletingEventId(eventId);
    startTransition(async () => {
      const result = await deleteEvent(eventId, clubId, clubSlug);
      if (result.ok) {
        // Optimistically remove from UI
        setDeletedEventIds((prev) => new Set(prev).add(eventId));
        // Notify parent to invalidate cache
        onEventChange?.();
      } else {
        alert(result.error || "Failed to delete event");
        setDeletingEventId(null);
      }
    });
  }, [clubId, clubSlug, router, onEventChange]);


  // Memoize date formatting to avoid creating Date objects multiple times
  const formatDateTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }, []);

  // Memoize badge variant functions
  const getStatusBadgeVariant = useCallback((status: string) => {
    switch (status) {
      case "published":
        return "default";
      case "draft":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  }, []);

  const getVisibilityBadgeVariant = useCallback((visibility: string) => {
    switch (visibility) {
      case "public":
        return "default";
      case "members_only":
        return "secondary";
      case "unlisted":
        return "outline";
      default:
        return "secondary";
    }
  }, []);

  if (visibleEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          No events yet. Create your first event to get started!
        </p>
        <Link href={`/dashboard/${clubSlug}/events/new`}>
          <Button>Create Event</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visibleEvents.map((event) => {
        // Memoize expensive date calculations per event
        const eventEndTime = event.ends_at
          ? new Date(event.ends_at)
          : new Date(event.starts_at);
        const now = new Date();
        const hasPassed = eventEndTime < now;

        return (
        <div
          key={event.id}
          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            {(event.banner_url || event.thumbnail_url) && (
              <div className="md:w-64 md:h-48 w-full h-48 relative bg-muted">
                <Image
                  src={event.banner_url || event.thumbnail_url || ""}
                  alt={event.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 256px"
                  quality={85}
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant={getStatusBadgeVariant(event.status)}>
                      {event.status}
                    </Badge>
                    <Badge variant={getVisibilityBadgeVariant(event.visibility)}>
                      {event.visibility.replace(/_/g, " ")}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/${clubSlug}/events/${event.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={hasPassed}
                      title={
                        hasPassed
                          ? "Cannot edit events that have passed"
                          : "Edit event"
                      }
                    >
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isPending && deletingEventId === event.id}
                      >
                        {isPending && deletingEventId === event.id
                          ? "Deleting..."
                          : "Delete"}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Event</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{event.title}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(event.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {event.description}
                </p>
              )}

              {/* Event Details */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Start:</strong>{" "}
                  {formatDateTime(event.starts_at)}
                </div>
                {event.ends_at && (
                  <div>
                    <strong className="text-foreground">End:</strong>{" "}
                    {formatDateTime(event.ends_at)}
                  </div>
                )}
                {event.location_name && (
                  <div>
                    <strong className="text-foreground">Location:</strong>{" "}
                    {event.location_name}
                    {event.location_type === "online" ||
                    event.location_type === "hybrid" ? (
                      event.online_url && (
                        <>
                          {" • "}
                          <a
                            href={event.online_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Online Link
                          </a>
                        </>
                      )
                    ) : null}
                  </div>
                )}
                {(event.location_type === "online" ||
                  event.location_type === "hybrid") &&
                  !event.location_name &&
                  event.online_url && (
                    <div>
                      <strong className="text-foreground">Online:</strong>{" "}
                      <a
                        href={event.online_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Join Online
                      </a>
                    </div>
                  )}
                <div className="capitalize">
                  <strong className="text-foreground">Type:</strong>{" "}
                  {event.location_type.replace(/_/g, " ")}
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
}
