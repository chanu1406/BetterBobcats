"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RecruitingBadge,
  CommitmentBadge,
  SizeBadge,
  OpenToBadge,
} from "./ClubBadges";
import type { BrowseClubWithProfile } from "@/lib/clubs";
import { cn } from "@/lib/utils";
import {
  Globe,
  Instagram,
  MessageCircle,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";

const SOCIAL_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  website: Globe,
  instagram: Instagram,
  discord: MessageCircle,
  github: Github,
  linkedin: Linkedin,
  linktree: ExternalLink,
  other: ExternalLink,
};

function SocialIcon({
  type,
  url,
  className,
}: {
  type: string;
  url: string;
  className?: string;
}) {
  const Icon = SOCIAL_ICONS[type] ?? ExternalLink;
  
  // Use button instead of anchor to avoid nested <a> tags when inside a Link
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
      aria-label={`${type} link`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

type ClubCardProps = {
  club: BrowseClubWithProfile;
  onHover?: (slug: string | null) => void;
  compact?: boolean;
  className?: string;
};

export function ClubCard({ club, onHover, compact, className }: ClubCardProps) {
  const hasDues =
    club.dues_amount_cents != null && club.dues_amount_cents > 0;
  const socialLinks = club.links.filter(
    (l) => l.url && ["website", "instagram", "discord", "github"].includes(l.type)
  );

  const cardContent = (
    <>
      <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/10 to-accent/10">
        {club.thumbnail_url ? (
          <img
            src={club.thumbnail_url}
            alt=""
            className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
          />
        ) : null}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg">{club.name}</CardTitle>
        {club.tagline && (
          <CardDescription className="line-clamp-1">
            {club.tagline}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        {club.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {club.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          <RecruitingBadge status={club.recruiting_status} />
          <CommitmentBadge level={club.commitment_level} />
          <SizeBadge size={club.club_size_range} />
          <OpenToBadge openTo={club.open_to} />
          {hasDues && (
            <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              Dues
            </span>
          )}
        </div>

        {socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <SocialIcon
                key={`${link.type}-${link.url}`}
                type={link.type}
                url={link.url}
              />
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {club.slug ? (
          <span className="inline-flex h-9 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            View club
          </span>
        ) : (
          <Button asChild className="w-full" variant="default" size="sm">
            <Link href="/clubs">Browse clubs</Link>
          </Button>
        )}
      </CardFooter>
    </>
  );

  const wrapperClassName = cn(
    "group transition-all duration-200 ease-out hover:shadow-lg",
    compact && "flex flex-row gap-4",
    className
  );

  if (club.slug) {
    return (
      <Link
        href={`/clubs/${club.slug}`}
        className={wrapperClassName}
        onMouseEnter={() => onHover?.(club.slug)}
      >
        <Card className="h-full border-border/80 transition-shadow duration-200">{cardContent}</Card>
      </Link>
    );
  }

  return (
    <div className={wrapperClassName}>
      <Card className="h-full border-border/80 transition-shadow duration-200">{cardContent}</Card>
    </div>
  );
}
