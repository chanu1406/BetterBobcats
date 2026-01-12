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

      {/* Page Size Selector */}
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
                          disabled={isCurrentUser || isDeactivated}
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
    </div>
  );
}
