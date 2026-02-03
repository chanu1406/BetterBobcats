"use client";

/**
 * Admin events list: fetch all events once, show table with per-row Remove.
 * Delete is by event id; DB cascades handle club/calendar/event_requests.
 */
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, Trash2, Loader2 } from "lucide-react";

interface EventRow {
  id: string;
  title: string;
  starts_at: string;
  status: string;
  club_id: string;
  clubs: { name: string; slug: string | null } | null;
}

const supabase = createClient();

export default function AdminEventsManager() {
  const { addToast } = useToast();
  const [events, setEvents] = useState<EventRow[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const fetchEvents = () => {
    setStatus("loading");
    setErrorMessage(null);

    const timeoutMs = 15000;
    const timeoutPromise = new Promise<{ data: null; error: { message: string } }>((resolve) => {
      setTimeout(
        () => resolve({ data: null, error: { message: "Request timed out. Check your internet connection and try again." } }),
        timeoutMs
      );
    });

    const queryPromise = supabase
      .from("events")
      .select("id, title, starts_at, status, club_id, clubs(name, slug)")
      .order("starts_at", { ascending: false });

    Promise.race([queryPromise, timeoutPromise])
      .then((result) => {
        const { data, error } = result;
        if (error) {
          setStatus("error");
          setErrorMessage(error.message);
          setEvents([]);
          return;
        }
        const raw = (data ?? []) as Array<{
          id: string;
          title: string;
          starts_at: string;
          status: string;
          club_id: string;
          clubs: { name: string; slug: string | null } | { name: string; slug: string | null }[] | null;
        }>;
        const rows: EventRow[] = raw.map((row) => ({
          id: row.id,
          title: row.title,
          starts_at: row.starts_at,
          status: row.status,
          club_id: row.club_id,
          clubs: Array.isArray(row.clubs) ? row.clubs[0] ?? null : row.clubs,
        }));
        setEvents(rows);
        setStatus("loaded");
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Failed to load events. Check your connection.");
        setEvents([]);
      });
  };

  // Fetch all events once on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRemove = async (eventId: string) => {
    setRemovingId(eventId);
    try {
      const { error } = await supabase.from("events").delete().eq("id", eventId);

      if (error) throw new Error(error.message);

      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      setConfirmRemoveId(null);
      addToast({
        title: "Event removed",
        description: "The event has been removed from the club and calendar.",
        variant: "success",
      });
    } catch (err) {
      addToast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to remove event",
        variant: "destructive",
      });
    } finally {
      setRemovingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const eventToRemove = confirmRemoveId ? events.find((e) => e.id === confirmRemoveId) : null;

  return (
    <div className="space-y-4">
      {status === "loading" && (
        <div className="p-8 text-center text-muted-foreground flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading events…
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 space-y-2">
          <p className="text-destructive text-sm">{errorMessage}</p>
          <Button variant="outline" size="sm" onClick={fetchEvents}>
            Retry
          </Button>
        </div>
      )}

      {status === "loaded" && (
        <div className="border rounded-lg overflow-hidden">
          {events.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Calendar className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>No events.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Starts</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px] text-right">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {event.clubs?.name ?? "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(event.starts_at)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          event.status === "published"
                            ? "text-green-600"
                            : event.status === "cancelled"
                              ? "text-muted-foreground"
                              : "text-amber-600"
                        }
                      >
                        {event.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setConfirmRemoveId(event.id)}
                        disabled={removingId !== null}
                      >
                        {removingId === event.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}

      <AlertDialog open={!!eventToRemove} onOpenChange={(open) => !open && setConfirmRemoveId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove event</AlertDialogTitle>
            <AlertDialogDescription>
              Remove &quot;{eventToRemove?.title}&quot;? It will be deleted from the club and calendar. Any event request linked to it will be unlinked. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => eventToRemove && handleRemove(eventToRemove.id)}
              disabled={removingId !== null}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removingId ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
