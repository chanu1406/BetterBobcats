"use client";

import { useState, useEffect } from "react";
import DegreesHeader from "./components/DegreesHeader";
import DegreesSidebar from "./components/DegreesSidebar";
import DegreesContent from "./components/DegreesContent";

/**
 * Degrees Listing Page Component
 * Displays all available degree programs at UC Merced
 * Located at: src/app/degrees/page.tsx
 * URL: http://localhost:3000/degrees
 */
export default function DegreesPage() {
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null);

  // Debug: Log state changes
  useEffect(() => {
    console.log("📊 State updated:", { selectedDegree, selectedCareerPath });
  }, [selectedDegree, selectedCareerPath]);

  const handleDegreeSelect = (degree: string) => {
    console.log("🏫 handleDegreeSelect called:", degree, "current:", selectedDegree);
    setSelectedDegree(degree);
    // Only reset career path when selecting a DIFFERENT degree
    if (degree !== selectedDegree) {
      setSelectedCareerPath(null);
    }
  };

  const handleCareerPathSelect = (careerPath: string) => {
    console.log("🎓 handleCareerPathSelect called:", careerPath, "current:", selectedCareerPath);
    setSelectedCareerPath(careerPath);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <DegreesHeader />
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
