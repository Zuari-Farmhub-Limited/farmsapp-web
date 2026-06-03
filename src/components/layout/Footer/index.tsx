import Image from "next/image";
import Link from "next/link";
import { APP_TAGLINE, SUPPORT_EMAIL } from "@/config/constants";

const PRODUCT_LINKS = [
  { label: "Animal Nutrition",       href: "/products/animal-nutrition"       },
  { label: "Crop Care",              href: "/products/crop-care"              },
  { label: "Fertilizers",            href: "/products/fertilizers"            },
  { label: "Nano Products",          href: "/products/nano-products"          },
  { label: "Farming Equipment",      href: "/products/farming-equipment"      },
  { label: "Specialty Plant Nutrients", href: "/products/specialty-plant-nutrients" },
];

const QUICK_LINKS = [
  { label: "Home",              href: "/"          },
  { label: "About Us",         href: "/about"     },
  { label: "Corporate Website",href: "/corporate" },
  { label: "Blog",             href: "/blog"      },
  { label: "FAQ",              href: "/faq"       },
  { label: "Contact Us",       href: "/contact"   },
];

const SERVICE_LINKS = [
  { label: "Crop Doctor Consultation", href: "/crop-doctor"  },
  { label: "Product Enquiry",          href: "/enquiry"      },
  { label: "Drone Spraying",           href: "/services/drone-spraying" },
  { label: "Satellite Soil Insights",  href: "/services/soil-insights"  },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      {/* Newsletter */}
      <div className="bg-primary-50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h3 className="text-lg font-bold text-primary">Get a surprise discount by registering!</h3>
          <p className="mt-1 text-sm text-gray-600">
            Join our email subscription now to get updates on promotions and coupons.
          </p>
          <form className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="tel"
              placeholder="Enter mobile number"
              className="w-full max-w-xs rounded-md border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary sm:w-72"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/assets/images/logo.svg"
              alt="FarmsApp"
              width={110}
              height={44}
            />
            <p className="mt-1 text-xs font-semibold text-gray-500">{APP_TAGLINE}</p>
            <p className="mt-3 text-sm text-gray-600">
              Empowering farmers with quality agricultural products and expert knowledge since 1987.
            </p>
            <div className="mt-4 flex gap-3">
              <SocialIcon href="https://facebook.com" label="Facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </SocialIcon>
              <SocialIcon href="https://youtube.com" label="YouTube">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="currentColor" stroke="none" />
              </SocialIcon>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-bold text-gray-900">Products</h4>
            <ul className="mt-3 space-y-2">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary">
                    <span className="text-accent">→</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-600 hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-gray-900">Our Services</h4>
            <ul className="mt-3 space-y-2">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-600 hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-gray-900">Contact US</h4>
            <address className="mt-3 space-y-2 not-italic text-sm text-gray-600">
              <p>Prestige Ferozes, 3rd Floor, No. 74, Cunningham Road, Bengaluru - 560052</p>
              <p>
                <a href="tel:09876543210" className="hover:text-primary">
                  Call: 09876543210
                </a>
              </p>
              <p>
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-primary">
                  Email: {SUPPORT_EMAIL}
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row">
          <p className="text-xs text-gray-500">© 2025 Farmsapp. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Shipping Policy"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-gray-500 hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-gray-600 hover:border-primary hover:text-primary"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </a>
  );
}
