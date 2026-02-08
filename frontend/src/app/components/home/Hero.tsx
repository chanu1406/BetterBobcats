"use client";

import Link from "next/link";
import { Plus, GraduationCap, UserCheck, Users, Calendar, ArrowRight } from "lucide-react";

const SPARKLE_POSITIONS = [
  { top: "12%", right: "18%", size: 12 },
  { top: "25%", right: "8%", size: 10 },
  { top: "8%", right: "28%", size: 8 },
  { bottom: "35%", left: "12%", size: 10 },
  { bottom: "22%", left: "6%", size: 12 },
  { bottom: "45%", left: "20%", size: 8 },
];

const FEATURES = [
  {
    title: "Degrees",
    description: "Explore all UC Merced degree programs with detailed course requirements, prerequisites, and career pathways",
    icon: GraduationCap,
    href: "/degrees",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Professors",
    description: "Browse professor ratings, reviews, and course difficulty to make informed decisions about your classes",
    icon: UserCheck,
    href: "/professors",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Student Clubs",
    description: "Discover and join student organizations that align with your interests, major, and career goals",
    icon: Users,
    href: "/clubs",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    title: "Events",
    description: "Stay connected with campus events, workshops, and activities happening around UC Merced",
    icon: Calendar,
    href: "/events",
    color: "from-green-500 to-green-600",
  },
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
      className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pt-20 pb-8 md:pt-24 md:pb-12"
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
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-foreground">BetterBobcats</span>{" "}
          <span className="text-muted-foreground">-</span>{" "}
          <span className="text-foreground">Your Academic Hub for</span>{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            UC Merced
          </span>
        </h1>

      </div>

      <div className="relative z-10 mt-6 w-full max-w-6xl md:mt-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-foreground">Everything you need</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            BetterBobcats provides all the tools UC Merced students need to make informed decisions about their academic future and campus involvement
          </p>
          <Link
            href="/clubs/request"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Add your organization
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                href={feature.href}
                className="group relative p-6 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
