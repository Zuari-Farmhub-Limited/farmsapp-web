"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Share2, Star, ChevronDown, ChevronUp, Truck } from "lucide-react";
import { useProductDetail } from "@/hooks/useProducts";
import { ProductRow }       from "@/components/home/ProductRow";
import { Button }           from "@/components/ui/Button";
import { Badge }            from "@/components/ui/Badge";
import { Skeleton }         from "@/components/ui/Skeleton";
import { formatPrice } from "@/lib/utils";
import type { SKU, Product } from "@/types";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const { data, isLoading } = useProductDetail(productId);
  const product = data?.data.product;

  const [selectedSku,     setSelectedSku]     = useState<SKU | null>(null);
  const [descExpanded,    setDescExpanded]     = useState(false);
  const [reviewsExpanded, setReviewsExpanded]  = useState(false);

  const activeSku     = selectedSku ?? product?.skus?.[0] ?? null;
  const discount      = activeSku?.savings ?? 0;
  const inStock       = (activeSku?.inventoryCount ?? 0) > 0;

  // Build similar products list from similarProductsSkuMap
  const similarProducts: Product[] = product?.similarProductsSkuMap
    ? Object.entries(product.similarProductsSkuMap).map(([pid, skus]) => ({
        productId:      Number(pid),
        productName:    `Product ${pid}`,
        productImageUrl: skus[0]?.skuImageUrl ?? "",
        skus,
      }))
    : [];

  if (isLoading) return <PDPSkeleton />;
  if (!product)  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center">
      <p className="text-gray-500">Product not found.</p>
      <Link href="/products" className="mt-4 inline-block text-primary hover:underline">
        Browse all products
      </Link>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      {/* Breadcrumb */}
      <p className="mb-4 text-xs text-gray-500">
        <Link href="/" className="hover:text-primary">Home</Link>
        {" / "}
        {product.categoryName && (
          <><Link href={`/products?categories=${product.categoryId}`} className="hover:text-primary">{product.categoryName}</Link>{" / "}</>
        )}
        {product.productName}
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left — Image */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
            <Image
              src={product.productImageUrl}
              alt={product.productName}
              fill
              priority
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {discount > 0 && (
              <Badge variant="discount" className="absolute left-3 top-3 text-sm px-2.5 py-1">
                {discount}% OFF
              </Badge>
            )}
          </div>
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <button className="rounded-full bg-white p-2 shadow text-gray-500 hover:text-danger">
              <Heart size={18} />
            </button>
            <button className="rounded-full bg-white p-2 shadow text-gray-500 hover:text-primary">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Right — Info */}
        <div className="flex flex-col gap-4">
          {/* Name + Category */}
          <div>
            {product.categoryName && (
              <div className="flex gap-2 mb-2">
                <Badge variant="default">{product.categoryName}</Badge>
                {product.subCategoryName && <Badge variant="outline">{product.subCategoryName}</Badge>}
              </div>
            )}
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">{product.productName}</h1>
            {product.technicalName && (
              <p className="mt-1 text-sm text-gray-500">({product.technicalName})</p>
            )}
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-md bg-primary px-2 py-0.5">
                <Star size={12} fill="white" className="text-white" />
                <span className="text-xs font-bold text-white">{product.rating.averageRating}</span>
              </div>
              <span className="text-sm text-gray-500">({product.rating.totalRatings} ratings)</span>
            </div>
          )}

          {/* Price */}
          {activeSku && (
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">
                {activeSku.netPrice ? formatPrice(activeSku.netPrice) : "Price on request"}
              </span>
              {activeSku.mrp && activeSku.netPrice && activeSku.mrp > activeSku.netPrice && (
                <span className="text-base text-gray-400 line-through">
                  {formatPrice(activeSku.mrp)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-semibold text-accent">Save {discount}%</span>
              )}
            </div>
          )}

          {/* SKU selector */}
          {product.skus.length > 1 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.skus.map((sku) => (
                  <button
                    key={sku.skuCode}
                    onClick={() => setSelectedSku(sku)}
                    className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors ${
                      activeSku?.skuCode === sku.skuCode
                        ? "border-primary bg-primary text-white"
                        : "border-border bg-white text-gray-700 hover:border-primary"
                    }`}
                  >
                    {sku.skuSize} {sku.skuUnit}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Delivery estimate */}
          {activeSku?.estimatedDeliveryDate && (
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2">
              <Truck size={16} className="text-green-600" />
              <p className="text-sm text-green-700">
                <span className="font-semibold">Free Delivery</span>
                {" — Estimated by "}{activeSku.estimatedDeliveryDate}
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex gap-3">
            <Button variant="outline" size="lg" className="flex-1" disabled={!inStock}>
              Add to Cart
            </Button>
            <Button variant="primary" size="lg" className="flex-1" disabled={!inStock}>
              {inStock ? "Buy Now" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </div>

      {/* Description accordion */}
      {(product.description || product.detailedDescription?.length) && (
        <div className="mt-8 rounded-xl border border-border">
          <button
            className="flex w-full items-center justify-between p-4 font-bold text-gray-900"
            onClick={() => setDescExpanded((v) => !v)}
          >
            Product Description
            {descExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          {descExpanded && (
            <div className="border-t border-border p-4 text-sm text-gray-700 space-y-2">
              {product.description && <p>{product.description}</p>}
              {product.detailedDescription?.map((point, i) => (
                <p key={i} className="flex gap-2"><span className="text-primary">•</span>{point}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reviews accordion */}
      {product.rating && (
        <div className="mt-4 rounded-xl border border-border">
          <button
            className="flex w-full items-center justify-between p-4 font-bold text-gray-900"
            onClick={() => setReviewsExpanded((v) => !v)}
          >
            <span>Reviews ({product.rating.totalRatings})</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating!.averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                  />
                ))}
              </div>
              {reviewsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </button>
          {reviewsExpanded && (
            <div className="border-t border-border divide-y divide-border">
              {product.rating.recentRatings.map((review, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{review.farmerName}</p>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={12} className={s < review.farmerRating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{review.farmerReview}</p>
                  <p className="mt-1 text-xs text-gray-400">{review.farmerRatingDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Similar products */}
      {similarProducts.length > 0 && (
        <div className="mt-8">
          <ProductRow title="Similar Products" products={similarProducts} />
        </div>
      )}
    </div>
  );
}

function PDPSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
          <div className="flex gap-2">
            {Array.from({length: 4}).map((_,i) => <Skeleton key={i} className="h-9 w-16" />)}
          </div>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
