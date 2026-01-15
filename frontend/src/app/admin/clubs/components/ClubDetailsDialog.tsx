"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browser";
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
import type { Club } from "@/types/club";

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
  club: Club | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Dialog component to display detailed club information
 */
export default function ClubDetailsDialog({
  club,
  open,
  onOpenChange,
}: ClubDetailsDialogProps) {
  const supabase = createClient();

  // Summary state
  const [summary, setSummary] = useState<ClubSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Members state
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState<string | null>(null);

  // Invites state
  const [invites, setInvites] = useState<ClubInvite[]>([]);
  const [invitesLoading, setInvitesLoading] = useState(false);
  const [invitesError, setInvitesError] = useState<string | null>(null);

  // Tags state (optional)
  const [tags, setTags] = useState<ClubTag[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [tagsError, setTagsError] = useState<string | null>(null);

  // Majors state (optional)
  const [majors, setMajors] = useState<ClubMajor[]>([]);
  const [majorsLoading, setMajorsLoading] = useState(false);
  const [majorsError, setMajorsError] = useState<string | null>(null);

  // Load summary
  const loadSummary = async () => {
    if (!club) return;

    setSummaryLoading(true);
    setSummaryError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "admin_get_club_summary",
        {
          p_club_id: club.id,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to load club summary");
      }

      if (data) {
        setSummary(data as ClubSummary);
      }
    } catch (err) {
      setSummaryError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  // Load members
  const loadMembers = async () => {
    if (!club) return;

    setMembersLoading(true);
    setMembersError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "list_club_members",
        {
          p_club_id: club.id,
          p_limit: 1000, // Large limit to get all members for details view
          p_offset: 0,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to load members");
      }

      if (data) {
        setMembers(data as ClubMember[]);
      } else {
        setMembers([]);
      }
    } catch (err) {
      setMembersError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setMembersLoading(false);
    }
  };

  // Load invites
  const loadInvites = async () => {
    if (!club) return;

    setInvitesLoading(true);
    setInvitesError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "admin_list_club_invites",
        {
          p_club_id: club.id,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to load invites");
      }

      if (data) {
        setInvites(data as ClubInvite[]);
      } else {
        setInvites([]);
      }
    } catch (err) {
      setInvitesError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setInvitesLoading(false);
    }
  };

  // Load tags (optional)
  const loadTags = async () => {
    if (!club) return;

    setTagsLoading(true);
    setTagsError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "admin_list_club_tags",
        {
          p_club_id: club.id,
        }
      );

      if (rpcError) {
        // Tags might not be available, so we don't throw
        console.warn("Failed to load tags:", rpcError);
        setTags([]);
      } else {
        setTags(data ? (data as ClubTag[]) : []);
      }
    } catch (err) {
      // Silently fail for optional features
      setTags([]);
    } finally {
      setTagsLoading(false);
    }
  };

  // Load majors (optional)
  const loadMajors = async () => {
    if (!club) return;

    setMajorsLoading(true);
    setMajorsError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "admin_list_club_majors",
        {
          p_club_id: club.id,
        }
      );

      if (rpcError) {
        // Majors might not be available, so we don't throw
        console.warn("Failed to load majors:", rpcError);
        setMajors([]);
      } else {
        setMajors(data ? (data as ClubMajor[]) : []);
      }
    } catch (err) {
      // Silently fail for optional features
      setMajors([]);
    } finally {
      setMajorsLoading(false);
    }
  };

  // Load all data when dialog opens
  useEffect(() => {
    if (open && club) {
      loadSummary();
      loadMembers();
      loadInvites();
      loadTags();
      loadMajors();
    } else {
      // Reset state when dialog closes
      setSummary(null);
      setMembers([]);
      setInvites([]);
      setTags([]);
      setMajors([]);
      setSummaryError(null);
      setMembersError(null);
      setInvitesError(null);
      setTagsError(null);
      setMajorsError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, club?.id]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Club Details</DialogTitle>
          <DialogDescription>
            View detailed information about this club
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Summary</h3>
            {summaryLoading ? (
              <p className="text-sm text-muted-foreground">Loading summary...</p>
            ) : summaryError ? (
              <Alert variant="destructive">
                <AlertDescription>
                  {summaryError}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadSummary}
                    className="mt-2"
                  >
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            ) : summary ? (
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
                <div className="flex gap-4 text-sm text-muted-foreground">
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
                  {summary.event_count !== null && (
                    <span>
                      <strong className="text-foreground">
                        {summary.event_count}
                      </strong>{" "}
                      event{summary.event_count !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <Separator />

          {/* Members Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Members</h3>
            {membersLoading ? (
              <p className="text-sm text-muted-foreground">Loading members...</p>
            ) : membersError ? (
              <Alert variant="destructive">
                <AlertDescription>
                  {membersError}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadMembers}
                    className="mt-2"
                  >
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            ) : members.length === 0 ? (
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
          </div>

          <Separator />

          {/* Invites Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Invites</h3>
            {invitesLoading ? (
              <p className="text-sm text-muted-foreground">Loading invites...</p>
            ) : invitesError ? (
              <Alert variant="destructive">
                <AlertDescription>
                  {invitesError}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadInvites}
                    className="mt-2"
                  >
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            ) : invites.length === 0 ? (
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
          </div>

          {/* Tags Section (Optional) */}
          {tags.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag.tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Majors Section (Optional) */}
          {majors.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Majors</h3>
                <div className="flex flex-wrap gap-2">
                  {majors.map((major, index) => (
                    <Badge key={index} variant="outline">
                      {major.major}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
