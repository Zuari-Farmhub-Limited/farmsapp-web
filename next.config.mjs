import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "kiosk.farm"                          },
      { protocol: "https", hostname: "dev.kiosk.farm"                      },
      { protocol: "https", hostname: "zfhl-s3.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.ap-south-1.amazonaws.com"       },
      { protocol: "http",  hostname: "localhost"                            },
    ],
  },
};

export default withNextIntl(nextConfig);
