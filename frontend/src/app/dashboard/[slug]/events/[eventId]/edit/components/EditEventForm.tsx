"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateEvent } from "../../../actions";
import { createClient } from "@/lib/supabase/browser";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Major } from "@/types/major";
import Link from "next/link";
import DragDropImageUpload from "../../../new/components/DragDropImageUpload";
import { DateTimePicker } from "../../../new/components/DateTimePicker";

interface InitialData {
  title: string;
  description: string;
  starts_at: string;
  ends_at: string | null;
  timezone: string | null;
  location_type: "on_campus" | "off_campus" | "online" | "hybrid";
  location_name: string;
  location_address: string;
  online_url: string;
  visibility: "public" | "members_only" | "unlisted";
  status: "draft" | "published" | "cancelled";
  banner_url: string | null;
  thumbnail_url: string | null;
  is_all_majors: boolean;
  major_ids: string[];
  tags: string[];
  capacity: string;
  requires_rsvp: boolean;
  rsvp_url: string;
  is_featured: boolean;
  contact_email: string;
}

interface EditEventFormProps {
  eventId: string;
  clubId: string;
  clubSlug: string;
  initialData: InitialData;
  majors: Major[];
}

// Parse ISO datetime into Date and time string
const parseISOToDateAndTime = (isoString: string | null): { date: Date | undefined; time: string } => {
  if (!isoString) return { date: undefined, time: "" };
  const date = new Date(isoString);
  // Extract date portion only (reset time to midnight for date selection)
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // Get time in local timezone (for the time input)
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return { date: dateOnly, time: `${hours}:${minutes}` };
};

