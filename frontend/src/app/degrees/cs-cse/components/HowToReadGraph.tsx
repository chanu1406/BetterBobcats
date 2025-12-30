"use client";

/**
 * HowToReadGraph Component
 * Collapsible section explaining how to read the prerequisite graph
 * Used on: Degrees page (CS/CSE prerequisite graph)
 */

import { useState } from "react";

export default function HowToReadGraph() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-6 border border-border rounded-lg bg-card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
      >
        <h3 className="text-sm font-semibold text-foreground">
          How to read the prerequisite graph
        </h3>
        <svg
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">📘</span>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">Nodes</p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                Required or foundational courses
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">➡️</span>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">Arrows</p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                Show prerequisites (what you need first)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">🎨</span>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">Colors</p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                Recommended year (guidance, not strict)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">🧱</span>
            <div>
              <p className="text-sm font-semibold text-foreground mb-0.5">Foundation</p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed">
                This is the base CS/CSE structure before specialization
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

