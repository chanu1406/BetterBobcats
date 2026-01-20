"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ClubMember {
  user_id: string;
  email: string;
  role: string;
  created_at: string;
}

interface ListResponse {
  user_id: string;
  email: string;
  role: string;
  created_at: string;
  total_count: number;
}

type MemberRole = "admin" | "officer" | "member";

interface MembersTableProps {
  clubId: string;
  clubSlug: string;
  isDeactivated: boolean;
  currentUserId: string;
}

/**
 * Client component for managing club members
 */
export default function MembersTable({
  clubId,
  clubSlug,
  isDeactivated,
  currentUserId,
}: MembersTableProps) {
  const supabase = createClient();
  const { addToast } = useToast();

  const [members, setMembers] = useState<ClubMember[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Role change state
  const [roleChangeDialogOpen, setRoleChangeDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null);
  const [newRole, setNewRole] = useState<MemberRole>("member");
  const [isChangingRole, setIsChangingRole] = useState(false);

  // Remove member state
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeConfirmText, setRemoveConfirmText] = useState("");
  const [isRemoving, setIsRemoving] = useState(false);

  // Invite member state
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<MemberRole>("member");
  const [isInviting, setIsInviting] = useState(false);

  // Load members
  const loadMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = currentPage * pageSize;
      const { data, error: rpcError } = await supabase.rpc(
        "list_club_members",
        {
          p_club_id: clubId,
          p_limit: pageSize,
          p_offset: offset,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to load members");
      }

      const total = data?.[0]?.total_count ?? 0;
      setTotalCount(total);

      if (data && data.length > 0) {
        setMembers(
          data.map((row: ListResponse) => ({
            user_id: row.user_id,
            email: row.email,
            role: row.role,
            created_at: row.created_at,
          }))
        );
      } else {
        setMembers([]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setMembers([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, clubId, pageSize, currentPage]);

  // Load members on mount and when filters change
  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  // Reset to first page when page size changes
  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize]);

  // Handle role change
  const handleRoleChange = (member: ClubMember, newRoleValue: MemberRole) => {
    if (member.user_id === currentUserId) {
      addToast({
        title: "Cannot Change Your Own Role",
        description: "You cannot change your own role.",
        variant: "destructive",
      });
      return;
    }

    if (isDeactivated) {
      addToast({
        title: "Club Deactivated",
        description:
          "Cannot change roles while the club is deactivated.",
        variant: "destructive",
      });
      return;
    }

    setSelectedMember(member);
    setNewRole(newRoleValue);
    setRoleChangeDialogOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedMember) return;

    setIsChangingRole(true);
    setError(null);

    try {
      const { error: rpcError } = await supabase.rpc("set_club_member_role", {
        p_club_id: clubId,
        p_user_id: selectedMember.user_id,
        p_role: newRole,
      });

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to change role");
      }

      addToast({
        title: "Role Changed",
        description: `${selectedMember.email}'s role has been changed to ${newRole}.`,
        variant: "success",
      });

      setRoleChangeDialogOpen(false);
      setSelectedMember(null);
      await loadMembers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to change role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChangingRole(false);
    }
  };

  // Handle remove member
  const handleRemoveMember = (member: ClubMember) => {
    if (member.user_id === currentUserId) {
      addToast({
        title: "Cannot Remove Yourself",
        description: "You cannot remove yourself from the club.",
        variant: "destructive",
      });
      return;
    }

    if (member.role === "admin") {
      addToast({
        title: "Cannot Remove Admins",
        description: "Admins cannot be removed. Change their role to officer or member first.",
        variant: "destructive",
      });
      return;
    }

    if (isDeactivated) {
      addToast({
        title: "Club Deactivated",
        description: "Cannot remove members while the club is deactivated.",
        variant: "destructive",
      });
      return;
    }

    setSelectedMember(member);
    setRemoveConfirmText("");
    setRemoveDialogOpen(true);
  };

  const confirmRemoveMember = async () => {
    if (!selectedMember) return;

    setIsRemoving(true);
    setError(null);

    try {
      const { error: rpcError } = await supabase.rpc("remove_club_member", {
        p_club_id: clubId,
        p_user_id: selectedMember.user_id,
      });

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to remove member");
      }

      addToast({
        title: "Member Removed",
        description: `${selectedMember.email} has been removed from the club.`,
        variant: "success",
      });

      setRemoveDialogOpen(false);
      setSelectedMember(null);
      setRemoveConfirmText("");
      await loadMembers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to remove member. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRemoving(false);
    }
  };

  // Handle invite member
  const handleInviteMember = async () => {
    if (!inviteEmail.trim()) {
      addToast({
        title: "Email Required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail.trim())) {
      addToast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsInviting(true);
    setError(null);

    try {
      // Check if invite already exists (pending)
      const { data: existingInvite } = await supabase
        .from("club_invites")
        .select("id, accepted_at")
        .eq("club_id", clubId)
        .eq("email", inviteEmail.trim().toLowerCase())
        .is("accepted_at", null)
        .maybeSingle();

      if (existingInvite && !existingInvite.accepted_at) {
        addToast({
          title: "Invite Already Sent",
          description: "An invite has already been sent to this email address.",
          variant: "destructive",
        });
        setIsInviting(false);
        return;
      }

      // Create the invite - this will trigger the email automatically
      const { data: inviteData, error: inviteError } = await supabase
        .from("club_invites")
        .insert({
          club_id: clubId,
          email: inviteEmail.trim().toLowerCase(),
          role: inviteRole,
          created_by: currentUserId,
        })
        .select("id")
        .single();

      if (inviteError) {
        // Check if it's a duplicate key error
        if (inviteError.code === "23505" || inviteError.message.includes("duplicate")) {
          addToast({
            title: "Invite Already Exists",
            description: "An invite has already been sent to this email address.",
            variant: "destructive",
          });
        } else {
          throw new Error(inviteError.message || "Failed to create invite");
        }
        return;
      }

      addToast({
        title: "Invite Sent",
        description: `An invitation has been sent to ${inviteEmail.trim()} as ${inviteRole}.`,
        variant: "success",
      });

      // Reset form
      setInviteDialogOpen(false);
      setInviteEmail("");
      setInviteRole("member");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to send invite. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsInviting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getRoleVariant = (role: string): "default" | "secondary" | "outline" => {
    switch (role) {
      case "admin":
        return "default";
      case "officer":
        return "secondary";
      default:
        return "outline";
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;
  const isRemoveEnabled = removeConfirmText === "REMOVE";

  return (
    <div className="space-y-4">
      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Page Size Selector and Invite Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor="page-size">Page size:</Label>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(parseInt(value))}
          >
            <SelectTrigger id="page-size" className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => setInviteDialogOpen(true)}
          disabled={isDeactivated}
          title={isDeactivated ? "Cannot invite members while club is deactivated" : undefined}
        >
          Invite Member
        </Button>
      </div>

      {/* Members Table */}
      <div className="border rounded-lg">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading members...
          </div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No members found.
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => {
                  const isCurrentUser = member.user_id === currentUserId;
                  return (
                    <TableRow key={member.user_id}>
                      <TableCell className="font-medium">
                        {member.email}
                        {isCurrentUser && (
                          <Badge variant="outline" className="ml-2">
                            You
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={member.role}
                          onValueChange={(value) =>
                            handleRoleChange(member, value as MemberRole)
                          }
                          disabled={isCurrentUser || isDeactivated}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="officer">Officer</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(member.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveMember(member)}
                          disabled={
                            isCurrentUser || 
                            isDeactivated || 
                            member.role === "admin"
                          }
                          title={
                            member.role === "admin"
                              ? "Admins cannot be removed. Change their role first."
                              : undefined
                          }
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {members.length > 0 ? currentPage * pageSize + 1 : 0}-
                {Math.min((currentPage + 1) * pageSize, totalCount)} of{" "}
                {totalCount} member{totalCount !== 1 ? "s" : ""}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={!canGoPrev || isLoading}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={!canGoNext || isLoading}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Role Change Confirmation Dialog */}
      <AlertDialog
        open={roleChangeDialogOpen}
        onOpenChange={setRoleChangeDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Role?</AlertDialogTitle>
            <AlertDialogDescription>
              Change {selectedMember?.email}'s role from{" "}
              <strong>{selectedMember?.role}</strong> to{" "}
              <strong>{newRole}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setRoleChangeDialogOpen(false);
                setSelectedMember(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRoleChange}
              disabled={isChangingRole}
            >
              {isChangingRole ? "Changing..." : "Change Role"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Member Confirmation Dialog */}
      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to remove <strong>{selectedMember?.email}</strong>{" "}
              from the club. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="remove-confirm">
              Type <strong>REMOVE</strong> to confirm:
            </Label>
            <Input
              id="remove-confirm"
              value={removeConfirmText}
              onChange={(e) => setRemoveConfirmText(e.target.value)}
              className="mt-2"
              placeholder="REMOVE"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setRemoveDialogOpen(false);
                setSelectedMember(null);
                setRemoveConfirmText("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveMember}
              disabled={!isRemoveEnabled || isRemoving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRemoving ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Invite Member Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Invite New Member</DialogTitle>
            <DialogDescription className="text-base">
              Send an invitation to join your club. They will receive an email with a link to accept the invitation.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="invite-email" className="text-sm font-semibold">
                Email Address
              </Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="member@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                disabled={isInviting}
                required
                className="h-11"
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Role</Label>
              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={() => !isInviting && setInviteRole("member")}
                  disabled={isInviting}
                  className={`flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all hover:bg-accent ${
                    inviteRole === "member"
                      ? "border-primary bg-accent"
                      : "border-border"
                  } ${isInviting ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    inviteRole === "member"
                      ? "border-primary"
                      : "border-muted-foreground"
                  }`}>
                    {inviteRole === "member" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Member</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Can participate in club activities and attend events.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => !isInviting && setInviteRole("officer")}
                  disabled={isInviting}
                  className={`flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all hover:bg-accent ${
                    inviteRole === "officer"
                      ? "border-primary bg-accent"
                      : "border-border"
                  } ${isInviting ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    inviteRole === "officer"
                      ? "border-primary"
                      : "border-muted-foreground"
                  }`}>
                    {inviteRole === "officer" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Officer</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Can help manage the club and create events.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => !isInviting && setInviteRole("admin")}
                  disabled={isInviting}
                  className={`flex items-start gap-3 rounded-lg border-2 p-4 text-left transition-all hover:bg-accent ${
                    inviteRole === "admin"
                      ? "border-primary bg-accent"
                      : "border-border"
                  } ${isInviting ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                >
                  <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    inviteRole === "admin"
                      ? "border-primary"
                      : "border-muted-foreground"
                  }`}>
                    {inviteRole === "admin" && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Admin</span>
                      <Badge variant="secondary" className="text-xs">
                        Full Access
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Has full control over the club, including member management.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setInviteDialogOpen(false);
                setInviteEmail("");
                setInviteRole("member");
              }}
              disabled={isInviting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleInviteMember}
              disabled={isInviting || !inviteEmail.trim()}
              className="min-w-[120px]"
            >
              {isInviting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Sending...
                </>
              ) : (
                "Send Invite"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
