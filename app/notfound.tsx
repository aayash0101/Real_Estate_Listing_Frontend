import Link from "next/link";
import { HomeIcon, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-12 max-w-md w-full">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <SearchX size={32} className="text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page not found
        </h1>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          <HomeIcon size={16} />
          Back to listings
        </Link>
      </div>
    </div>
  );
}