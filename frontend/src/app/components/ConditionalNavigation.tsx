"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

/**
 * ConditionalNavigation Component
 * Only shows navigation on public-facing pages
 * Excludes /admin and /dashboard routes
 */
export default function ConditionalNavigation() {
  const pathname = usePathname();

  // Don't show navigation on admin or dashboard routes
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return <Navigation />;
}
