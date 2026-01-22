"use client";

import { useState } from "react";
import DegreesSidebar from "./components/DegreesSidebar";
import DegreesContent from "./components/DegreesContent";

/**
 * Degrees Listing Page Component
 * Displays all available degree programs at UC Merced
 * Located at: src/app/degrees/page.tsx
 * URL: http://localhost:3000/degrees
 * 
 * Navigation is handled by ConditionalNavigation in the root layout
 */
export default function DegreesPage() {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null);

  const handleDegreeSelect = (degree: string) => {
    setSelectedDegree(degree);
    // Only reset career path when selecting a DIFFERENT degree
    if (degree !== selectedDegree) {
      setSelectedCareerPath(null);
    }
  };

  const handleCareerPathSelect = (careerPath: string) => {
    setSelectedCareerPath(careerPath);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <DegreesSidebar 
          selectedDegree={selectedDegree}
          selectedCareerPath={selectedCareerPath}
          onDegreeSelect={handleDegreeSelect}
          onCareerPathSelect={handleCareerPathSelect}
        />
        <DegreesContent 
          key={`${selectedDegree}-${selectedCareerPath}`}
          selectedDegree={selectedDegree}
          selectedCareerPath={selectedCareerPath}
        />
      </div>
    </main>
  );
}
