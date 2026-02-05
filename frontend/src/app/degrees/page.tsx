"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import DegreesSidebar from "./components/DegreesSidebar";
import DegreesContent from "./components/DegreesContent";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleDegreeSelect = (degree: string) => {
    setSelectedDegree(degree);
    if (degree !== selectedDegree) {
      setSelectedCareerPath(null);
    }
  };

  const handleCareerPathSelect = (careerPath: string) => {
    setSelectedCareerPath(careerPath);
  };

  const sidebarProps = {
    selectedDegree,
    selectedCareerPath,
    onDegreeSelect: handleDegreeSelect,
    onCareerPathSelect: handleCareerPathSelect,
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-1 min-h-0 w-full overflow-x-auto">
        {/* Desktop: always-visible sidebar */}
        <div className="hidden md:block flex-shrink-0">
          <DegreesSidebar {...sidebarProps} />
        </div>
        {/* Mobile: open degree list in sheet */}
        <div className="md:hidden flex-shrink-0 p-2">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Menu className="h-4 w-4" />
                Degree list
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(320px,90vw)] p-0">
              <SheetTitle className="sr-only">Choose a degree</SheetTitle>
              <div className="h-full overflow-y-auto pt-14">
                <DegreesSidebar
                  {...sidebarProps}
                  onSelectionMade={() => setSheetOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex-1 min-w-0">
          <DegreesContent
            key={`${selectedDegree}-${selectedCareerPath}`}
            selectedDegree={selectedDegree}
            selectedCareerPath={selectedCareerPath}
          />
        </div>
      </div>
    </main>
  );
}
