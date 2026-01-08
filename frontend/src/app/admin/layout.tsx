import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Admin Layout
 * Wraps all admin pages with noindex metadata
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

