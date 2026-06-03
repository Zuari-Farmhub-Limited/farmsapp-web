import { apiClient } from "../client";
import type { Product, ProductDetail, PincodeInfo } from "@/types";

// Products are grouped by subcategory in the response
export interface ProductSubcategory {
  id:          number;
  categoryId:  number;
  name:        string;
  savings?:    number;
  imageUrl?:   string;
  teluguName?: string;
  hindiName?:  string;
  kannadaName?:string;
  marathiName?:string;
  products:    Product[];
}

export interface ProductsResponse {
  status:                    string;
  pageNumber:                number;
  pageSize:                  number;
  totalPages:                number;
  subcategories:             ProductSubcategory[];
  shouldRenderSubcategories?:Record<string, boolean>;
}

export interface ProductDetailResponse {
  status:  string;
  product: ProductDetail;
}

export interface PincodeResponse {
  status:  string;
  pincode: PincodeInfo;
}

export interface DeliveryResponse {
  status:      string;
  deliverable: boolean;
}

export interface SearchResponse {
  status:   string;
  products: Product[];
}

export interface ProductListParams {
  storeId?:      number;
  farmerId?:     number;
  categories?:   number[];
  subCategories?:number[];
  brandIds?:     number[];
  pageNumber?:   number;
  pageSize?:     number;
}

export interface SearchParams {
  searchKeyword:   string;
  selectedKeyword?:string;
  storeId?:        number;
  farmerId?:       number;
  pageNo?:         number;
  pageSize?:       number;
}

export const productsApi = {
  getProducts: (params: ProductListParams) => {
    const searchParams = new URLSearchParams();
    if (params.pageNumber) searchParams.set("pageNumber", String(params.pageNumber));
    if (params.pageSize)   searchParams.set("pageSize",   String(params.pageSize));
    if (params.storeId)    searchParams.set("storeId",    String(params.storeId));
    if (params.farmerId)   searchParams.set("farmerId",   String(params.farmerId));
    params.categories?.forEach((id) => searchParams.append("categories",    String(id)));
    params.subCategories?.forEach((id) => searchParams.append("subCategories", String(id)));
    params.brandIds?.forEach((id) => searchParams.append("brandIds", String(id)));

    return apiClient.get<ProductsResponse>(
      `/kisaan/companion/v1/products?${searchParams.toString()}`,
    );
  },

  search: (params: SearchParams) =>
    apiClient.get<SearchResponse>(
      "/kisaan/companion/v1/search",
      { params: { ...params, pageNo: params.pageNo ?? 0 } },
    ),

  getProductDetail: (productId: number, params?: { farmerId?: number; storeId?: number }) =>
    apiClient.get<ProductDetailResponse>(
      `/kisaan/companion/v1/product-catalogue/${productId}/product-detail`,
      { params },
    ),

  validatePincode: (pincode: number) =>
    apiClient.get<PincodeResponse>(
      "/kisaan/companion/v1/pincode",
      { params: { pincode } },
    ),

  checkDelivery: (pincode: number, skuCode: string) =>
    apiClient.get<DeliveryResponse>(
      "/kisaan/companion/v1/delivery-facility",
      { params: { pincode, skuCode } },
    ),
};
