"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  DEGREE_ORDER,
  careerPathMatches,
  getCareerPathsForDegree,
} from "../career-paths.config";

/**
 * DegreesSidebar Component
 * Left sidebar navigation with list of degree programs
 * Used on: Degrees page
 * Updated: 2026-01-14
 */
interface DegreesSidebarProps {
  selectedDegree: string | null;
  selectedCareerPath: string | null;
  onDegreeSelect: (degree: string) => void;
  onCareerPathSelect: (careerPath: string) => void;
  /** Callback after user selects a degree/career (e.g. to close mobile drawer) */
  onSelectionMade?: () => void;
}

export default function DegreesSidebar({
  selectedDegree,
  selectedCareerPath,
  onDegreeSelect,
  onCareerPathSelect,
  onSelectionMade,
}: DegreesSidebarProps) {
  const [expandedDegrees, setExpandedDegrees] = useState<Set<string>>(new Set());
  const degrees = DEGREE_ORDER;

  // Separate non-career items from career paths
  const getNonCareerItems = (degree: string) => {
    return getCareerPathsForDegree(degree).filter((item) => item.section === "resource");
  };

  const getCareerPathItems = (degree: string) => {
    return getCareerPathsForDegree(degree).filter((item) => item.section === "career");
  };

  const toggleDegree = (degree: string) => {
    const newExpanded = new Set(expandedDegrees);
    if (newExpanded.has(degree)) {
      newExpanded.delete(degree);
    } else {
      newExpanded.add(degree);
      onDegreeSelect(degree);
      onSelectionMade?.();
    }
    setExpandedDegrees(newExpanded);
  };

  const handleDegreeClick = (degree: string) => {
    toggleDegree(degree);
  };

  const isExpanded = (degree: string) => expandedDegrees.has(degree);
  const hasCareerPaths = (degree: string) => getCareerPathsForDegree(degree).length > 0;

  return (
    <aside className="flex-shrink-0 w-72 border-r-2 border-border bg-muted/40 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto z-10">
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
                      const isItemSelected = careerPathMatches(item, selectedCareerPath);
                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onCareerPathSelect(item.sidebarId || item.id);
                            onSelectionMade?.();
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
                      const isCareerSelected = careerPathMatches(careerPath, selectedCareerPath);
                      return (
                        <button
                          key={careerPath.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDegreeSelect(degree);
                            onCareerPathSelect(careerPath.sidebarId || careerPath.id);
                            onSelectionMade?.();
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
