"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings,
  ChevronRight,
  Menu,
  X,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ClubSidebarProps {
  clubSlug: string;
  clubName: string;
  clubLogo?: string | null;
  userRole: string;
}

export default function ClubSidebar({
  clubSlug,
  clubName,
  clubLogo,
  userRole,
}: ClubSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      title: "Overview",
      href: `/dashboard/${clubSlug}`,
      icon: LayoutDashboard,
      roles: ["admin", "officer", "member"],
    },
    {
      title: "Events",
      href: `/dashboard/${clubSlug}/events`,
      icon: Calendar,
      roles: ["admin", "officer", "member"],
    },
    {
      title: "Requests",
      href: `/dashboard/${clubSlug}/requests`,
      icon: ClipboardList,
      roles: ["admin", "officer"],
    },
    {
      title: "Members",
      href: `/dashboard/${clubSlug}/members`,
      icon: Users,
      roles: ["admin"],
    },
    {
      title: "Profile",
      href: `/dashboard/${clubSlug}/profile`,
      icon: Settings,
      roles: ["admin", "officer"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const isActive = (href: string) => {
    if (href === `/dashboard/${clubSlug}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {clubLogo ? (
              <img
                src={clubLogo}
                alt={clubName}
                className="w-10 h-10 rounded-lg object-cover border flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-muted border flex items-center justify-center text-lg font-semibold text-muted-foreground flex-shrink-0">
                {clubName?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-foreground truncate">{clubName}</h2>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden flex-shrink-0"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-[65px] lg:top-0 left-0 z-40 h-[calc(100vh-65px)] lg:h-screen bg-background border-r border-border transition-all duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Desktop header */}
          <div className="hidden lg:flex items-center justify-between p-4 border-b">
            <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
              {clubLogo ? (
                <img
                  src={clubLogo}
                  alt={clubName}
                  className={cn(
                    "rounded-lg object-cover border flex-shrink-0",
                    isCollapsed ? "w-8 h-8" : "w-10 h-10"
                  )}
                />
              ) : (
                <div
                  className={cn(
                    "rounded-lg bg-muted border flex items-center justify-center font-semibold text-muted-foreground flex-shrink-0",
                    isCollapsed ? "w-8 h-8 text-sm" : "w-10 h-10 text-lg"
                  )}
                >
                  {clubName?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              {!isCollapsed && (
                <div className="min-w-0">
                  <h2 className="font-semibold text-foreground truncate">{clubName}</h2>
                  <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex"
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  isCollapsed && "rotate-180"
                )}
              />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    active && "bg-accent text-accent-foreground",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0", active && "text-primary")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
