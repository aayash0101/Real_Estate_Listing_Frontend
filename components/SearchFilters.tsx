"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";

const PROPERTY_TYPES = ["HOUSE", "APARTMENT", "TOWNHOUSE", "LAND", "COMMERCIAL"];
const TYPE_LABELS: Record<string, string> = {
  HOUSE: "House",
  APARTMENT: "Apartment",
  TOWNHOUSE: "Townhouse",
  LAND: "Land",
  COMMERCIAL: "Commercial",
};

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");
  const [suburb, setSuburb] = useState(searchParams.get("suburb") ?? "");
  const [priceMin, setPriceMin] = useState(searchParams.get("price_min") ?? "");
  const [priceMax, setPriceMax] = useState(searchParams.get("price_max") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");
  const [bathrooms, setBathrooms] = useState(searchParams.get("bathrooms") ?? "");
  const [propertyType, setPropertyType] = useState(searchParams.get("property_type") ?? "");

  function buildQuery() {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (suburb) params.set("suburb", suburb);
    if (priceMin) params.set("price_min", priceMin);
    if (priceMax) params.set("price_max", priceMax);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (bathrooms) params.set("bathrooms", bathrooms);
    if (propertyType) params.set("property_type", propertyType);
    params.set("page", "1");
    return params.toString();
  }

  function handleSearch() {
    router.push(`/?${buildQuery()}`);
  }

  function handleClear() {
    setKeyword(""); setSuburb(""); setPriceMin("");
    setPriceMax(""); setBedrooms(""); setBathrooms(""); setPropertyType("");
    router.push("/");
  }

  const hasFilters = keyword || suburb || priceMin || priceMax || bedrooms || bathrooms || propertyType;
  const inputClass = "w-full px-3 py-2.5 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-all bg-white";

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} style={{ color: "var(--amber)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Filters</span>
        </div>
        {hasFilters && (
          <button onClick={handleClear} className="flex items-center gap-1 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            <X size={12} /> Clear
          </button>
        )}
      </div>

      <div className="p-5 space-y-5">
        {/* Keyword */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Keyword
          </label>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }} />
            <input
              type="text" value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Pool, renovated, views..."
              className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text-primary)", paddingLeft: "2rem" }}
            />
          </div>
        </div>

        {/* Suburb */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Suburb
          </label>
          <input
            type="text" value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. Northside"
            className={inputClass}
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Property Type
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {PROPERTY_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setPropertyType(propertyType === t ? "" : t)}
                className="py-2 px-3 text-xs font-medium rounded-lg border transition-all text-left"
                style={propertyType === t
                  ? { backgroundColor: "var(--navy)", color: "#fff", borderColor: "var(--navy)" }
                  : { backgroundColor: "var(--bg)", color: "var(--text-secondary)", borderColor: "var(--border)" }
                }
              >
                {TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Price (AUD)
          </label>
          <div className="flex gap-2">
            <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)}
              placeholder="Min" className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }} />
            <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)}
              placeholder="Max" className={inputClass}
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }} />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Min Bedrooms
          </label>
          <div className="flex gap-1.5">
            {["", "1", "2", "3", "4", "5"].map((n) => (
              <button key={n} onClick={() => setBedrooms(n)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg border transition-all"
                style={bedrooms === n
                  ? { backgroundColor: "var(--amber)", color: "var(--navy)", borderColor: "var(--amber)" }
                  : { backgroundColor: "var(--bg)", color: "var(--text-secondary)", borderColor: "var(--border)" }
                }>
                {n === "" ? "Any" : `${n}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-secondary)" }}>
            Min Bathrooms
          </label>
          <div className="flex gap-1.5">
            {["", "1", "2", "3"].map((n) => (
              <button key={n} onClick={() => setBathrooms(n)}
                className="flex-1 py-2 text-xs font-semibold rounded-lg border transition-all"
                style={bathrooms === n
                  ? { backgroundColor: "var(--amber)", color: "var(--navy)", borderColor: "var(--amber)" }
                  : { backgroundColor: "var(--bg)", color: "var(--text-secondary)", borderColor: "var(--border)" }
                }>
                {n === "" ? "Any" : `${n}+`}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--navy)", color: "#fff" }}
        >
          Search Properties
        </button>
      </div>
    </div>
  );
}