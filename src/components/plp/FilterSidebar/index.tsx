"use client";

import { type Category } from "@/types";

interface FilterSidebarProps {
  categories:     Category[];
  selectedCats:   number[];
  onCatToggle:    (id: number) => void;
  minPrice:       number | null;
  maxPrice:       number | null;
  onMinPrice:     (v: number | null) => void;
  onMaxPrice:     (v: number | null) => void;
  minDiscount:    number | null;
  onDiscount:     (v: number | null) => void;
  onClear:        () => void;
  resultCount:    number;
}

const DISCOUNTS = [
  { label: "10% & above", value: 10 },
  { label: "20% & above", value: 20 },
  { label: "40% & above", value: 40 },
  { label: "60% & above", value: 60 },
];

export function FilterSidebar({
  categories, selectedCats, onCatToggle,
  minPrice, maxPrice, onMinPrice, onMaxPrice,
  minDiscount, onDiscount, onClear,
}: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">Filters</span>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <FilterSection title="Categories">
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex cursor-pointer items-center gap-2.5 group">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat.id)}
                onChange={() => onCatToggle(cat.id)}
                className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={(e) => onMinPrice(e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <span className="text-gray-400 flex-shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={(e) => onMaxPrice(e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount">
        <div className="flex flex-col gap-2">
          {DISCOUNTS.map((d) => (
            <label key={d.value} className="flex cursor-pointer items-center gap-2.5 group">
              <input
                type="radio"
                name="discount-filter"
                checked={minDiscount === d.value}
                onChange={() => onDiscount(d.value)}
                className="h-4 w-4 accent-primary cursor-pointer"
              />
              <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                {d.label}
              </span>
            </label>
          ))}
          {minDiscount !== null && (
            <button
              onClick={() => onDiscount(null)}
              className="mt-1 w-fit text-xs font-semibold text-danger hover:underline"
            >
              Clear
            </button>
          )}
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">{title}</p>
      {children}
    </div>
  );
}
