"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, ExternalLink } from "lucide-react";
import { ensureUrl } from "@/app/clubs/[slug]/lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

export function ConductAccessibility({ club, hasProfile }: Props) {
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
      <Card className="rounded-xl">
        <CardContent className="pt-6">
          <div
            className="flex flex-col items-center justify-center py-12 px-4 rounded-xl bg-muted/30"
            role="status"
          >
            <Award className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm font-medium text-foreground mb-1">
              No conduct or recognition info
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Accessibility, conduct, and recognition information is not available.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const items: { trigger: string; content: React.ReactNode }[] = [];

  if (profile?.accessibility_notes) {
    items.push({
      trigger: "Accessibility",
      content: (
        <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
          {profile.accessibility_notes}
        </p>
      ),
    });
  }

  if (profile?.inclusivity_statement) {
    items.push({
      trigger: "Our space",
      content: (
        <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
          {profile.inclusivity_statement}
        </p>
      ),
    });
  }

  if (profile?.code_of_conduct_url) {
    items.push({
      trigger: "Code of conduct",
      content: (
        <p className="text-sm text-muted-foreground leading-relaxed">
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
      ),
    });
  }

  if (profile?.awards || profile?.partners_sponsors) {
    items.push({
      trigger: "Recognition",
      content: (
        <div className="space-y-2 text-sm text-muted-foreground">
          {profile?.awards && (
            <p className="whitespace-pre-wrap leading-relaxed">{profile.awards}</p>
          )}
          {profile?.partners_sponsors && (
            <p>
              <span className="font-medium text-foreground">Partners & sponsors: </span>
              {profile.partners_sponsors}
            </p>
          )}
        </div>
      ),
    });
  }

  if (items.length === 0) return null;

  return (
    <Card className="rounded-xl">
      <CardContent className="pt-6">
        <Accordion type="multiple" defaultValue={[]} className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-0">
              <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
