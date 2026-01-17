"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import Link from "next/link";

interface RejectedRequest {
  id: string;
  name: string;
  contact_email: string;
  reviewed_at: string;
  admin_message: string | null;
}

interface ListResponse {
  id: string;
  name: string;
  contact_email: string;
  reviewed_at: string;
  admin_message: string | null;
  total_count: number;
}

interface CleanupResponse {
  would_delete_count: number;
  deleted_count: number;
  request_ids: string[];
}

/**
 * Client component for cleaning up rejected club requests
 */
export default function CleanupRejectedRequests() {
  const supabase = createClient();
  const { addToast } = useToast();

  const [olderThanDays, setOlderThanDays] = useState(0);
  const [olderThanDaysInput, setOlderThanDaysInput] = useState("0");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [requests, setRequests] = useState<RejectedRequest[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dry-run state
  const [wouldDeleteCount, setWouldDeleteCount] = useState<number | null>(null);
  const [isDryRunLoading, setIsDryRunLoading] = useState(false);

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Load requests
  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = currentPage * pageSize;
      const { data, error: rpcError } = await supabase.rpc(
        "list_rejected_club_requests_for_cleanup",
        {
          p_older_than_days: olderThanDays,
          p_limit: pageSize,
          p_offset: offset,
        }
      );

      if (rpcError) {
        console.error("RPC Error:", rpcError);
        throw new Error(rpcError.message || "Failed to load requests");
      }

      if (data && data.length > 0) {
        const firstRow = data[0] as ListResponse;
        setTotalCount(firstRow.total_count);
        setRequests(
          data.map((row: ListResponse) => ({
            id: row.id,
            name: row.name,
            contact_email: row.contact_email,
            reviewed_at: row.reviewed_at,
            admin_message: row.admin_message,
          }))
        );
      } else {
        setTotalCount(0);
        setRequests([]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setRequests([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [supabase, olderThanDays, pageSize, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [olderThanDays, pageSize]);

  // Load requests on mount and when filters change
  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  // Preview delete (dry-run)
  const handlePreviewDelete = async () => {
    setIsDryRunLoading(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "cleanup_rejected_club_requests",
        {
          p_older_than_days: olderThanDays,
          p_dry_run: true,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to preview delete");
      }

      // Handle different response formats
      let wouldDeleteCount = 0;
      if (data) {
        // Check if data is an object with the expected structure
        if (typeof data === 'object' && 'would_delete_count' in data) {
          wouldDeleteCount = (data as CleanupResponse).would_delete_count ?? 0;
        } else if (typeof data === 'object' && Array.isArray(data) && data.length > 0) {
          // If it's an array, check the first element
          const firstItem = data[0] as any;
          wouldDeleteCount = firstItem?.would_delete_count ?? 0;
        } else if (typeof data === 'number') {
          // If it's a direct number
          wouldDeleteCount = data;
        } else {
          console.error("Unexpected RPC response format:", data);
        }
      }

      setWouldDeleteCount(wouldDeleteCount);

      addToast({
        title: "Preview Complete",
        description: `Would delete ${wouldDeleteCount} rejected request${wouldDeleteCount !== 1 ? "s" : ""}.`,
        variant: "default",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to preview delete. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDryRunLoading(false);
    }
  };

  // Execute delete
  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "cleanup_rejected_club_requests",
        {
          p_older_than_days: olderThanDays,
          p_dry_run: false,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to delete requests");
      }

      // Handle different response formats
      let deletedCount = 0;
      if (data) {
        // Check if data is an object with the expected structure
        if (typeof data === 'object' && 'deleted_count' in data) {
          deletedCount = (data as CleanupResponse).deleted_count ?? 0;
        } else if (typeof data === 'object' && Array.isArray(data) && data.length > 0) {
          // If it's an array, check the first element
          const firstItem = data[0] as any;
          deletedCount = firstItem?.deleted_count ?? 0;
        } else if (typeof data === 'number') {
          // If it's a direct number
          deletedCount = data;
        } else {
          console.error("Unexpected RPC response format:", data);
        }
      }

      addToast({
        title: "Delete Complete",
        description: `Deleted ${deletedCount} rejected request${deletedCount !== 1 ? "s" : ""}.`,
        variant: "success",
      });

      // Reset state
      setDeleteDialogOpen(false);
      setDeleteConfirmText("");
      setWouldDeleteCount(null);

      // Refresh table and re-run dry-run
      await loadRequests();
      await handlePreviewDelete();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to delete requests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const truncateMessage = (text: string | null, maxLength: number = 80) => {
    if (!text) return "—";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;
  const isDeleteEnabled = deleteConfirmText === "DELETE";

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:w-48">
          <Label htmlFor="older-than-days">Older than (days)</Label>
          <Input
            id="older-than-days"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={olderThanDaysInput}
            onFocus={(e) => {
              // Clear the input if it's "0" so user can type fresh
              if (e.target.value === "0") {
                setOlderThanDaysInput("");
              }
            }}
            onChange={(e) => {
              const value = e.target.value;
              // Allow empty string or numeric values only
              if (value === "" || /^\d+$/.test(value)) {
                setOlderThanDaysInput(value);
                const numValue = value === "" ? 0 : parseInt(value, 10);
                if (!isNaN(numValue) && numValue >= 0) {
                  setOlderThanDays(numValue);
                }
              }
            }}
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value === "") {
                setOlderThanDaysInput("0");
                setOlderThanDays(0);
              } else {
                const numValue = parseInt(value, 10);
                if (!isNaN(numValue) && numValue >= 0) {
                  setOlderThanDaysInput(numValue.toString());
                  setOlderThanDays(numValue);
                } else {
                  setOlderThanDaysInput("0");
                  setOlderThanDays(0);
                }
              }
            }}
            placeholder="0"
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Set to 0 to show all rejected requests. Higher values show only requests reviewed that many days ago or earlier.
          </p>
        </div>
        <div className="w-full sm:w-48">
          <Label htmlFor="page-size">Page size</Label>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(parseInt(value))}
          >
            <SelectTrigger id="page-size" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={loadRequests}
          disabled={isLoading}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Refresh
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Dry-run Summary */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Button
          onClick={handlePreviewDelete}
          disabled={isDryRunLoading || isLoading}
          variant="outline"
        >
          {isDryRunLoading ? "Loading..." : "Preview Delete"}
        </Button>
        {wouldDeleteCount !== null && (
          <div className="text-sm text-muted-foreground">
            Would delete <strong>{wouldDeleteCount}</strong> rejected request
            {wouldDeleteCount !== 1 ? "s" : ""}.
          </div>
        )}
      </div>

      {/* Delete Button */}
      <div>
        <Button
          onClick={() => setDeleteDialogOpen(true)}
          disabled={isLoading || wouldDeleteCount === null || wouldDeleteCount === 0}
          variant="destructive"
        >
          Delete Now
        </Button>
      </div>

      {/* Data Table */}
      <div className="border rounded-lg">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading...
          </div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p className="mb-2">No rejected requests found matching the criteria.</p>
            <p className="text-xs">
              {olderThanDays > 0
                ? `Try setting "Older than" to 0 to see all rejected requests, or reduce the number of days.`
                : "There may be no rejected requests in the database, or they may not have a reviewed_at timestamp."}
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead>Reviewed At</TableHead>
                  <TableHead>Admin Message</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.contact_email}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(request.reviewed_at)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {truncateMessage(request.admin_message)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/club-requests/${request.id}`}
                        className="text-primary hover:underline text-sm"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {requests.length > 0 ? currentPage * pageSize + 1 : 0}-
                {Math.min((currentPage + 1) * pageSize, totalCount)} of{" "}
                {totalCount} request{totalCount !== 1 ? "s" : ""}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete{" "}
              <strong>
                {wouldDeleteCount !== null ? wouldDeleteCount : 0}
              </strong>{" "}
              rejected club request
              {wouldDeleteCount !== null && wouldDeleteCount !== 1 ? "s" : ""}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="delete-confirm">
              Type <strong>DELETE</strong> to confirm:
            </Label>
            <Input
              id="delete-confirm"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="mt-2"
              placeholder="DELETE"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteDialogOpen(false);
                setDeleteConfirmText("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={!isDeleteEnabled || isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
