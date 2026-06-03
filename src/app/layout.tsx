import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { APP_NAME } from "@/config/constants";

const manrope = Manrope({
  subsets:  ["latin"],
  variable: "--font-manrope",
  display:  "swap",
});

export const metadata: Metadata = {
  title: {
    default:  `${APP_NAME} — Quality Agri Products for Farmers`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "FarmsApp by Zuari FarmHub — India's trusted online store for fertilizers, crop care, plant nutrients, and farming equipment. Delivered to your farm.",
  keywords: ["farmsapp", "fertilizers", "crop care", "farming", "agriculture", "plant nutrients", "zuari farmhub"],
  metadataBase: new URL("https://farmsapp.in"),
  openGraph: {
    type:     "website",
    locale:   "en_IN",
    url:      "https://farmsapp.in",
    siteName: APP_NAME,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={manrope.variable}>
      <body className="font-sans antialiased bg-surface text-gray-900">
        {children}
      </body>
    </html>
  );
}
