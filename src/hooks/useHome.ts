"use client";

import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/lib/api";
import { QUERY_KEYS } from "@/config/constants";
import { usePincodeStore } from "@/store/pincodeStore";

export function useLayoutConfig() {
  const { pincode } = usePincodeStore();
  return useQuery({
    queryKey:  ["layout-config", pincode],
    queryFn:   () => homeApi.getLayoutConfig({ pincode: pincode ?? undefined }),
    staleTime: 5 * 60 * 1000,
    retry:     false,
  });
}

export function useBanners(language = "English") {
  return useQuery({
    queryKey:  [...QUERY_KEYS.banners, language],
    queryFn:   () => homeApi.getBanners(language),
    staleTime: 5 * 60 * 1000,
    retry:     false,
  });
}

export function useCategories() {
  return useQuery({
    queryKey:  QUERY_KEYS.categories,
    queryFn:   () => homeApi.getCategories(),
    staleTime: 10 * 60 * 1000,
    retry:     false,
  });
}

export function usePopularProducts(pageSize = 10, fetchBestSellers = false) {
  const { storeId } = usePincodeStore();
  return useQuery({
    queryKey:  [...QUERY_KEYS.popularProducts, storeId, pageSize, fetchBestSellers],
    queryFn:   () => homeApi.getPopularProducts({ storeId: storeId ?? undefined, pageSize, fetchBestSellers }),
    staleTime: 2 * 60 * 1000,
    retry:     false,
  });
}

export function useCropCollections() {
  const { pincode } = usePincodeStore();
  return useQuery({
    queryKey:  [...QUERY_KEYS.cropCollections, pincode],
    queryFn:   () => homeApi.getCropCollections(pincode ?? undefined),
    staleTime: 5 * 60 * 1000,
    retry:     false,
  });
}
