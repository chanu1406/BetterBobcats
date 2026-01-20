"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ClubRequest } from "@/types/clubRequest";

interface RequestReviewActionsProps {
  request: ClubRequest;
}

/**
 * Client component for approve/reject actions
 */
export default function RequestReviewActions({
  request,
}: RequestReviewActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [slugOverride, setSlugOverride] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const isPending = request.status === "pending";

  const handleApprove = async () => {
    if (!isPending) return;

    setIsApproving(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "approve_club_request",
        {
          p_request_id: request.id,
          p_slug_override: slugOverride.trim() || null,
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to approve request");
      }

      // Trigger email worker to process pending emails
      try {
        await fetch('/api/admin/trigger-email-worker', {
          method: 'POST',
          credentials: 'include',
        });
        // Fire-and-forget: don't wait for response or show errors
        // Emails will be processed asynchronously
      } catch (emailError) {
        // Silently fail - emails will be processed later
        console.error('Failed to trigger email worker:', emailError);
      }

      setSuccess("Request approved successfully!");
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/club-requests?status=pending");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    if (!isPending) return;

    if (!adminMessage.trim()) {
      setError("Admin message is required for rejection");
      return;
    }

    setIsRejecting(true);
    setError(null);
    setSuccess(null);

    try {
      const { data, error: rpcError } = await supabase.rpc(
        "reject_club_request",
        {
          p_request_id: request.id,
          p_admin_message: adminMessage.trim(),
        }
      );

      if (rpcError) {
        throw new Error(rpcError.message || "Failed to reject request");
      }

      // Trigger email worker to process pending emails
      try {
        await fetch('/api/admin/trigger-email-worker', {
          method: 'POST',
          credentials: 'include',
        });
        // Fire-and-forget: don't wait for response or show errors
        // Emails will be processed asynchronously
      } catch (emailError) {
        // Silently fail - emails will be processed later
        console.error('Failed to trigger email worker:', emailError);
      }

      setSuccess("Request rejected successfully!");
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/club-requests?status=pending");
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsRejecting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Logo Preview */}
      {request.logo_url && (
        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/50 min-h-[100px]">
              {logoError ? (
                <p className="text-sm text-muted-foreground">
                  Failed to load logo
                </p>
              ) : (
                <img
                  src={request.logo_url}
                  alt={`${request.name} logo`}
                  className="max-w-full max-h-32 object-contain"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Banner Preview */}
      {request.banner_url && (
        <Card>
          <CardHeader>
            <CardTitle>Banner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-4 border rounded-lg bg-muted/50 min-h-[150px]">
              {bannerError ? (
                <p className="text-sm text-muted-foreground">
                  Failed to load banner
                </p>
              ) : (
                <img
                  src={request.banner_url}
                  alt={`${request.name} banner`}
                  className="max-w-full max-h-48 object-contain"
                  onError={() => setBannerError(true)}
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error/Success Messages */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Approve Card */}
      <Card>
        <CardHeader>
          <CardTitle>Approve Request</CardTitle>
          <CardDescription>
            {isPending
              ? "Approve this club request to publish it on BetterBobcats"
              : "This request is already reviewed."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="slug-override" className="text-sm font-medium">
              Slug Override (Optional)
            </label>
            <Input
              id="slug-override"
              type="text"
              placeholder={request.slug_candidate || "Enter custom slug"}
              value={slugOverride}
              onChange={(e) => setSlugOverride(e.target.value)}
              disabled={!isPending || isApproving || isRejecting}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use the candidate slug:{" "}
              <span className="font-mono">{request.slug_candidate || "N/A"}</span>
            </p>
          </div>
          <Button
            onClick={handleApprove}
            disabled={!isPending || isApproving || isRejecting}
            className="w-full"
          >
            {isApproving ? "Approving..." : "Approve Request"}
          </Button>
        </CardContent>
      </Card>

      {/* Reject Card */}
      <Card>
        <CardHeader>
          <CardTitle>Reject Request</CardTitle>
          <CardDescription>
            {isPending
              ? "Reject this club request with a message to the submitter"
              : "This request is already reviewed."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="admin-message" className="text-sm font-medium">
              Admin Message <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="admin-message"
              placeholder="Enter reason for rejection..."
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
              disabled={!isPending || isApproving || isRejecting}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              This message will be sent to the request submitter.
            </p>
          </div>
          <Button
            onClick={handleReject}
            disabled={!isPending || isApproving || isRejecting || !adminMessage.trim()}
            variant="destructive"
            className="w-full"
          >
            {isRejecting ? "Rejecting..." : "Reject Request"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
