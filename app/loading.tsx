export default function Loading() {
  return (
    <div className="flex gap-6">
      {/* Sidebar skeleton */}
      <aside className="w-72 shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24" />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-100 rounded w-20" />
              <div className="h-9 bg-gray-100 rounded-lg w-full" />
            </div>
          ))}
          <div className="h-10 bg-gray-200 rounded-lg w-full" />
        </div>
      </aside>

      {/* Cards skeleton */}
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-40 mb-5 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
            >
              <div className="h-2 bg-gray-200 w-full" />
              <div className="p-5 space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded w-20" />
                  <div className="h-5 bg-gray-200 rounded w-28" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="flex gap-4 pt-2 border-t border-gray-100">
                  <div className="h-4 bg-gray-100 rounded w-10" />
                  <div className="h-4 bg-gray-100 rounded w-10" />
                  <div className="h-4 bg-gray-100 rounded w-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}