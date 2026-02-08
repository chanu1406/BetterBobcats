"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Globe, Mail } from "lucide-react";
import { ensureUrl, formatDues } from "../lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

export function JoinSection({ club, hasProfile }: Props) {
  const profile = club.profile;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {hasProfile && profile?.how_to_join && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">How to join</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {profile.how_to_join}
              </p>
            </div>
          )}
          {hasProfile && profile?.application_required && (
            <div>
              {profile.application_url ? (
                <Button asChild>
                  <a
                    href={ensureUrl(profile.application_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Application/interview required
                </p>
              )}
            </div>
          )}
          {hasProfile &&
            profile?.dues_amount_cents != null &&
            profile.dues_amount_cents > 0 &&
            profile?.dues_frequency && (
              <p className="text-sm text-muted-foreground">
                Dues: {formatDues(profile.dues_amount_cents, profile.dues_frequency)}
              </p>
            )}
          {hasProfile && profile?.contact_email_general && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">Contact</h3>
              <a
                href={`mailto:${profile.contact_email_general}`}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                {profile.contact_email_general}
              </a>
            </div>
          )}
          {profile?.contact_emails_role_based &&
            Object.keys(profile.contact_emails_role_based).length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-1">Role contacts</h3>
                <div className="space-y-1">
                  {Object.entries(profile.contact_emails_role_based).map(
                    ([role, email]) =>
                      email && (
                        <a
                          key={role}
                          href={`mailto:${email}`}
                          className="block text-sm text-primary hover:underline capitalize"
                        >
                          {role.replace(/_/g, " ")}: {email}
                        </a>
                      )
                  )}
                </div>
              </div>
            )}
          {!hasProfile && club.website && (
            <a
              href={ensureUrl(club.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Globe className="h-4 w-4" />
              Visit website
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
