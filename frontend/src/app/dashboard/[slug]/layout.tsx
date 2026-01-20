import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ClubSidebar from "./components/ClubSidebar";

export default async function ClubDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Enforce authentication
  const user = await requireUser(`/dashboard/${slug}`);

  const supabase = await createClient();

  // Fetch club by slug
  const { data: clubData, error: clubError } = await supabase
    .from("clubs")
    .select("id, name, slug, logo_url, description, is_active")
    .eq("slug", slug)
    .single();

  if (clubError || !clubData) {
    notFound();
  }

  // Fetch user's membership for this club
  const { data: membershipData, error: membershipError } = await supabase
    .from("club_memberships")
    .select("role")
    .eq("club_id", clubData.id)
    .eq("user_id", user.id)
    .single();

  if (membershipError || !membershipData) {
    // User is not a member - we'll let the page handle this
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <ClubSidebar
          clubSlug={clubData.slug}
          clubName={clubData.name || "Club"}
          clubLogo={clubData.logo_url}
          userRole={membershipData.role}
        />
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
            <div className="pt-16 lg:pt-0">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
