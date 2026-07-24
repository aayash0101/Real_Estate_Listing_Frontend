"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl border transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:border-amber-400"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        <ChevronLeft size={16} style={{ color: "var(--text-primary)" }} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className="w-10 h-10 text-sm font-semibold rounded-xl border transition-all"
          style={p === currentPage
            ? { backgroundColor: "var(--navy)", color: "#fff", borderColor: "var(--navy)" }
            : { backgroundColor: "var(--card)", color: "var(--text-secondary)", borderColor: "var(--border)" }
          }
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        <ChevronRight size={16} style={{ color: "var(--text-primary)" }} />
      </button>
    </div>
  );
}