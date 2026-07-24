"use client";

import { useState } from "react";
import { uploadListingImages, deleteListingImage } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface PropertyImage {
  id: string;
  url: string;
  order: number;
}

interface ImageUploaderProps {
  listingId: string;
  existingImages: PropertyImage[];
  onChange: (images: PropertyImage[]) => void;
}

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "http://localhost:5000";

export default function ImageUploader({
  listingId,
  existingImages,
  onChange,
}: ImageUploaderProps) {
  const { auth } = useAuth();
  const token = auth?.token;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const images = existingImages ?? [];

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0 || !token) return;

    setUploading(true);
    setError("");

    try {
      const updated = await uploadListingImages(listingId, Array.from(files), token);
      onChange(updated ?? []);
    } catch (err) {
      setError("Failed to upload images. Try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(imageId: string) {
    if (!token) return;
    try {
      await deleteListingImage(imageId, token);
      onChange(images.filter((img) => img.id !== imageId));
    } catch (err) {
      setError("Failed to delete image.");
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
        Property Photos
      </label>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative group aspect-square rounded-lg overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <img
              src={`${API_ORIGIN}${img.url}`}
              alt="Property"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleFileChange}
        disabled={uploading || !token}
        className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2 file:text-white file:cursor-pointer"
        style={{ color: "var(--text-secondary)" }}
      />

      {uploading && <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Uploading…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}