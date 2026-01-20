import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";

/**
 * Home Page Component
 * The landing page that users see when they visit the website
 * Located at: src/app/page.tsx
 * URL: http://localhost:3000/
 * 
 * This page provides comprehensive navigation for all platform functionality:
 * - Degrees exploration
 * - Career paths
 * - Student clubs
 * - Events
 * - Dashboard access (for logged-in users)
 * 
 * Navigation is handled by ConditionalNavigation in the root layout
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}
