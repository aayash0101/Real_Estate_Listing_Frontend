"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAgent from "@/components/RequireAgent";
import { useAuth } from "@/lib/auth-context";
import { getMyListings, deleteListing, Property } from "@/lib/api";
import { formatPrice, formatPropertyType } from "@/lib/utils";

function DashboardContent() {
  const { auth } = useAuth();
  const [listings, setListings] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadListings() {
    if (!auth) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await getMyListings(auth.token, { limit: "50" });
      setListings(result.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load listings");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  async function handleDelete(id: string) {
    if (!auth) return;
    if (!confirm("Delete this listing? This cannot be undone.")) return;

    setDeletingId(id);
    try {
      await deleteListing(auth.token, id);
      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete listing");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-[var(--text-primary)]">
          My Listings
        </h1>
        <Link
          href="/dashboard/new"
          style={{ backgroundColor: "var(--amber)", color: "var(--navy)" }}
          className="text-sm font-semibold px-4 py-2 rounded-lg"
        >
          + Add Listing
        </Link>
      </div>

      {isLoading && <p className="text-[var(--text-secondary)] text-sm">Loading your listings...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {!isLoading && !error && listings.length === 0 && (
        <p className="text-[var(--text-secondary)] text-sm">
          You haven&apos;t listed any properties yet.
        </p>
      )}

      <div className="space-y-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
          >
            <div>
              <p className="font-medium text-[var(--text-primary)]">{listing.title}</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {listing.suburb} · {formatPropertyType(listing.property_type)} · {listing.bedrooms} bed / {listing.bathrooms} bath
              </p>
              <p className="text-sm font-medium text-[var(--amber)] mt-1">{formatPrice(listing.price)}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/${listing.id}/edit`}
                className="text-sm font-medium text-[var(--navy)] underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(listing.id)}
                disabled={deletingId === listing.id}
                className="text-sm font-medium text-red-600 underline disabled:opacity-50"
              >
                {deletingId === listing.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireAgent>
      <DashboardContent />
    </RequireAgent>
  );
}