"use client";

import { useEffect, useRef, useState } from "react";
import { JoinCTA } from "./JoinCTA";
import type { ClubWithProfile } from "@/lib/clubs";

type Props = {
  club: ClubWithProfile;
  hasProfile: boolean;
  recruitingClosed: boolean;
  onSwitchToJoin: () => void;
  heroRef: React.RefObject<HTMLElement | null>;
};

export function StickyActionBar({
  club,
  hasProfile,
  recruitingClosed,
  onSwitchToJoin,
  heroRef,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [heroRef]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur border-t border-border sm:hidden"
      role="complementary"
      aria-label="Quick actions"
    >
      <JoinCTA
        club={club}
        hasProfile={hasProfile}
        recruitingClosed={recruitingClosed}
        onSwitchToJoin={onSwitchToJoin}
      />
    </div>
  );
}
