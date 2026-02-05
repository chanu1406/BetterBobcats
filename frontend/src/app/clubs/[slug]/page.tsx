"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchClubWithProfile } from "@/lib/clubs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ExternalLink,
  Users,
  Calendar,
  GraduationCap,
  Mail,
  Award,
  Link2,
  Instagram,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import type { ClubProfileLinkType } from "@/lib/clubs";

const LINK_ICONS: Partial<Record<ClubProfileLinkType, React.ReactNode>> = {
  instagram: <Instagram className="h-4 w-4" />,
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
};

function formatTimePart(t: string): string {
  if (!t || !/^\d{1,2}:\d{2}$/.test(t)) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")}${ampm}`;
}

function formatMeetingDays(value: string): string {
  if (!value?.trim()) return "";
  return value
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return "";
      if (trimmed.includes(":")) {
        const colonIdx = trimmed.indexOf(":");
        const day = trimmed.slice(0, colonIdx).trim();
        const timePart = trimmed.slice(colonIdx + 1).trim();
        if (!timePart) return day;
        if (timePart.includes("-")) {
          const [start, end] = timePart.split("-").map((s) => s.trim());
          const s = formatTimePart(start);
          const e = formatTimePart(end);
          if (s && e) return `${day} ${s} – ${e}`;
          if (s) return `${day} ${s}`;
        } else if (formatTimePart(timePart)) {
          return `${day} ${formatTimePart(timePart)}`;
        }
        return day;
      }
      return trimmed;
    })
    .filter(Boolean)
    .join(", ");
}

function formatDues(amountCents: number, frequency: string): string {
  const dollars = amountCents / 100;
  const freq =
    frequency === "one_time"
      ? "one-time"
      : frequency === "semesterly"
        ? "per semester"
        : frequency === "yearly"
          ? "per year"
          : "";
  return freq ? `$${dollars} ${freq}` : `$${dollars}`;
}

