/**
 * UX/UI Design & Research Career Path Page
 * Displays an interactive graph visualization of recommended courses
 */

"use client";

import { useState, useCallback } from "react";
import CareerPathGraph from "./components/CareerPathGraph";

export default function UXUICareerPathPage() {
  const [resetFn, setResetFn] = useState<(() => void) | null>(null);
  const [formatFn, setFormatFn] = useState<(() => void) | null>(null);

  const handleResetReady = useCallback((fn: () => void) => {
    setResetFn(() => fn);
  }, []);

  const handleFormatReady = useCallback((fn: () => void) => {
    setFormatFn(() => fn);
  }, []);

  const handleResetClick = () => {
    if (resetFn) {
      resetFn();
    }
  };

  const handleFormatClick = () => {
    if (formatFn) {
      formatFn();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            UX/UI Design & Research
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Create user-centered products and experiences that combine cognitive science, design thinking, and technical skills.
            This path prepares you for roles in UX design, UI design, UX research, and product design.
          </p>
        </div>

        {/* Control buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleResetClick}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md transition-colors text-sm font-medium"
          >
            Reset Graph
          </button>
          <button
            onClick={handleFormatClick}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors text-sm font-medium"
          >
            Auto-Format
          </button>
        </div>

        {/* Career Path Graph */}
        <CareerPathGraph onResetReady={handleResetReady} onFormatReady={handleFormatReady} />

        {/* Tier Explanations */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Understanding the Tiers</h2>
            <div className="space-y-6">
              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  🟢 TIER 1: MUST-TAKE (High-ROI)
                </h3>
                <p className="text-green-800 mb-3">
                  <strong>Foundational courses for any UI/UX career.</strong> These courses provide the core knowledge and skills needed to succeed in UX design and research roles.
                </p>
                <p className="text-sm text-green-700 italic">
                  Note: Some upper div CSE courses will be harder to enroll in as you WILL NEED to complete CSE prerequisites early on before graduation.
                </p>
              </div>

              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  🟡 TIER 2: STRONG BOOSTERS
                </h3>
                <p className="text-yellow-800">
                  <strong>Turn a generalist into a specialist.</strong> These courses make you a "UX-aware engineer" or a "Technical Product Designer". They add depth and specialization to your UX skillset.
                </p>
              </div>

              <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="text-lg font-bold text-orange-900 mb-2">
                  🟠 TIER 3: SPECIALIZED/ADJACENT
                </h3>
                <p className="text-orange-800">
                  <strong>Applied/Interest-Based depth.</strong> Specialized courses for niche roles like UX Writer, Voice Interface Designer, Product Engineer, or AI/ML Interface Designer.
                </p>
              </div>
            </div>
          </div>

          {/* Career Outcomes */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Career Outcomes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Target Roles</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• UX Designer</li>
                  <li>• UI Designer</li>
                  <li>• UX Researcher</li>
                  <li>• Product Designer</li>
                  <li>• Interaction Designer</li>
                  <li>• UX Writer / Content Designer</li>
                  <li>• Design Engineer / Product Engineer</li>
                </ul>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Key Skills Developed</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• User research & testing</li>
                  <li>• Interface design & prototyping</li>
                  <li>• Cognitive psychology applications</li>
                  <li>• Data-driven design decisions</li>
                  <li>• Accessibility & inclusive design</li>
                  <li>• Design systems & component libraries</li>
                  <li>• Cross-functional collaboration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Public Resources</h2>
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 mb-4">
                <strong>Coming soon:</strong> Curated list of UX/UI resources, tutorials, portfolios, and industry tools to complement your coursework.
              </p>
              <p className="text-sm text-blue-700">
                Resources will include: Figma tutorials, design system examples, UX research templates, portfolio builders, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
