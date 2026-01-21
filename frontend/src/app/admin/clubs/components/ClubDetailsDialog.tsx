"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAdminClubFullDetails, type AdminClubFullDetails } from "@/lib/admin";
import type { AdminClub } from "@/lib/admin";

interface ClubSummary {
  club_id: string;
  name: string;
  slug: string | null;
  is_active: boolean;
  member_count: number;
  pending_invite_count: number;
  event_count: number | null;
}

interface ClubMember {
  email: string;
  role: string;
  created_at: string;
}

interface ClubInvite {
  email: string;
  role: string;
  invited_at: string;
  accepted_at: string | null;
}

interface ClubTag {
  tag: string;
}

interface ClubMajor {
  major: string;
}

interface ClubDetailsDialogProps {
  club: AdminClub | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Dialog component to display detailed club information
 * Optimized with single RPC call and TanStack Query
 */
export default function ClubDetailsDialog({
  club,
  open,
  onOpenChange,
}: ClubDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState<string>("summary");

  // Fetch club details with TanStack Query (only when dialog is open)
  const {
    data: clubDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-club-details", club?.id],
    queryFn: () => fetchAdminClubFullDetails(club!.id, 50, 0),
    enabled: open && !!club,
    staleTime: 30_000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when user returns to tab
    retry: 1,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRoleVariant = (
    role: string
  ): "default" | "secondary" | "outline" => {
    switch (role) {
      case "admin":
        return "default";
      case "officer":
        return "secondary";
      default:
        return "outline";
    }
  };

  const summary = clubDetails?.summary;
  const members = clubDetails?.members || [];
  const invites = clubDetails?.invites || [];
  const tags = clubDetails?.tags || [];
  const majors = clubDetails?.majors || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Club Details</DialogTitle>
          <DialogDescription>
            View detailed information about this club
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">Loading club details...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>
              {error instanceof Error ? error.message : "Failed to load club details"}
            </AlertDescription>
          </Alert>
        ) : !clubDetails ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">No club details found.</p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="members">
                Members ({members.length})
              </TabsTrigger>
              <TabsTrigger value="invites">
                Invites ({invites.length})
              </TabsTrigger>
              <TabsTrigger value="tags">
                Tags ({tags.length})
              </TabsTrigger>
              <TabsTrigger value="majors">
                Majors ({majors.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="space-y-4 mt-4">
              {summary && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-foreground">{summary.name}</h4>
                    <Badge
                      variant={summary.is_active ? "default" : "secondary"}
                      className={
                        summary.is_active
                          ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30"
                          : ""
                      }
                    >
                      {summary.is_active ? "Active" : "Deactivated"}
                    </Badge>
                  </div>
                  {summary.slug && (
                    <p className="text-sm text-muted-foreground">/{summary.slug}</p>
                  )}
                  {summary.description && (
                    <p className="text-sm text-muted-foreground">{summary.description}</p>
                  )}
                  <div className="flex gap-4 text-sm text-muted-foreground pt-2">
                    <span>
                      <strong className="text-foreground">{summary.member_count}</strong>{" "}
                      member{summary.member_count !== 1 ? "s" : ""}
                    </span>
                    <span>
                      <strong className="text-foreground">
                        {summary.pending_invite_count}
                      </strong>{" "}
                      pending invite{summary.pending_invite_count !== 1 ? "s" : ""}
                    </span>
                    <span>
                      <strong className="text-foreground">
                        {summary.event_count}
                      </strong>{" "}
                      event{summary.event_count !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="members" className="mt-4">
              {members.length === 0 ? (
                <p className="text-sm text-muted-foreground">No members found.</p>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((member, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{member.email}</TableCell>
                          <TableCell>
                            <Badge variant={getRoleVariant(member.role)}>
                              {member.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(member.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="invites" className="mt-4">
              {invites.length === 0 ? (
                <p className="text-sm text-muted-foreground">No invites found.</p>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Invited At</TableHead>
                        <TableHead>Accepted At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invites.map((invite, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{invite.email}</TableCell>
                          <TableCell>
                            <Badge variant={getRoleVariant(invite.role)}>
                              {invite.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(invite.invited_at)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {invite.accepted_at
                              ? formatDate(invite.accepted_at)
                              : "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tags" className="mt-4">
              {tags.length === 0 ? (
                <p className="text-sm text-muted-foreground">No tags found.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag.tag}
                    </Badge>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="majors" className="mt-4">
              {majors.length === 0 ? (
                <p className="text-sm text-muted-foreground">No majors found.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {majors.map((major, index) => (
                    <Badge key={index} variant="outline">
                      {major.major}
                    </Badge>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
