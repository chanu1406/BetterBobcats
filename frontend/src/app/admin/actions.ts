"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  loginAdmin,
  logoutAdmin,
  ADMIN_SESSION_COOKIE_NAME,
} from "@/lib/admin-auth";

/**
 * Server action to handle admin login
 * Validates credentials with backend and sets session cookie
 * Works with useActionState - takes prevState and formData
 */
export async function loginAction(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const response = await loginAdmin(username, password);

    if (response.success && response.session_token) {
      // Set session cookie
      const cookieStore = await cookies();
      cookieStore.set(ADMIN_SESSION_COOKIE_NAME, response.session_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      // Redirect to admin dashboard
      redirect("/admin");
    } else {
      // Return generic error message
      return {
        error: response.error || "Invalid username or password",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: "An error occurred during login. Please try again.",
    };
  }
}

/**
 * Server action to check admin authentication
 * Validates session token with backend
 */
export async function checkAuthAction(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

    if (!sessionToken) {
      return false;
    }

    // Make server-side fetch to backend
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await fetch(`${API_BASE_URL}/api/admin/check`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${ADMIN_SESSION_COOKIE_NAME}=${sessionToken}`,
      },
      cache: "no-store", // Ensure fresh check
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    console.error("Auth check error:", error);
    return false;
  }
}

/**
 * Server action to handle admin logout
 * Clears session cookie and calls backend logout
 */
export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;

    // Call backend logout (optional, but good practice)
    if (sessionToken) {
      await logoutAdmin(sessionToken);
    }

    // Clear session cookie
    cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);

    // Redirect to login
    redirect("/admin/login");
  } catch (error) {
    console.error("Logout error:", error);
    // Even if backend call fails, clear the cookie
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
    redirect("/admin/login");
  }
}

