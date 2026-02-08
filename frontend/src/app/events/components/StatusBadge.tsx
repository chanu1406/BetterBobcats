"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import type { EventRequestStatus } from "@/types/event-request";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  EventRequestStatus,
  { label: string; className: string; icon?: React.ReactNode }
> = {
  open: {
    label: "Open",
    className:
      "border-status-open/40 text-status-open bg-status-open-muted dark:bg-status-open-muted dark:text-status-open dark:border-status-open/30",
  },
  planned: {
    label: "Planned",
    className:
      "border-status-planned/40 text-status-planned bg-status-planned-muted dark:bg-status-planned-muted dark:text-status-planned dark:border-status-planned/30",
  },
  scheduled: {
    label: "Scheduled",
    className:
      "border-status-scheduled/40 text-status-scheduled bg-status-scheduled-muted dark:bg-status-scheduled-muted dark:text-status-scheduled dark:border-status-scheduled/30",
  },
  fulfilled: {
    label: "Fulfilled",
    className:
      "border-status-fulfilled/40 text-status-fulfilled bg-status-fulfilled-muted dark:bg-status-fulfilled-muted dark:text-status-fulfilled dark:border-status-fulfilled/30",
    icon: <CheckCircle2 className="h-3 w-3 shrink-0" />,
  },
  not_planned: {
    label: "Not planned",
    className:
      "text-status-neutral bg-status-neutral-muted border-status-neutral/30 dark:bg-status-neutral-muted dark:text-muted-foreground dark:border-border",
  },
  closed: {
    label: "Closed",
    className:
      "text-status-neutral bg-status-neutral-muted border-status-neutral/30 dark:bg-status-neutral-muted dark:text-muted-foreground dark:border-border",
  },
};

export function StatusBadge({
  status,
  className,
  size = "default",
}: {
  status: EventRequestStatus;
  className?: string;
  size?: "sm" | "default";
}) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.closed;
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        config.className,
        size === "sm" && "text-[10px] px-1.5 py-0 h-4",
        className
      )}
    >
      {config.icon}
      {config.icon && <span className="ml-1" />}
      {config.label}
    </Badge>
  );
}
