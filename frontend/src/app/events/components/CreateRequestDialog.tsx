"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createEventRequest } from "@/lib/event-requests";
import { createClient } from "@/lib/supabase/browser";
import { X, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface CreateRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestCreated: () => void;
}

interface Major {
  id: string;
  name: string;
}

export function CreateRequestDialog({
  open,
  onOpenChange,
  onRequestCreated,
}: CreateRequestDialogProps) {
  const { addToast } = useToast();
  const supabase = createClient();

  const [description, setDescription] = useState("");
  const [majorId, setMajorId] = useState<string | null>(null);
  const [isAllMajors, setIsAllMajors] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(false);
  const [understood, setUnderstood] = useState(false);

  useEffect(() => {
    if (open) {
      loadMajors();
    }
  }, [open]);

  const loadMajors = async () => {
    try {
      const { data, error } = await supabase
        .from("majors")
        .select("id, name")
        .order("name");

      if (error) throw error;
      setMajors(data || []);
    } catch (err) {
      console.error("Error loading majors:", err);
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed.toLowerCase())) {
      setTags([...tags, trimmed.toLowerCase()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      addToast({
        title: "Description required",
        description: "Please provide a description for your request.",
        variant: "destructive",
      });
      return;
    }

    if (!isAllMajors && !majorId) {
      addToast({
        title: "Major required",
        description: "Please select a major or choose 'All majors'.",
        variant: "destructive",
      });
      return;
    }

    if (!understood) {
      addToast({
        title: "Confirmation required",
        description: "Please confirm that you understand you cannot edit after posting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await createEventRequest({
        description: description.trim(),
        major_id: isAllMajors ? null : majorId,
        is_all_majors: isAllMajors,
        tags,
      });

      addToast({
        title: "Request created",
        description: "Your event request has been posted to the board.",
        variant: "default",
      });

      // Reset form
      setDescription("");
      setMajorId(null);
      setIsAllMajors(false);
      setTags([]);
      setTagInput("");
      setUnderstood(false);

      onRequestCreated();
    } catch (err) {
      console.error("Error creating request:", err);
      addToast({
        title: "Error",
        description:
          err instanceof Error
            ? err.message
            : "Failed to create request. Please try again.",
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
          <DialogTitle>Request an Event</DialogTitle>
          <DialogDescription>
            Request an event or workshop you'd like to see. Once posted, you
            cannot edit—only delete.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the event or workshop you'd like to see..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>

          {/* Major Selection */}
          <div className="space-y-2">
            <Label>Target Audience *</Label>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="all-majors"
                checked={isAllMajors}
                onCheckedChange={(checked) => {
                  setIsAllMajors(checked === true);
                  if (checked) setMajorId(null);
                }}
              />
              <Label
                htmlFor="all-majors"
                className="font-normal cursor-pointer"
              >
                All majors
              </Label>
            </div>
            {!isAllMajors && (
              <Select
                value={majorId || ""}
                onValueChange={(value) => setMajorId(value || null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a major" />
                </SelectTrigger>
                <SelectContent>
                  {majors.map((major) => (
                    <SelectItem key={major.id} value={major.id}>
                      {major.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
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

          {/* Warning */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="understood"
                  checked={understood}
                  onCheckedChange={(checked) =>
                    setUnderstood(checked === true)
                  }
                />
                <Label
                  htmlFor="understood"
                  className="font-normal cursor-pointer"
                >
                  I understand that I cannot edit this request after posting—I
                  can only delete it.
                </Label>
              </div>
            </AlertDescription>
          </Alert>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Posting..." : "Post Request"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
