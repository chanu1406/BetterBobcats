"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, ExternalLink } from "lucide-react";
import { ensureUrl } from "../lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

export function ConductSection({ club, hasProfile }: Props) {
  const profile = club.profile;

  const hasContent =
    hasProfile &&
    (profile?.accessibility_notes ||
      profile?.inclusivity_statement ||
      profile?.code_of_conduct_url ||
      profile?.awards ||
      profile?.partners_sponsors);

  if (!hasContent) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">No conduct or recognition info available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          {profile?.accessibility_notes && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">Accessibility</h3>
              <p className="whitespace-pre-wrap">{profile.accessibility_notes}</p>
            </div>
          )}
          {profile?.inclusivity_statement && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">Our space</h3>
              <p className="whitespace-pre-wrap">{profile.inclusivity_statement}</p>
            </div>
          )}
          {profile?.code_of_conduct_url && (
            <p>
              We follow a{" "}
              <a
                href={ensureUrl(profile.code_of_conduct_url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                code of conduct
                <ExternalLink className="h-3 w-3" />
              </a>
              .
            </p>
          )}
          {(profile?.awards || profile?.partners_sponsors) && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1 flex items-center gap-1">
                <Award className="h-4 w-4" />
                Recognition
              </h3>
              {profile?.awards && <p className="whitespace-pre-wrap">{profile.awards}</p>}
              {profile?.partners_sponsors && (
                <p className="mt-1">
                  <span className="font-medium text-foreground">Partners & sponsors: </span>
                  {profile.partners_sponsors}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
