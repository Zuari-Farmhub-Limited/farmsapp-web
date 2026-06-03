"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Banner } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface BannerCarouselProps {
  banners:   Banner[];
  isLoading?:boolean;
}

export function BannerCarousel({ banners, isLoading }: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const active = banners.filter((b) => b.active);

  const prev = useCallback(() =>
    setCurrent((c) => (c === 0 ? active.length - 1 : c - 1)), [active.length]);
  const next = useCallback(() =>
    setCurrent((c) => (c === active.length - 1 ? 0 : c + 1)), [active.length]);

  useEffect(() => {
    if (active.length <= 1) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [active.length, next]);

  if (isLoading) return <Skeleton className="w-full aspect-[2.5/1] rounded-xl" />;
  if (!active.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {active.map((banner) => (
          <Link
            key={banner.id}
            href={banner.redirectUrl ?? "#"}
            className="relative aspect-[2.5/1] w-full flex-shrink-0 md:aspect-[3.5/1]"
          >
            <Image
              src={banner.imageUrl}
              alt={banner.title ?? "Banner"}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </Link>
        ))}
      </div>

      {/* Controls */}
      {active.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow hover:bg-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow hover:bg-white"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {active.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === current ? "w-4 bg-white" : "w-1.5 bg-white/60",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
