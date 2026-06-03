"use client";

import { useState } from "react";
import { MapPin, X, ChevronRight } from "lucide-react";
import { usePincodeStore } from "@/store/pincodeStore";
import { productsApi } from "@/lib/api/endpoints/products";

export function PincodePrompt() {
  const { pincode, dismissed, setPincode, dismiss } = usePincodeStore();
  const [expanded, setExpanded] = useState(false);
  const [value,    setValue]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  if (pincode || dismissed) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.length !== 6) return;
    setLoading(true);
    setError("");
    try {
      const res  = await productsApi.validatePincode(Number(value));
      const info = res.data.pincode;
      if (!info.serviceable) {
        setError("We don't deliver to this pincode yet.");
        return;
      }
      setPincode(info.pincode, info);
    } catch {
      setError("Invalid pincode. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Collapsed state — slim bar at bottom
  if (!expanded) {
    return (
      <div className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2">
        <button
          onClick={() => setExpanded(true)}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-white shadow-lg hover:bg-primary-700 transition-colors"
        >
          <MapPin size={15} />
          <span className="text-sm font-semibold">Check delivery to your area</span>
          <ChevronRight size={15} />
        </button>
      </div>
    );
  }

  // Expanded state — card
  return (
    <div className="fixed bottom-4 left-1/2 z-20 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2">
      <div className="rounded-2xl bg-white border border-border shadow-modal p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50">
              <MapPin size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Enter your pincode</p>
              <p className="text-xs text-gray-500">Get delivery info & best prices</p>
            </div>
          </div>
          <button onClick={() => { setExpanded(false); dismiss(); }} className="text-gray-400 hover:text-gray-600 p-0.5">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="tel"
            inputMode="numeric"
            maxLength={6}
            value={value}
            onChange={(e) => { setValue(e.target.value.replace(/\D/g, "")); setError(""); }}
            placeholder="6-digit pincode"
            autoFocus
            className="flex-1 rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={value.length !== 6 || loading}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? "..." : "Apply"}
          </button>
        </form>
        {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      </div>
    </div>
  );
}
