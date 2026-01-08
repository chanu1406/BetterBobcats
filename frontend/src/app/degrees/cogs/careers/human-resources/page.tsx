/**
 * Human Resources Specialist Career Path Page
 * Shows the career path graph for Human Resources Specialist role
 */

export default function HumanResourcesCareerPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Human Resources Specialist Career Path</h1>
      <p className="text-muted-foreground mb-8">
        This page shows the recommended courses for pursuing a career as a Human Resources Specialist.
      </p>
      {/* The actual graph will be rendered by DegreesContent component */}
    </div>
  );
}
