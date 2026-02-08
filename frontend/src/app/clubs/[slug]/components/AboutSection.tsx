"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Sparkles, ListChecks } from "lucide-react";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

function DefinitionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          {title}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}

export function AboutSection({ club, hasProfile }: Props) {
  const profile = club.profile;

  const whatToExpect: string[] = [];
  if (profile?.commitment_level) {
    whatToExpect.push(
      `${profile.commitment_level.replace("_", " ")} commitment`
    );
  }
  if (profile?.open_to) {
    whatToExpect.push(
      profile.open_to === "both"
        ? "Undergrad & grad welcome"
        : `Open to ${profile.open_to.replace("_", " ")}`
    );
  }
  if (profile?.meeting_frequency) {
    whatToExpect.push(
      `${profile.meeting_frequency.replace("_", " ")} meetings`
    );
  }
  if (profile?.club_size_range) {
    whatToExpect.push(
      `${profile.club_size_range} group`
    );
  }
  if (profile?.outcomes) {
    const lines = profile.outcomes
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    whatToExpect.push(...lines.slice(0, 3));
  }

  if (!hasProfile || !profile) {
    return (
      <Card>
        <CardContent className="pt-6">
          {club.description ? (
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {club.description}
            </p>
          ) : (
            <p className="text-muted-foreground">
              No description available.
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  const hasMission = !!profile.mission;
  const hasWhoFor = !!profile.who_for;
  const hasWhatDo = !!profile.what_do;
  const hasAnyBlock = hasMission || hasWhoFor || hasWhatDo;

  return (
    <div className="space-y-6">
      {hasAnyBlock && (
        <div className="space-y-4">
          {profile.mission && (
            <DefinitionCard title="Mission" icon={Target}>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm">
                {profile.mission}
              </p>
            </DefinitionCard>
          )}
          {profile.who_for && (
            <DefinitionCard title="Who this is for" icon={Users}>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm">
                {profile.who_for}
              </p>
            </DefinitionCard>
          )}
          {profile.what_do && (
            <DefinitionCard title="What you'll do" icon={Sparkles}>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm">
                {profile.what_do}
              </p>
            </DefinitionCard>
          )}
        </div>
      )}

      {whatToExpect.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" />
              What to expect
            </h3>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {whatToExpect.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="font-normal text-xs py-1"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!hasAnyBlock && !club.description && whatToExpect.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              No additional details yet.
            </p>
          </CardContent>
        </Card>
      )}

      {!hasAnyBlock && club.description && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {club.description}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
