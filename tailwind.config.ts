import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1F4529",
          50:  "#EDF5EF",
          100: "#D3E9D8",
          200: "#A8D3B1",
          300: "#72B880",
          400: "#3F9654",
          500: "#267A3A",
          600: "#1F4529",
          700: "#183820",
          800: "#112918",
          900: "#0A1B0F",
        },
        accent: {
          DEFAULT: "#E8A600",
          light:   "#FFF3CC",
          dark:    "#B87F00",
        },
        danger:  "#D92D20",
        surface: "#F8F8F6",
        muted:   "#F2F2F0",
        border:  "#E8E8E4",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs:    "4px",
        sm:    "8px",
        md:    "12px",
        lg:    "16px",
        xl:    "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      boxShadow: {
        card:    "0 1px 4px 0 rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 16px 0 rgba(0,0,0,0.10)",
        modal:   "0 24px 64px 0 rgba(0,0,0,0.16)",
        nav:     "0 1px 0 0 #E8E8E4",
      },
      screens: {
        xs:    "375px",
        sm:    "640px",
        md:    "768px",
        lg:    "1024px",
        xl:    "1280px",
        "2xl": "1440px",
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px" }],
        xs:    ["11px", { lineHeight: "16px" }],
        sm:    ["13px", { lineHeight: "18px" }],
        base:  ["15px", { lineHeight: "22px" }],
        lg:    ["17px", { lineHeight: "24px" }],
        xl:    ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
      },
    },
  },
  plugins: [],
};

export default config;
