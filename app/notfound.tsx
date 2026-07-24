import Link from "next/link";
import { HomeIcon, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="rounded-2xl p-12 max-w-md w-full" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "var(--bg)" }}
        >
          <SearchX size={32} style={{ color: "var(--amber)" }} />
        </div>
        <h1 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--navy)" }}>
          Page not found
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          The listing you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--navy)", color: "#fff" }}
        >
          <HomeIcon size={15} />
          Back to listings
        </Link>
      </div>
    </div>
  );
}