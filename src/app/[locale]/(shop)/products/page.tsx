"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useHome";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";
import { FilterSidebar }     from "@/components/plp/FilterSidebar";
import { MobileFilterSheet } from "@/components/plp/MobileFilterSheet";
import { MobileSortSheet }   from "@/components/plp/MobileSortSheet";
import type { Product } from "@/types";

const SORT_OPTIONS = [
  { value: "relevant",   label: "Most Relevant"      },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "discount",   label: "Best Discount"      },
];

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const initCats = searchParams.getAll("categories").map(Number).filter(Boolean);

  const [page,         setPage]        = useState(1);
  const [sortBy,       setSortBy]      = useState("relevant");
  const [minPrice,     setMinPrice]    = useState<number | null>(null);
  const [maxPrice,     setMaxPrice]    = useState<number | null>(null);
  const [minDiscount,  setMinDiscount] = useState<number | null>(null);
  const [selectedCats, setSelectedCats]= useState<number[]>(initCats);
  const [filterOpen,   setFilterOpen]  = useState(false);
  const [sortOpen,     setSortOpen]    = useState(false);

  const { data: catData } = useCategories();
  const categories = catData?.data?.categories ?? [];

  const { data, isLoading } = useProducts({
    categories: selectedCats.length ? selectedCats : undefined,
    pageNumber: page,
    pageSize:   20,
  });

  const totalPages = data?.data.totalPages ?? 1;

  // Flatten subcategories → products
  const allProducts: Product[] = useMemo(() => {
    const subcats = data?.data.subcategories ?? [];
    return subcats.flatMap((sub) => sub.products ?? []);
  }, [data?.data.subcategories]);

  // Subcategories for display / filter
  const subcategories = useMemo(() => {
    return data?.data.subcategories ?? [];
  }, [data?.data.subcategories]);

  // Client-side filter + sort
  const products = useMemo(() => {
    let list = [...allProducts];
    if (minPrice    !== null) list = list.filter((p) => (p.skus[0]?.netPrice ?? 0) >= minPrice);
    if (maxPrice    !== null) list = list.filter((p) => (p.skus[0]?.netPrice ?? 0) <= maxPrice);
    if (minDiscount !== null) list = list.filter((p) => (p.skus[0]?.savings  ?? 0) >= minDiscount);
    if (sortBy === "price_asc")  list.sort((a, b) => (a.skus[0]?.netPrice ?? 0) - (b.skus[0]?.netPrice ?? 0));
    if (sortBy === "price_desc") list.sort((a, b) => (b.skus[0]?.netPrice ?? 0) - (a.skus[0]?.netPrice ?? 0));
    if (sortBy === "discount")   list.sort((a, b) => (b.skus[0]?.savings  ?? 0) - (a.skus[0]?.savings  ?? 0));
    return list;
  }, [allProducts, minPrice, maxPrice, minDiscount, sortBy]);

  const hasFilters     = selectedCats.length > 0 || minPrice !== null || maxPrice !== null || minDiscount !== null;
  const activeFilters  = [selectedCats.length > 0, minPrice !== null, maxPrice !== null, minDiscount !== null].filter(Boolean).length;
  const selectedCatName = selectedCats.length === 1 ? categories.find((c) => c.id === selectedCats[0])?.name : null;
  const currentSort    = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? "Sort";

  function clearAll() { setSelectedCats([]); setMinPrice(null); setMaxPrice(null); setMinDiscount(null); setPage(1); }
  function toggleCat(id: number) {
    setSelectedCats(p => p.includes(id) ? p.filter(c => c !== id) : [...p, id]);
    setPage(1);
  }

  const shouldGroupBySubcat = !!(data?.data.shouldRenderSubcategories && selectedCats.length === 1 && data.data.shouldRenderSubcategories[selectedCats[0]]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 pb-24 pt-4 md:px-6 md:pb-8">
      {/* Breadcrumb */}
      <p className="mb-1 text-xs text-gray-400">Home {selectedCatName ? `/ ${selectedCatName}` : "/ All Products"}</p>

      {/* Title */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-900">{selectedCatName ?? "All Products"}</h1>
        {!isLoading && products.length > 0 && (
          <p className="mt-0.5 text-sm text-gray-400">{products.length} products</p>
        )}
      </div>

      <div className="flex gap-6">
        {/* ── Desktop sidebar ──────────────────────────────────── */}
        <aside className="hidden w-56 flex-shrink-0 md:block">
          <div className="sticky top-24 rounded-xl border border-border bg-white p-4">
            <FilterSidebar
              categories={categories}
              selectedCats={selectedCats}
              onCatToggle={toggleCat}
              minPrice={minPrice}  maxPrice={maxPrice}
              onMinPrice={setMinPrice} onMaxPrice={setMaxPrice}
              minDiscount={minDiscount} onDiscount={setMinDiscount}
              onClear={clearAll}
              resultCount={products.length}
            />
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Sort bar — desktop */}
          <div className="mb-4 hidden md:flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {isLoading ? "Loading..." : `${products.length} products`}
            </p>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                className="appearance-none rounded-lg border border-border bg-white py-2 pl-3 pr-8 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Active filter chips — desktop */}
          {hasFilters && (
            <div className="mb-3 hidden md:flex flex-wrap gap-2">
              {selectedCats.map(id => {
                const name = categories.find(c => c.id === id)?.name;
                return name ? <FilterChip key={id} label={name} onRemove={() => toggleCat(id)} /> : null;
              })}
              {minDiscount && <FilterChip label={`${minDiscount}%+ off`} onRemove={() => setMinDiscount(null)} />}
              {(minPrice || maxPrice) && (
                <FilterChip label={`₹${minPrice ?? 0}–${maxPrice ?? "∞"}`} onRemove={() => { setMinPrice(null); setMaxPrice(null); }} />
              )}
            </div>
          )}

          {/* Product content */}
          {isLoading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <EmptyState onClear={clearAll} hasFilters={hasFilters} />
          ) : shouldGroupBySubcat ? (
            /* Grouped by subcategory */
            <div className="space-y-8">
              {subcategories.map((sub) => {
                const subProducts = (() => {
                  let list = [...(sub.products ?? [])];
                  if (minPrice    !== null) list = list.filter(p => (p.skus[0]?.netPrice ?? 0) >= minPrice);
                  if (maxPrice    !== null) list = list.filter(p => (p.skus[0]?.netPrice ?? 0) <= maxPrice);
                  if (minDiscount !== null) list = list.filter(p => (p.skus[0]?.savings  ?? 0) >= minDiscount);
                  return list;
                })();
                if (!subProducts.length) return null;
                return (
                  <div key={sub.id}>
                    <div className="mb-3 flex items-center gap-3">
                      <h3 className="text-sm font-bold text-gray-900">{sub.name}</h3>
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-xs text-gray-400">{subProducts.length} products</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                      {subProducts.map((p, i) => <ProductCard key={`${p.productId}-${i}`} product={p} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Flat grid */
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p, i) => <ProductCard key={`${p.productId}-${i}`} product={p} />)}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-gray-700 disabled:opacity-40 hover:bg-muted transition-colors"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              <span className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">{page}</span> / {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-gray-700 disabled:opacity-40 hover:bg-muted transition-colors"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ─────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex border-t border-border bg-white shadow-nav md:hidden">
        <button
          onClick={() => setFilterOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-gray-700 border-r border-border hover:bg-muted transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilters > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
              {activeFilters}
            </span>
          )}
        </button>
        <button
          onClick={() => setSortOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-gray-700 hover:bg-muted transition-colors"
        >
          <ArrowUpDown size={16} />
          {sortBy === "relevant" ? "Sort" : currentSort}
        </button>
      </div>

      {/* Mobile sheets */}
      <MobileFilterSheet
        open={filterOpen} onClose={() => setFilterOpen(false)}
        categories={categories} selectedCats={selectedCats} onCatToggle={toggleCat}
        minPrice={minPrice} maxPrice={maxPrice} onMinPrice={setMinPrice} onMaxPrice={setMaxPrice}
        minDiscount={minDiscount} onDiscount={setMinDiscount}
        onClear={clearAll} resultCount={products.length}
      />
      <MobileSortSheet
        open={sortOpen} onClose={() => setSortOpen(false)}
        value={sortBy} onChange={(v) => { setSortBy(v); setPage(1); }}
      />
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1 rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary">
      {label}
      <button onClick={onRemove} className="ml-0.5 hover:text-danger transition-colors">✕</button>
    </span>
  );
}

function EmptyState({ onClear, hasFilters }: { onClear: () => void; hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">🌾</div>
      <h3 className="text-base font-bold text-gray-900 mb-1">No products found</h3>
      <p className="text-sm text-gray-400 mb-5">
        {hasFilters ? "Try adjusting your filters" : "No products in this category yet"}
      </p>
      {hasFilters && (
        <button onClick={onClear} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-700 transition-colors">
          Clear filters
        </button>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense><ProductsPageInner /></Suspense>
  );
}
