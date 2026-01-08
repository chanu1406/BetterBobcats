"use client";

import { useState, useEffect } from "react";
import { generateSlug } from "@/lib/utils";
import ImageUpload from "./ImageUpload";
import type { ClubCreate } from "@/types/club";
import type { Major } from "@/types/major";
import { fetchMajors } from "@/lib/api";

interface AddClubFormProps {
  onClubCreated?: () => void;
}

/**
 * Form component for adding a new club with image uploads, tags, majors, and notes
 */
export default function AddClubForm({ onClubCreated }: AddClubFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [majorNotes, setMajorNotes] = useState<Record<string, string>>({});
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState<ClubCreate>({
    name: "",
    description: "",
    website: null,
    slug: null,
    is_active: true,
    display_order: 0,
    logo_url: null,
    banner_url: null,
  });

  // Fetch majors on mount
  useEffect(() => {
    const loadMajors = async () => {
      try {
        const data = await fetchMajors();
        setMajors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load majors");
      }
    };
    loadMajors();
  }, []);

  // Auto-generate slug from name
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const generatedSlug = generateSlug(formData.name);
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, formData.slug]);

  const handleLogoUpload = async (file: File): Promise<string> => {
    // Store file for later upload (after club creation)
    setLogoFile(file);
    // Return a preview URL
    return URL.createObjectURL(file);
  };

  const handleBannerUpload = async (file: File): Promise<string> => {
    // Store file for later upload (after club creation)
    setBannerFile(file);
    // Return a preview URL
    return URL.createObjectURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      // Step 1: Create club first (to get the slug)
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      if (formData.website) formDataToSend.append("website", formData.website);
      if (formData.slug) formDataToSend.append("slug", formData.slug);
      formDataToSend.append("is_active", formData.is_active.toString());
      formDataToSend.append("display_order", formData.display_order.toString());
      
      // Add tags, majors, and notes as JSON strings
      if (tags.length > 0) {
        formDataToSend.append("tags", JSON.stringify(tags));
      }
      if (selectedMajors.length > 0) {
        formDataToSend.append("major_ids", JSON.stringify(selectedMajors));
      }
      // Include notes only for majors that have notes
      const notesToSend: Record<string, string> = {};
      selectedMajors.forEach(majorId => {
        if (majorNotes[majorId] && majorNotes[majorId].trim()) {
          notesToSend[majorId] = majorNotes[majorId].trim();
        }
      });
      if (Object.keys(notesToSend).length > 0) {
        formDataToSend.append("major_notes", JSON.stringify(notesToSend));
      }

      const createResponse = await fetch(`${API_BASE_URL}/api/clubs/`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!createResponse.ok) {
        const errorData = await createResponse.json().catch(() => ({ detail: "Failed to create club" }));
        throw new Error(errorData.detail || "Failed to create club");
      }

      const createdClub = await createResponse.json();
      const clubSlug = createdClub.slug;

      // Step 2: Upload images if provided (upload endpoints already update the club record)
      if (logoFile && clubSlug) {
        const logoFormData = new FormData();
        logoFormData.append("file", logoFile);

        await fetch(`${API_BASE_URL}/api/clubs/${clubSlug}/upload-logo`, {
          method: "POST",
          body: logoFormData,
        });
      }

      if (bannerFile && clubSlug) {
        const bannerFormData = new FormData();
        bannerFormData.append("file", bannerFile);

        await fetch(`${API_BASE_URL}/api/clubs/${clubSlug}/upload-banner`, {
          method: "POST",
          body: bannerFormData,
        });
      }

      // Reset form
      setFormData({
        name: "",
        description: "",
        website: null,
        slug: null,
        is_active: true,
        display_order: 0,
        logo_url: null,
        banner_url: null,
      });
      setLogoFile(null);
      setBannerFile(null);
      setTags([]);
      setTagInput("");
      setSelectedMajors([]);
      setMajorNotes({});
      
      // Refresh the clubs list immediately
      if (onClubCreated) {
        onClubCreated();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseInt(value) || 0
          : value === ""
          ? null
          : value,
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleMajorChange = (majorId: string, checked: boolean) => {
    if (checked) {
      setSelectedMajors([...selectedMajors, majorId]);
    } else {
      setSelectedMajors(selectedMajors.filter(id => id !== majorId));
      // Remove note for deselected major
      const newNotes = { ...majorNotes };
      delete newNotes[majorId];
      setMajorNotes(newNotes);
    }
  };

  const handleMajorNoteChange = (majorId: string, note: string) => {
    setMajorNotes({ ...majorNotes, [majorId]: note });
  };

  return (
    <div className="bg-card rounded-xl shadow-sm">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-8">
          Add New Club
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section A: Core Club Information */}
          <div className="space-y-6">
            <div className="space-y-1.5 mb-8">
              <h3 className="text-lg font-semibold text-foreground">Core Club Information</h3>
              <p className="text-sm text-muted-foreground">Basic details about the club</p>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Club Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-muted/40 text-foreground transition-all disabled:opacity-50 placeholder:text-muted-foreground"
                placeholder="e.g., ACM (Association for Computing Machinery)"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description || ""}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={6}
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-muted/40 text-foreground transition-all disabled:opacity-50 placeholder:text-muted-foreground resize-y"
                placeholder="Describe the club's purpose and activities..."
              />
            </div>

            {/* Website */}
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Website URL
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-muted/40 text-foreground transition-all disabled:opacity-50 placeholder:text-muted-foreground"
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Section B: Branding */}
          <div className="space-y-6">
            <div className="space-y-1.5 mb-8">
              <h3 className="text-lg font-semibold text-foreground">Branding</h3>
              <p className="text-sm text-muted-foreground">Visual identity for the club</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-foreground mb-3">Club Logo</div>
                <ImageUpload
                  label="Club Logo"
                  type="logo"
                  currentUrl={formData.logo_url}
                  onUpload={handleLogoUpload}
                  onError={(err) => setError(err)}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-3">Club Banner</div>
                <ImageUpload
                  label="Club Banner"
                  type="banner"
                  currentUrl={formData.banner_url}
                  onUpload={handleBannerUpload}
                  onError={(err) => setError(err)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Section C: Tags */}
          <div className="space-y-6">
            <div className="space-y-1.5 mb-8">
              <h3 className="text-lg font-semibold text-foreground">Tags</h3>
              <p className="text-sm text-muted-foreground">Categorize the club (e.g., STEM, Social, Professional)</p>
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-muted/40 text-foreground transition-all disabled:opacity-50 placeholder:text-muted-foreground"
                placeholder="Type a tag and press Enter to add"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Press Enter to add a tag
              </p>
              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-md text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        disabled={isSubmitting}
                        className="hover:text-destructive transition-colors disabled:opacity-50"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section D: Majors */}
          <div className="space-y-6">
            <div className="space-y-1.5 mb-8">
              <h3 className="text-lg font-semibold text-foreground">Related Majors</h3>
              <p className="text-sm text-muted-foreground">Select majors this club is relevant to</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Majors
              </label>
              <div className="space-y-3 max-h-64 overflow-y-auto border border-border rounded-lg p-4 bg-muted/20">
                {majors.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Loading majors...</p>
                ) : (
                  majors.map((major) => (
                    <div key={major.id} className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={`major-${major.id}`}
                          checked={selectedMajors.includes(major.id)}
                          onChange={(e) => handleMajorChange(major.id, e.target.checked)}
                          disabled={isSubmitting}
                          className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20 disabled:opacity-50"
                        />
                        <label
                          htmlFor={`major-${major.id}`}
                          className="text-sm font-medium text-foreground cursor-pointer flex-1"
                        >
                          {major.name}
                        </label>
                      </div>
                      {selectedMajors.includes(major.id) && (
                        <div className="ml-7">
                          <label
                            htmlFor={`note-${major.id}`}
                            className="block text-xs font-medium text-muted-foreground mb-1"
                          >
                            Note (optional)
                          </label>
                          <textarea
                            id={`note-${major.id}`}
                            value={majorNotes[major.id] || ""}
                            onChange={(e) => handleMajorNoteChange(major.id, e.target.value)}
                            disabled={isSubmitting}
                            rows={2}
                            className="w-full px-3 py-2 text-sm rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-background/50 text-foreground transition-all disabled:opacity-50 placeholder:text-muted-foreground resize-y"
                            placeholder="Explain how this club relates to this major..."
                          />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              {selectedMajors.length > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {selectedMajors.length} major{selectedMajors.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          </div>

          {/* Section E: Advanced Settings */}
          <div className="space-y-6">
            <div className="bg-muted/15 rounded-lg p-6">
              <div className="space-y-1.5 mb-6">
                <h3 className="text-base font-medium text-muted-foreground">Advanced Settings</h3>
                <p className="text-xs text-muted-foreground">Optional configuration</p>
              </div>

              <div className="space-y-5">
                {/* Slug */}
                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    URL Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug || ""}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-background/50 text-foreground transition-all disabled:opacity-50 placeholder:text-muted-foreground"
                    placeholder="e.g., acm (auto-generated from name)"
                    pattern="[a-z0-9\-]+"
                    title="Lowercase letters, numbers, and hyphens only"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    URL-friendly identifier (auto-generated from name if empty)
                  </p>
                </div>

                {/* Display Order */}
                <div>
                  <label
                    htmlFor="display_order"
                    className="block text-sm font-medium text-muted-foreground mb-2"
                  >
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="display_order"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    min="0"
                    className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary/20 focus:outline-none bg-background/50 text-foreground transition-all disabled:opacity-50"
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Lower numbers appear first (default: 0)
                  </p>
                </div>

                {/* Is Active */}
                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20 disabled:opacity-50"
                  />
                  <label
                    htmlFor="is_active"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Active (visible in public listings)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-sm"
          >
            {isSubmitting ? "Creating..." : "Create Club"}
          </button>
        </form>
      </div>
    </div>
  );
}
