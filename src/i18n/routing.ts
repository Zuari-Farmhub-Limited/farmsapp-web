import { defineRouting } from "next-intl/routing";
import { LOCALES, DEFAULT_LOCALE } from "@/config/constants";

export const routing = defineRouting({
  locales:       LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix:  "as-needed",
});