export default function EditEventForm({
  eventId,
  clubId,
  clubSlug,
  initialData,
  majors,
}: EditEventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Core fields - initialized with existing data
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  
  // Parse start date/time
  const startParsed = parseISOToDateAndTime(initialData.starts_at);
  const [startDate, setStartDate] = useState<Date | undefined>(startParsed.date);
  const [startTime, setStartTime] = useState(startParsed.time);
  
  // Parse end date/time
  const endParsed = parseISOToDateAndTime(initialData.ends_at);
  const [endDate, setEndDate] = useState<Date | undefined>(endParsed.date);
  const [endTime, setEndTime] = useState(endParsed.time);
  
  // Clear endDate when startDate changes (events are single-day only)
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    // Clear endDate when start date changes - events are single-day
    if (date) {
      setEndDate(undefined);
    }
  };
  const [locationType, setLocationType] = useState<"on_campus" | "off_campus" | "online" | "hybrid">(initialData.location_type);
  const [locationName, setLocationName] = useState(initialData.location_name);
  const [locationAddress, setLocationAddress] = useState(initialData.location_address);
  const [onlineUrl, setOnlineUrl] = useState(initialData.online_url);
  const [visibility, setVisibility] = useState<"public" | "members_only" | "unlisted">(initialData.visibility);
  const [status, setStatus] = useState<"draft" | "published" | "cancelled">(initialData.status);

  // Optional fields
  const [isAllMajors, setIsAllMajors] = useState(initialData.is_all_majors);
  const [selectedMajorIds, setSelectedMajorIds] = useState<Set<string>>(new Set(initialData.major_ids));
  const [tags, setTags] = useState<string[]>(initialData.tags);
  const [currentTagInput, setCurrentTagInput] = useState("");
  const [requiresRsvp, setRequiresRsvp] = useState(initialData.requires_rsvp);
  const [rsvpUrl, setRsvpUrl] = useState(initialData.rsvp_url);
  const [capacity, setCapacity] = useState(initialData.capacity);
  const [contactEmail, setContactEmail] = useState(initialData.contact_email);
  const [isFeatured, setIsFeatured] = useState(initialData.is_featured);

  // Image uploads
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(initialData.banner_url);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData.thumbnail_url);

  // Update preview when file changes
  useEffect(() => {
    if (bannerFile) {
      const url = URL.createObjectURL(bannerFile);
      setBannerPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (initialData.banner_url) {
      setBannerPreview(initialData.banner_url);
    } else {
      setBannerPreview(null);
    }
  }, [bannerFile, initialData.banner_url]);

  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (initialData.thumbnail_url) {
      setThumbnailPreview(initialData.thumbnail_url);
    } else {
      setThumbnailPreview(null);
    }
  }, [thumbnailFile, initialData.thumbnail_url]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      if (bannerPreview && bannerPreview.startsWith("blob:")) {
        URL.revokeObjectURL(bannerPreview);
      }
      if (thumbnailPreview && thumbnailPreview.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [bannerPreview, thumbnailPreview]);

  // Combine date and time into ISO string
  const combineDateTime = (date: Date | undefined, time: string): string | null => {
    if (!date || !time) return null;
    const [hours, minutes] = time.split(":").map(Number);
    // Create a new date using the date's year, month, day with the specified time
    // This ensures we're working with local time consistently
    const combined = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours || 0,
      minutes || 0,
      0,
      0
    );
    const isoString = combined.toISOString();
    console.log("combineDateTime:", { date, time, hours, minutes, combined, isoString });
    return isoString;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!title.trim()) {
      setError("Event title is required");
      return;
    }
    if (!startDate || !startTime) {
      setError("Event start date and time are required");
      return;
    }
    
    const startsAtISO = combineDateTime(startDate, startTime);
    if (!startsAtISO) {
      setError("Invalid start date or time");
      return;
    }
    
    // If end time is provided but no end date, use start date
    // Also, if endDate exists but is before startDate, ignore it and use startDate
    let effectiveEndDate = endDate;
    if (effectiveEndDate && startDate && effectiveEndDate < startDate) {
      // End date is before start date, ignore it
      effectiveEndDate = undefined;
    }
    effectiveEndDate = effectiveEndDate || (endTime ? startDate : undefined);
    const endsAtISO = effectiveEndDate && endTime ? combineDateTime(effectiveEndDate, endTime) : null;
    
    // Debug logging
    const startDateObj = startsAtISO ? new Date(startsAtISO) : null;
    const endDateObj = endsAtISO ? new Date(endsAtISO) : null;
    const isEndBeforeStart = endsAtISO && startDateObj && endDateObj ? endDateObj < startDateObj : false;
    
    console.log("Validation Debug:", {
      startDate: startDate?.toString(),
      startTime,
      startsAtISO,
      startDateObj: startDateObj?.toString(),
      endDate: endDate?.toString(),
      effectiveEndDate: effectiveEndDate?.toString(),
      endTime,
      endsAtISO,
      endDateObj: endDateObj?.toString(),
      startTimestamp: startDateObj?.getTime(),
      endTimestamp: endDateObj?.getTime(),
      isEndBeforeStart,
      difference: endDateObj && startDateObj ? endDateObj.getTime() - startDateObj.getTime() : null,
    });
    
    if (endsAtISO && isEndBeforeStart) {
      console.error("VALIDATION FAILED: End time is before start time!");
      setError("Event end time must be after start time");
      return;
    }
    
    if (!isAllMajors && selectedMajorIds.size === 0) {
      setError("Please select at least one major if not targeting all majors");
      return;
    }

    startTransition(async () => {
      try {
        const supabase = createClient();
        const STORAGE_BUCKET = "event-media";
        let bannerUrl = initialData.banner_url;
        let thumbnailUrl = initialData.thumbnail_url;

        // Upload banner if new file provided
        if (bannerFile) {
          try {
            const fileExtension = bannerFile.name.split(".").pop() || "jpg";
            const storagePath = `events/${eventId}/banner.${fileExtension}`;
            
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
              bannerUrl = publicUrl;
            }
          } catch (err) {
            console.error("Error uploading banner:", err);
          }
        }

        // Upload thumbnail if new file provided
        if (thumbnailFile) {
          try {
            const fileExtension = thumbnailFile.name.split(".").pop() || "jpg";
            const storagePath = `events/${eventId}/thumbnail.${fileExtension}`;
            
            const { error: uploadError } = await supabase.storage
              .from(STORAGE_BUCKET)
              .upload(storagePath, thumbnailFile, {
                contentType: thumbnailFile.type,
                upsert: true,
              });

            if (!uploadError) {
              const {
                data: { publicUrl },
              } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
              thumbnailUrl = publicUrl;
            }
          } catch (err) {
            console.error("Error uploading thumbnail:", err);
          }
        }

        // Update the event
        const startsAtISO = combineDateTime(startDate, startTime)!;
        // If end time is provided but no end date, use start date
        // Also, if endDate exists but is before startDate, ignore it and use startDate
        let effectiveEndDate = endDate;
        if (effectiveEndDate && startDate && effectiveEndDate < startDate) {
          // End date is before start date, ignore it
          effectiveEndDate = undefined;
        }
        effectiveEndDate = effectiveEndDate || (endTime ? startDate : undefined);
        const endsAtISO = effectiveEndDate && endTime ? combineDateTime(effectiveEndDate, endTime) : null;
        
        console.log("About to submit to server:", {
          startsAtISO,
          endsAtISO,
          startDate: startDate?.toString(),
          startTime,
          effectiveEndDate: effectiveEndDate?.toString(),
          endTime,
        });
        
        const result = await updateEvent({
          event_id: eventId,
          club_id: clubId,
          club_slug: clubSlug,
          title: title.trim(),
          description: description.trim() || "",
          starts_at: startsAtISO,
          ends_at: endsAtISO,
          timezone: initialData.timezone,
          location_type: locationType,
          location_name: locationName.trim() || null,
          location_address: locationAddress.trim() || null,
          online_url: onlineUrl.trim() || null,
          visibility,
          status,
          banner_url: bannerUrl,
          thumbnail_url: thumbnailUrl,
          is_all_majors: isAllMajors,
          major_ids: isAllMajors ? undefined : Array.from(selectedMajorIds),
          tags: tags.filter((t) => t.trim()),
          requires_rsvp: requiresRsvp,
          rsvp_url: rsvpUrl.trim() || null,
          capacity: capacity ? parseInt(capacity) : null,
          contact_email: contactEmail.trim() || null,
          is_featured: isFeatured,
        });

        if (!result.ok) {
          setError(result.error || "Failed to update event");
          return;
        }

        setSuccess(true);
        // Redirect to events page after short delay
        setTimeout(() => {
          router.push(`/dashboard/${clubSlug}/events`);
        }, 1500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      }
    });
  };

  // Tag helpers
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTagInput.trim()) {
      e.preventDefault();
      const trimmedTag = currentTagInput.trim().toLowerCase();
      if (!tags.includes(trimmedTag)) {
        setTags([...tags, trimmedTag]);
      }
      setCurrentTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const toggleMajor = (majorId: string) => {
    const newSelected = new Set(selectedMajorIds);
    if (newSelected.has(majorId)) {
      newSelected.delete(majorId);
    } else {
      newSelected.add(majorId);
    }
    setSelectedMajorIds(newSelected);
  };

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-5xl font-semibold text-foreground mb-2">
              Edit Event
            </h1>
            <p className="text-muted-foreground text-base">
              Update event information for your club
            </p>
          </div>
          <Link href={`/dashboard/${clubSlug}/events`}>
            <Button variant="outline">
              ← Back to Events
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Update the information for your event
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
              Event updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Basic Information
              </h3>

              <div>
                <Label htmlFor="title">
                  Event Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isPending}
                  placeholder="e.g., Resume Workshop"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isPending}
                  rows={4}
                  placeholder="Describe your event..."
                  className="mt-2"
                />
              </div>
            </div>

            <Separator />

            {/* Date & Time */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Date & Time
              </h3>

              <div>
                <DateTimePicker
                  label="Start Date & Time"
                  startDate={startDate}
                  startTime={startTime}
                  endDate={endDate}
                  endTime={endTime}
                  onStartDateChange={handleStartDateChange}
                  onStartTimeChange={setStartTime}
                  onEndDateChange={setEndDate}
                  onEndTimeChange={setEndTime}
                  disabled={isPending}
                  includeEndTime={true}
                />
              </div>
            </div>

            <Separator />

            {/* Location */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Location
              </h3>

              <div>
                <Label htmlFor="locationType">Location Type</Label>
                <Select
                  value={locationType}
                  onValueChange={(value: any) => setLocationType(value)}
                  disabled={isPending}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on_campus">On Campus</SelectItem>
                    <SelectItem value="off_campus">Off Campus</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(locationType === "on_campus" || locationType === "off_campus" || locationType === "hybrid") && (
                <div>
                  <Label htmlFor="locationName">Location Name</Label>
                  <Input
                    id="locationName"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    disabled={isPending}
                    placeholder="e.g., Student Center Room 101"
                    className="mt-2"
                  />
                </div>
              )}

              {(locationType === "off_campus" || locationType === "hybrid") && (
                <div>
                  <Label htmlFor="locationAddress">Address</Label>
                  <Textarea
                    id="locationAddress"
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    disabled={isPending}
                    placeholder="Full address"
                    rows={2}
                    className="mt-2"
                  />
                </div>
              )}

              {(locationType === "online" || locationType === "hybrid") && (
                <div>
                  <Label htmlFor="onlineUrl">Online URL</Label>
                  <Input
                    id="onlineUrl"
                    type="url"
                    value={onlineUrl}
                    onChange={(e) => setOnlineUrl(e.target.value)}
                    disabled={isPending}
                    placeholder="https://zoom.us/j/..."
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <Separator />

            {/* Visibility & Status */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Visibility & Status
              </h3>

              <div>
                <Label htmlFor="visibility">Visibility</Label>
                <Select
                  value={visibility}
                  onValueChange={(value: any) => setVisibility(value)}
                  disabled={isPending}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Visible to everyone</SelectItem>
                    <SelectItem value="members_only">Members Only - Visible to club members</SelectItem>
                    <SelectItem value="unlisted">Unlisted - Only visible to members via direct link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value: any) => setStatus(value)}
                  disabled={isPending}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft - Save for later</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Majors */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Target Majors
              </h3>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAllMajors"
                  checked={isAllMajors}
                  onChange={(e) => setIsAllMajors(e.target.checked)}
                  disabled={isPending}
                  className="w-4 h-4"
                />
                <Label htmlFor="isAllMajors" className="cursor-pointer">
                  This event is for all majors
                </Label>
              </div>

              {!isAllMajors && (
                <div className="max-h-48 overflow-y-auto border rounded-lg p-4 space-y-2">
                  {majors.map((major) => (
                    <div key={major.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`major-${major.id}`}
                        checked={selectedMajorIds.has(major.id)}
                        onChange={() => toggleMajor(major.id)}
                        disabled={isPending}
                        className="w-4 h-4"
                      />
                      <Label
                        htmlFor={`major-${major.id}`}
                        className="cursor-pointer flex-1"
                      >
                        {major.name}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Images */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Images (optional)
              </h3>

              <div>
                <DragDropImageUpload
                  label="Event Banner"
                  type="banner"
                  file={bannerFile}
                  previewUrl={bannerPreview}
                  onFileChange={setBannerFile}
                  disabled={isPending}
                />
              </div>

              <div>
                <DragDropImageUpload
                  label="Event Thumbnail"
                  type="logo"
                  file={thumbnailFile}
                  previewUrl={thumbnailPreview}
                  onFileChange={setThumbnailFile}
                  disabled={isPending}
                />
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Tags (optional)</h3>
              <Input
                value={currentTagInput}
                onChange={(e) => setCurrentTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                disabled={isPending}
                placeholder="Type a tag and press Enter"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            {/* Additional Options */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                Additional Options
              </h3>

              <div>
                <Label htmlFor="capacity">Capacity (optional)</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  disabled={isPending}
                  placeholder="Maximum number of attendees"
                  className="mt-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="requiresRsvp"
                  checked={requiresRsvp}
                  onChange={(e) => setRequiresRsvp(e.target.checked)}
                  disabled={isPending}
                  className="w-4 h-4"
                />
                <Label htmlFor="requiresRsvp" className="cursor-pointer">
                  Requires RSVP
                </Label>
              </div>

              {requiresRsvp && (
                <div>
                  <Label htmlFor="rsvpUrl">RSVP URL</Label>
                  <Input
                    id="rsvpUrl"
                    type="url"
                    value={rsvpUrl}
                    onChange={(e) => setRsvpUrl(e.target.value)}
                    disabled={isPending}
                    placeholder="https://..."
                    className="mt-2"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="contactEmail">Contact Email (optional)</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  disabled={isPending}
                  placeholder="event@example.com"
                  className="mt-2"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  disabled={isPending}
                  className="w-4 h-4"
                />
                <Label htmlFor="isFeatured" className="cursor-pointer">
                  Feature this event (show prominently)
                </Label>
              </div>
            </div>

            <Separator />

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Link href={`/dashboard/${clubSlug}/events`}>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Event"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
