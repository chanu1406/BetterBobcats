/**
 * FeaturesSection Component
 * Displays the main features of the BetterBobcats platform
 */
export default function FeaturesSection() {
  const features = [
    {
      title: "Explore Degrees",
      description: "Browse all UC Merced degree programs with detailed information about requirements and courses",
      icon: "🎓",
    },
    {
      title: "Career Paths",
      description: "Discover career opportunities and see how different majors connect to various professions",
      icon: "💼",
    },
    {
      title: "Academic Roadmaps",
      description: "Create personalized academic roadmaps to plan your journey through your degree program",
      icon: "🗺️",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">
          Everything You Need to Succeed
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          BetterBobcats provides all the tools UC Merced students need to make informed decisions about their academic future
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border-2 border-primary/20 rounded-lg hover:border-primary/40 hover:shadow-lg transition-all bg-card hover:bg-primary/5"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

