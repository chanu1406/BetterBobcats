import Link from "next/link";
import { GraduationCap, Users, Calendar, ArrowRight } from "lucide-react";

/**
 * FeaturesSection Component
 * Displays the main features of the BetterBobcats platform
 */
export default function FeaturesSection() {
  const features = [
    {
      title: "Degrees",
      description: "Explore all UC Merced degree programs with detailed course requirements, prerequisites, and career pathways",
      icon: GraduationCap,
      href: "/degrees",
      color: "from-blue-500 to-blue-600",
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

  return (
    <section className="py-24 px-4 bg-background relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Everything You Need to</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            BetterBobcats provides all the tools UC Merced students need to make informed decisions about their academic future and campus involvement
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                href={feature.href}
                className="group relative p-8 rounded-2xl border-2 border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Organization CTA */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-lg text-muted-foreground mb-4">
            Want to add your organization?
          </p>
          <Link
            href="/clubs/request"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Add it here
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

