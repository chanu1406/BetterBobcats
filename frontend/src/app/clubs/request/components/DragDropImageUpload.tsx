"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface DragDropImageUploadProps {
  label: string;
  type: "logo" | "banner";
  file: File | null;
  previewUrl: string | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
  error?: string | null;
}

/**
 * Drag-and-drop image upload component for club requests
 * Handles logo (1:1) and banner (16:9 or 3:1) uploads
 */
export default function DragDropImageUpload({
  label,
  type,
  file,
  previewUrl,
  onFileChange,
  disabled = false,
  error = null,
}: DragDropImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): { valid: boolean; error?: string } => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      return { valid: false, error: "File must be an image" };
    }

    // Validate file size (2 MB max)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return { valid: false, error: "Image must be ≤ 2 MB" };
    }

    return { valid: true };
  };

  const handleFile = useCallback(
    (fileToHandle: File) => {
      setValidationError(null);
      const validation = validateImage(fileToHandle);

      if (!validation.valid) {
        setValidationError(validation.error || "Invalid image");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      onFileChange(fileToHandle);
    },
    [onFileChange]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const aspectRatioHint = type === "logo" ? "1:1" : "16:9 or 3:1";
  const displayPreview = previewUrl || (file ? URL.createObjectURL(file) : null);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        {label} (optional)
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        disabled={disabled}
        className="hidden"
      />
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg transition-all cursor-pointer
          ${type === "logo" ? "aspect-square" : "aspect-video"}
          ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 bg-muted/20"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          group
        `}
      >
        {displayPreview ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={displayPreview}
              alt={`${label} preview`}
              fill
              className={type === "logo" ? "object-contain p-4" : "object-cover"}
              unoptimized
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {file ? "Click to replace" : "Click to upload"}
                </span>
              </div>
            )}
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground rounded-full p-1.5 hover:bg-destructive/90"
                aria-label={`Remove ${label}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-12 h-12 mb-3 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-muted/70 transition-colors">
              <svg
                className="w-6 h-6 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-sm font-medium text-foreground mb-1">
              {isDragging ? "Drop image here" : `Click to upload or drag and drop`}
            </div>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <div>{aspectRatioHint} • ≤ 2 MB</div>
              <div className="text-[10px]">PNG, JPG, or GIF</div>
            </div>
          </div>
        )}
      </div>
      {(error || validationError) && (
        <p className="text-xs text-destructive">{error || validationError}</p>
      )}
    </div>
  );
}
