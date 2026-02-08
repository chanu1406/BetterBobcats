"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/browser";
import { createEventRequestV2, searchEventRequests } from "@/lib/event-requests";
import { useToast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import type { EventRequestType, LocationPref } from "@/types/event-request";
import { cn } from "@/lib/utils";
import { TimePreferencePicker } from "./TimePreferencePicker";
import { StatusBadge } from "./StatusBadge";

const REQUEST_TYPES: { value: EventRequestType; label: string }[] = [
  { value: "workshop", label: "Workshop" },
  { value: "speaker", label: "Speaker" },
  { value: "social", label: "Social" },
  { value: "study", label: "Study" },
  { value: "career", label: "Career" },
  { value: "other", label: "Other" },
];

interface RequestComposerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestCreated: (id?: string) => void;
}

interface Major {
  id: string;
  name: string;
}

export function RequestComposer({
  open,
  onOpenChange,
  onRequestCreated,
}: RequestComposerProps) {
  const { addToast } = useToast();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [requestType, setRequestType] = useState<EventRequestType>("other");
  const [majorId, setMajorId] = useState<string | null>(null);
  const [isAllMajors, setIsAllMajors] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [timePrefDays, setTimePrefDays] = useState<string[]>([]);
  const [timePrefWindows, setTimePrefWindows] = useState<
    ("morning" | "afternoon" | "evening")[]
  >([]);
  const [locationPref, setLocationPref] = useState<LocationPref>("either");
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(false);
  const [similarRequests, setSimilarRequests] = useState<Awaited<ReturnType<typeof searchEventRequests>>>([]);
  const [similarLoading, setSimilarLoading] = useState(false);

  useEffect(() => {
    if (open) loadMajors();
  }, [open]);

  const loadMajors = async () => {
    const { data, error } = await supabase
      .from("majors")
      .select("id, name")
      .order("name");
    if (!error) setMajors(data ?? []);
  };

  const searchSimilar = useCallback(async (q: string) => {
    if (q.trim().length < 3) {
      setSimilarRequests([]);
      return;
    }
    setSimilarLoading(true);
    try {
      const results = await searchEventRequests(q.trim());
      setSimilarRequests(results.slice(0, 5));
    } finally {
      setSimilarLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      searchSimilar(title);
    }, 300);
    return () => clearTimeout(t);
  }, [title, searchSimilar]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle || trimmedTitle.length < 10) {
      addToast({
        title: "Title required",
        description: "Please enter a title (at least 10 characters).",
        variant: "destructive",
      });
      return;
    }
    if (!isAllMajors && !majorId) {
      addToast({
        title: "Audience required",
        description: "Please select a major or choose All majors.",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      const id = await createEventRequestV2({
        title: trimmedTitle,
        description: description.trim(),
        subtitle: subtitle.trim() || null,
        request_type: requestType,
        major_id: isAllMajors ? null : majorId,
        is_all_majors: isAllMajors,
        tags,
        time_pref_days: timePrefDays.length ? timePrefDays : null,
        time_pref_windows:
          timePrefWindows.length ? timePrefWindows : null,
        location_pref: locationPref,
      });
      addToast({ title: "Request created", description: "Your request is now visible on the feed.", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["event-requests"] });
      onOpenChange(false);
      onRequestCreated(id);
      setTitle("");
      setSubtitle("");
      setDescription("");
      setRequestType("other");
      setMajorId(null);
      setIsAllMajors(false);
      setTags([]);
      setTimePrefDays([]);
      setTimePrefWindows([]);
      setLocationPref("either");
    } catch (err) {
      addToast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create request.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New request</DialogTitle>
          <DialogDescription>
            Suggest an event or workshop. Add a clear title and details so others can vote.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select
              value={requestType}
              onValueChange={(v) => setRequestType(v as EventRequestType)}
            >
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REQUEST_TYPES.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Short, clear headline (e.g. Resume workshop for CS majors)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
            />
            {title.trim().length >= 3 && (
              <div className="rounded-md border bg-muted/30 p-2 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Similar requests
                </p>
                {similarLoading ? (
                  <p className="text-xs text-muted-foreground">Searching...</p>
                ) : similarRequests.length > 0 ? (
                  <ul className="text-xs space-y-1">
                    {similarRequests.map((r, idx) => {
                      const isClosest = idx === 0;
                      return (
                        <li
                          key={r.id}
                          className={cn(
                            "flex items-center justify-between gap-2 py-1.5 px-2 rounded -mx-0.5",
                            isClosest &&
                              "border border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/30"
                          )}
                        >
                          <span className="truncate min-w-0">
                            {r.title || r.description?.slice(0, 50)}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            {isClosest && (
                              <span className="text-amber-700 dark:text-amber-300 font-medium">
                                Already exists
                              </span>
                            )}
                            <StatusBadge status={r.status} size="sm" />
                            <span className="text-muted-foreground">
                              {(r.vote_count ?? 0)} votes
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">No similar requests found.</p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Why this matters (optional)</Label>
            <Input
              id="subtitle"
              placeholder="e.g. Many CS students struggle with system design interviews"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              maxLength={200}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Details (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add context, links, or specifics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags (optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Target audience *</Label>
            <div className="flex items-center gap-2">
              <Checkbox
                id="all-majors"
                checked={isAllMajors}
                onCheckedChange={(c) => {
                  setIsAllMajors(c === true);
                  if (c) setMajorId(null);
                }}
              />
              <Label htmlFor="all-majors" className="font-normal cursor-pointer">
                All majors
              </Label>
            </div>
            {!isAllMajors && (
              <Select
                value={majorId ?? ""}
                onValueChange={(v) => setMajorId(v || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a major" />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <TimePreferencePicker
            days={timePrefDays}
            windows={timePrefWindows}
            onDaysChange={setTimePrefDays}
            onWindowsChange={setTimePrefWindows}
          />

          <div className="space-y-2">
            <Label>Location preference</Label>
            <Select
              value={locationPref}
              onValueChange={(v) => setLocationPref(v as LocationPref)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="either">Either</SelectItem>
                <SelectItem value="in_person">In-person</SelectItem>
                <SelectItem value="online">Online</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Posting..." : "Post request"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
