/**
 * GraphLegend Component
 * Displays color legend for the four academic years
 * Used on: Degrees page (CS/CSE prerequisite graph)
 */

export default function GraphLegend() {
  const yearColors = [
    { year: 1, label: "First Year", bgColor: "bg-blue-100", borderColor: "border-blue-300" },
    { year: 2, label: "Second Year", bgColor: "bg-green-100", borderColor: "border-green-300" },
    { year: 3, label: "Third Year", bgColor: "bg-amber-100", borderColor: "border-amber-300" },
    { year: 4, label: "Fourth Year", bgColor: "bg-purple-100", borderColor: "border-purple-300" },
  ];

  return (
    <div className="mb-6 p-4 bg-card border border-border rounded-lg">
      <h3 className="text-sm font-semibold text-foreground mb-3">Course Year Legend</h3>
      <div className="flex flex-wrap gap-4">
        {yearColors.map(({ year, label, bgColor, borderColor }) => (
          <div key={year} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded border-2 ${bgColor} ${borderColor}`}></div>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

