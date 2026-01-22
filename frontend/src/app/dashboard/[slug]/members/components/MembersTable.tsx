"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MoreHorizontal,
  UserPlus,
  Copy,
  UserCog,
  UserMinus,
  X,
  Search,
  Users,
  Shield,
  UserCheck,
  Clock,
} from "lucide-react";
import { fetchClubMembers, fetchClubPendingInvites, type ClubMember, type ClubInvite } from "@/lib/members";

type MemberRole = "admin" | "officer" | "member";

interface MembersTableProps {
  clubId: string;
  clubSlug: string;
  isDeactivated: boolean;
  currentUserId: string;
}

/**
 * Get initials from email
 */
function getInitials(email: string): string {
  const localPart = email.split("@")[0];
  if (localPart.length <= 2) return localPart.toUpperCase();
  return localPart.substring(0, 2).toUpperCase();
}

/**
 * Get local part of email (before @)
 */
function getEmailLocalPart(email: string): string {
  return email.split("@")[0];
}

/**
 * Client component for managing club members with improved UI/UX
 */
export default function MembersTable({
  clubId,
  clubSlug,
  isDeactivated,
  currentUserId,
}: MembersTableProps) {
  const supabase = createClient();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"members" | "invites">("members");

  // Role change state
  const [roleChangeDialogOpen, setRoleChangeDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null);
  const [newRole, setNewRole] = useState<MemberRole>("member");
  const [isChangingRole, setIsChangingRole] = useState(false);

  // Remove member state
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Invite member state
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<MemberRole>("member");
  const [isInviting, setIsInviting] = useState(false);

  // Cancel invite state
  const [cancelInviteDialogOpen, setCancelInviteDialogOpen] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState<ClubInvite | null>(null);
  const [isCanceling, setIsCanceling] = useState(false);

  // Fetch members with TanStack Query
  const {
    data: membersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club-members", clubId, currentPage, pageSize],
    queryFn: () =>
      fetchClubMembers(clubId, pageSize, currentPage * pageSize),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Fetch pending invites with TanStack Query
  const {
    data: pendingInvites = [],
    isLoading: isLoadingInvites,
    refetch: refetchInvites,
  } = useQuery({
    queryKey: ["club-pending-invites", clubId],
    queryFn: () => fetchClubPendingInvites(clubId),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const members = membersData?.members || [];
  const totalCount = membersData?.total || 0;

  // Fetch all members for accurate stats (first page with larger limit)
  const {
    data: allMembersData,
  } = useQuery({
    queryKey: ["club-members-stats", clubId],
    queryFn: () => fetchClubMembers(clubId, 1000, 0), // Get up to 1000 for stats
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: true, // Always fetch for stats
  });

  const allMembersForStats = allMembersData?.members || [];

  // Calculate stats from all members (for accurate counts)
  const stats = useMemo(() => {
    const admins = allMembersForStats.filter((m) => m.role === "admin").length;
    const officers = allMembersForStats.filter((m) => m.role === "officer").length;
    const membersCount = allMembersForStats.filter((m) => m.role === "member").length;
    
    return {
      total: totalCount,
      admins,
      officers,
      members: membersCount,
      pendingInvites: pendingInvites.length,
    };
  }, [allMembersForStats, totalCount, pendingInvites]);

  // Filter and search members
  const filteredMembers = useMemo(() => {
    let filtered = members;

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((m) => m.role === roleFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((m) =>
        m.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [members, roleFilter, searchQuery]);

  // Filter and search invites
  const filteredInvites = useMemo(() => {
    let filtered = pendingInvites;

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((i) => i.role === roleFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((i) =>
        i.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [pendingInvites, roleFilter, searchQuery]);

  // Prefetch next page
  useEffect(() => {
    const totalPages = Math.ceil(totalCount / pageSize);
    if (currentPage < totalPages - 1) {
      queryClient.prefetchQuery({
        queryKey: ["club-members", clubId, currentPage + 1, pageSize],
        queryFn: () =>
          fetchClubMembers(clubId, pageSize, (currentPage + 1) * pageSize),
        staleTime: 2 * 60 * 1000,
      });
    }
  }, [currentPage, pageSize, totalCount, clubId, queryClient]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [pageSize, roleFilter, searchQuery]);

  // Invalidate cache helper
  const invalidateMembers = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["club-members", clubId] });
    refetchInvites();
  }, [clubId, queryClient, refetchInvites]);

  // Handle copy email
  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      addToast({
        title: "Copied",
        description: "Email address copied to clipboard",
        variant: "success",
      });
    } catch (err) {
      addToast({
        title: "Error",
        description: "Failed to copy email",
        variant: "destructive",
      });
    }
  };

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

    setSelectedMember(member);
    setNewRole(newRoleValue);
    setRoleChangeDialogOpen(true);
  };

  const confirmRoleChange = async () => {
    if (!selectedMember) return;

    setIsChangingRole(true);
    try {
      const { error: updateError } = await supabase
        .from("club_memberships")
        .update({ role: newRole })
        .eq("club_id", clubId)
        .eq("user_id", selectedMember.user_id);

      if (updateError) {
        throw new Error(updateError.message || "Failed to update role");
      }

      addToast({
        title: "Role Updated",
        description: `${selectedMember.email}'s role has been changed to ${newRole}.`,
        variant: "success",
      });

      setRoleChangeDialogOpen(false);
      setSelectedMember(null);
      invalidateMembers();
    } catch (err) {
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to update role. Please try again.",
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
        title: "Cannot Remove Admin",
        description: "Admins cannot be removed. Change their role first.",
        variant: "destructive",
      });
      return;
    }

    setSelectedMember(member);
    setRemoveDialogOpen(true);
  };

  const confirmRemoveMember = async () => {
    if (!selectedMember) return;

    setIsRemoving(true);
    try {
      const { error: deleteError } = await supabase
        .from("club_memberships")
        .delete()
        .eq("club_id", clubId)
        .eq("user_id", selectedMember.user_id);

      if (deleteError) {
        throw new Error(deleteError.message || "Failed to remove member");
      }

      addToast({
        title: "Member Removed",
        description: `${selectedMember.email} has been removed from the club.`,
        variant: "success",
      });

      setRemoveDialogOpen(false);
      setSelectedMember(null);
      invalidateMembers();
    } catch (err) {
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

    try {
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

      // Immediately trigger email sending (fire-and-forget)
      // The email is already queued in email_outbox by the database trigger
      // This just processes it immediately instead of waiting for cron
      try {
        const emailResponse = await fetch('/api/send-emails', {
          method: 'POST',
          credentials: 'include',
        });
        
        if (!emailResponse.ok) {
          const errorData = await emailResponse.json().catch(() => ({}));
          console.error('Email worker failed:', errorData);
          // Don't show error to user - email is queued and will be processed by cron
        }
      } catch (emailError) {
        // Silently fail - email is queued and will be processed by cron if this fails
        console.error('Failed to trigger immediate email send:', emailError);
      }

      addToast({
        title: "Invite Sent",
        description: `An invitation has been sent to ${inviteEmail.trim()} as ${inviteRole}.`,
        variant: "success",
      });

      setInviteDialogOpen(false);
      setInviteEmail("");
      setInviteRole("member");
      invalidateMembers();
    } catch (err) {
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

  // Handle cancel invite
  const handleCancelInvite = (invite: ClubInvite) => {
    setSelectedInvite(invite);
    setCancelInviteDialogOpen(true);
  };

  const confirmCancelInvite = async () => {
    if (!selectedInvite) return;

    setIsCanceling(true);
    try {
      const { error: deleteError } = await supabase
        .from("club_invites")
        .delete()
        .eq("id", selectedInvite.id);

      if (deleteError) {
        throw new Error(deleteError.message || "Failed to cancel invite");
      }

      addToast({
        title: "Invite Canceled",
        description: `The invitation to ${selectedInvite.email} has been canceled.`,
        variant: "success",
      });

      setCancelInviteDialogOpen(false);
      setSelectedInvite(null);
      refetchInvites();
    } catch (err) {
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to cancel invite. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCanceling(false);
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

  const getRoleLabel = (role: string): string => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Members</h1>
          <p className="text-muted-foreground mt-1.5">
            View and manage club members and invitations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setInviteDialogOpen(true)}
            disabled={isDeactivated}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Members</p>
              <p className="text-2xl font-semibold mt-1">{stats.total}</p>
            </div>
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Admins</p>
              <p className="text-2xl font-semibold mt-1">{stats.admins}</p>
            </div>
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Officers</p>
              <p className="text-2xl font-semibold mt-1">{stats.officers}</p>
            </div>
            <UserCheck className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Invites</p>
              <p className="text-2xl font-semibold mt-1">{stats.pendingInvites}</p>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load members. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "members" | "invites")} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="invites">
              Invites
              {stats.pendingInvites > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {stats.pendingInvites}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Toolbar */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="officer">Officer</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(parseInt(v))}>
              <SelectTrigger className="w-24">
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

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="rounded-lg border bg-card">
            {isLoading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <Alert variant="destructive">
                  <AlertDescription>
                    {error instanceof Error
                      ? error.message
                      : "Failed to load members. Please try again."}
                  </AlertDescription>
                </Alert>
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No members found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || roleFilter !== "all"
                    ? "Try adjusting your filters"
                    : members.length === 0
                    ? "You're the only member yet. Invite others to join!"
                    : "No members match your search criteria"}
                </p>
                {members.length === 0 && (
                  <Button onClick={() => setInviteDialogOpen(true)} className="mt-4">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Your First Member
                  </Button>
                )}
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => {
                      const isCurrentUser = member.user_id === currentUserId;
                      return (
                        <TableRow key={member.user_id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="text-xs">
                                  {getInitials(member.email)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {getEmailLocalPart(member.email)}
                                  </span>
                                  {isCurrentUser && (
                                    <Badge variant="outline" className="text-xs">
                                      You
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {member.email}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getRoleVariant(member.role)}>
                              {getRoleLabel(member.role)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(member.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleCopyEmail(member.email)}
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Email
                                </DropdownMenuItem>
                                {!isCurrentUser && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() => handleRoleChange(member, "admin")}
                                      disabled={member.role === "admin" || isDeactivated}
                                    >
                                      Admin
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleRoleChange(member, "officer")}
                                      disabled={member.role === "officer" || isDeactivated}
                                    >
                                      Officer
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleRoleChange(member, "member")}
                                      disabled={member.role === "member" || isDeactivated}
                                    >
                                      Member
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      onClick={() => handleRemoveMember(member)}
                                      disabled={
                                        member.role === "admin" || isCurrentUser || isDeactivated
                                      }
                                      className="text-destructive focus:text-destructive"
                                    >
                                      <UserMinus className="h-4 w-4 mr-2" />
                                      Remove Member
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Showing {currentPage * pageSize + 1}-
                      {Math.min((currentPage + 1) * pageSize, totalCount)} of {totalCount} member
                      {totalCount !== 1 ? "s" : ""}
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
                        onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={!canGoNext || isLoading}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>

        {/* Invites Tab */}
        <TabsContent value="invites" className="space-y-4">
          <div className="rounded-lg border bg-card">
            {isLoadingInvites ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                ))}
              </div>
            ) : filteredInvites.length === 0 ? (
              <div className="p-12 text-center">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No pending invites</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || roleFilter !== "all"
                    ? "No invites match your search criteria"
                    : "All invitations have been accepted or there are no pending invites"}
                </p>
                {pendingInvites.length === 0 && (
                  <Button onClick={() => setInviteDialogOpen(true)} className="mt-4">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Your First Member
                  </Button>
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Invited</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvites.map((invite) => (
                    <TableRow key={invite.id}>
                      <TableCell className="font-medium">{invite.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleVariant(invite.role)}>
                          {getRoleLabel(invite.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(invite.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleCopyEmail(invite.email)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleCancelInvite(invite)}
                              disabled={isCanceling || isDeactivated}
                              className="text-destructive focus:text-destructive"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel Invite
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Role Change Dialog */}
      <AlertDialog open={roleChangeDialogOpen} onOpenChange={setRoleChangeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Role?</AlertDialogTitle>
            <AlertDialogDescription>
              Change {selectedMember?.email}'s role from{" "}
              <strong>{selectedMember?.role}</strong> to <strong>{newRole}</strong>?
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
            <AlertDialogAction onClick={confirmRoleChange} disabled={isChangingRole}>
              {isChangingRole ? "Changing..." : "Change Role"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Member Dialog */}
      <AlertDialog open={removeDialogOpen} onOpenChange={setRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member?</AlertDialogTitle>
            <AlertDialogDescription>
              This will revoke {selectedMember?.email}'s access to the club dashboard. They can
              be re-invited later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setRemoveDialogOpen(false);
                setSelectedMember(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRemoveMember}
              disabled={isRemoving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRemoving ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Invite Dialog */}
      <AlertDialog open={cancelInviteDialogOpen} onOpenChange={setCancelInviteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel invite?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the invitation sent to {selectedInvite?.email}. They will no longer
              be able to accept this invitation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setCancelInviteDialogOpen(false);
                setSelectedInvite(null);
              }}
            >
              Keep Invite
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancelInvite}
              disabled={isCanceling}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isCanceling ? "Canceling..." : "Cancel Invite"}
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
              Send an invitation to join your club. They will receive an email with a link to
              accept the invitation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
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
                  <div
                    className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                      inviteRole === "member"
                        ? "border-primary"
                        : "border-muted-foreground"
                    }`}
                  >
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
                  <div
                    className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                      inviteRole === "officer"
                        ? "border-primary"
                        : "border-muted-foreground"
                    }`}
                  >
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
                  <div
                    className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                      inviteRole === "admin"
                        ? "border-primary"
                        : "border-muted-foreground"
                    }`}
                  >
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
