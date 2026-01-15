/**
 * GraphLegend Component for Electrical Engineering
 * Displays color legend for the four academic years
 * Used on: Degrees page (Electrical Engineering prerequisite graph)
 */

interface GraphLegendProps {
  onFormatLayoutClick?: () => void;
  useFormattedLayout?: boolean;
  onResetPositions?: () => void;
  onFullReset?: () => void;
}

export default function GraphLegend({ 
  onFormatLayoutClick, 
  useFormattedLayout, 
  onResetPositions, 
  onFullReset 
}: GraphLegendProps) {
  const yearColors = [
    { year: 1, label: "First Year", bgColor: "bg-blue-100", borderColor: "border-blue-300" },
    { year: 2, label: "Second Year", bgColor: "bg-green-100", borderColor: "border-green-300" },
    { year: 3, label: "Third Year", bgColor: "bg-amber-100", borderColor: "border-amber-300" },
    { year: 4, label: "Fourth Year", bgColor: "bg-purple-100", borderColor: "border-purple-300" },
  ];

  return (
    <div className="mb-6 p-3 bg-card border border-border/50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium text-black">Course timing (guidance only)</h3>
        <div className="flex flex-col items-end gap-1">
          {onFormatLayoutClick && (
            <button
              onClick={onFormatLayoutClick}
              className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
              title="Reformat graph for easier viewing"
            >
              {useFormattedLayout ? "Toggle Compact View" : "Format Layout (No Overlap)"}
            </button>
          )}
          {onFormatLayoutClick && (
            <button
              onClick={() => {
                if (onFullReset) {
                  onFullReset();
                } else {
                  console.warn("Reset handler not ready yet");
                }
              }}
              className={`text-xs transition-colors font-medium ${
                onFullReset 
                  ? "text-destructive hover:text-destructive/80 cursor-pointer" 
                  : "text-muted-foreground/50 cursor-not-allowed opacity-50"
              }`}
              title={onFullReset ? "Reset entire graph: positions, expanded nodes, and layout" : "Waiting for reset handler..."}
            >
              Reset Graph
            </button>
          )}
          {onResetPositions && (
            <button
              onClick={onResetPositions}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
              title="Reset node positions to default layout"
            >
              Reset Positions
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {yearColors.map(({ year, label, bgColor, borderColor }) => (
          <div key={year} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded border-2 ${bgColor} ${borderColor}`}></div>
            <span className="text-xs text-black">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
