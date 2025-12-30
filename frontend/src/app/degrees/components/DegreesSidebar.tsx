"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

/**
 * DegreesSidebar Component
 * Left sidebar navigation with list of degree programs
 * Used on: Degrees page
 */
interface DegreesSidebarProps {
  selectedDegree: string | null;
  selectedCareerPath: string | null;
  onDegreeSelect: (degree: string) => void;
  onCareerPathSelect: (careerPath: string) => void;
}

export default function DegreesSidebar({ 
  selectedDegree, 
  selectedCareerPath,
  onDegreeSelect, 
  onCareerPathSelect 
}: DegreesSidebarProps) {
  const [expandedDegrees, setExpandedDegrees] = useState<Set<string>>(new Set());
  
  const degrees = [
    "CS/CSE",
  ];

  const careerPaths: Record<string, { id: string; name: string }[]> = {
    "CS/CSE": [
      { id: "resumes", name: "Resumes" },
      { id: "alumni", name: "Alumni" },
      { id: "swe", name: "SWE (Generalist)" },
      { id: "cybersecurity", name: "Cybersecurity" },
      { id: "ml-ai", name: "Machine Learning / AI" },
      { id: "data-science", name: "Data Science / Data Analytics" },
      { id: "systems", name: "Systems / Infrastructure Engineering Pathway" },
      { id: "embedded", name: "Embedded Systems Engineering Pathway" },
    ],
  };

  // Separate non-career items from career paths
  const getNonCareerItems = (degree: string) => {
    return careerPaths[degree]?.filter(item => item.id === "resumes" || item.id === "alumni") || [];
  };

  const getCareerPathItems = (degree: string) => {
    return careerPaths[degree]?.filter(item => item.id !== "resumes" && item.id !== "alumni") || [];
  };

  const toggleDegree = (degree: string) => {
    const newExpanded = new Set(expandedDegrees);
    if (newExpanded.has(degree)) {
      newExpanded.delete(degree);
    } else {
      newExpanded.add(degree);
      onDegreeSelect(degree);
    }
    setExpandedDegrees(newExpanded);
  };

  const handleDegreeClick = (degree: string) => {
    toggleDegree(degree);
  };

  const isExpanded = (degree: string) => expandedDegrees.has(degree);
  const hasCareerPaths = (degree: string) => careerPaths[degree] && careerPaths[degree].length > 0;

  return (
    <aside className="w-72 border-r bg-background/50 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-2">
        <nav className="space-y-1">
          {degrees.map((degree) => {
            const expanded = isExpanded(degree);
            const hasPaths = hasCareerPaths(degree);
            const isSelected = selectedDegree === degree;

            return (
              <div key={degree} className="space-y-1">
                {/* Degree Button */}
                <button
                  onClick={() => handleDegreeClick(degree)}
                  className={`w-full text-left px-4 py-3 transition-colors border border-border/50 rounded-md font-sans font-semibold tracking-tight flex items-center justify-between ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "hover:bg-primary/10 hover:border-primary/30"
                  }`}
                >
                  <span className={isSelected ? "" : "bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"}>
                    {degree}
                  </span>
                  {hasPaths && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform flex-shrink-0 ${
                        expanded ? "rotate-90" : ""
                      } ${isSelected ? "text-primary-foreground" : "text-primary/60"}`}
                    />
                  )}
                </button>

                {/* Dropdown Items */}
                {hasPaths && expanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary/20 pl-2">
                    {/* Non-Career Items (Resumes, Alumni) */}
                    {getNonCareerItems(degree).map((item) => {
                      const isItemSelected = selectedCareerPath === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onCareerPathSelect(item.id);
                          }}
                          className={`w-full text-left px-4 py-2.5 transition-colors border border-border/50 rounded-md font-sans font-medium tracking-tight text-sm ${
                            isItemSelected
                              ? "bg-primary/20 text-primary border-primary/50 shadow-sm"
                              : "hover:bg-primary/5 hover:border-primary/20 text-muted-foreground"
                          }`}
                        >
                          <span className={isItemSelected ? "text-primary font-semibold" : ""}>
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                    
                    {/* Divider between non-career items and career paths */}
                    {getNonCareerItems(degree).length > 0 && getCareerPathItems(degree).length > 0 && (
                      <div className="my-2 border-t border-border/30"></div>
                    )}
                    
                    {/* Career Paths */}
                    {getCareerPathItems(degree).map((careerPath) => {
                      const isCareerSelected = selectedCareerPath === careerPath.id;
                      return (
                        <button
                          key={careerPath.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onCareerPathSelect(careerPath.id);
                          }}
                          className={`w-full text-left px-4 py-2.5 transition-colors border border-border/50 rounded-md font-sans font-medium tracking-tight text-sm ${
                            isCareerSelected
                              ? "bg-primary/20 text-primary border-primary/50 shadow-sm"
                              : "hover:bg-primary/5 hover:border-primary/20 text-muted-foreground"
                          }`}
                        >
                          <span className={isCareerSelected ? "text-primary font-semibold" : ""}>
                            {careerPath.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

