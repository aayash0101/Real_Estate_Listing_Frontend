"use client";

import { useState, FormEvent } from "react";
import { ListingInput, Property } from "@/lib/api";
import ImageUploader from "@/components/ImageUploader";

const PROPERTY_TYPES = ["HOUSE", "APARTMENT", "TOWNHOUSE", "LAND", "COMMERCIAL"] as const;

interface PropertyImage {
  id: string;
  url: string;
  order: number;
}

interface ListingFormProps {
  initialValues?: Partial<ListingInput>;
  onSubmit: (input: ListingInput) => Promise<void>;
  submitLabel: string;
  isAdmin?: boolean;
  listingId?: string; // present only in edit mode — images require an existing listing
  initialImages?: PropertyImage[];
}

export default function ListingForm({
  initialValues,
  onSubmit,
  submitLabel,
  isAdmin,
  listingId,
  initialImages,
}: ListingFormProps) {
  const [form, setForm] = useState<ListingInput>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    price: initialValues?.price ?? 0,
    suburb: initialValues?.suburb ?? "",
    state: initialValues?.state ?? "",
    postcode: initialValues?.postcode ?? "",
    address: initialValues?.address ?? "",
    property_type: initialValues?.property_type ?? "HOUSE",
    bedrooms: initialValues?.bedrooms ?? 0,
    bathrooms: initialValues?.bathrooms ?? 0,
    parking: initialValues?.parking ?? 0,
    land_size: initialValues?.land_size,
    internal_status: initialValues?.internal_status ?? "",
  });
  const [images, setImages] = useState<PropertyImage[]>(initialImages ?? []);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof ListingInput>(key: K, value: ListingInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save listing");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = "w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm";
  const labelClass = "block text-sm font-medium text-[var(--text-primary)] mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[var(--card)] border border-[var(--border)] rounded-lg p-6">
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Price (AUD)</label>
          <input
            type="number"
            required
            min={0}
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Property Type</label>
          <select
            value={form.property_type}
            onChange={(e) => update("property_type", e.target.value as ListingInput["property_type"])}
            className={inputClass}
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Address</label>
        <input
          type="text"
          required
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Suburb</label>
          <input
            type="text"
            required
            value={form.suburb}
            onChange={(e) => update("suburb", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>State</label>
          <input
            type="text"
            required
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Postcode</label>
          <input
            type="text"
            required
            value={form.postcode}
            onChange={(e) => update("postcode", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>Bedrooms</label>
          <input
            type="number"
            required
            min={0}
            value={form.bedrooms}
            onChange={(e) => update("bedrooms", Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Bathrooms</label>
          <input
            type="number"
            required
            min={0}
            value={form.bathrooms}
            onChange={(e) => update("bathrooms", Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Parking</label>
          <input
            type="number"
            min={0}
            value={form.parking}
            onChange={(e) => update("parking", Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Land Size (m²)</label>
          <input
            type="number"
            min={0}
            value={form.land_size ?? ""}
            onChange={(e) => update("land_size", e.target.value ? Number(e.target.value) : undefined)}
            className={inputClass}
          />
        </div>
      </div>

      {isAdmin && (
        <div>
          <label className={labelClass}>Internal Status (admin only)</label>
          <input
            type="text"
            value={form.internal_status}
            onChange={(e) => update("internal_status", e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      {listingId ? (
        <ImageUploader
          listingId={listingId}
          existingImages={images}
          onChange={setImages}
        />
      ) : (
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Save this listing first to add photos.
        </p>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{ backgroundColor: "var(--amber)", color: "var(--navy)" }}
        className="w-full py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}