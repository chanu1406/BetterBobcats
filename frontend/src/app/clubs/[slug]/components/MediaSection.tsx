"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { ensureUrl, getVideoEmbedUrl } from "../lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

export function MediaSection({ club, hasProfile }: Props) {
  const profile = club.profile;

  const hasGallery = hasProfile && club.media && club.media.length > 0;
  const hasIntroVideo = hasProfile && profile?.intro_video_url;

  if (!hasGallery && !hasIntroVideo) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">No media available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {hasGallery && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {club.media!.map((m) => {
                  const mediaUrl = ensureUrl(m.url);
                  if (!mediaUrl) return null;
                  return (
                    <div
                      key={m.id}
                      className="aspect-video rounded-lg overflow-hidden bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mediaUrl}
                        alt={m.caption || ""}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "";
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {hasIntroVideo && (() => {
            const videoUrl = ensureUrl(profile!.intro_video_url!);
            const embedUrl = getVideoEmbedUrl(videoUrl);
            return (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Intro video
                </h3>
                {embedUrl ? (
                  <div className="aspect-video w-full max-w-2xl rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src={embedUrl}
                      title="Club intro video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Watch intro video
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            );
          })()}
        </div>
      </CardContent>
    </Card>
  );
}
