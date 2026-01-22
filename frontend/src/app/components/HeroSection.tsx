/**
 * HeroSection Component
 * The main banner/hero section at the top of the homepage
 */
export default function HeroSection() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center px-4 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-foreground">Welcome to</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            BetterBobcats
          </span>
        </h1>
        
        {/* Description */}
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
          Explore UC Merced degree programs, discover career paths, and create your personalized academic roadmap
        </p>
        
        {/* Sub-description */}
        <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
          Your comprehensive platform for academic planning, student organizations, and campus events at UC Merced
        </p>
      </div>
    </section>
  );
}

