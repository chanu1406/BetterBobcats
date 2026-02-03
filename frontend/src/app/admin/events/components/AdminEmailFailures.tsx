"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Mail, Loader2, RotateCcw, Trash2 } from "lucide-react";

interface EmailFailureRow {
  id: string;
  to_email: string;
  template: string;
  error: string | null;
  last_attempt_at: string | null;
  attempt_count: number;
  created_at: string;
}

export default function AdminEmailFailures() {
  const supabase = createClient();
  const { addToast } = useToast();

  const [rows, setRows] = useState<EmailFailureRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const loadFailures = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: e } = await supabase
        .from("email_outbox")
        .select("id, to_email, template, error, last_attempt_at, attempt_count, created_at")
        .eq("status", "failed")
        .order("last_attempt_at", { ascending: false })
        .limit(100);

      if (e) {
        throw new Error(e.message || "Failed to load failed emails");
      }
      setRows((data as EmailFailureRow[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load failed emails");
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    loadFailures();
  }, [loadFailures]);

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === rows.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(rows.map((r) => r.id)));
    }
  };

  const handleResetToPending = async () => {
    if (selectedIds.size === 0) return;
    setIsResetting(true);
    setError(null);
    try {
      const ids = Array.from(selectedIds);
      const { error: e } = await supabase
        .from("email_outbox")
        .update({ status: "pending", error: null })
        .in("id", ids);

      if (e) {
        throw new Error(e.message || "Failed to reset emails");
      }
      addToast({
        title: "Reset to pending",
        description: `${ids.length} email${ids.length !== 1 ? "s" : ""} will be retried by the worker.`,
        variant: "success",
      });
      setSelectedIds(new Set());
      await loadFailures();
    } catch (err) {
      addToast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to reset emails",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  const handleClearSelected = async () => {
    if (selectedIds.size === 0) return;
    setIsClearing(true);
    setError(null);
    try {
      const ids = Array.from(selectedIds);
      const { error: e } = await supabase
        .from("email_outbox")
        .delete()
        .in("id", ids);

      if (e) {
        throw new Error(e.message || "Failed to clear emails");
      }
      addToast({
        title: "Cleared",
        description: `${ids.length} failed email${ids.length !== 1 ? "s" : ""} removed from outbox.`,
        variant: "success",
      });
      setClearDialogOpen(false);
      setSelectedIds(new Set());
      await loadFailures();
    } catch (err) {
      addToast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to clear emails",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const truncate = (s: string | null, max: number) => {
    if (!s) return "—";
    if (s.length <= max) return s;
    return s.slice(0, max).trim() + "…";
  };

  const allSelected = rows.length > 0 && selectedIds.size === rows.length;
  const someSelected = selectedIds.size > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <Button variant="outline" size="sm" onClick={loadFailures} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Refresh"
          )}
        </Button>
        {someSelected && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={handleResetToPending}
              disabled={isResetting}
            >
              {isResetting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RotateCcw className="h-4 w-4 mr-2" />
              )}
              Retry ({selectedIds.size})
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setClearDialogOpen(true)}
              disabled={isClearing}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear ({selectedIds.size})
            </Button>
          </>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading…
          </div>
        ) : rows.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            <Mail className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>No failed emails.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>To</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Error</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Last attempt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(row.id)}
                      onCheckedChange={() => toggleOne(row.id)}
                      aria-label={`Select ${row.to_email}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{row.to_email}</TableCell>
                  <TableCell className="text-muted-foreground">{row.template}</TableCell>
                  <TableCell className="text-muted-foreground max-w-[280px]" title={row.error ?? undefined}>
                    {truncate(row.error, 80)}
                  </TableCell>
                  <TableCell>{row.attempt_count}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(row.last_attempt_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear failed emails</AlertDialogTitle>
            <AlertDialogDescription>
              Permanently remove <strong>{selectedIds.size}</strong> failed email
              {selectedIds.size !== 1 ? "s" : ""} from the outbox? They will not be retried.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearSelected}
              disabled={isClearing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isClearing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Clearing…
                </>
              ) : (
                "Clear"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
