"use client";

import { useState } from "react";
import type { Major } from "@/types/major";

interface AddMajorFormProps {
  onMajorCreated?: () => void;
}

/**
 * Form component for adding a new major
 */
export default function AddMajorForm({ onMajorCreated }: AddMajorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/majors/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Failed to create major" }));
        throw new Error(errorData.detail || "Failed to create major");
      }

      // Reset form
      setName("");
      
      // Refresh the majors list
      if (onMajorCreated) {
        onMajorCreated();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-sm">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-8">
          Add New Major
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Major Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-muted/40 text-foreground transition-all disabled:opacity-50 placeholder:text-muted-foreground"
              placeholder="e.g., Computer Science and Engineering"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Enter the full name of the major/degree program
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-sm"
          >
            {isSubmitting ? "Creating..." : "Create Major"}
          </button>
        </form>
      </div>
    </div>
  );
}


