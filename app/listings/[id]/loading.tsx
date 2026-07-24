export default function ListingDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-6" />
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-3 bg-gray-200 w-full" />
        <div className="p-8 space-y-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-20" />
              <div className="h-7 bg-gray-200 rounded w-72" />
              <div className="h-4 bg-gray-100 rounded w-48" />
            </div>
            <div className="h-9 bg-gray-200 rounded w-36" />
          </div>
          <div className="grid grid-cols-4 gap-4 bg-gray-50 rounded-xl p-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 bg-gray-200 rounded" />
                <div className="h-6 bg-gray-200 rounded w-8" />
                <div className="h-3 bg-gray-100 rounded w-16" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-40" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded w-4/6" />
          </div>
          <div className="border-t border-gray-100 pt-5">
            <div className="h-5 bg-gray-200 rounded w-24 mb-3" />
            <div className="bg-gray-50 rounded-xl p-4 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-36" />
                <div className="h-3 bg-gray-100 rounded w-48" />
                <div className="h-3 bg-gray-100 rounded w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}