import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ClubsHeader() {
  return (
    <header className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Student Clubs
        </h1>
        <p className="text-muted-foreground">
          Discover student organizations at UC Merced
        </p>
      </div>
      <Button variant="outline" asChild className="w-fit shrink-0">
        <Link href="/clubs/request">Suggest a club</Link>
      </Button>
    </header>
  );
}
