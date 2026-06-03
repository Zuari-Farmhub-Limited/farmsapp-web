export function formatPrice(amount: number, locale = "en-IN"): string {
  return new Intl.NumberFormat(locale, {
    style:    "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDiscount(original: number, discounted: number): number {
  return Math.round(((original - discounted) / original) * 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length)}…` : text;
}
