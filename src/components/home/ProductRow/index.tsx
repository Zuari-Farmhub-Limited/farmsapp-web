"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Product } from "@/types";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";

interface ProductRowProps {
  title:         string;
  subtitle?:     string;
  products?:     Product[];
  isLoading?:    boolean;
  viewAllHref?:  string;
  cols?:         4 | 5;
}

export function ProductRow({ title, subtitle, products, isLoading, viewAllHref, cols = 5 }: ProductRowProps) {
  const isEmpty = !isLoading && (!products || products.length === 0);
  if (isEmpty) return null;

  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-base font-bold text-gray-900 md:text-lg">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-primary hover:bg-primary-50 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="flex items-stretch gap-3 overflow-x-auto scrollbar-hide pb-1 md:hidden">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-[152px] flex-shrink-0"><ProductCardSkeleton /></div>
            ))
          : products?.map((p) => (
              <div key={p.productId} className="w-[152px] flex-shrink-0"><ProductCard product={p} /></div>
            ))}
      </div>

      {/* Desktop: grid */}
      <div className={`hidden md:grid gap-4 items-stretch ${cols === 5 ? "md:grid-cols-4 lg:grid-cols-5" : "md:grid-cols-4"}`}>
        {isLoading
          ? Array.from({ length: cols }).map((_, i) => <ProductCardSkeleton key={i} />)
          : products?.slice(0, cols).map((p) => <ProductCard key={p.productId} product={p} />)}
      </div>
    </section>
  );
}
