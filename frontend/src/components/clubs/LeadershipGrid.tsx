"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { ensureUrl } from "@/app/clubs/[slug]/lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

export function LeadershipGrid({ club, hasProfile }: Props) {
  if (!hasProfile || !club.officers || club.officers.length === 0) {
    return (
      <Card className="rounded-xl">
        <CardContent className="pt-6">
          <div
            className="flex flex-col items-center justify-center py-12 px-4 rounded-xl bg-muted/30"
            role="status"
          >
            <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm font-medium text-foreground mb-1">
              No leadership info
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Leadership information is not available for this club.
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
          <Users className="h-5 w-5" />
          Leadership
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {club.officers.map((o) => (
            <Card key={o.id} className="overflow-hidden rounded-xl">
              <CardContent className="p-4 flex gap-4">
                <HoverCard openDelay={200} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <button
                      type="button"
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
                    >
                      <Avatar className="h-14 w-14 shrink-0">
                        {o.headshot_url && (
                          <AvatarImage
                            src={ensureUrl(o.headshot_url)}
                            alt={o.display_name}
                          />
                        )}
                        <AvatarFallback className="bg-primary/20 text-primary/60">
                          <Users className="h-7 w-7" />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64" align="start">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{o.display_name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {o.role}
                      </p>
                      {(o.major || o.year) && (
                        <p className="text-xs text-muted-foreground">
                          {[o.major, o.year].filter(Boolean).join(" · ")}
                        </p>
                      )}
                      {o.bio && (
                        <p className="text-sm leading-relaxed">{o.bio}</p>
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{o.display_name}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {o.role}
                  </p>
                  {(o.major || o.year) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {[o.major, o.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {o.bio && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {o.bio}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
