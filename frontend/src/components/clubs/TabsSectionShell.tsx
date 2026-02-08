"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const SECTION_IDS = [
  "about",
  "events",
  "join",
  "leadership",
  "media",
  "career",
  "conduct",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

export type { SectionId };
export { SECTION_IDS };

export function isValidSection(id: string): id is SectionId {
  return SECTION_IDS.includes(id as SectionId);
}

type Props = {
  activeSection: string;
  onSectionChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

export function TabsSectionShell({
  activeSection,
  onSectionChange,
  children,
  className,
}: Props) {
  return (
    <Tabs
      value={activeSection}
      onValueChange={onSectionChange}
      className={cn("mt-6", className)}
    >
      <TabsList
        className="w-full flex flex-wrap h-auto gap-1 p-1 mb-4 overflow-x-auto rounded-lg"
        aria-label="Club sections"
      >
        {SECTION_IDS.map((id) => (
          <TabsTrigger
            key={id}
            value={id}
            className="px-3 py-2 text-sm font-medium rounded-md"
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="min-h-[200px]">{children}</div>
    </Tabs>
  );
}
