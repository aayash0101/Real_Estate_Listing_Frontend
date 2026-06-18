import { Suspense } from "react";
import { getListings, SearchParams } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import Pagination from "@/components/Pagination";
import { Building2 } from "lucide-react";

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  let data;
  let error = false;

  try {
    data = await getListings(params);
  } catch {
    error = true;
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar filters */}
      <aside className="w-72 shrink-0">
        <Suspense fallback={null}>
          <SearchFilters />
        </Suspense>
      </aside>

      {/* Results */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Property Listings
            </h1>
            {data && (
              <p className="text-sm text-gray-500 mt-0.5">
                {data.total} {data.total === 1 ? "property" : "properties"} found
              </p>
            )}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-600 font-medium">
              Could not connect to the API. Make sure the backend is running on port 5000.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!error && data?.items.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No properties found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}

        {/* Grid */}
        {!error && data && data.items.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {data.items.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <Suspense fallback={null}>
              <Pagination
                currentPage={data.page}
                totalPages={data.totalPages}
              />
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}