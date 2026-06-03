export interface I18nLabel {
  en:  string;
  hi?: string;
  te?: string;
  kn?: string;
  mr?: string;
}

export interface Coupon {
  couponCode:    string;
  discountValue: number;
}

export interface SKU {
  skuCode:               string;
  skuId?:                number;
  skuUnit:               string;
  skuSize:               number;
  skuImageUrl?:          string;
  mrp?:                  number;
  netPrice?:             number;
  savings?:              number;   // percentage as number e.g. 13
  inventoryCount?:       number;
  estimatedDeliveryDate?:string;
  coupons?:              Coupon[];
}

export interface Product {
  productId:            number;
  productName:          string;
  productNameHindi?:    string;
  productNameTelugu?:   string;
  productNameKannada?:  string;
  productNameMarathi?:  string;
  productImageUrl:      string;
  categoryId?:          number;
  categoryName?:        string;
  subcategoryId?:       number;
  subCategoryName?:     string;
  technicalName?:       string;
  hindiTechnicalName?:  string;
  teluguTechnicalName?: string;
  kannadaTechnicalName?:string;
  marathiTechnicalName?:string;
  deliverable?:         boolean;
  skus:                 SKU[];
}

export interface ProductDetail extends Product {
  description?:          string;
  detailedDescription?:  string[];
  rating?:               ProductRating;
  similarProductsSkuMap?:Record<string, SKU[]>;
}

export interface ProductRating {
  averageRating:  number;
  ratingLabel?:   I18nLabel;
  totalRatings:   number;
  yourRating?:    number;
  yourReview?:    string;
  yourRatingDate?:string;
  recentRatings:  CustomerRating[];
}

export interface CustomerRating {
  farmerName:       string;
  farmerRating:     number;
  farmerReview:     string;
  farmerRatingDate: string;
  uploads?:         string[];
}

export interface Category {
  id:           number;
  name:         string;
  imageUrl?:    string;
  hindiName?:   string;
  teluguName?:  string;
  kannadaName?: string;
  marathiName?: string;
  badgeEnabled?:boolean;
  badgeColor?:  string;
  badgeText?:   string;
  subCategories?:SubCategory[];
}

export interface SubCategory {
  id:          number;
  name:        string;
  imageUrl?:   string;
  hindiName?:  string;
  teluguName?: string;
}

export interface ProductListResponse {
  products:   Product[];
  pageNumber: number;
  pageSize:   number;
  totalPages: number;
}

export interface Banner {
  id:           number;
  imageUrl:     string;
  redirectUrl?: string;
  title?:       string;
  active:       boolean;
}

export type SectionType =
  | "EVENT_COUNTDOWN_BANNER"
  | "BANNER_SLIDER"
  | "CATEGORIES"
  | "RECENTLY_VIEWED"
  | "COMBO_SAVERS"
  | "SHOP_BY_CROP"
  | "BEST_SELLING"
  | "ALL_PRODUCTS"
  | string; // forward-compat for new section types

export interface HomepageSection {
  type:    SectionType;
  order:   number;
  enabled: boolean;
}

export interface LayoutConfig {
  homepage_vertical_section_order: HomepageSection[];
  homepage_search_suggestions:     Record<string, string[]>; // keys: en, hi, kn, mr, te
}

export interface CropCollection {
  id:       number;
  name:     string;
  imageUrl: string;
  stateId?: number;
}

export interface PincodeInfo {
  pincode:     number;
  state:       string;
  district:    string;
  serviceable: boolean;
}
