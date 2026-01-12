"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/lib/utils";
import ImageUpload from "./ImageUpload";
import type { ClubCreate } from "@/types/club";

/**
 * Form component for adding a new club with image uploads
 */
export default function AddClubForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
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
      formDataToSend.append("is_active", String(formData.is_active ?? true));
      formDataToSend.append("display_order", String(formData.display_order ?? 0));

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
      router.refresh(); // Refresh to show new club in list
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

          {/* Section C: Advanced Settings */}
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
