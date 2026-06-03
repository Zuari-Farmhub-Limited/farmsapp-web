"use client";

import { Check, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: "relevant",   label: "Most Relevant"      },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount",   label: "Best Discount"      },
];

interface MobileSortSheetProps {
  open:     boolean;
  onClose:  () => void;
  value:    string;
  onChange: (v: string) => void;
}

export function MobileSortSheet({ open, onClose, value, onChange }: MobileSortSheetProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white">
        <div className="flex-shrink-0 border-b border-border">
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-gray-200" />
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-bold text-gray-900">Sort by</span>
            <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-muted">
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="px-2 py-2 pb-6">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); onClose(); }}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              <span className={value === opt.value ? "text-primary" : "text-gray-700"}>
                {opt.label}
              </span>
              {value === opt.value && <Check size={16} className="text-primary" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
