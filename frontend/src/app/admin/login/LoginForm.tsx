"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

/**
 * Client component for login form with error handling
 */
export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-destructive/10 border-2 border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          disabled={isPending}
          className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background transition-all disabled:opacity-50"
          placeholder="Enter username"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          disabled={isPending}
          className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background transition-all disabled:opacity-50"
          placeholder="Enter password"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

