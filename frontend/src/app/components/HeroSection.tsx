/**
 * HeroSection Component
 * The main banner/hero section at the top of the homepage
 */
export default function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/20 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/10"></div>
      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
          Welcome to BetterBobcats
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          Explore UC Merced degree programs, discover career paths, and create your personalized academic roadmap
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
            Explore Degrees
          </button>
          <button className="px-8 py-3 border-2 border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

