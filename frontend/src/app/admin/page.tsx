import Link from "next/link";
import { logoutAction } from "./actions";

export const metadata = {
  title: "Admin Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Admin Dashboard Page
 * Protected by admin layout (requirePlatformAdmin)
 */
export default async function AdminDashboardPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome to the BetterBobcats admin panel
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="px-6 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Platform Stats
            </h2>
            <p className="text-muted-foreground">
              Dashboard content coming soon...
            </p>
          </div>

          {/* Management Card */}
          <div className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Content Management
            </h2>
            <p className="text-muted-foreground">
              Manage courses, careers, and degrees
            </p>
          </div>

          {/* Settings Card */}
          <div className="bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Settings
            </h2>
            <p className="text-muted-foreground">
              Configure platform settings
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-card p-6 rounded-xl border-2 border-primary/20 shadow-lg">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/clubs">
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-left">
                Clubs
              </button>
            </Link>
            <Link href="/admin/majors">
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-left">
                Manage Majors
              </button>
            </Link>
            <Link href="/admin/club-requests">
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-left">
                Club Requests
              </button>
            </Link>
            <Link href="/admin/maintenance">
              <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-left">
                Maintenance
              </button>
            </Link>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-left">
              Manage Careers
            </button>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-left">
              Manage Degrees
            </button>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-left">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

