"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, GraduationCap, Users, DollarSign, Calendar } from "lucide-react";
import { format } from "date-fns";
import { formatDues } from "@/app/clubs/[slug]/lib/utils";
import type { ClubProfile } from "@/lib/clubs";

type Props = {
  profile: ClubProfile | null;
  hasProfile: boolean;
};

type FactItem = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export function QuickFactsGrid({ profile, hasProfile }: Props) {
  if (!hasProfile || !profile) return null;

  const facts: FactItem[] = [];

  if (profile.commitment_level) {
    facts.push({
      label: "Commitment",
      value: profile.commitment_level.replace("_", " "),
      icon: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
    });
  }

  if (profile.open_to) {
    facts.push({
      label: "Open to",
      value: profile.open_to === "both" ? "Undergrad & Grad" : profile.open_to.replace("_", " "),
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    });
  }

  if (
    profile.dues_amount_cents != null &&
    profile.dues_amount_cents > 0 &&
    profile.dues_frequency
  ) {
    facts.push({
      label: "Dues",
      value: formatDues(profile.dues_amount_cents, profile.dues_frequency),
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    });
  }

  if (profile.updated_at) {
    facts.push({
      label: "Updated",
      value: format(new Date(profile.updated_at), "MMM d, yyyy"),
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    });
  }

  if (profile.years_active != null) {
    facts.push({
      label: "Active",
      value: `${profile.years_active} years`,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    });
  }

  if (facts.length === 0) return null;

  return (
    <Card className="rounded-xl">
      <CardContent className="p-4">
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          role="list"
          aria-label="Quick facts"
        >
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-center gap-3"
              role="listitem"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                {fact.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground capitalize">
                  {fact.label}
                </p>
                <p className="text-sm font-medium text-foreground truncate">
                  {fact.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
