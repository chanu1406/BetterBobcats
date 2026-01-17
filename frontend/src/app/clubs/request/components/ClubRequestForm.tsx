"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { generateSlug } from "@/lib/utils";
import { normalizeClubRequestEmails } from "@/lib/email-utils";
import { submitClubRequest } from "../actions";
import { createClient } from "@/lib/supabase/browser";
import DragDropImageUpload from "./DragDropImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Major } from "@/types/major";

interface ClubRequestFormProps {
  userEmail: string;
  majors: Major[];
}

/**
 * Client form component for submitting a club request
 */
export default function ClubRequestForm({
  userEmail,
  majors,
}: ClubRequestFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [slugCandidate, setSlugCandidate] = useState("");
  const [contactEmail, setContactEmail] = useState(userEmail || "");
  const [officerEmails, setOfficerEmails] = useState<string[]>([""]);
  const [officerPhones, setOfficerPhones] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTagInput, setCurrentTagInput] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Majors
  const [selectedMajorIds, setSelectedMajorIds] = useState<Set<string>>(
    new Set()
  );
  const [majorNotes, setMajorNotes] = useState<Record<string, string>>({});

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  // Auto-generate slug from name (only when name changes and slug is empty)
  // Use a ref to track if we should auto-generate (prevents loops)
  const shouldAutoGenerateSlug = useRef(true);
  
  useEffect(() => {
    if (name && name.trim() && shouldAutoGenerateSlug.current) {
      const generated = generateSlug(name);
      if (generated) {
        setSlugCandidate(generated);
      }
    }
  }, [name]);

  // Track manual slug edits
  const handleSlugChange = (value: string) => {
    shouldAutoGenerateSlug.current = false; // User is manually editing
    setSlugCandidate(value);
  };

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (logoPreview && logoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(logoPreview);
      }
      if (bannerPreview && bannerPreview.startsWith("blob:")) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [logoPreview, bannerPreview]);

  // Validation
  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = "Club name is required";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    }

    if (!contactEmail.trim()) {
      errors.contactEmail = "Contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      errors.contactEmail = "Please enter a valid email address";
    }

    const validOfficerEmails = officerEmails.filter((e) => e.trim());
    if (validOfficerEmails.length === 0) {
      errors.officerEmails = "At least one officer email is required";
    } else {
      for (let i = 0; i < validOfficerEmails.length; i++) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validOfficerEmails[i])) {
          errors.officerEmails = `Officer email ${i + 1} is invalid`;
          break;
        }
      }
    }

    if (website && website.trim()) {
      try {
        new URL(website);
      } catch {
        errors.website = "Please enter a valid URL";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validate()) {
      return;
    }

    startTransition(async () => {
      try {
        // Normalize and deduplicate emails
        const normalizedEmails = normalizeClubRequestEmails(
          contactEmail,
          officerEmails
        );

        // Step 1: Create the club request
        const result = await submitClubRequest({
          name: name.trim(),
          description: description.trim(),
          website: website.trim() || null,
          slug_candidate: slugCandidate.trim() || null,
          contact_email: normalizedEmails.contact_email,
          officer_emails: normalizedEmails.officer_emails,
          officer_phones: officerPhones.filter((p) => p.trim()),
          logo_url: null, // Will be updated after upload
          banner_url: null, // Will be updated after upload
          tags: tags.filter((t) => t.trim()),
          major_ids: Array.from(selectedMajorIds),
          major_notes: majorNotes,
        });

        if (!result.ok || !result.request_id) {
          setError(result.error || "Failed to submit request");
          return;
        }

        const requestId = result.request_id;
        const supabase = createClient();
        const STORAGE_BUCKET = "club-assets";

        // Step 2: Upload logo if provided
        if (logoFile) {
          try {
            const fileExtension = logoFile.name.split(".").pop() || "png";
            const storagePath = `club-requests/${requestId}/logo.${fileExtension}`;
            
            const { error: uploadError } = await supabase.storage
              .from(STORAGE_BUCKET)
              .upload(storagePath, logoFile, {
                contentType: logoFile.type,
                upsert: true,
              });

            if (!uploadError) {
              const {
                data: { publicUrl },
              } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);

              // Update request with logo URL
              await supabase
                .from("club_requests")
                .update({ logo_url: publicUrl })
                .eq("id", requestId);
            }
          } catch (err) {
            console.error("Error uploading logo:", err);
            // Continue even if logo upload fails
          }
        }

        // Step 3: Upload banner if provided
        if (bannerFile) {
          try {
            const fileExtension = bannerFile.name.split(".").pop() || "jpg";
            const storagePath = `club-requests/${requestId}/banner.${fileExtension}`;
            
            const { error: uploadError } = await supabase.storage
              .from(STORAGE_BUCKET)
              .upload(storagePath, bannerFile, {
                contentType: bannerFile.type,
                upsert: true,
              });

            if (!uploadError) {
              const {
                data: { publicUrl },
              } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);

              // Update request with banner URL
              await supabase
                .from("club_requests")
                .update({ banner_url: publicUrl })
                .eq("id", requestId);
            }
          } catch (err) {
            console.error("Error uploading banner:", err);
            // Continue even if banner upload fails
          }
        }

        setSuccess(true);
        // Redirect to my-requests after a short delay
        setTimeout(() => {
          router.push("/clubs/my-requests");
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to submit request");
      }
    });
  };

  // Dynamic array helpers
  const addOfficerEmail = () => {
    // Only add a new field if the last email field is not empty
    const lastEmail = officerEmails[officerEmails.length - 1];
    if (lastEmail && lastEmail.trim() !== "") {
      // Check if this email already exists (case-insensitive)
      const emailLower = lastEmail.trim().toLowerCase();
      const exists = officerEmails.some(
        (e, idx) => idx !== officerEmails.length - 1 && e.trim().toLowerCase() === emailLower
      );
      if (!exists) {
        setOfficerEmails([...officerEmails, ""]);
      }
    } else if (officerEmails.length === 0) {
      // If no emails exist, add one
      setOfficerEmails([""]);
    }
  };

  const removeOfficerEmail = (index: number) => {
    setOfficerEmails(officerEmails.filter((_, i) => i !== index));
  };

  const updateOfficerEmail = (index: number, value: string) => {
    const newEmails = [...officerEmails];
    newEmails[index] = value;
    setOfficerEmails(newEmails);
  };

  // Handle Enter key in email fields - add new field if current is filled, otherwise submit
  const handleOfficerEmailKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentEmail = officerEmails[index]?.trim() || "";
      
      if (currentEmail) {
        // If current email is filled and we're on the last field, add a new empty field
        if (index === officerEmails.length - 1) {
          // Check if this email already exists (case-insensitive)
          const emailLower = currentEmail.toLowerCase();
          const exists = officerEmails.some(
            (e, idx) => idx !== index && e.trim().toLowerCase() === emailLower
          );
          if (!exists) {
            addOfficerEmail();
          }
        } else {
          // Move focus to next field
          const nextInput = e.currentTarget.parentElement?.nextElementSibling?.querySelector("input");
          if (nextInput instanceof HTMLInputElement) {
            nextInput.focus();
          }
        }
      } else {
        // If current email is empty, try to submit the form
        const form = e.currentTarget.closest("form");
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  const addOfficerPhone = () => {
    setOfficerPhones([...officerPhones, ""]);
  };

  const removeOfficerPhone = (index: number) => {
    setOfficerPhones(officerPhones.filter((_, i) => i !== index));
  };

  const updateOfficerPhone = (index: number, value: string) => {
    const newPhones = [...officerPhones];
    newPhones[index] = value;
    setOfficerPhones(newPhones);
  };

  // Dynamic array helpers - Tags
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTagInput.trim()) {
      e.preventDefault();
      const trimmedTag = currentTagInput.trim();
      // Don't add duplicates
      if (!tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
      }
      setCurrentTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleMajorToggle = (majorId: string) => {
    const newSelected = new Set(selectedMajorIds);
    if (newSelected.has(majorId)) {
      newSelected.delete(majorId);
      // Remove note if major is deselected
      const newNotes = { ...majorNotes };
      delete newNotes[majorId];
      setMajorNotes(newNotes);
    } else {
      newSelected.add(majorId);
    }
    setSelectedMajorIds(newSelected);
  };

  const updateMajorNote = (majorId: string, note: string) => {
    setMajorNotes({ ...majorNotes, [majorId]: note });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Club Request Form</CardTitle>
        <CardDescription>
          Fill out all required fields to submit your club request
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 rounded-lg text-sm">
            Request submitted successfully! Redirecting to your requests...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Core Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Core Information
              </h3>
            </div>

            {/* Club Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Club Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
                placeholder="e.g., ACM (Association for Computing Machinery)"
                className={
                  validationErrors.name ? "border-destructive" : ""
                }
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-destructive">
                  {validationErrors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Description <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isPending}
                rows={6}
                placeholder="Describe the club's purpose and activities..."
                className={
                  validationErrors.description ? "border-destructive" : ""
                }
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-destructive">
                  {validationErrors.description}
                </p>
              )}
            </div>

            {/* Website */}
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Website URL
              </label>
              <Input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                disabled={isPending}
                placeholder="https://example.com"
                className={
                  validationErrors.website ? "border-destructive" : ""
                }
              />
              {validationErrors.website && (
                <p className="mt-1 text-sm text-destructive">
                  {validationErrors.website}
                </p>
              )}
            </div>

            {/* Slug Candidate */}
            <div>
              <label
                htmlFor="slug_candidate"
                className="block text-sm font-medium text-foreground mb-2"
              >
                URL Slug (optional)
              </label>
              <Input
                id="slug_candidate"
                value={slugCandidate}
                onChange={(e) => handleSlugChange(e.target.value)}
                disabled={isPending}
                placeholder="auto-generated from name"
                pattern="[a-z0-9\-]+"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                URL-friendly identifier (auto-generated from name, editable)
              </p>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Contact Information
              </h3>
            </div>

            {/* Contact Email */}
            <div>
              <label
                htmlFor="contact_email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Contact Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="contact_email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                disabled={isPending}
                className={
                  validationErrors.contactEmail ? "border-destructive" : ""
                }
              />
              {validationErrors.contactEmail && (
                <p className="mt-1 text-sm text-destructive">
                  {validationErrors.contactEmail}
                </p>
              )}
            </div>

            {/* Officer Emails */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Officer Emails <span className="text-destructive">*</span>
              </label>
              {officerEmails.map((email, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => updateOfficerEmail(index, e.target.value)}
                    onKeyDown={(e) => handleOfficerEmailKeyDown(e, index)}
                    disabled={isPending}
                    placeholder={`officer${index + 1}@example.com`}
                    className={
                      validationErrors.officerEmails ? "border-destructive" : ""
                    }
                  />
                  {officerEmails.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeOfficerEmail(index)}
                      disabled={isPending}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {validationErrors.officerEmails && (
                <p className="mt-1 text-sm text-destructive">
                  {validationErrors.officerEmails}
                </p>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  addOfficerEmail();
                }}
                disabled={isPending}
                className="mt-2"
              >
                Add Officer Email
              </Button>
            </div>

            {/* Officer Phones */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Officer Phones (optional)
              </label>
              {officerPhones.map((phone, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => updateOfficerPhone(index, e.target.value)}
                    disabled={isPending}
                    placeholder="(555) 123-4567"
                  />
                  {officerPhones.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeOfficerPhone(index)}
                      disabled={isPending}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addOfficerPhone}
                disabled={isPending}
                className="mt-2"
              >
                Add Officer Phone
              </Button>
            </div>
          </div>

          <Separator />

          {/* Additional Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Additional Information
              </h3>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags (optional)
              </label>
              <Input
                value={currentTagInput}
                onChange={(e) => setCurrentTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                disabled={isPending}
                placeholder="Type a tag and press Enter"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="group relative pr-7 cursor-default"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        disabled={isPending}
                        className="opacity-0 group-hover:opacity-100 absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
                        aria-label={`Remove ${tag}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Majors */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Related Majors (optional)
              </label>
              <div className="space-y-3 max-h-64 overflow-y-auto border rounded-lg p-4">
                {majors.map((major) => (
                  <div key={major.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`major-${major.id}`}
                        checked={selectedMajorIds.has(major.id)}
                        onChange={() => handleMajorToggle(major.id)}
                        disabled={isPending}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
                      />
                      <label
                        htmlFor={`major-${major.id}`}
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        {major.name}
                      </label>
                    </div>
                    {selectedMajorIds.has(major.id) && (
                      <div className="ml-6">
                        <Textarea
                          placeholder="Optional note for this major..."
                          value={majorNotes[major.id] || ""}
                          onChange={(e) =>
                            updateMajorNote(major.id, e.target.value)
                          }
                          disabled={isPending}
                          rows={2}
                          className="text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {majors.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No majors available
                </p>
              )}
            </div>

            {/* Logo Upload */}
            <div>
              <DragDropImageUpload
                label="Logo"
                type="logo"
                file={logoFile}
                previewUrl={logoPreview}
                onFileChange={(file) => {
                  setLogoFile(file);
                  if (file) {
                    const preview = URL.createObjectURL(file);
                    setLogoPreview(preview);
                  } else {
                    if (logoPreview && logoPreview.startsWith("blob:")) {
                      URL.revokeObjectURL(logoPreview);
                    }
                    setLogoPreview(null);
                  }
                }}
                disabled={isPending}
              />
            </div>

            {/* Banner Upload */}
            <div>
              <DragDropImageUpload
                label="Banner"
                type="banner"
                file={bannerFile}
                previewUrl={bannerPreview}
                onFileChange={(file) => {
                  setBannerFile(file);
                  if (file) {
                    const preview = URL.createObjectURL(file);
                    setBannerPreview(preview);
                  } else {
                    if (bannerPreview && bannerPreview.startsWith("blob:")) {
                      URL.revokeObjectURL(bannerPreview);
                    }
                    setBannerPreview(null);
                  }
                }}
                disabled={isPending}
              />
            </div>
          </div>

          <Separator />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
            size="lg"
          >
            {isPending ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
