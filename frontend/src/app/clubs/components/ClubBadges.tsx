import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type {
  ClubProfileRecruitingStatus,
  ClubProfileCommitmentLevel,
  ClubProfileSizeRange,
  ClubProfileOpenTo,
} from "@/lib/clubs";

const RECRUITING_CONFIG: Record<
  ClubProfileRecruitingStatus,
  { label: string; className: string }
> = {
  open: {
    label: "Recruiting",
    className: "border-green-200 bg-green-50 text-green-800 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800",
  },
  closed: {
    label: "Closed",
    className: "border-red-200 bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
  },
  by_invite: {
    label: "Invite Only",
    className: "border-amber-200 bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
  },
};

const COMMITMENT_CONFIG: Record<
  ClubProfileCommitmentLevel,
  { label: string; className: string }
> = {
  casual: {
    label: "Casual",
    className: "border-blue-200 bg-blue-50 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
  },
  moderate: {
    label: "Moderate",
    className: "border-orange-200 bg-orange-50 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800",
  },
  high: {
    label: "High",
    className: "border-purple-200 bg-purple-50 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
  },
};

const SIZE_CONFIG: Record<
  ClubProfileSizeRange,
  { label: string; className: string }
> = {
  small: { label: "Small", className: "border-border bg-muted/50 text-muted-foreground" },
  medium: { label: "Medium", className: "border-border bg-muted/50 text-muted-foreground" },
  large: { label: "Large", className: "border-border bg-muted/50 text-muted-foreground" },
};

const OPEN_TO_CONFIG: Record<ClubProfileOpenTo, { label: string }> = {
  undergrad: { label: "UG" },
  grad: { label: "Grad" },
  both: { label: "Both" },
};

export function RecruitingBadge({
  status,
  className,
}: {
  status: ClubProfileRecruitingStatus | null;
  className?: string;
}) {
  if (!status || !RECRUITING_CONFIG[status]) return null;
  const config = RECRUITING_CONFIG[status];
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

export function CommitmentBadge({
  level,
  className,
}: {
  level: ClubProfileCommitmentLevel | null;
  className?: string;
}) {
  if (!level || !COMMITMENT_CONFIG[level]) return null;
  const config = COMMITMENT_CONFIG[level];
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

export function SizeBadge({
  size,
  className,
}: {
  size: ClubProfileSizeRange | null;
  className?: string;
}) {
  if (!size || !SIZE_CONFIG[size]) return null;
  const config = SIZE_CONFIG[size];
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

export function OpenToBadge({
  openTo,
  className,
}: {
  openTo: ClubProfileOpenTo | null;
  className?: string;
}) {
  if (!openTo || !OPEN_TO_CONFIG[openTo]) return null;
  const config = OPEN_TO_CONFIG[openTo];
  return (
    <Badge variant="outline" className={className}>
      {config.label}
    </Badge>
  );
}
