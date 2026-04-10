/**
 * PrerequisiteBadge
 *
 * Displays a compact list of prerequisite course codes on a course card.
 * Receives already-resolved DB course_codes (e.g. "CSE 015") — no fetch
 * happens inside this component.
 *
 * Renders nothing when prereqCodes is empty, so callers don't need a guard.
 */

interface PrerequisiteBadgeProps {
    prereqCodes: string[];
}

export function PrerequisiteBadge({ prereqCodes }: PrerequisiteBadgeProps) {
    if (!prereqCodes.length) return null;

    return (
        <div className="mt-2 flex flex-wrap items-center gap-1">
            <span className="text-xs text-muted-foreground shrink-0">Prereqs:</span>
            {prereqCodes.map((code) => (
                <span
                    key={code}
                    className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-medium"
                >
                    {code}
                </span>
            ))}
        </div>
    );
}
