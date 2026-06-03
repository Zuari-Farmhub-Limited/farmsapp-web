"use client";

import { useBanners, useCategories, usePopularProducts, useCropCollections, useLayoutConfig } from "@/hooks/useHome";
import { BannerCarousel }  from "@/components/home/BannerCarousel";
import { CategoryGrid }    from "@/components/home/CategoryGrid";
import { ProductRow }      from "@/components/home/ProductRow";
import { CropCollections } from "@/components/home/CropCollections";
import { PincodePrompt }   from "@/components/shared/PincodePrompt";
import { type SectionType } from "@/types";

export default function HomePage() {
  const { data: layoutData } = useLayoutConfig();
  const sections = layoutData?.data.data?.homepage_vertical_section_order ?? DEFAULT_SECTIONS;
  const enabledSections = sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pb-24 pt-4 md:px-6 space-y-8">
        {enabledSections.map((section) => (
          <HomeSection key={section.type} type={section.type} />
        ))}
      </div>
      <PincodePrompt />
    </>
  );
}

function HomeSection({ type }: { type: SectionType }) {
  switch (type) {
    case "BANNER_SLIDER":
    case "EVENT_COUNTDOWN_BANNER":
      return <BannerSection />;
    case "CATEGORIES":
      return <CategoriesSection />;
    case "BEST_SELLING":
      return <BestSellingSection />;
    case "SHOP_BY_CROP":
      return <CropSection />;
    case "ALL_PRODUCTS":
      return <AllProductsSection />;
    default:
      return null;
  }
}

function BannerSection() {
  const { data, isLoading, isError } = useBanners();
  if (isError) return null;
  const banners = data?.data?.bannerList ?? [];
  if (!isLoading && !banners.length) return null;
  return <BannerCarousel banners={banners} isLoading={isLoading} />;
}

function CategoriesSection() {
  const { data, isLoading, isError } = useCategories();
  if (isError) return null;
  const cats = data?.data?.categories ?? [];
  if (!isLoading && !cats.length) return null;
  return (
    <section>
      <SectionHeader title="Shop by Category" />
      <CategoryGrid categories={cats} isLoading={isLoading} />
    </section>
  );
}

function BestSellingSection() {
  const { data, isLoading, isError } = usePopularProducts(10, true);
  if (isError) return null;
  return (
    <ProductRow
      title="Best Sellers"
      subtitle="Top picks by farmers across India"
      products={data?.data?.products}
      isLoading={isLoading}
      viewAllHref="/products"
    />
  );
}

function CropSection() {
  const { data, isLoading, isError } = useCropCollections();
  if (isError) return null;
  const collections = data?.data?.collections ?? [];
  if (!isLoading && !collections.length) return null;
  return (
    <section>
      <SectionHeader title="Shop by Crop" />
      <CropCollections collections={collections} isLoading={isLoading} />
    </section>
  );
}

function AllProductsSection() {
  const { data, isLoading, isError } = usePopularProducts(10);
  if (isError) return null;
  return (
    <ProductRow
      title="All Products"
      products={data?.data?.products}
      isLoading={isLoading}
      viewAllHref="/products"
    />
  );
}

function SectionHeader({ title, viewAllHref }: { title: string; viewAllHref?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-base font-bold text-gray-900 md:text-lg">{title}</h2>
      {viewAllHref && (
        <a href={viewAllHref} className="text-sm font-semibold text-primary hover:underline">
          View all →
        </a>
      )}
    </div>
  );
}

const DEFAULT_SECTIONS = [
  { type: "BANNER_SLIDER"  as SectionType, order: 1, enabled: true },
  { type: "CATEGORIES"     as SectionType, order: 2, enabled: true },
  { type: "BEST_SELLING"   as SectionType, order: 3, enabled: true },
  { type: "SHOP_BY_CROP"   as SectionType, order: 4, enabled: true },
  { type: "ALL_PRODUCTS"   as SectionType, order: 5, enabled: true },
];
