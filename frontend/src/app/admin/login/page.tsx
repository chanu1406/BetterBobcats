import { redirect } from "next/navigation";

/**
 * Admin Login Redirect Page
 * Redirects to /auth/login to avoid layout protection
 */
export default function AdminLoginRedirectPage() {
  redirect("/auth/login");
}
