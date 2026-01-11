import type { Metadata } from "next";
import { requirePlatformAdmin } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Admin - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Admin Layout
 * Wraps all admin pages with platform admin authentication
 * Redirects to /admin/login if not authenticated
 * Redirects to /not-authorized if not a platform admin
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require platform admin - redirects if not authenticated or not admin
  await requirePlatformAdmin();
  
  return <>{children}</>;
}

