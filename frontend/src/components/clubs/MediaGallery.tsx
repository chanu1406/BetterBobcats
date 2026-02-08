"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { ensureUrl, getVideoEmbedUrl } from "@/app/clubs/[slug]/lib/utils";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
};

export function MediaGallery({ club, hasProfile }: Props) {
  const profile = club.profile;
  const hasGallery = hasProfile && club.media && club.media.length > 0;
  const hasIntroVideo = hasProfile && profile?.intro_video_url;

  if (!hasGallery && !hasIntroVideo) {
    return (
      <Card className="rounded-xl">
        <CardContent className="pt-6">
          <div
            className="flex flex-col items-center justify-center py-12 px-4 rounded-xl bg-muted/30"
            role="status"
          >
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground/50"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              No media available
            </p>
            <p className="text-sm text-muted-foreground text-center">
              This club has not added any photos or videos yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {hasGallery && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">
                Gallery
              </h3>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 sm:-ml-4">
                  {club.media!.map((m) => {
                    const mediaUrl = ensureUrl(m.url);
                    if (!mediaUrl) return null;
                    return (
                      <CarouselItem
                        key={m.id}
                        className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                      >
                        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
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
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex -left-2" />
                <CarouselNext className="hidden sm:flex -right-2" />
              </Carousel>
            </div>
          )}
          {hasIntroVideo && (() => {
            const videoUrl = ensureUrl(profile!.intro_video_url!);
            const embedUrl = getVideoEmbedUrl(videoUrl);
            return (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
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
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
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
