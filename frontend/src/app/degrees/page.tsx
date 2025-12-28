"use client";

import { useState } from "react";
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

  return (
    <main className="min-h-screen flex flex-col">
      <DegreesHeader />
      <div className="flex flex-1">
        <DegreesSidebar 
          selectedDegree={selectedDegree}
          onDegreeSelect={setSelectedDegree}
        />
        <DegreesContent selectedDegree={selectedDegree} />
      </div>
    </main>
  );
}
