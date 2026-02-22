"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  GraduationCap,
  LayoutDashboard,
  Link2,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  X,
  Share2,
  Sparkles,
  Users,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fetchPublicEvents } from "@/lib/events";
import { fetchUserDashboardData } from "@/lib/dashboard";
import type { CalendarEvent } from "@/types/event";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

const CARD_BASE =
  "rounded-2xl border border-border/80 bg-card/95 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md";

type PreviewCardProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  accentClass?: string;
  className?: string;
};

type DashboardPreviewProps = {
  className?: string;
};

function PreviewCard({
  title,
  icon: Icon,
  children,
  accentClass,
  className,
}: PreviewCardProps) {
  return (
    <div
      className={cn(
        `${CARD_BASE} flex min-w-[260px] max-w-[320px] flex-col sm:min-w-0`,
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            accentClass ?? "bg-primary/10 text-primary"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

const MOCK_DEGREE_ITEMS = [
  { label: "Computer Science", done: true },
  { label: "Mechanical Engineering", done: false },
  { label: "Cognitive Science", done: false },
];

const MOCK_CLUBS = ["CS Club", "Robotics", "Design"];
const MOCK_PROFESSORS = ["Dr. Chen", "Prof. Rivera", "Dr. Patel"];

type ShareLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type ShareButtonProps = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

function ShareButton({ label, href, icon }: ShareButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border/60 bg-background px-3 py-3 text-center text-xs font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.98]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-white dark:bg-slate-900 shadow-sm text-foreground/80 transition-colors group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:text-primary">
        {icon}
      </span>
      <span>{label}</span>
    </a>
  );
}


function formatEventDay(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatEventTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function DashboardPreview({ className }: DashboardPreviewProps) {
  const dateLabel = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const [events, setEvents] = useState<CalendarEvent[] | null>(null);
  const [clubSummary, setClubSummary] = useState<{
    name: string;
    slug: string | null;
    role: string | null;
  } | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  const shareText =
    "Check out BetterBobcats - your academic hub for UC Merced.";

  useEffect(() => {
    let isMounted = true;
    const now = new Date();
    const end = new Date();
    end.setDate(now.getDate() + 45);

    fetchPublicEvents(now, end)
      .then((data) => {
        if (!isMounted) return;
        setEvents(data.slice(0, 2));
      })
      .catch(() => {
        if (!isMounted) return;
        setEvents([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShareUrl(window.location.origin);
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetchUserDashboardData()
      .then((memberships) => {
        if (!isMounted) return;
        const primary = memberships[0];
        if (!primary) {
          setClubSummary(null);
          return;
        }
        setClubSummary({
          name: primary.club.name,
          slug: primary.club.slug ?? null,
          role: primary.role ?? null,
        });
      })
      .catch(() => {
        if (!isMounted) return;
        setClubSummary(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const upcomingEvents = useMemo(() => events ?? [], [events]);
  const showEventSkeleton = events === null || upcomingEvents.length === 0;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks: ShareLink[] = [
    {
      label: "Gmail",
      href: `https://mail.google.com/mail/?view=cm&fs=1&su=${encodedText}&body=${encodedText}%0A${encodedUrl}`,
      icon: (
        <img
          src="/share-icons/gmail_logo.avif"
          alt="Gmail"
          className="h-7 w-7 object-contain"
        />
      ),
    },
    {
      label: "Outlook",
      href: `https://outlook.office.com/mail/deeplink/compose?subject=${encodedText}&body=${encodedText}%0A${encodedUrl}`,
      icon: (
        <img
          src="/share-icons/outlook_logo.png"
          alt="Outlook"
          className="h-7 w-7 object-contain"
        />
      ),
    },
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: (
        <img
          src="/share-icons/logo-black.png"
          alt="X"
          className="h-7 w-7 object-contain"
        />
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <img
          src="/share-icons/2-20625_linkedin-logo-hd-png-download.png"
          alt="LinkedIn"
          className="h-7 w-7 object-contain"
        />
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <img
          src="/share-icons/icons8-facebook-144.png"
          alt="Facebook"
          className="h-7 w-7 object-contain"
        />
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: (
        <img
          src="/share-icons/whatsapp.svg"
          alt="WhatsApp"
          className="h-7 w-7 object-contain"
        />
      ),
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: (
        <img
          src="/share-icons/telegram.png"
          alt="Telegram"
          className="h-7 w-7 object-contain"
        />
      ),
    },
    {
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
      icon: (
        <img
          src="/share-icons/reddit_logo.png"
          alt="Reddit"
          className="h-7 w-7 object-contain"
        />
      ),
    },
  ];

  return (
    <section
      aria-labelledby="dashboard-preview-heading"
      className={cn(
        "rounded-[28px] border border-border/60 bg-background/90 p-4 shadow-xl md:p-6",
        className
      )}
    >
      <h2 id="dashboard-preview-heading" className="sr-only">
        Platform preview
      </h2>

      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-muted px-3 py-1">{dateLabel}</span>
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 transition-colors hover:bg-muted/70 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Share2 className="h-3 w-3" />
              Share
            </button>
          </DialogTrigger>
          <DialogContent
            hideClose
            className="w-[560px] max-w-[92vw] rounded-2xl border border-border/70 bg-background p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <DialogTitle className="text-lg font-semibold">
                  Share BetterBobcats
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Send the link or share on your favorite platform.
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </DialogClose>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex flex-col gap-3">
                <div className="flex w-full items-center gap-2 rounded-xl border border-border/70 bg-muted/20 px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                  <Input
                    readOnly
                    value={shareUrl || "Loading link..."}
                    className="h-10 border-0 bg-transparent px-0 text-sm text-foreground focus-visible:ring-0 truncate"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg"
                    disabled={!shareUrl}
                    onClick={() => {
                      if (!shareUrl) return;
                      window.open(shareUrl, "_blank", "noopener,noreferrer");
                    }}
                    aria-label="Open link in new tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    className="h-9 rounded-lg px-4"
                    disabled={!shareUrl}
                    onClick={() => {
                      if (!shareUrl) return;
                      navigator.clipboard?.writeText(shareUrl);
                      setCopied(true);
                      addToast({
                        description: "Link copied to clipboard",
                        variant: "success",
                        duration: 1500,
                      });
                      setTimeout(() => setCopied(false), 1500);
                    }}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {shareLinks.map((link) => (
                  <ShareButton
                    key={link.label}
                    label={link.label}
                    href={link.href}
                    icon={link.icon}
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-muted">
          <Sparkles className="h-3 w-3 text-primary" />
        </span>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:snap-none md:overflow-visible lg:grid-cols-4">
        <div className="snap-center md:snap-align-none lg:col-span-2">
          <PreviewCard
            title="Degrees & Roadmap"
            icon={GraduationCap}
            accentClass="bg-primary/10 text-primary"
            className="max-w-none"
          >
            <div className="space-y-2">
              {MOCK_DEGREE_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      item.done ? "bg-primary" : "bg-muted-foreground/40"
                    }`}
                  />
                  {item.label}
                </div>
              ))}
              <div className="mt-2 h-6 w-full rounded bg-muted/80" />
            </div>
          </PreviewCard>
        </div>

        <div className="snap-center md:snap-align-none">
          <Link href="/clubs" className="block" aria-label="View clubs">
            <PreviewCard
              title="Clubs"
              icon={Users}
              accentClass="bg-accent/20 text-accent-foreground"
            >
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {MOCK_CLUBS.map((name, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent/50" />
                    {name}
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-lg border border-dashed border-border/60 py-2 text-center text-xs text-muted-foreground">
                Discover more
              </div>
            </PreviewCard>
          </Link>
        </div>

        <div className="snap-center md:snap-align-none">
          <Link href="/professors" className="block" aria-label="View professors">
            <PreviewCard
              title="Professors"
              icon={UserCheck}
              accentClass="bg-primary/10 text-primary"
            >
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {MOCK_PROFESSORS.map((name, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary/50" />
                    {name}
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-lg border border-dashed border-border/60 py-2 text-center text-xs text-muted-foreground">
                View ratings
              </div>
            </PreviewCard>
          </Link>
        </div>

        <div className="snap-center md:snap-align-none">
          <Link href="/events" className="block" aria-label="View events">
            <PreviewCard
              title="Events"
              icon={Calendar}
              accentClass="bg-primary/10 text-primary"
            >
              {showEventSkeleton ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="h-8 w-8 shrink-0 rounded bg-muted" />
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-16 rounded bg-foreground/20" />
                      <div className="h-2 w-24 rounded bg-muted-foreground/30" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 shrink-0 rounded bg-muted" />
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-20 rounded bg-foreground/20" />
                      <div className="h-2 w-20 rounded bg-muted-foreground/30" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-muted text-[10px] font-medium text-muted-foreground">
                        {formatEventDay(event.starts_at)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="truncate text-xs font-medium text-foreground">
                          {event.title}
                        </div>
                        <div className="truncate text-[11px] text-muted-foreground">
                          {formatEventTime(event.starts_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </PreviewCard>
          </Link>
        </div>

        <div className="snap-center md:snap-align-none lg:col-span-2">
          <PreviewCard
            title="Your Club Dashboard"
            icon={LayoutDashboard}
            accentClass="bg-accent/20 text-accent-foreground"
            className="max-w-none"
          >
            {clubSummary ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                    {clubSummary.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-sm font-semibold text-foreground">
                      {clubSummary.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {clubSummary.role ? `${clubSummary.role} role` : "Club member"}
                    </div>
                  </div>
                </div>
                <Link
                  href={clubSummary.slug ? `/dashboard/${clubSummary.slug}` : "/dashboard"}
                  className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-primary/10 py-2 text-xs font-medium text-primary hover:bg-primary/15"
                >
                  Open dashboard
                  <MapPin className="h-3 w-3" />
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-full bg-muted" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2.5 w-20 rounded bg-foreground/25" />
                    <div className="h-2 w-28 rounded bg-muted-foreground/30" />
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-primary/10 py-2 text-xs font-medium text-primary hover:bg-primary/15"
                >
                  Open dashboard
                  <MapPin className="h-3 w-3" />
                </Link>
              </>
            )}
          </PreviewCard>
        </div>
      </div>
    </section>
  );
}
