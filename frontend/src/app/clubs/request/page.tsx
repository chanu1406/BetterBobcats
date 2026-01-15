import { requireUser } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import ClubRequestForm from "./components/ClubRequestForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Major } from "@/types/major";

export const metadata = {
  title: "Request a Club - BetterBobcats",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Club Request Submission Page
 * Logged-in users can submit a club request form
 */
export default async function ClubRequestPage() {
  // Enforce authentication - redirects to /auth/login?next=/clubs/request if not logged in
  const user = await requireUser("/clubs/request");

  // Fetch majors list for the form
  const supabase = await createClient();
  const { data: majors, error: majorsError } = await supabase
    .from("majors")
    .select("id, name")
    .order("name");

  if (majorsError) {
    console.error("Error fetching majors:", majorsError);
  }

  const majorsList: Major[] = majors || [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-semibold text-foreground mb-3">
            Request a Club
          </h1>
          <p className="text-muted-foreground text-base">
            Submit a request to add your club to BetterBobcats
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form - Left Side (2 columns) */}
          <div className="lg:col-span-2">
            <ClubRequestForm
              userEmail={user.email || ""}
              majors={majorsList}
            />
          </div>

          {/* Guidelines - Right Side (1 column) */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Submission Guidelines</CardTitle>
                <CardDescription>
                  Please review before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">
                    Required Information
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Club name and description</li>
                    <li>Contact email</li>
                    <li>At least one officer email</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium text-foreground mb-2">
                    Review Process
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your request will be reviewed by administrators. You'll
                    receive an email notification once a decision is made.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium text-foreground mb-2">
                    After Submission
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    You can track the status of your request on your{" "}
                    <a
                      href="/clubs/my-requests"
                      className="text-primary hover:underline"
                    >
                      requests page
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
