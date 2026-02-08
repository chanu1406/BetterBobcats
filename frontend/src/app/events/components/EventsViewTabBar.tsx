"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MessageSquarePlus } from "lucide-react";
import type { EventsView } from "../hooks/useRequestsUrlState";

interface EventsViewTabBarProps {
  view: EventsView;
  onViewChange: (view: EventsView) => void;
}

export function EventsViewTabBar({ view, onViewChange }: EventsViewTabBarProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 pt-2">
        <Tabs value={view} onValueChange={(v) => onViewChange(v as EventsView)}>
          <TabsList className="h-10">
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarDays className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              Requests
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
