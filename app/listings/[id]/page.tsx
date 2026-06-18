import { getListingById } from "@/lib/api";
import { formatPrice, formatPropertyType } from "@/lib/utils";
import { Bed, Bath, Car, MapPin, User, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const typeColor =
    property.property_type === "HOUSE"
      ? "bg-blue-100 text-blue-700"
      : property.property_type === "APARTMENT"
      ? "bg-purple-100 text-purple-700"
      : property.property_type === "TOWNHOUSE"
      ? "bg-green-100 text-green-700"
      : property.property_type === "LAND"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to listings
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Top colour bar */}
        <div
          className={`h-3 w-full ${
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

        <div className="p-8">
          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span
                className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${typeColor}`}
              >
                {formatPropertyType(property.property_type)}
              </span>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                <MapPin size={15} />
                <span className="text-sm">{property.address}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </p>
            </div>
          </div>

          {/* Admin internal note */}
          {property.internal_status && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl px-4 py-3 flex gap-3 mb-6">
              <AlertCircle
                size={18}
                className="text-amber-600 shrink-0 mt-0.5"
              />
              <div>
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                  Internal Note (Admin Only)
                </p>
                <p className="text-sm text-amber-800 mt-0.5">
                  {property.internal_status}
                </p>
              </div>
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 rounded-xl p-5 mb-6">
            {property.bedrooms > 0 && (
              <div className="flex flex-col items-center gap-1">
                <Bed size={22} className="text-blue-500" />
                <span className="text-xl font-bold text-gray-800">
                  {property.bedrooms}
                </span>
                <span className="text-xs text-gray-500">Bedrooms</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex flex-col items-center gap-1">
                <Bath size={22} className="text-blue-500" />
                <span className="text-xl font-bold text-gray-800">
                  {property.bathrooms}
                </span>
                <span className="text-xs text-gray-500">Bathrooms</span>
              </div>
            )}
            {property.parking > 0 && (
              <div className="flex flex-col items-center gap-1">
                <Car size={22} className="text-blue-500" />
                <span className="text-xl font-bold text-gray-800">
                  {property.parking}
                </span>
                <span className="text-xs text-gray-500">Parking</span>
              </div>
            )}
            {property.land_size && (
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold text-gray-800">
                  {property.land_size}
                </span>
                <span className="text-xs text-gray-500">m² Land</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-2">
              About this property
            </h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Agent */}
          <div className="border-t border-gray-100 pt-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3">
              Listed by
            </h2>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <User size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {property.agent.name}
                </p>
                <p className="text-sm text-gray-500">{property.agent.email}</p>
                {property.agent.phone && (
                  <p className="text-sm text-gray-500">{property.agent.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}