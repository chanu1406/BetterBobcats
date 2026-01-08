"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  label: string;
  type: "logo" | "banner";
  currentUrl: string | null;
  onUpload: (file: File) => Promise<string>;
  onError: (error: string) => void;
  disabled?: boolean;
}

/**
 * Modern image upload card component with validation and preview
 * Handles logo (1:1, ≤2MB) and banner (16:9 or 3:1, ≤2MB) uploads
 * Entire card is clickable for upload
 */
export default function ImageUpload({
  label,
  type,
  currentUrl,
  onUpload,
  onError,
  disabled = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): Promise<{ valid: boolean; error?: string }> => {
    return new Promise((resolve) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        resolve({ valid: false, error: "File must be an image" });
        return;
      }

      // Validate file size
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxSize) {
        resolve({ valid: false, error: `Image must be ≤ 2 MB` });
        return;
      }

      // Validate aspect ratio using image dimensions
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const aspectRatio = img.width / img.height;

        if (type === "logo") {
          // Logo: 1:1 aspect ratio (allow 0.9-1.1 range for flexibility)
          if (aspectRatio < 0.9 || aspectRatio > 1.1) {
            resolve({ valid: false, error: "Logo must be square (1:1 aspect ratio)" });
            return;
          }
        } else {
          // Banner: 16:9 (1.78) or 3:1 (3.0) aspect ratio
          const is16to9 = aspectRatio >= 1.6 && aspectRatio <= 2.0;
          const is3to1 = aspectRatio >= 2.8 && aspectRatio <= 3.2;
          if (!is16to9 && !is3to1) {
            resolve({
              valid: false,
              error: "Banner must be wide (16:9 or 3:1 aspect ratio)",
            });
            return;
          }
        }

        resolve({ valid: true });
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve({ valid: false, error: "Invalid image file" });
      };

      img.src = objectUrl;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValidationError(null);

    // Validate image
    const validation = await validateImage(file);
    if (!validation.valid) {
      setValidationError(validation.error || "Invalid image");
      onError(validation.error || "Invalid image");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Upload image
    setIsUploading(true);
    try {
      const uploadedUrl = await onUpload(file);
      setPreview(uploadedUrl);
      // Clean up preview URL
      URL.revokeObjectURL(previewUrl);
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "Upload failed");
      onError(error instanceof Error ? error.message : "Upload failed");
      setPreview(currentUrl); // Revert to current URL
      URL.revokeObjectURL(previewUrl);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCardClick = () => {
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const aspectRatioHint = type === "logo" ? "1:1" : "16:9 or 3:1";
  const sizeHint = "≤ 2 MB";

  return (
    <div className="flex-1">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
        className="hidden"
        id={`${type}-upload`}
      />
      
      <div
        onClick={handleCardClick}
        className={`
          relative bg-muted/20 rounded-lg
          cursor-pointer hover:bg-muted/40 transition-all duration-200
          ${disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""}
          ${type === "logo" ? "aspect-square" : "aspect-video"}
          group
        `}
      >
        {preview ? (
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt={`${label} preview`}
              fill
              className={type === "logo" ? "object-contain p-4" : "object-cover"}
              unoptimized
            />
            {!disabled && !isUploading && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <span className="text-sm text-foreground/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Replace
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-10 h-10 mb-3 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-muted/70 transition-colors">
              <svg
                className="w-5 h-5 text-muted-foreground"
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
            <div className="text-sm font-medium text-foreground mb-1">{label}</div>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <div>{aspectRatioHint}</div>
              <div>{sizeHint}</div>
            </div>
          </div>
        )}
      </div>

      {preview && !disabled && !isUploading && (
        <button
          type="button"
          onClick={handleRemove}
          className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Remove
        </button>
      )}

      {validationError && (
        <p className="mt-2 text-xs text-destructive">{validationError}</p>
      )}
    </div>
  );
}

