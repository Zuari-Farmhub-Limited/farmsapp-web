"use client";

import Image from "next/image";
import Link from "next/link";
import { type Category } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

interface CategoryGridProps {
  categories: Category[];
  isLoading?: boolean;
}

export function CategoryGrid({ categories, isLoading }: CategoryGridProps) {
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <CategoryTileSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-8">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/products?categories=${cat.id}`}
          className="group flex-shrink-0 flex flex-col items-center gap-2 outline-none"
          tabIndex={0}
        >
          {/* Tile — fixed 72×72, no border by default */}
          <div className="relative h-[72px] w-[72px] flex-shrink-0 rounded-xl overflow-hidden bg-primary-50 transition-all duration-150 group-hover:bg-primary-100 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-primary">
            {cat.imageUrl && (
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                sizes="72px"
                className="object-contain p-2.5 transition-transform duration-150 group-hover:scale-110"
              />
            )}
            {cat.badgeEnabled && cat.badgeText && (
              <span
                className="absolute right-0 top-0 rounded-bl-md rounded-tr-xl px-1.5 py-0.5 text-[9px] font-bold leading-none text-white"
                style={{ backgroundColor: cat.badgeColor ?? "#0284C7" }}
              >
                {cat.badgeText}
              </span>
            )}
          </div>

          {/* Label — single line, no wrap */}
          <span className="w-[72px] truncate text-center text-[11px] font-medium text-gray-600 group-hover:text-primary transition-colors">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

function CategoryTileSkeleton() {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2">
      <Skeleton className="h-[72px] w-[72px] rounded-xl" />
      <Skeleton className="h-3 w-14 rounded" />
    </div>
  );
}
