import Link from "next/link";
import { Bed, Bath, Car, MapPin } from "lucide-react";
import { Property } from "@/lib/api";
import { formatPrice, formatPropertyType } from "@/lib/utils";

const TYPE_ACCENT: Record<string, string> = {
  HOUSE: "#3B82F6",
  APARTMENT: "#8B5CF6",
  TOWNHOUSE: "#10B981",
  LAND: "#F59E0B",
  COMMERCIAL: "#64748B",
};

export default function PropertyCard({ property }: { property: Property }) {
  const accent = TYPE_ACCENT[property.property_type] ?? "#64748B";

  return (
    <Link href={`/listings/${property.id}`}>
      <div
        className="group rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer flex"
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
      >
        {/* Left amber accent bar */}
        <div className="w-1 shrink-0 transition-all" style={{ backgroundColor: "var(--amber)" }} />

        <div className="flex-1 p-5">
          {/* Top row: type badge + price */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <span
              className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${accent}18`, color: accent }}
            >
              {formatPropertyType(property.property_type)}
            </span>
            <div className="text-right shrink-0">
              <p className="font-display text-xl font-bold" style={{ color: "var(--navy)" }}>
                {formatPrice(property.price)}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base leading-snug mb-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors"
            style={{ color: "var(--text-primary)" }}>
            {property.title}
          </h3>

          {/* Address */}
          <div className="flex items-center gap-1.5 mb-4" style={{ color: "var(--text-secondary)" }}>
            <MapPin size={12} />
            <span className="text-xs truncate">{property.address}</span>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                <Bed size={14} /> {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                <Bath size={14} /> {property.bathrooms}
              </span>
            )}
            {property.parking > 0 && (
              <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                <Car size={14} /> {property.parking}
              </span>
            )}
            {property.land_size && (
              <span className="ml-auto text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {property.land_size} m²
              </span>
            )}
          </div>

          {/* Admin note */}
          {property.internal_status && (
            <div className="mt-3 px-3 py-2 rounded-lg" style={{ backgroundColor: "var(--amber-light)", border: "1px solid #F0D080" }}>
              <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: "#92650A" }}>
                Internal Note
              </p>
              <p className="text-xs" style={{ color: "#78530A" }}>{property.internal_status}</p>
            </div>
          )}

          {/* Agent */}
          <p className="text-xs mt-3" style={{ color: "var(--text-secondary)" }}>
            Agent: <span className="font-medium">{property.agent.name}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}