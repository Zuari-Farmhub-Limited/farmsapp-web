"use client";

import { X } from "lucide-react";
import { type Category } from "@/types";
import { FilterSidebar } from "../FilterSidebar";

interface MobileFilterSheetProps {
  open:           boolean;
  onClose:        () => void;
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

export function MobileFilterSheet({ open, onClose, resultCount, ...rest }: MobileFilterSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 flex max-h-[88vh] flex-col rounded-t-2xl bg-white">
        {/* Handle + header */}
        <div className="flex-shrink-0 border-b border-border">
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-gray-200" />
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-bold text-gray-900">Filters</span>
            <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <FilterSidebar {...rest} onClear={rest.onClear} resultCount={resultCount} />
        </div>

        {/* Apply button */}
        <div className="flex-shrink-0 border-t border-border p-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-white hover:bg-primary-700 active:bg-primary-800 transition-colors"
          >
            Show {resultCount} Products
          </button>
        </div>
      </div>
    </div>
  );
}
