"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { type Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

interface ProductCardProps {
  product:   Product;
  className?:string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const sku        = product.skus?.[0];
  const hasPrice   = sku?.netPrice != null;
  const discount   = sku?.savings ?? 0;
  const inStock    = (sku?.inventoryCount ?? 0) > 0;

  return (
    <article className={`group relative flex flex-col h-full w-full rounded-md bg-white shadow-card transition-shadow hover:shadow-card-hover overflow-hidden ${className ?? ""}`}>

      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute left-0 top-0 z-10 rounded-br-md bg-accent px-2 py-1">
          <span className="text-2xs font-bold text-white">{discount}% OFF</span>
        </div>
      )}

      {/* Wishlist */}
      <button
        className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-gray-300 shadow-sm transition-colors hover:text-red-500 press-scale"
        aria-label="Save to wishlist"
      >
        <Heart size={14} strokeWidth={2} />
      </button>

      {/* Image */}
      <Link href={`/product/${product.productId}`} className="block bg-white">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={product.productImageUrl}
            alt={product.productName}
            fill
            sizes="(max-width: 640px) 50vw, 20vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 border-t border-border p-3">

        {/* Name + technical */}
        <Link href={`/product/${product.productId}`} className="flex-1 min-h-0">
          <p className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 group-hover:text-primary transition-colors">
            {product.productName}
          </p>
          {product.technicalName && (
            <p className="mt-0.5 truncate text-xs text-gray-400">
              {product.technicalName}
            </p>
          )}
        </Link>

        {/* Price */}
        {hasPrice ? (
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-primary leading-none">
              {formatPrice(sku!.netPrice!)}
            </span>
            {sku!.mrp && sku!.mrp > sku!.netPrice! && (
              <span className="text-xs text-gray-400 line-through leading-none">
                {formatPrice(sku!.mrp)}
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs text-gray-400 italic">Price on enquiry</span>
        )}

        {/* Size + CTA row */}
        <div className="flex items-center gap-2 mt-auto">
          {sku && (
            <div className="flex items-center gap-1 rounded-sm border border-border bg-muted px-2 py-1 text-xs font-semibold text-gray-600">
              {sku.skuSize} {sku.skuUnit}
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-gray-400">
                <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          )}

          {hasPrice ? (
            <button
              disabled={!inStock}
              className="ml-auto rounded-sm px-3 py-1.5 text-xs font-bold text-white transition-opacity press-scale disabled:opacity-50"
              style={{ backgroundColor: inStock ? "#1F4529" : "#9CA3AF" }}
            >
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          ) : (
            <Link
              href={`/product/${product.productId}`}
              className="ml-auto rounded-sm border border-primary px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary-50 transition-colors"
            >
              View
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-md bg-white shadow-card overflow-hidden h-full flex flex-col">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-3 flex flex-col gap-2 flex-1 border-t border-border">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-5 w-1/2 mt-auto" />
        <Skeleton className="h-7 w-full" />
      </div>
    </div>
  );
}
