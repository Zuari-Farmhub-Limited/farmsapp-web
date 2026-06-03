"use client";

import Image from "next/image";
import Link from "next/link";
import { type CropCollection } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

interface CropCollectionsProps {
  collections: CropCollection[];
  isLoading?:  boolean;
}

export function CropCollections({ collections, isLoading }: CropCollectionsProps) {
  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2 w-[76px]">
            <Skeleton className="h-[76px] w-[76px] rounded-xl" />
            <Skeleton className="h-3 w-14 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!collections.length) return null;

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
      {collections.map((col) => (
        <Link
          key={col.id}
          href={`/products?crop=${col.id}`}
          className="group flex-shrink-0 flex flex-col items-center gap-2 w-[76px] press-scale"
        >
          <div className="relative h-[76px] w-[76px] overflow-hidden rounded-xl bg-primary-50 ring-1 ring-transparent transition-all duration-200 group-hover:ring-primary group-hover:shadow-md">
            {col.imageUrl && (
              <Image
                src={col.imageUrl}
                alt={col.name}
                fill
                sizes="76px"
                className="object-contain p-1.5"
              />
            )}
          </div>
          <span className="w-[76px] truncate text-center text-[11px] font-semibold text-gray-600 group-hover:text-primary transition-colors leading-tight">
            {col.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
