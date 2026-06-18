import Link from "next/link";
import { Bed, Bath, Car, MapPin } from "lucide-react";
import { Property } from "@/lib/api";
import { formatPrice, formatPropertyType } from "@/lib/utils";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  return (
    <Link href={`/listings/${property.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer">
        {/* Colour banner based on property type */}
        <div
          className={`h-2 w-full ${
            property.property_type === "HOUSE"
              ? "bg-blue-500"
              : property.property_type === "APARTMENT"
              ? "bg-purple-500"
              : property.property_type === "TOWNHOUSE"
              ? "bg-green-500"
              : property.property_type === "LAND"
              ? "bg-yellow-500"
              : "bg-gray-500"
          }`}
        />

        <div className="p-5">
          {/* Type badge + price */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {formatPropertyType(property.property_type)}
            </span>
            <span className="text-lg font-bold text-blue-600 whitespace-nowrap">
              {formatPrice(property.price)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1 line-clamp-2">
            {property.title}
          </h3>

          {/* Address */}
          <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
            <MapPin size={13} />
            <span className="truncate">{property.address}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed size={15} />
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath size={15} />
                {property.bathrooms}
              </span>
            )}
            {property.parking > 0 && (
              <span className="flex items-center gap-1">
                <Car size={15} />
                {property.parking}
              </span>
            )}
            {property.land_size && (
              <span className="ml-auto text-xs text-gray-400">
                {property.land_size} m²
              </span>
            )}
          </div>

          {/* Admin badge */}
          {property.internal_status && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-0.5">
                Internal Note
              </p>
              <p className="text-xs text-amber-800">{property.internal_status}</p>
            </div>
          )}

          {/* Agent */}
          <p className="text-xs text-gray-400 mt-3">
            Agent: {property.agent.name}
          </p>
        </div>
      </div>
    </Link>
  );
}