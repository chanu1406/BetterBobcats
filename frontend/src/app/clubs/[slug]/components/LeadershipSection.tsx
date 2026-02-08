"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { ensureUrl } from "../lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

export function LeadershipSection({ club, hasProfile }: Props) {
  if (!hasProfile || !club.officers || club.officers.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">No leadership information available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Leadership
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {club.officers.map((o) => (
            <Card key={o.id} className="overflow-hidden">
              <CardContent className="p-4 flex gap-4">
                <Avatar className="h-14 w-14 shrink-0">
                  {o.headshot_url && (
                    <AvatarImage
                      src={ensureUrl(o.headshot_url)}
                      alt=""
                    />
                  )}
                  <AvatarFallback className="bg-primary/20 text-primary/60">
                    <Users className="h-7 w-7" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{o.display_name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{o.role}</p>
                  {(o.major || o.year) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {[o.major, o.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {o.bio && (
                    <p className="text-sm text-muted-foreground mt-2">{o.bio}</p>
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
