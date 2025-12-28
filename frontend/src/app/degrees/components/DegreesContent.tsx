/**
 * DegreesContent Component
 * Main content area showing welcome message or selected degree content
 * Used on: Degrees page
 */
interface DegreesContentProps {
  selectedDegree: string | null;
}

export default function DegreesContent({ selectedDegree }: DegreesContentProps) {
  if (!selectedDegree) {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Welcome to the degree page
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Click on a degree to access the career fields most commonly pursued by that degree.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
          <p className="text-2xl font-semibold text-muted-foreground">T B D</p>
          <p className="text-sm text-muted-foreground mt-2">
            Content for {selectedDegree} will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
}

