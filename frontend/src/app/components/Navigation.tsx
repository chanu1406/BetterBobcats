import Link from "next/link";
import Image from "next/image";

/**
 * Navigation Component
 * Header navigation bar for the homepage
 */
export default function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/BetterBobcatsLogo.svg"
                alt="BetterBobcats Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <h2 className="text-xl font-bold">BetterBobcats</h2>
            </Link>
          </div>
          <div className="flex gap-6 items-center">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/degrees"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Degrees
            </Link>
            <Link
              href="/clubs"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Clubs
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Events
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

