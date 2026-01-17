import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ClubRequest } from "@/types/clubRequest";

interface MajorWithNote {
  major_id: string;
  major_name: string;
  note: string | null;
}

interface RequestDetailsProps {
  request: ClubRequest;
  tags: string[];
  majors: MajorWithNote[];
}

/**
 * Presentational component to display club request details
 */
export default function RequestDetails({
  request,
  tags,
  majors,
}: RequestDetailsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
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

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {request.description}
          </p>
        </CardContent>
      </Card>

      {/* Website */}
      {request.website && (
        <Card>
          <CardHeader>
            <CardTitle>Website</CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href={request.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {request.website}
            </a>
          </CardContent>
        </Card>
      )}

      {/* Slug Candidate */}
      <Card>
        <CardHeader>
          <CardTitle>Slug Candidate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm font-mono text-muted-foreground">
            {request.slug_candidate || "—"}
          </p>
        </CardContent>
      </Card>

      {/* Contact Email */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Email</CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href={`mailto:${request.contact_email}`}
            className="text-sm text-primary hover:underline"
          >
            {request.contact_email}
          </a>
        </CardContent>
      </Card>

      {/* Officers */}
      <Card>
        <CardHeader>
          <CardTitle>Officers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {request.officer_emails && request.officer_emails.length > 0 ? (
            <div>
              <p className="text-sm font-medium mb-2">Emails:</p>
              <ul className="list-disc list-inside space-y-1">
                {request.officer_emails.map((email, idx) => (
                  <li key={idx} className="text-sm">
                    <a
                      href={`mailto:${email}`}
                      className="text-primary hover:underline"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No officer emails</p>
          )}

          {request.officer_phones && request.officer_phones.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Phones:</p>
              <ul className="list-disc list-inside space-y-1">
                {request.officer_phones.map((phone, idx) => (
                  <li key={idx} className="text-sm">{phone}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No tags</p>
          )}
        </CardContent>
      </Card>

      {/* Majors */}
      <Card>
        <CardHeader>
          <CardTitle>Majors</CardTitle>
        </CardHeader>
        <CardContent>
          {majors.length > 0 ? (
            <div className="space-y-4">
              <ul className="space-y-2">
                {majors.map((major) => (
                  <li key={major.major_id} className="space-y-1">
                    <p className="text-sm font-medium">{major.major_name}</p>
                    {major.note && (
                      <p className="text-sm text-muted-foreground pl-4 border-l-2 border-muted">
                        {major.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No majors selected
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
