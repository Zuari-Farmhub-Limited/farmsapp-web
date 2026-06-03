"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { productsApi, type ProductListParams } from "@/lib/api/endpoints/products";
import { QUERY_KEYS } from "@/config/constants";
import { usePincodeStore } from "@/store/pincodeStore";

export function useProducts(params: Omit<ProductListParams, "storeId" | "farmerId">) {
  const { storeId } = usePincodeStore();
  return useQuery({
    queryKey: [...QUERY_KEYS.products, storeId, params],
    queryFn:  () => productsApi.getProducts({ ...params, storeId: storeId ?? undefined }),
    staleTime: 2 * 60 * 1000,
  });
}

export function useInfiniteProducts(params: Omit<ProductListParams, "storeId" | "farmerId" | "pageNumber">) {
  const { storeId } = usePincodeStore();
  return useInfiniteQuery({
    queryKey:        [...QUERY_KEYS.products, "infinite", storeId, params],
    initialPageParam: 1,
    queryFn:         ({ pageParam }) =>
      productsApi.getProducts({ ...params, storeId: storeId ?? undefined, pageNumber: pageParam as number }),
    getNextPageParam: (last) => {
      const { pageNumber, totalPages } = last.data;
      return pageNumber < totalPages ? pageNumber + 1 : undefined;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useProductDetail(productId: number) {
  const { storeId } = usePincodeStore();
  return useQuery({
    queryKey: QUERY_KEYS.product(String(productId)),
    queryFn:  () => productsApi.getProductDetail(productId, { storeId: storeId ?? undefined }),
    staleTime: 5 * 60 * 1000,
    enabled:  !!productId,
  });
}

export function useSearch(keyword: string, pageSize = 10) {
  const { storeId } = usePincodeStore();
  return useQuery({
    queryKey: QUERY_KEYS.search(keyword),
    queryFn:  () => productsApi.search({ searchKeyword: keyword, storeId: storeId ?? undefined, pageSize }),
    enabled:  keyword.length > 1,
    staleTime: 60 * 1000,
  });
}

export function usePincodeValidation(pincode: number | null) {
  return useQuery({
    queryKey: ["pincode", pincode],
    queryFn:  () => productsApi.validatePincode(pincode!),
    enabled:  !!pincode && String(pincode).length === 6,
    staleTime: 30 * 60 * 1000,
  });
}
