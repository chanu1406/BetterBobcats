"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "../actions";
import { createClient } from "@/lib/supabase/browser";
import { fulfillEventRequest } from "@/lib/event-requests";
import type { EventRequest } from "@/types/event-request";
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
import DragDropImageUpload from "./DragDropImageUpload";
import { DateTimePicker } from "./DateTimePicker";
import { 
  Calendar, 
  MapPin, 
  Eye, 
  Users, 
  Image as ImageIcon, 
  Tag,
  Settings,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CreateEventFormProps {
  clubId: string;
  clubSlug: string;
  majors: Major[];
  fulfillRequestId?: string;
  requestData?: EventRequest | null;
}

export default function CreateEventForm({
  clubId,
  clubSlug,
  majors,
  fulfillRequestId,
  requestData,
}: CreateEventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPastDateDialog, setShowPastDateDialog] = useState(false);

  // Core fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState("");
  
  // Clear endDate when startDate changes (events are single-day only)
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    // Clear endDate when start date changes - events are single-day
    if (date) {
      setEndDate(undefined);
    }
  };
  const [locationType, setLocationType] = useState<"on_campus" | "off_campus" | "online" | "hybrid">("on_campus");
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [onlineUrl, setOnlineUrl] = useState("");
  const [visibility, setVisibility] = useState<"public" | "members_only" | "unlisted">("public");
  const [status, setStatus] = useState<"draft" | "published" | "cancelled">("published");

  // Optional fields
  const [isAllMajors, setIsAllMajors] = useState(true);
  const [selectedMajorIds, setSelectedMajorIds] = useState<Set<string>>(new Set());
  const [tags, setTags] = useState<string[]>([]);
  const [currentTagInput, setCurrentTagInput] = useState("");
  const [requiresRsvp, setRequiresRsvp] = useState(false);
  const [rsvpUrl, setRsvpUrl] = useState("");
  const [capacity, setCapacity] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Image uploads
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // Pre-fill form from request data if fulfilling
  useEffect(() => {
    if (requestData && fulfillRequestId) {
      setDescription(requestData.description);
      setIsAllMajors(requestData.is_all_majors);
      if (!requestData.is_all_majors && requestData.major_id) {
        setSelectedMajorIds(new Set([requestData.major_id]));
      }
      if (requestData.tags && requestData.tags.length > 0) {
        setTags(requestData.tags);
      }
    }
  }, [requestData, fulfillRequestId]);

  // Update preview when file changes
  useEffect(() => {
    if (bannerFile) {
      const url = URL.createObjectURL(bannerFile);
      setBannerPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setBannerPreview(null);
    }
  }, [bannerFile]);

  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setThumbnailPreview(null);
    }
  }, [thumbnailFile]);

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
    return combined.toISOString();
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
    
    // Check if the event start time is in the past
    const now = new Date();
    const startDateTime = new Date(startsAtISO);
    if (startDateTime < now) {
      setShowPastDateDialog(true);
      return;
    }
    
    // If end time is provided but no end date, use start date
    const effectiveEndDate = endDate || (endTime ? startDate : undefined);
    const endsAtISO = effectiveEndDate && endTime ? combineDateTime(effectiveEndDate, endTime) : null;
    if (endsAtISO && new Date(endsAtISO) < new Date(startsAtISO)) {
      setError("Event end time must be after start time");
      return;
    }
    
    if (!isAllMajors && selectedMajorIds.size === 0) {
      setError("Please select at least one major if not targeting all majors");
      return;
    }

    startTransition(async () => {
      try {
        // Step 1: Create the event
        const startsAtISO = combineDateTime(startDate, startTime)!;
        // If end time is provided but no end date, use start date
        const effectiveEndDate = endDate || (endTime ? startDate : undefined);
        const endsAtISO = effectiveEndDate && endTime ? combineDateTime(effectiveEndDate, endTime) : null;
        
        const result = await createEvent({
          club_id: clubId,
          club_slug: clubSlug,
          title: title.trim(),
          description: description.trim() || "",
          starts_at: startsAtISO,
          ends_at: endsAtISO,
          timezone: null, // Can be enhanced later
          location_type: locationType,
          location_name: locationName.trim() || null,
          location_address: locationAddress.trim() || null,
          online_url: onlineUrl.trim() || null,
          visibility,
          status,
          banner_url: null, // Will be updated after upload
          thumbnail_url: null, // Will be updated after upload
          is_all_majors: isAllMajors,
          major_ids: isAllMajors ? undefined : Array.from(selectedMajorIds),
          tags: tags.filter((t) => t.trim()),
          requires_rsvp: requiresRsvp,
          rsvp_url: rsvpUrl.trim() || null,
          capacity: capacity ? parseInt(capacity) : null,
          contact_email: contactEmail.trim() || null,
          is_featured: isFeatured,
        });

        if (!result.ok || !result.event_id) {
          setError(result.error || "Failed to create event");
          return;
        }

        const eventId = result.event_id;
        const supabase = createClient();
        const STORAGE_BUCKET = "event-media";

        // Step 2: Upload banner if provided
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

              // Update event with banner URL
              await supabase
                .from("events")
                .update({ banner_url: publicUrl })
                .eq("id", eventId);
            }
          } catch (err) {
            console.error("Error uploading banner:", err);
            // Continue even if banner upload fails
          }
        }

        // Step 3: Upload thumbnail if provided
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

              // Update event with thumbnail URL
              await supabase
                .from("events")
                .update({ thumbnail_url: publicUrl })
                .eq("id", eventId);
            }
          } catch (err) {
            console.error("Error uploading thumbnail:", err);
            // Continue even if thumbnail upload fails
          }
        }

        // Step 4: Fulfill request if applicable
        if (fulfillRequestId && eventId) {
          try {
            await fulfillEventRequest(fulfillRequestId, eventId);
          } catch (err) {
            console.error("Error fulfilling request:", err);
            setError("Event created but failed to link to request. Please try again.");
            return;
          }
        }

        setSuccess(true);
        // Redirect after short delay
        setTimeout(() => {
          if (fulfillRequestId) {
            router.push(`/dashboard/${clubSlug}/requests`);
          } else {
            router.push(`/dashboard/${clubSlug}/events`);
          }
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
              Create Event
            </h1>
            <p className="text-muted-foreground text-base">
              Add a new event for your club
            </p>
          </div>
          <Link href={`/dashboard/${clubSlug}/events`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>

      {fulfillRequestId && requestData && (
        <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Fulfilling Event Request
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              You are creating an event to fulfill a student request. The form has been pre-filled with the request details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Request:</strong> {requestData.description}
            </p>
            {requestData.vote_count && requestData.vote_count > 0 && (
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
                <strong>Upvotes:</strong> {requestData.vote_count}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>
            Fill out the information for your event
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
              Event created successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Basic Information
                </h3>
              </div>

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
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Date & Time
                </h3>
              </div>

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
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Location
                </h3>
              </div>

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
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Visibility & Status
                </h3>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">

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
            </div>

            <Separator />

            {/* Majors */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Target Majors
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isAllMajors"
                  checked={isAllMajors}
                  onChange={(e) => setIsAllMajors(e.target.checked)}
                  disabled={isPending}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label htmlFor="isAllMajors" className="cursor-pointer font-normal">
                  This event is for all majors
                </Label>
              </div>

              {!isAllMajors && (
                <div className="max-h-48 overflow-y-auto border rounded-lg p-4 space-y-2">
                  {majors.map((major) => (
                    <div key={major.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={`major-${major.id}`}
                        checked={selectedMajorIds.has(major.id)}
                        onChange={() => toggleMajor(major.id)}
                        disabled={isPending}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Label
                        htmlFor={`major-${major.id}`}
                        className="cursor-pointer flex-1 font-normal"
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
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Images (optional)
                </h3>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">

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
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Tags (optional)</h3>
              </div>
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
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Additional Options
                </h3>
              </div>

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

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="requiresRsvp"
                  checked={requiresRsvp}
                  onChange={(e) => setRequiresRsvp(e.target.checked)}
                  disabled={isPending}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label htmlFor="requiresRsvp" className="cursor-pointer font-normal">
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

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  disabled={isPending}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Label htmlFor="isFeatured" className="cursor-pointer font-normal">
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
                {isPending ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Past Date Error Dialog */}
      <AlertDialog open={showPastDateDialog} onOpenChange={setShowPastDateDialog}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <AlertDialogTitle className="text-left">
                Cannot Create Past Events
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="pt-2 text-left">
              The selected date and time is in the past. Please choose a future date and time for your event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowPastDateDialog(false)}
              className="w-full sm:w-auto"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
