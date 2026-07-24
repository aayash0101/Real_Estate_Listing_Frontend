import { Suspense } from "react";
import { getListings, SearchParams } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import Pagination from "@/components/Pagination";
import { Building2, ServerCrash } from "lucide-react";

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
      <aside className="w-72 shrink-0">
        <Suspense fallback={null}>
          <SearchFilters />
        </Suspense>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Property Listings
            </h1>
            {data && (
              <p className="text-sm text-gray-500 mt-0.5">
                {data.total}{" "}
                {data.total === 1 ? "property" : "properties"} found
              </p>
            )}
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-white border border-red-200 rounded-xl p-10 text-center">
            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ServerCrash size={28} className="text-red-400" />
            </div>
            <p className="font-semibold text-gray-800 mb-1">
              Could not load listings
            </p>
            <p className="text-sm text-gray-500 mb-5">
              Make sure the backend is running on port 5000.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Try again
            </a>
          </div>
        )}

        {/* Empty state */}
        {!error && data?.items.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 size={28} className="text-gray-300" />
            </div>
            <p className="font-semibold text-gray-700 mb-1">
              No properties found
            </p>
            <p className="text-sm text-gray-400 mb-5">
              Try adjusting your filters to see more results
            </p>
            <a
              href="/"
              className="inline-flex items-center text-sm text-blue-600 hover:underline"
            >
              Clear all filters
            </a>
          </div>
        )}

        {/* Results grid */}
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