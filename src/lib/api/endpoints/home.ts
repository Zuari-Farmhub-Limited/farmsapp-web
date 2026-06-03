import { apiClient } from "../client";
import type { Banner, LayoutConfig, Category, CropCollection, Product } from "@/types";

// Actual response shapes — data fields at top level alongside status
export interface CategoriesResponse {
  status:     string;
  categories: Category[];
}

export interface BannersResponse {
  status:     string;
  bannerList: Banner[];
}

export interface LayoutConfigResponse {
  status:      string;
  httpStatus?: string;
  status_code?:string;
  data:        LayoutConfig;  // actual config nested under "data"
}

export interface PopularProductsResponse {
  status:     string;
  products:   Product[];
  pageNumber: number;
  pageSize:   number;
  totalPages: number;
}

export interface CropCollectionsResponse {
  status:      string;
  collections: CropCollection[];
}

export const homeApi = {
  getLayoutConfig: (params?: { farmerId?: number; pincode?: number }) =>
    apiClient.get<LayoutConfigResponse>(
      "/kisaan/kiosk/layout-config",
      { params: { pincode: params?.pincode ?? -1, ...(params?.farmerId ? { farmerId: params.farmerId } : {}) } },
    ),

  getBanners: (language = "English") =>
    apiClient.get<BannersResponse>(
      "/kisaan/companion/v1/banner/channel-id/5",
      { params: { language } },
    ),

  getCategories: () =>
    apiClient.get<CategoriesResponse>(
      "/kisaan/kiosk/product-catalogue/categories",
    ),

  getPopularProducts: (params?: {
    storeId?:         number;
    farmerId?:        number;
    pageNumber?:      number;
    pageSize?:        number;
    fetchBestSellers?:boolean;
  }) =>
    apiClient.get<PopularProductsResponse>(
      "/kisaan/v1/commerce/popular-product/store-id",
      { params },
    ),

  getCropCollections: (pincode?: number) =>
    apiClient.get<CropCollectionsResponse>(
      "/kisaan/v1/commerce/crop-collections",
      { params: { pincode: pincode ?? -1 } },
    ),

  getCropCollectionProducts: (
    collectionId: number,
    params?: { pincode?: number; pageNumber?: number; pageSize?: number },
  ) =>
    apiClient.get<PopularProductsResponse>(
      `/kisaan/v1/commerce/crop-collections/${collectionId}/products`,
      { params },
    ),
};
