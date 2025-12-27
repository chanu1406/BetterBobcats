import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";

/**
 * Home Page Component
 * The landing page that users see when they visit the website
 * Located at: src/app/page.tsx
 * URL: http://localhost:3000/
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
