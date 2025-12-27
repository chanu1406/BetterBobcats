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
            <h2 className="text-xl font-bold">BetterBobcats</h2>
            <span className="text-xs text-muted-foreground">UC Merced</span>
          </div>
          <div className="flex gap-6 items-center">
            <a
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Degrees
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Careers
            </a>
            <a
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </a>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

