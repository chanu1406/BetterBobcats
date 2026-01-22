import { requireUser } from "@/lib/auth/guards";
import { notFound } from "next/navigation";
import ClubDashboardClient from "./page-client";

export const metadata = {
  title: "Club Dashboard - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Club Dashboard Page (Server Component)
 * Dynamic route: /dashboard/[slug]
 * Handles authentication and passes slug to client component
 */
export default async function ClubDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Enforce authentication
  await requireUser(`/dashboard/${slug}`);

  return <ClubDashboardClient slug={slug} />;
}
