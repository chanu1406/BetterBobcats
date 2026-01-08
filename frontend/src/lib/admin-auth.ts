/**
 * Admin Authentication API Client
 * Functions to interact with backend admin auth API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const ADMIN_SESSION_COOKIE_NAME = "admin_session";

/**
 * Login request/response types
 */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  session_token?: string;
  error?: string;
}

export interface AuthCheckResponse {
  authenticated: boolean;
}

export interface LogoutResponse {
  success: boolean;
}

/**
 * Login admin user
 * Calls backend /api/admin/login endpoint
 */
export async function loginAdmin(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return {
      success: false,
      error: "An error occurred during login",
    };
  }

  return response.json();
}

/**
 * Check if admin is authenticated
 * Calls backend /api/admin/check endpoint
 */
export async function checkAdminAuth(
  sessionToken: string
): Promise<AuthCheckResponse> {
  const response = await fetch(`${API_BASE_URL}/api/admin/check`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${ADMIN_SESSION_COOKIE_NAME}=${sessionToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    return { authenticated: false };
  }

  return response.json();
}

/**
 * Logout admin user
 * Calls backend /api/admin/logout endpoint
 */
export async function logoutAdmin(
  sessionToken: string
): Promise<LogoutResponse> {
  const response = await fetch(`${API_BASE_URL}/api/admin/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${ADMIN_SESSION_COOKIE_NAME}=${sessionToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    return { success: false };
  }

  return response.json();
}

