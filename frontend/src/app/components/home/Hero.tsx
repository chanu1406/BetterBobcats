"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

const SPARKLE_POSITIONS = [
  { top: "12%", right: "18%", size: 12 },
  { top: "25%", right: "8%", size: 10 },
  { top: "8%", right: "28%", size: 8 },
  { bottom: "35%", left: "12%", size: 10 },
  { bottom: "22%", left: "6%", size: 12 },
  { bottom: "45%", left: "20%", size: 8 },
];

function Sparkles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {SPARKLE_POSITIONS.map((pos, i) => (
        <span
          key={i}
          className="absolute text-foreground/10"
          style={{
            ...(pos.top && { top: pos.top }),
            ...(pos.bottom && { bottom: pos.bottom }),
            ...(pos.left && { left: pos.left }),
            ...(pos.right && { right: pos.right }),
            width: pos.size,
            height: pos.size,
          }}
        >
          <Plus className="h-full w-full" strokeWidth={2} />
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-16 md:min-h-[95vh] md:pt-24 md:pb-24"
      aria-label="Hero"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(165deg, hsl(var(--background)) 0%, hsl(210 30% 98%) 40%, hsl(45 60% 97%) 70%, hsl(var(--accent) / 0.06) 100%)",
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <Sparkles />

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
          <span className="text-foreground">BetterBobcats</span>{" "}
          <span className="text-muted-foreground">-</span>{" "}
          <span className="text-foreground">Your Academic Hub for</span>{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            UC Merced
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground sm:text-lg md:mb-10 md:max-w-xl md:text-xl">
          Built for how students actually plan. BetterBobcats removes friction
          from degree exploration, clubs, and events with one clear dashboard.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/degrees"
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-md transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Explore Degrees
          </Link>
          <Link
            href="/clubs"
            className="inline-flex items-center justify-center rounded-full border-2 border-border bg-background/80 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-muted/50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Browse Clubs
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-full border-2 border-border bg-background/80 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-muted/50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Browse Events
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-10 w-full max-w-6xl md:mt-14">
        <DashboardPreview />
      </div>
    </section>
  );
}
