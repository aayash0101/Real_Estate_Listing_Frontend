import { getListingById } from "@/lib/api";
import { formatPrice, formatPropertyType } from "@/lib/utils";
import { Bed, Bath, Car, MapPin, User, ArrowLeft, AlertCircle, ImageOff } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const TYPE_ACCENT: Record<string, string> = {
  HOUSE: "#3B82F6",
  APARTMENT: "#8B5CF6",
  TOWNHOUSE: "#10B981",
  LAND: "#F59E0B",
  COMMERCIAL: "#64748B",
};

const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "") || "http://localhost:5000";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;

  let property;
  try {
    property = await getListingById(id);
  } catch {
    notFound();
  }

  if (!property) notFound();

  const accent = TYPE_ACCENT[property.property_type] ?? "#64748B";
  const images = Array.isArray(property.images) ? property.images : [];

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors hover:opacity-70"
        style={{ color: "var(--text-secondary)" }}
      >
        <ArrowLeft size={15} />
        Back to listings
      </Link>

      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        {/* Top accent bar */}
        <div className="h-1.5 w-full" style={{ backgroundColor: "var(--amber)" }} />

        {/* Image gallery */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {images.map((img, i) => (
              <img
                key={img.id}
                src={`${API_ORIGIN}${img.url}`}
                alt={`${property.title} photo ${i + 1}`}
                className={`w-full object-cover ${i === 0 ? "col-span-2 sm:col-span-2 aspect-video" : "aspect-square"}`}
              />
            ))}
          </div>
        ) : (
          <div
            className="w-full aspect-[21/9] flex flex-col items-center justify-center gap-2"
            style={{ backgroundColor: "var(--bg)", color: "var(--text-secondary)" }}
          >
            <ImageOff size={28} />
            <span className="text-sm">No photos yet</span>
          </div>
        )}

        <div className="p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                {formatPropertyType(property.property_type)}
              </span>
              <h1 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--navy)" }}>
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                <MapPin size={14} />
                <span className="text-sm">{property.address}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-secondary)" }}>
                Asking Price
              </p>
              <p className="font-display text-4xl font-bold" style={{ color: "var(--navy)" }}>
                {formatPrice(property.price)}
              </p>
            </div>
          </div>

          {/* Admin note */}
          {property.internal_status && (
            <div
              className="flex gap-3 px-4 py-3 rounded-xl mb-6"
              style={{ backgroundColor: "var(--amber-light)", border: "1px solid #F0D080" }}
            >
              <AlertCircle size={17} className="shrink-0 mt-0.5" style={{ color: "#92650A" }} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#92650A" }}>
                  Internal Note - Admin Only
                </p>
                <p className="text-sm" style={{ color: "#78530A" }}>{property.internal_status}</p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl p-6 mb-6"
            style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
          >
            {property.bedrooms > 0 && (
              <div className="flex flex-col items-center gap-2">
                <Bed size={22} style={{ color: "var(--amber)" }} />
                <span className="text-2xl font-bold" style={{ color: "var(--navy)" }}>{property.bedrooms}</span>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Bedrooms</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex flex-col items-center gap-2">
                <Bath size={22} style={{ color: "var(--amber)" }} />
                <span className="text-2xl font-bold" style={{ color: "var(--navy)" }}>{property.bathrooms}</span>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Bathrooms</span>
              </div>
            )}
            {property.parking > 0 && (
              <div className="flex flex-col items-center gap-2">
                <Car size={22} style={{ color: "var(--amber)" }} />
                <span className="text-2xl font-bold" style={{ color: "var(--navy)" }}>{property.parking}</span>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Parking</span>
              </div>
            )}
            {property.land_size && (
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-bold" style={{ color: "var(--navy)" }}>{property.land_size}</span>
                <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>m² Land</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--amber)" }}>
              About This Property
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {property.description}
            </p>
          </div>

          {/* Agent */}
          <div style={{ borderTop: "1px solid var(--border)" }} className="pt-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--amber)" }}>
              Listed By
            </p>
            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--navy)" }}
              >
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold" style={{ color: "var(--navy)" }}>{property.agent.name}</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{property.agent.email}</p>
                {property.agent.phone && (
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{property.agent.phone}</p>
                )}
              </div>
              <div className="ml-auto">
                <button
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--amber)", color: "var(--navy)" }}
                >
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}