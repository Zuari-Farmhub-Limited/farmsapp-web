export const APP_NAME = "FarmsApp";
export const APP_TAGLINE = "By Zuari FarmHub";
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@farmsapp.in";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://kiosk.farm";

export const LOCALES = ["en", "hi", "kn", "mr", "te"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  hi: "हिंदी",
  kn: "ಕನ್ನಡ",
  mr: "मराठी",
  te: "తెలుగు",
};

export const COOKIE_ACCESS_TOKEN  = "fa_access_token";
export const COOKIE_REFRESH_TOKEN = "fa_refresh_token";

export const QUERY_KEYS = {
  products:        ["products"]        as const,
  product:         (slug: string)      => ["product", slug] as const,
  categories:      ["categories"]      as const,
  cart:            ["cart"]            as const,
  orders:          ["orders"]          as const,
  order:           (id: string)        => ["order", id] as const,
  farmer:          ["farmer"]          as const,
  wishlist:        ["wishlist"]        as const,
  banners:         ["banners"]         as const,
  search:          (q: string)         => ["search", q] as const,
  recentlyViewed:  ["recently-viewed"] as const,
  popularProducts: ["popular-products"]as const,
  cropCollections: ["crop-collections"]as const,
};
