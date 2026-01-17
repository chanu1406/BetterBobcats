"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Club {
  id: string;
  name: string;
  description: string;
  website: string | null;
}

interface Major {
  id: string;
  name: string;
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all majors on mount
  useEffect(() => {
    async function fetchMajors() {
      try {
        const { data, error } = await supabase
          .from("majors")
          .select("id, name")
          .order("name");

        if (error) throw error;
        setMajors(data || []);
      } catch (err) {
        console.error("Error fetching majors:", err);
        setError("Failed to load majors");
      }
    }

    fetchMajors();
  }, []);

  // Fetch clubs when selected major changes
  useEffect(() => {
    async function fetchClubs() {
      setLoading(true);
      setError(null);

      try {
        if (!selectedMajor) {
          // No major selected - show all clubs
          const { data, error } = await supabase
            .from("clubs")
            .select("id, name, description, website")
            .order("name");

          if (error) throw error;
          setClubs(data || []);
        } else {
          // Filter by selected major using JOIN query
          const { data, error } = await supabase
            .from("clubs")
            .select(
              `
              id,
              name,
              description,
              website,
              club_majors!inner(
                major_id
              )
            `
            )
            .eq("club_majors.major_id", selectedMajor)
            .order("name");

          if (error) throw error;
          setClubs(data || []);
        }
      } catch (err) {
        console.error("Error fetching clubs:", err);
        setError("Failed to load clubs");
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, [selectedMajor]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/15">
      {/* Navigation Bar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/BetterBobcatsLogo.svg" 
                alt="BetterBobcats Logo"
                className="h-10 w-auto"
              />
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">BetterBobcats</h2>
                <span className="text-xs text-muted-foreground">UC Merced</span>
              </div>
            </Link>
            <div className="flex gap-6 items-center">
              <Link
                href="/degrees"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Degrees
              </Link>
              <Link
                href="/clubs"
                className="text-sm font-medium text-primary transition-colors"
              >
                Clubs
              </Link>
              <Link href="/clubs/request">
                <Button size="sm">Request a Club</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Student Clubs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover student organizations at UC Merced and find clubs that match your major and interests
          </p>
        </div>

        {/* Major Filter */}
        <div className="mb-8 max-w-md mx-auto">
          <label
            htmlFor="major-select"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Filter by Major
          </label>
          <select
            id="major-select"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            className="w-full px-4 py-3 border-2 border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-card transition-all"
          >
            <option value="">All Majors</option>
            {majors.map((major) => (
              <option key={major.id} value={major.id}>
                {major.name}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-destructive/10 border-2 border-destructive/30 text-destructive px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading clubs...</p>
          </div>
        ) : (
          <>
            {/* Clubs List */}
            {clubs.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-xl border-2 border-primary/20 max-w-4xl mx-auto">
                <p className="text-lg text-muted-foreground">
                  No clubs found for this major.
                </p>
                <button
                  onClick={() => setSelectedMajor("")}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  View All Clubs
                </button>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto space-y-6">
                {clubs.map((club) => (
                  <div
                    key={club.id}
                    className="bg-card p-8 rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all group"
                  >
                    <h2 className="text-2xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                      {club.name}
                    </h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {club.description}
                    </p>
                    {club.website && (
                      <a
                        href={club.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-all hover:gap-3"
                      >
                        Visit Website
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Results Count */}
            <p className="mt-8 text-sm text-muted-foreground text-center">
              Showing {clubs.length} {clubs.length === 1 ? "club" : "clubs"}
              {selectedMajor && " for selected major"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
