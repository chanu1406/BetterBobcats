import Link from "next/link";

/**
 * HeroSection Component
 * The main banner/hero section at the top of the homepage
 */
export default function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 bg-gradient-to-br from-primary/12 via-primary/6 to-accent/22 relative overflow-hidden">
      {/* Logo - top left */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src="/BetterBobcatsLogo.svg" 
          alt="BetterBobcats Logo"
          className="h-20 w-auto"
        />
      </div>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/6 via-transparent to-accent/12"></div>
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
          Welcome to BetterBobcats
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Explore UC Merced degree programs, discover career paths, and create your personalized academic roadmap
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            href="/degrees"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl inline-block"
          >
            Explore Degrees
          </Link>
          <Link 
            href="/clubs"
            className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-lg hover:shadow-xl inline-block"
          >
            Student Clubs
          </Link>
        </div>
      </div>
    </section>
  );
}