export default function ClubProfilePage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : null;

  const { data: club, isLoading, error } = useQuery({
    queryKey: ["club-with-profile", slug],
    queryFn: () => fetchClubWithProfile(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });

  if (!slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Invalid club link
          </h1>
          <Link href="/clubs">
            <Button variant="outline">Browse clubs</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Skeleton className="h-8 w-48 mb-8" />
          <Skeleton className="h-64 w-full rounded-xl mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Club not found
          </h1>
          <p className="text-muted-foreground mb-6">
            This club may no longer exist or the link is incorrect.
          </p>
          <Link href="/clubs">
            <Button variant="outline">Browse clubs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const profile = club.profile;
  const hasProfile = profile && profile.published;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to clubs
        </Link>

        {/* Banner */}
        {(club.banner_url || profile?.thumbnail_url) && (
          <div className="mb-6 -mx-4 sm:mx-0 overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={club.banner_url || profile?.thumbnail_url || ""}
              alt=""
              className="w-full h-40 sm:h-52 object-cover"
            />
          </div>
        )}

        <div className="bg-card p-8 rounded-xl border-2 border-primary/20 shadow-lg space-y-8">
          {/* Logo + name + tagline */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {club.logo_url && (
              <div className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={club.logo_url}
                  alt={`${club.name} logo`}
                  className="h-20 w-20 object-contain rounded-lg"
                />
              </div>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-primary">
                  {club.name}
                </h1>
                {hasProfile && profile?.recognized_by_university !== false && (
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    University recognized
                  </span>
                )}
              </div>
              {hasProfile && profile?.tagline && (
                <p className="text-lg text-muted-foreground">
                  {profile.tagline}
                </p>
              )}
            </div>
          </div>

          {/* Mission / Who for / What do */}
          {hasProfile && (
            <>
              {profile?.mission && (
                <section>
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                    Mission
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {profile.mission}
                  </p>
                </section>
              )}
              {profile?.who_for && (
                <section>
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                    Who this club is for
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {profile.who_for}
                  </p>
                </section>
              )}
              {profile?.what_do && (
                <section>
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                    What you&apos;ll do
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {profile.what_do}
                  </p>
                </section>
              )}
            </>
          )}

          {/* Fallback description if no profile */}
          {(!hasProfile || !profile?.mission) && club.description && (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {club.description}
            </p>
          )}

          {/* Media gallery */}
          {hasProfile && club.media && club.media.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {club.media.map((m) => (
                  <div
                    key={m.id}
                    className="aspect-video rounded-lg overflow-hidden bg-muted"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.url}
                      alt={m.caption || ""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Intro video */}
          {hasProfile && profile?.intro_video_url && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                Intro video
              </h2>
              <a
                href={profile.intro_video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Watch video
                <ExternalLink className="h-4 w-4" />
              </a>
            </section>
          )}

          {/* Social links */}
          {(club.links?.length > 0 || club.website) && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Links
              </h2>
              <div className="flex flex-wrap gap-3">
                {club.website && (
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Website
                  </a>
                )}
                {club.links?.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors capitalize"
                  >
                    {LINK_ICONS[link.link_type] || (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    {link.link_type}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Officers */}
          {hasProfile && club.officers && club.officers.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Leadership
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {club.officers.map((o) => (
                  <div
                    key={o.id}
                    className="flex gap-4 p-4 rounded-lg border border-border bg-muted/30"
                  >
                    {o.headshot_url ? (
                      <img
                        src={o.headshot_url}
                        alt=""
                        className="h-14 w-14 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-full bg-primary/20 shrink-0 flex items-center justify-center">
                        <Users className="h-7 w-7 text-primary/60" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">
                        {o.display_name}
                      </p>
                      <p className="text-sm text-muted-foreground">{o.role}</p>
                      {(o.major || o.year) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {[o.major, o.year].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {o.bio && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {o.bio}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Meeting & logistics */}
          {hasProfile &&
            (profile?.meeting_frequency ||
              profile?.meeting_location ||
              profile?.meeting_days) && (
              <section>
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Meeting & logistics
                </h2>
                <div className="flex flex-wrap gap-2 text-muted-foreground">
                  {profile?.meeting_frequency && (
                    <span className="px-3 py-1 rounded-full bg-muted text-sm capitalize">
                      {profile.meeting_frequency.replace("_", " ")} meetings
                    </span>
                  )}
                  {profile?.meeting_location && (
                    <span className="px-3 py-1 rounded-full bg-muted text-sm capitalize flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {profile.meeting_location.replace("_", " ")}
                    </span>
                  )}
                </div>
                {profile?.meeting_days && (
                  <p className="text-muted-foreground mt-2 text-sm">
                    {formatMeetingDays(profile.meeting_days)}
                  </p>
                )}
              </section>
            )}

          {/* What you'll leave with */}
          {hasProfile && profile?.outcomes && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                What you&apos;ll leave with
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {profile.outcomes}
              </p>
            </section>
          )}

          {/* Upcoming highlights */}
          {hasProfile && profile?.upcoming_highlights && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming highlights
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {profile.upcoming_highlights}
              </p>
            </section>
          )}

          {/* How to join */}
          {hasProfile && profile?.how_to_join && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                How to join
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {profile.how_to_join}
              </p>
            </section>
          )}

          {/* Dues & application */}
          {hasProfile &&
            ((profile?.dues_amount_cents != null &&
              profile.dues_amount_cents > 0) ||
              profile?.application_required) && (
              <section>
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  Requirements
                </h2>
                <ul className="space-y-1 text-muted-foreground">
                  {profile.dues_amount_cents != null &&
                    profile.dues_amount_cents > 0 &&
                    profile.dues_frequency && (
                      <li>
                        Dues:{" "}
                        {formatDues(
                          profile.dues_amount_cents,
                          profile.dues_frequency
                        )}
                      </li>
                    )}
                  {profile.application_required && (
                    <li>
                      Application/interview required
                      {profile.application_url && (
                        <a
                          href={profile.application_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Apply
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </li>
                  )}
                </ul>
              </section>
            )}

          {/* Commitment & open to */}
          {hasProfile &&
            (profile?.commitment_level || profile?.open_to) && (
              <section>
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  Membership
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.commitment_level && (
                    <span className="px-3 py-1 rounded-full bg-muted text-sm capitalize">
                      {profile.commitment_level} commitment
                    </span>
                  )}
                  {profile.open_to && (
                    <span className="px-3 py-1 rounded-full bg-muted text-sm capitalize">
                      Open to {profile.open_to}
                    </span>
                  )}
                </div>
              </section>
            )}

          {/* Careers & skills */}
          {hasProfile &&
            ((profile?.supported_careers?.length ?? 0) > 0 ||
              (profile?.skills_developed?.length ?? 0) > 0 ||
              profile?.pairs_well_with_courses) && (
              <section>
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Academic & career alignment
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  {(profile?.supported_careers?.length ?? 0) > 0 && (
                    <div>
                      <span className="font-medium text-foreground">
                        Supported careers:{" "}
                      </span>
                      {profile?.supported_careers?.join(", ")}
                    </div>
                  )}
                  {(profile?.skills_developed?.length ?? 0) > 0 && (
                    <div>
                      <span className="font-medium text-foreground">
                        Skills developed:{" "}
                      </span>
                      {profile?.skills_developed?.join(", ")}
                    </div>
                  )}
                  {profile?.pairs_well_with_courses && (
                    <div>
                      <span className="font-medium text-foreground">
                        Pairs well with:{" "}
                      </span>
                      {profile.pairs_well_with_courses}
                    </div>
                  )}
                </div>
              </section>
            )}

          {/* Awards & partners */}
          {hasProfile && (profile?.awards || profile?.partners_sponsors) && (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Recognition
              </h2>
              <div className="space-y-2 text-muted-foreground whitespace-pre-wrap">
                {profile?.awards && <p>{profile.awards}</p>}
                {profile?.partners_sponsors && (
                  <p>
                    <span className="font-medium text-foreground">
                      Partners & sponsors:{" "}
                    </span>
                    {profile.partners_sponsors}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Accessibility & conduct */}
          {hasProfile &&
            (profile?.accessibility_notes ||
              profile?.inclusivity_statement ||
              profile?.code_of_conduct_url) && (
              <section>
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  Accessibility & conduct
                </h2>
                <div className="space-y-2 text-muted-foreground text-sm">
                  {profile?.accessibility_notes && (
                    <p>{profile.accessibility_notes}</p>
                  )}
                  {profile?.inclusivity_statement && (
                    <p>{profile.inclusivity_statement}</p>
                  )}
                  {profile?.code_of_conduct_url && (
                    <a
                      href={profile.code_of_conduct_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      Code of conduct
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </section>
            )}

          {/* Activity signals */}
          {hasProfile &&
            (profile?.years_active != null ||
              profile?.recruiting_status ||
              profile?.club_size_range) && (
              <section>
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  Activity
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile?.years_active != null && (
                    <span className="px-3 py-1 rounded-full bg-muted text-sm">
                      {profile.years_active} years active
                    </span>
                  )}
                  {profile?.recruiting_status && (
                    <span className="px-3 py-1 rounded-full bg-muted text-sm capitalize">
                      Recruiting: {profile.recruiting_status.replace("_", " ")}
                    </span>
                  )}
                  {profile?.club_size_range && (
                    <span className="px-3 py-1 rounded-full bg-muted text-sm capitalize">
                      {profile.club_size_range} club
                    </span>
                  )}
                </div>
              </section>
            )}

          {/* Contact */}
          {(hasProfile && profile?.contact_email_general) || club.website ? (
            <section>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact
              </h2>
              <div className="flex flex-wrap gap-3">
                {hasProfile && profile?.contact_email_general && (
                  <a
                    href={`mailto:${profile.contact_email_general}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all"
                  >
                    {profile.contact_email_general}
                  </a>
                )}
                {club.website && !hasProfile && (
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all hover:gap-3"
                  >
                    Visit website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </section>
          ) : (
            club.website && (
              <a
                href={club.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all hover:gap-3"
              >
                Visit website
                <ExternalLink className="h-4 w-4" />
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
