"use client";

import Link from "next/link";

/**
 * DegreesHeader Component
 * Header section with logo and "Degrees @ UCM" title
 * Used on: Degrees page
 */
export default function DegreesHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Left: Degrees label + Logo */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">Degrees</span>
            <Link 
              href="/"
              className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer"
              aria-label="Navigate to home page"
            >
              <img 
                src="/BetterBobcatsLogo.svg" 
                alt="BetterBobcats Logo"
                className="h-6 w-6"
              />
            </Link>
          </div>
          
          {/* Center: Degrees @ UCM title */}
          <div className="flex-1 text-center">
            <h1 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">Degrees @ UCM</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

