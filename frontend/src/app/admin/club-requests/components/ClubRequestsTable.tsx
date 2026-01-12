"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClubRequest } from "@/types/clubRequest";

interface ClubRequestsTableProps {
  requests: ClubRequest[];
}

/**
 * Client component to display club requests in a table
 * Handles row clicks for navigation
 */
export default function ClubRequestsTable({
  requests,
}: ClubRequestsTableProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const truncateDescription = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  const getStatusVariant = (status: ClubRequest["status"]) => {
    switch (status) {
      case "pending":
        return "outline" as const;
      case "approved":
        return "default" as const;
      case "rejected":
        return "destructive" as const;
      default:
        return "outline" as const;
    }
  };

  const handleRowClick = (id: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on the Review button
    if ((e.target as HTMLElement).closest("button, a")) {
      return;
    }
    router.push(`/admin/club-requests/${id}`);
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No club requests found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Club</TableHead>
          <TableHead>Contact Email</TableHead>
          <TableHead>Officers</TableHead>
          <TableHead>Slug Candidate</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow
            key={request.id}
            onClick={(e) => handleRowClick(request.id, e)}
            className={`cursor-pointer hover:bg-muted/50 ${
              request.status === "pending"
                ? "border-l-4 border-l-primary/50"
                : ""
            }`}
          >
            <TableCell>
              <div className="font-medium">{request.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {truncateDescription(request.description)}
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{request.contact_email}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm">{request.officer_emails?.length ?? 0}</div>
            </TableCell>
            <TableCell>
              <div className="text-sm font-mono text-muted-foreground">
                {request.slug_candidate || "—"}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(request.status)}>
                {request.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-sm text-muted-foreground">
                {formatDate(request.created_at)}
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm text-muted-foreground">
                {formatDate(request.updated_at)}
              </div>
            </TableCell>
            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/admin/club-requests/${request.id}`)}
              >
                Review
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
