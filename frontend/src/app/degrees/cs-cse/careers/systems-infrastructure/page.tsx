/**
 * Systems / Infrastructure Engineering Career Path Page
 * Displays an interactive graph visualization of recommended courses
 */

"use client";

import { useState, useCallback } from "react";
import CareerPathGraph from "./components/CareerPathGraph";

export default function SystemsInfrastructurePage() {
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
            Systems / Infrastructure Engineering
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Build the backbone of modern computing: operating systems, distributed systems, cloud infrastructure, and high-performance systems.
            This path prepares you for roles at companies building large-scale infrastructure.
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
                  🟢 TIER 1: Non-Negotiable Core
                </h3>
                <p className="text-green-800">
                  <strong>Core Systems Engineering Foundation.</strong> If a student does not take most of these, they are not systems-ready. 
                  Essential for all Systems Engineer, Infrastructure Engineer, and SRE roles.
                </p>
              </div>

              <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  🟢 TIER 1.5: EE Hardware Core
                </h3>
                <p className="text-green-800">
                  <strong>Electrical Engineering Systems Hardware Core.</strong> This is what makes UCM systems engineers stand out. 
                  Deep hardware understanding that separates good systems engineers from great ones.
                </p>
              </div>

              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  🟡 TIER 2: Advanced Systems
                </h3>
                <p className="text-yellow-800">
                  <strong>Advanced Systems & Infrastructure.</strong> These separate junior systems engineers from elite ones. 
                  Maps directly to FAANG-level infrastructure roles.
                </p>
              </div>

              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  🟡 TIER 2.5: ME Control Systems
                </h3>
                <p className="text-yellow-800">
                  <strong>Mechanical Engineering Systems Thinking & Control.</strong> Not for everyone — high payoff if chosen carefully. 
                  Helps with robotics systems, embedded infrastructure, and cyber-physical systems.
                </p>
              </div>

              <div className="p-6 bg-orange-50 border border-orange-200 rounded-lg">
                <h3 className="text-lg font-bold text-orange-900 mb-2">
                  🟠 TIER 3: Security & Reliability (Optional)
                </h3>
                <p className="text-orange-800">
                  <strong>Security & Reliability (Optional but Powerful).</strong> Enhances systems engineering with security awareness 
                  and formal verification methods.
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
                  <li>• Systems Engineer</li>
                  <li>• Infrastructure Engineer</li>
                  <li>• Site Reliability Engineer (SRE)</li>
                  <li>• DevOps Engineer</li>
                  <li>• Cloud Infrastructure Engineer</li>
                  <li>• Performance Engineer</li>
                </ul>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Key Skills Developed</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Operating systems & kernel development</li>
                  <li>• Distributed systems design</li>
                  <li>• Cloud & container orchestration</li>
                  <li>• Performance optimization</li>
                  <li>• System architecture & scalability</li>
                  <li>• Infrastructure automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
