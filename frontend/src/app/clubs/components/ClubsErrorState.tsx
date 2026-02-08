import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ClubsErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export function ClubsErrorState({
  message = "Something went wrong loading clubs.",
  onRetry,
}: ClubsErrorStateProps) {
  return (
    <Alert variant="destructive" className="max-w-2xl">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <span>{message}</span>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="w-fit">
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
