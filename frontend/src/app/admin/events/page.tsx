import Link from "next/link";
import { requirePlatformAdmin } from "@/lib/auth/guards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminEventsManager from "./components/AdminEventsManager";
import AdminEmailFailures from "./components/AdminEmailFailures";

export const metadata = {
  title: "Events & Calendar - Admin - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Platform admin: Events & Calendar
 * - List all events; remove by row (deletes from DB; clubs/calendar/event_requests updated via FKs).
 * - View and retry/clear failed emails from email_outbox.
 */
export default async function AdminEventsPage() {
  await requirePlatformAdmin();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-3">
              Events & Calendar
            </h1>
            <p className="text-muted-foreground text-base">
              Manage platform events and view email delivery failures
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 text-muted-foreground hover:text-foreground rounded-lg font-medium hover:bg-muted/50 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>
              All events across clubs. Use Remove on a row to delete that event; it is removed from the club and calendar automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminEventsManager />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email delivery failures</CardTitle>
            <CardDescription>
              Failed emails from the outbox. You can reset rows to pending to retry sending, or clear them.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminEmailFailures />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
