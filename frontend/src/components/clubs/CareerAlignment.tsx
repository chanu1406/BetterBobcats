"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

export function CareerAlignment({ club, hasProfile }: Props) {
  const profile = club.profile;

  const rawCareers = profile?.supported_careers;
  const careers: string[] = Array.isArray(rawCareers)
    ? rawCareers
    : typeof rawCareers === "string" && rawCareers
      ? (rawCareers as string).split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];
  const rawSkills = profile?.skills_developed;
  const skills: string[] = Array.isArray(rawSkills)
    ? rawSkills
    : typeof rawSkills === "string" && rawSkills
      ? (rawSkills as string).split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];
  const courses = profile?.pairs_well_with_courses;

  const hasCareerInfo = hasProfile && (careers.length > 0 || skills.length > 0 || courses);

  if (!hasCareerInfo) {
    return (
      <Card className="rounded-xl">
        <CardContent className="pt-6">
          <div
            className="flex flex-col items-center justify-center py-12 px-4 rounded-xl bg-muted/30"
            role="status"
          >
            <GraduationCap className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm font-medium text-foreground mb-1">
              No career alignment info
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Career and academic alignment information is not available.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          Academic & Career
        </h2>
        <div className="space-y-4">
          {careers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Supported careers
              </h3>
              <div className="flex flex-wrap gap-2">
                {careers.map((c) => (
                  <Badge key={c} variant="secondary" className="capitalize">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Skills developed
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Badge key={s} variant="outline" className="capitalize">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {courses && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                Pairs well with courses
              </h3>
              <p className="text-muted-foreground text-sm">{courses}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
