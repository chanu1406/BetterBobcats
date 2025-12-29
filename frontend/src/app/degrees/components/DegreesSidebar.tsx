"use client";

/**
 * DegreesSidebar Component
 * Left sidebar navigation with list of degree programs
 * Used on: Degrees page
 */
interface DegreesSidebarProps {
  selectedDegree: string | null;
  onDegreeSelect: (degree: string) => void;
}

export default function DegreesSidebar({ selectedDegree, onDegreeSelect }: DegreesSidebarProps) {
  const degrees = [
    "CS/CSE",
  ];

  return (
    <aside className="w-64 border-r bg-background/50 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-2">
        <nav className="space-y-1">
          {degrees.map((degree) => (
            <button
              key={degree}
              onClick={() => onDegreeSelect(degree)}
              className={`w-full text-left px-4 py-3 transition-colors border border-border/50 rounded-md font-sans font-semibold tracking-tight ${
                selectedDegree === degree
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "hover:bg-primary/10 hover:border-primary/30"
              }`}
            >
              <span className={selectedDegree === degree ? "" : "bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"}>
                {degree}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

