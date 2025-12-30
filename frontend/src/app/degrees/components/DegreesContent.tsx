/**
 * DegreesContent Component
 * Main content area showing welcome message or selected degree content
 * Used on: Degrees page
 */
"use client";

import { useState, useRef, useEffect } from "react";
import PrerequisiteGraph from "../cs-cse/components/PrerequisiteGraph";
import GraphLegend from "../cs-cse/components/GraphLegend";
import CareerPathGraph from "./CareerPathGraph";
import { sweCareerPathConfig } from "../careers/swe/data/careerPathConfig";

interface DegreesContentProps {
  selectedDegree: string | null;
  selectedCareerPath: string | null;
}

export default function DegreesContent({ selectedDegree, selectedCareerPath }: DegreesContentProps) {
  const [useFormattedLayout, setUseFormattedLayout] = useState(false);
  const [resetPrerequisiteGraph, setResetPrerequisiteGraph] = useState<(() => void) | null>(null);
  const [resetCareerPathGraph, setResetCareerPathGraph] = useState<(() => void) | null>(null);
  const [fullResetPrerequisiteGraph, setFullResetPrerequisiteGraph] = useState<(() => void) | null>(null);
  const [fullResetCareerPathGraph, setFullResetCareerPathGraph] = useState<(() => void) | null>(null);
  
  // Wrapper functions to set handlers asynchronously to avoid render-time updates
  const handleFullResetPrerequisiteReady = useRef((handler: () => void) => {
    requestAnimationFrame(() => {
      setFullResetPrerequisiteGraph(() => handler);
    });
  });
  
  const handleFullResetCareerPathReady = useRef((handler: () => void) => {
    requestAnimationFrame(() => {
      setFullResetCareerPathGraph(() => handler);
    });
  });
  if (!selectedDegree) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-8">
              Welcome to the degree page
            </h2>
          </div>

          {/* How to Use This Page Section */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-6 text-center">
              How this page works
            </h3>
            <ul className="space-y-3 text-center max-w-2xl mx-auto">
              <li className="font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
                • Choose a degree from the left panel
              </li>
              <li className="font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
                • See recommended coursework, core skills, and career paths
              </li>
              <li className="font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
                • Learn what to do outside the classroom to stay competitive
              </li>
              <li className="font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight">
                • Get guidance earlier — not junior year
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Show career path content if selected
  if (selectedCareerPath) {
    const careerPathNames: Record<string, string> = {
      swe: "SWE (Generalist)",
      cybersecurity: "Cybersecurity",
      "ml-ai": "Machine Learning / AI",
      "data-science": "Data Science / Data Analytics",
      systems: "Systems / Infrastructure Engineering Pathway",
      embedded: "Embedded Systems Engineering Pathway",
      resumes: "Resumes",
      alumni: "Alumni",
    };

    // Get description for SWE (Generalist)
    const careerDescriptions: Record<string, string> = {
      swe: "Software Engineers (Generalists) build and maintain software systems across multiple areas of the stack. This role emphasizes strong fundamentals in programming, data structures, and system design, along with hands-on experience building real applications. It's a flexible path suited for students who want broad technical exposure and strong career mobility across industries.",
    };

    // Handle special sections (Resumes, Alumni)
    if (selectedCareerPath === "resumes") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Resumes - {selectedDegree}
              </h2>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Explore resume examples, templates, and best practices for CS/CSE students.
              </p>
            </div>
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 shadow-lg">
              <p className="text-lg text-muted-foreground text-center py-8">
                Resume resources and examples coming soon...
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (selectedCareerPath === "alumni") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
                Alumni - {selectedDegree}
              </h2>
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                Connect with CS/CSE alumni and learn about their career journeys and experiences.
              </p>
            </div>
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 shadow-lg">
              <p className="text-lg text-muted-foreground text-center py-8">
                Alumni profiles and stories coming soon...
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
              {careerPathNames[selectedCareerPath]} - {selectedDegree}
            </h2>
            <p className="text-black mb-5">
              Career pathway information and recommended courses
            </p>
            {careerDescriptions[selectedCareerPath] && (
              <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
                {careerDescriptions[selectedCareerPath]}
              </p>
            )}
          </div>

          {selectedCareerPath === "swe" ? (
            <div className="mb-8">
              <GraphLegend 
                onFormatLayoutClick={() => setUseFormattedLayout(!useFormattedLayout)}
                useFormattedLayout={useFormattedLayout}
                onResetClick={resetCareerPathGraph || undefined}
                onFullResetClick={fullResetCareerPathGraph || undefined}
              />
            </div>
          ) : null}
          
          {selectedCareerPath === "swe" ? (
            <div className="mb-10">
              <CareerPathGraph 
                config={sweCareerPathConfig}
                useFormattedLayoutExternal={useFormattedLayout}
                onLayoutChange={setUseFormattedLayout}
                onResetReady={setResetCareerPathGraph}
                onFullResetReady={handleFullResetCareerPathReady.current}
              />
            </div>
          ) : (
            <div className="bg-card border-2 border-primary/20 rounded-xl p-8 shadow-lg">
              <p className="text-lg text-muted-foreground text-center py-8">
                Career path content for <span className="font-semibold text-primary">{careerPathNames[selectedCareerPath]}</span> coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show degree overview if degree selected but no career path
  // Show prerequisite graph for CS/CSE
  if (selectedDegree === "CS/CSE") {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-3">
              {selectedDegree}
            </h2>
            <p className="text-base text-black max-w-3xl mx-auto mb-5 leading-relaxed">
              Computer Science / Computer Science & Engineering (CS/CSE) is the study of how computational systems are designed, built, and used to solve real-world problems. The major combines strong foundations in programming, algorithms, mathematics, and systems with engineering principles to understand both software and hardware. Students learn to think analytically, design efficient solutions, and apply computing to areas such as data, artificial intelligence, networks, and technology-driven innovation.
            </p>
            <p className="text-black mb-5">
              Prerequisite graph showing course requirements and progression
            </p>
            <p className="text-base text-black max-w-3xl mx-auto mb-8 leading-relaxed">
              This page shows the full CS/CSE academic foundation at UC Merced. Use the graph below to understand how core math, science, and CS courses connect, what depends on what, and how early choices affect later flexibility.
            </p>
          </div>
          <div className="mb-8">
            <GraphLegend 
              onFormatLayoutClick={() => setUseFormattedLayout(!useFormattedLayout)}
              useFormattedLayout={useFormattedLayout}
              onResetClick={resetPrerequisiteGraph || undefined}
              onFullResetClick={fullResetPrerequisiteGraph || undefined}
            />
          </div>
          <div className="mb-10">
            <PrerequisiteGraph 
              useFormattedLayoutExternal={useFormattedLayout}
              onLayoutChange={setUseFormattedLayout}
              onResetReady={setResetPrerequisiteGraph}
              onFullResetReady={handleFullResetPrerequisiteReady.current}
            />
          </div>
          
          {/* CS/CSE Alumni Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-8 text-center">
              CS/CSE Alumni
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                    <div className="h-3 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view for other degrees
  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-2">
            {selectedDegree}
          </h2>
          <p className="text-muted-foreground">
            Select a career path from the sidebar to explore recommended courses and career guidance.
          </p>
        </div>
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
          <p className="text-xl font-sans font-semibold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent tracking-tight mb-4">
            Choose a Career Path
          </p>
          <p className="text-sm text-muted-foreground">
            Expand {selectedDegree} in the sidebar and select a career path to get started
          </p>
        </div>
      </div>
    </div>
  );
}

