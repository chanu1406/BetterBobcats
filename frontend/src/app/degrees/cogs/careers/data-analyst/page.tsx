/**
 * Data Analyst (Generalist) Career Path Page
 * Displays an interactive graph visualization of recommended courses
 */

"use client";

import { useState, useCallback } from "react";
import CareerPathGraph from "./components/CareerPathGraph";

export default function DataAnalystCareerPathPage() {
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
            Data Analyst (Generalist)
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Transform raw data into actionable insights that drive business decisions. This path combines statistics, 
            programming, and domain expertise to excel in data analytics, business intelligence, and data science roles.
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
                  <strong>Foundational courses for Data Analytics.</strong> These courses provide the essential statistical, 
                  programming, and data handling skills needed to succeed as a data analyst.
                </p>
                <p className="text-sm text-green-700 italic">
                  Note: Some upper div CSE courses will be harder to enroll in as you WILL NEED to complete CSE prerequisites 
                  early on before graduation.
                </p>
              </div>

              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  🟡 TIER 2: STRONG BOOSTERS
                </h3>
                <p className="text-yellow-800">
                  <strong>Turn a junior analyst into a senior candidate.</strong> These courses add predictive modeling, 
                  advanced visualization, and complex system analysis to your skillset.
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
                  <li>• Data Analyst</li>
                  <li>• Business Intelligence Analyst</li>
                  <li>• Data Scientist (Junior)</li>
                  <li>• Analytics Engineer</li>
                  <li>• Marketing Analyst</li>
                  <li>• Product Analyst</li>
                  <li>• Financial Analyst</li>
                </ul>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Key Skills Developed</h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Statistical analysis & hypothesis testing</li>
                  <li>• SQL & database querying</li>
                  <li>• Python/R for data analysis</li>
                  <li>• Data visualization & dashboards</li>
                  <li>• Experimental design & A/B testing</li>
                  <li>• Predictive modeling & forecasting</li>
                  <li>• Business storytelling with data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Why Choose This Path */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Data Analytics?</h2>
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
              <p className="text-blue-900">
                <strong>High Demand:</strong> Every industry needs data analysts to make sense of their data and drive 
                strategic decisions.
              </p>
              <p className="text-blue-900">
                <strong>Versatile Skills:</strong> Data analysis skills transfer across industries—from tech to healthcare 
                to finance to marketing.
              </p>
              <p className="text-blue-900">
                <strong>Career Growth:</strong> Start as a junior analyst and grow into senior analyst, data scientist, 
                or analytics manager roles.
              </p>
              <p className="text-blue-900">
                <strong>Impact:</strong> Your insights directly influence business strategy, product development, and 
                organizational success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
