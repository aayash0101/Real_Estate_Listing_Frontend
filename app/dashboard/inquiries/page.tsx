"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireAgent from "@/components/RequireAgent";
import { useAuth } from "@/lib/auth-context";
import { getMyInquiries, Inquiry } from "@/lib/api";

function InquiriesContent() {
  const { auth } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) return;
    getMyInquiries(auth.token)
      .then(setInquiries)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load inquiries"))
      .finally(() => setIsLoading(false));
  }, [auth]);

  if (isLoading) return <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Loading inquiries...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl mb-6" style={{ color: "var(--text-primary)" }}>
        Inquiries
      </h1>

      {inquiries.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          No inquiries yet.
        </p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-xl p-5"
              style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-semibold" style={{ color: "var(--navy)" }}>{inquiry.name}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {inquiry.email}
                    {inquiry.phone && ` · ${inquiry.phone}`}
                  </p>
                </div>
                <p className="text-xs shrink-0" style={{ color: "var(--text-secondary)" }}>
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </p>
              </div>

              <p className="text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                {inquiry.message}
              </p>

              <Link
                href={`/listings/${inquiry.property.id}`}
                className="text-xs font-medium hover:opacity-70 transition-opacity"
                style={{ color: "var(--amber)" }}
              >
                Re: {inquiry.property.title} — {inquiry.property.address}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function InquiriesPage() {
  return (
    <RequireAgent>
      <InquiriesContent />
    </RequireAgent>
  );
}