"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const PROPERTY_TYPES = ["HOUSE", "APARTMENT", "TOWNHOUSE", "LAND", "COMMERCIAL"];

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
    setKeyword("");
    setSuburb("");
    setPriceMin("");
    setPriceMax("");
    setBedrooms("");
    setBathrooms("");
    setPropertyType("");
    router.push("/");
  }

  const hasFilters =
    keyword || suburb || priceMin || priceMax || bedrooms || bathrooms || propertyType;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-700 font-semibold">
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={13} />
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Keyword */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Keyword
          </label>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="e.g. pool, renovated..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Suburb */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Suburb
          </label>
          <input
            type="text"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. Northside"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">All types</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0) + t.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Price Range (AUD)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="Min"
              className="w-1/2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="Max"
              className="w-1/2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Min Bedrooms
          </label>
          <div className="flex gap-2">
            {["", "1", "2", "3", "4", "5"].map((n) => (
              <button
                key={n}
                onClick={() => setBedrooms(n)}
                className={`flex-1 py-1.5 text-sm rounded-lg border transition-colors ${
                  bedrooms === n
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                }`}
              >
                {n === "" ? "Any" : n + "+"}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Min Bathrooms
          </label>
          <div className="flex gap-2">
            {["", "1", "2", "3"].map((n) => (
              <button
                key={n}
                onClick={() => setBathrooms(n)}
                className={`flex-1 py-1.5 text-sm rounded-lg border transition-colors ${
                  bathrooms === n
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-200 text-gray-600 hover:border-blue-300"
                }`}
              >
                {n === "" ? "Any" : n + "+"}
              </button>
            ))}
          </div>
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
        >
          Search Properties
        </button>
      </div>
    </div>
  );
}