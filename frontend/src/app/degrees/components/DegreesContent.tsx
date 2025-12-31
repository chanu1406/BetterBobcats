/**
 * DegreesContent Component
 * Main content area showing welcome message or selected degree content
 * Used on: Degrees page
 */
"use client";

import { useState, useRef, useEffect } from "react";
import PrerequisiteGraph from "../cs-cse/components/PrerequisiteGraph";
import GraphLegend from "../cs-cse/components/GraphLegend";
import CareerPathGraph from "../cs-cse/careers/swe/components/CareerPathGraph";
import CybersecurityCareerPathGraph from "../cs-cse/careers/cybersecurity/components/CareerPathGraph";
import MLAICareerPathGraph from "../cs-cse/careers/ml-ai/components/CareerPathGraph";
import DataScienceCareerPathGraph from "../cs-cse/careers/datascience/components/CareerPathGraph";

interface DegreesContentProps {
  selectedDegree: string | null;
  selectedCareerPath: string | null;
}

export default function DegreesContent({ selectedDegree, selectedCareerPath }: DegreesContentProps) {
  const [useFormattedLayout, setUseFormattedLayout] = useState(false);
  
  // Use refs to store reset handlers - no state updates during render
  const resetPrerequisiteGraphRef = useRef<(() => void) | null>(null);
  const fullResetPrerequisiteGraphRef = useRef<(() => void) | null>(null);
  
  // Separate reset handler for career path graphs (SWE, etc.)
  const resetCareerPathGraphRef = useRef<(() => void) | null>(null);
  const formatCareerPathGraphRef = useRef<(() => void) | null>(null);
  
  // Cybersecurity graph handlers
  const resetCybersecurityGraphRef = useRef<(() => void) | null>(null);
  const formatCybersecurityGraphRef = useRef<(() => void) | null>(null);
  
  // ML-AI graph handlers
  const resetMLAIGraphRef = useRef<(() => void) | null>(null);
  const formatMLAIGraphRef = useRef<(() => void) | null>(null);
  
  // Data Science graph handlers
  const resetDataScienceGraphRef = useRef<(() => void) | null>(null);
  const formatDataScienceGraphRef = useRef<(() => void) | null>(null);
  
  // State to track when handlers are ready (updated in useEffect to avoid render-time updates)
  const [resetPrerequisiteReady, setResetPrerequisiteReady] = useState(false);
  const [fullResetPrerequisiteReady, setFullResetPrerequisiteReady] = useState(false);
  const [resetCareerPathReady, setResetCareerPathReady] = useState(false);
  const [formatCareerPathReady, setFormatCareerPathReady] = useState(false);
  const [resetCybersecurityReady, setResetCybersecurityReady] = useState(false);
  const [formatCybersecurityReady, setFormatCybersecurityReady] = useState(false);
  const [resetMLAIReady, setResetMLAIReady] = useState(false);
  const [formatMLAIReady, setFormatMLAIReady] = useState(false);
  const [resetDataScienceReady, setResetDataScienceReady] = useState(false);
  const [formatDataScienceReady, setFormatDataScienceReady] = useState(false);
  
  // Callbacks to register reset handlers from child components
  const handleResetPrerequisiteReady = useRef((handler: () => void) => {
    resetPrerequisiteGraphRef.current = handler;
    // Update state after render completes to avoid render-time update
    requestAnimationFrame(() => {
      setResetPrerequisiteReady(true);
    });
  });
  
  const handleFullResetPrerequisiteReady = useRef((handler: () => void) => {
    fullResetPrerequisiteGraphRef.current = handler;
    // Update state after render completes to avoid render-time update
    requestAnimationFrame(() => {
      setFullResetPrerequisiteReady(true);
    });
  });

  const handleResetCareerPathReady = useRef((handler: () => void) => {
    resetCareerPathGraphRef.current = handler;
    // Update state after render completes to avoid render-time update
    requestAnimationFrame(() => {
      setResetCareerPathReady(true);
    });
  });

  const handleFormatCareerPathReady = useRef((handler: () => void) => {
    formatCareerPathGraphRef.current = handler;
    // Update state after render completes to avoid render-time update
    requestAnimationFrame(() => {
      setFormatCareerPathReady(true);
    });
  });

  const handleResetCybersecurityReady = useRef((handler: () => void) => {
    resetCybersecurityGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetCybersecurityReady(true);
    });
  });

  const handleFormatCybersecurityReady = useRef((handler: () => void) => {
    formatCybersecurityGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatCybersecurityReady(true);
    });
  });

  const handleResetMLAIReady = useRef((handler: () => void) => {
    resetMLAIGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetMLAIReady(true);
    });
  });

  const handleFormatMLAIReady = useRef((handler: () => void) => {
    formatMLAIGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatMLAIReady(true);
    });
  });

  const handleResetDataScienceReady = useRef((handler: () => void) => {
    resetDataScienceGraphRef.current = handler;
    requestAnimationFrame(() => {
      setResetDataScienceReady(true);
    });
  });

  const handleFormatDataScienceReady = useRef((handler: () => void) => {
    formatDataScienceGraphRef.current = handler;
    requestAnimationFrame(() => {
      setFormatDataScienceReady(true);
    });
  });

  // Reset readiness flags when switching between pages
  useEffect(() => {
    if (!selectedCareerPath && !selectedDegree) {
      setResetPrerequisiteReady(false);
      setFullResetPrerequisiteReady(false);
      setResetCareerPathReady(false);
      setFormatCareerPathReady(false);
      setResetCybersecurityReady(false);
      setFormatCybersecurityReady(false);
      setResetMLAIReady(false);
      setFormatMLAIReady(false);
      setResetDataScienceReady(false);
      setFormatDataScienceReady(false);
      resetPrerequisiteGraphRef.current = null;
      fullResetPrerequisiteGraphRef.current = null;
      resetCareerPathGraphRef.current = null;
      formatCareerPathGraphRef.current = null;
      resetCybersecurityGraphRef.current = null;
      formatCybersecurityGraphRef.current = null;
      resetMLAIGraphRef.current = null;
      formatMLAIGraphRef.current = null;
      resetDataScienceGraphRef.current = null;
      formatDataScienceGraphRef.current = null;
    }
  }, [selectedCareerPath, selectedDegree]);

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
      cybersecurity: "Cybersecurity professionals protect systems, networks, and data from threats and attacks. This career path focuses on understanding security principles, cryptography, network defense, system vulnerabilities, and secure coding practices. Roles include Security Engineer, SOC Analyst, Penetration Tester, and Security Architect.",
      "ml-ai": "Machine Learning and AI professionals design systems that learn from data to make predictions, automate decisions, and solve complex problems. This career path focuses on understanding algorithms, statistical modeling, data processing, neural networks, and optimization techniques. It also emphasizes ethical AI, model evaluation, and deploying intelligent systems at scale. Roles include Machine Learning Engineer, Data Scientist, AI Researcher, and Applied AI Engineer.",
      "data-science": "Data Scientists and Data Analysts transform raw data into actionable insights that drive business decisions. This career path combines programming (Python/R), statistics, mathematics, and domain expertise to clean, analyze, visualize, and model data. Core skills include SQL, statistical inference, machine learning, and data storytelling. Roles include Data Scientist, Data Analyst, Business Intelligence Engineer, and Analytics Engineer.",
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

    // Show SWE career path with graph
    if (selectedCareerPath === "swe") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
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
            
            {/* Reset and Format buttons for career path graph - separate from CS/CSE reset */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatCareerPathReady && formatCareerPathGraphRef.current) {
                    formatCareerPathGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatCareerPathReady && formatCareerPathGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatCareerPathReady && formatCareerPathGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetCareerPathReady && resetCareerPathGraphRef.current) {
                    resetCareerPathGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetCareerPathReady && resetCareerPathGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetCareerPathReady && resetCareerPathGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <CareerPathGraph 
                onResetReady={handleResetCareerPathReady.current}
                onFormatReady={handleFormatCareerPathReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show Cybersecurity career path with graph
    if (selectedCareerPath === "cybersecurity") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
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
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatCybersecurityReady && formatCybersecurityGraphRef.current) {
                    formatCybersecurityGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatCybersecurityReady && formatCybersecurityGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatCybersecurityReady && formatCybersecurityGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetCybersecurityReady && resetCybersecurityGraphRef.current) {
                    resetCybersecurityGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetCybersecurityReady && resetCybersecurityGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetCybersecurityReady && resetCybersecurityGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <CybersecurityCareerPathGraph 
                onResetReady={handleResetCybersecurityReady.current}
                onFormatReady={handleFormatCybersecurityReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show ML-AI career path with graph
    if (selectedCareerPath === "ml-ai") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
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
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatMLAIReady && formatMLAIGraphRef.current) {
                    formatMLAIGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatMLAIReady && formatMLAIGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatMLAIReady && formatMLAIGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetMLAIReady && resetMLAIGraphRef.current) {
                    resetMLAIGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetMLAIReady && resetMLAIGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetMLAIReady && resetMLAIGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <MLAICareerPathGraph 
                onResetReady={handleResetMLAIReady.current}
                onFormatReady={handleFormatMLAIReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Show Data Science career path with graph
    if (selectedCareerPath === "data-science") {
      return (
        <div className="flex-1 p-8 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
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
            
            {/* Format and Reset buttons */}
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  if (formatDataScienceReady && formatDataScienceGraphRef.current) {
                    formatDataScienceGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  formatDataScienceReady && formatDataScienceGraphRef.current
                    ? "text-primary hover:text-primary/80 border-primary/20 hover:border-primary/40 cursor-pointer bg-primary/5 hover:bg-primary/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={formatDataScienceReady && formatDataScienceGraphRef.current ? "Format graph to prevent overlap" : "Waiting for format handler..."}
              >
                Format Graph
              </button>
              <button
                onClick={() => {
                  if (resetDataScienceReady && resetDataScienceGraphRef.current) {
                    resetDataScienceGraphRef.current();
                  }
                }}
                className={`text-sm transition-colors font-medium px-4 py-2 rounded-md border ${
                  resetDataScienceReady && resetDataScienceGraphRef.current
                    ? "text-destructive hover:text-destructive/80 border-destructive/20 hover:border-destructive/40 cursor-pointer bg-destructive/5 hover:bg-destructive/10"
                    : "text-muted-foreground/50 border-muted-foreground/20 cursor-not-allowed opacity-50"
                }`}
                title={resetDataScienceReady && resetDataScienceGraphRef.current ? "Reset career path graph view" : "Waiting for reset handler..."}
              >
                Reset Graph
              </button>
            </div>
            
            <div className="mb-10">
              <DataScienceCareerPathGraph 
                onResetReady={handleResetDataScienceReady.current}
                onFormatReady={handleFormatDataScienceReady.current}
              />
            </div>
          </div>
        </div>
      );
    }

    // Default career path view (for other careers)
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

          <div className="bg-card border-2 border-primary/20 rounded-xl p-8 shadow-lg">
            <p className="text-lg text-muted-foreground text-center py-8">
              Career path content for <span className="font-semibold text-primary">{careerPathNames[selectedCareerPath]}</span> coming soon...
            </p>
          </div>
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
              onResetClick={resetPrerequisiteReady ? resetPrerequisiteGraphRef.current || undefined : undefined}
              onFullResetClick={fullResetPrerequisiteReady ? fullResetPrerequisiteGraphRef.current || undefined : undefined}
            />
          </div>
          <div className="mb-10">
            <PrerequisiteGraph 
              useFormattedLayoutExternal={useFormattedLayout}
              onLayoutChange={setUseFormattedLayout}
              onResetReady={handleResetPrerequisiteReady.current}
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

