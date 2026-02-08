"use client";

import { Button } from "@/components/ui/button";
import { Mail, Globe } from "lucide-react";
import { ensureUrl } from "@/app/clubs/[slug]/lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
  recruitingClosed: boolean;
  onSwitchToJoin: () => void;
  /** Stack buttons vertically (e.g. in right rail). Default false. */
  stacked?: boolean;
  /** Omit Website button (e.g. when Connect/socials are shown separately). Default false. */
  omitWebsite?: boolean;
};

export function JoinCTA({
  club,
  hasProfile,
  recruitingClosed,
  onSwitchToJoin,
  stacked = false,
  omitWebsite = false,
}: Props) {
  const profile = club.profile;
  const size = stacked ? "default" : "lg";

  return (
    <div
      className={
        stacked ? "flex flex-col gap-2" : "flex flex-wrap gap-3"
      }
    >
      {recruitingClosed ? (
        <Button size={size} variant="default" onClick={onSwitchToJoin}>
          Contact to be notified
        </Button>
      ) : (
        <>
          <Button size={size} onClick={onSwitchToJoin}>
            {hasProfile && profile?.how_to_join ? "How to join" : "Join"}
          </Button>
          {hasProfile && profile?.contact_email_general && (
            <Button asChild size={size} variant="outline">
              <a href={`mailto:${profile.contact_email_general}`}>
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </a>
            </Button>
          )}
        </>
      )}
      {!omitWebsite && club.website && (
        <Button asChild size={size} variant="ghost">
          <a
            href={ensureUrl(club.website)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="h-4 w-4 mr-2" />
            Website
          </a>
        </Button>
      )}
    </div>
  );
}
