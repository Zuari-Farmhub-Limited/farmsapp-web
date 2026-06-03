"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePincodeStore } from "@/store/pincodeStore";
import { cn } from "@/lib/utils";

interface HeaderProps {
  cartCount?:    number;
  wishlistCount?:number;
  isLoggedIn?:   boolean;
  farmerName?:   string;
}

const NAV = [
  { label: "Home",              href: "/"           },
  { label: "Products",          href: "/products"   },
  { label: "Crop Doctor",       href: "/crop-doctor" },
  { label: "Blog",              href: "/blog"        },
  { label: "FAQ",               href: "/faq"         },
  { label: "Contact",           href: "/contact"     },
];

export function Header({ cartCount = 0, wishlistCount = 0, isLoggedIn, farmerName }: HeaderProps) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pincodeInfo } = usePincodeStore();

  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-nav">

      {/* ── Top utility bar ───────────────────────────────────── */}
      <div className="hidden bg-primary md:block">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-1.5">
          <p className="text-xs text-primary-100">✉ support@farmsapp.in</p>
          <div className="flex items-center gap-5 text-xs text-primary-100">
            {pincodeInfo && (
              <span className="flex items-center gap-1">
                📍 {pincodeInfo.district}, {pincodeInfo.state}
              </span>
            )}
            <Link href="/corporate" className="hover:text-white transition-colors">Corporate Website</Link>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              EN <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main header row ───────────────────────────────────── */}
      <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-3 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/assets/images/logo.svg" alt="FarmsApp" width={120} height={38} priority />
        </Link>

        {/* Search — desktop */}
        <div className="hidden flex-1 max-w-2xl md:block">
          <SearchInput />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-1">
          <IconButton label="Search" className="md:hidden" onClick={() => setSearchOpen(v => !v)}>
            <Search size={20} />
          </IconButton>

          <IconButton label="Wishlist" as={Link} href="/wishlist" badge={wishlistCount}>
            <Heart size={20} />
          </IconButton>

          <IconButton label="Cart" as={Link} href="/cart" badge={cartCount}>
            <ShoppingCart size={20} />
          </IconButton>

          {isLoggedIn ? (
            <Link
              href="/profile"
              className="ml-1 flex items-center gap-2 rounded-lg border border-primary px-3 py-1.5 text-sm font-semibold text-primary hover:bg-primary-50 transition-colors"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {farmerName?.[0]?.toUpperCase() ?? "F"}
              </span>
              <span className="hidden sm:inline">{farmerName?.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="ml-1 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-700 active:bg-primary-800 transition-colors"
            >
              Login
            </Link>
          )}

          <IconButton label="Menu" className="md:hidden" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </IconButton>
        </div>
      </div>

      {/* Search — mobile dropdown */}
      {searchOpen && (
        <div className="border-t border-border px-4 py-3 md:hidden bg-white">
          <SearchInput autoFocus />
        </div>
      )}

      {/* ── Nav bar ───────────────────────────────────────────── */}
      <nav className="hidden border-t border-border md:block">
        <div className="mx-auto flex max-w-screen-xl items-center gap-1 overflow-x-auto px-6 py-1 scrollbar-hide">
          {NAV.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex-shrink-0 rounded-md px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-muted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://play.google.com/store"
            target="_blank"
            className="ml-auto flex-shrink-0 flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-700 transition-colors"
          >
            ▶ Get it on Google Play
          </Link>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {menuOpen && (
        <nav className="border-t border-border bg-white md:hidden">
          <div className="flex flex-col px-4 py-2">
            {NAV.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-muted hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2 pb-1">
              <Link
                href="https://play.google.com/store"
                target="_blank"
                className="flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white"
              >
                ▶ Get it on Google Play
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

// ── Shared icon button ─────────────────────────────────────────
function IconButton({
  label, children, badge, className, onClick, as: Comp = "button", ...rest
}: {
  label:     string;
  children:  React.ReactNode;
  badge?:    number;
  className?:string;
  onClick?:  () => void;
  as?:       React.ElementType;
  href?:     string;
}) {
  return (
    <Comp
      aria-label={label}
      onClick={onClick}
      className={cn(
        "relative rounded-lg p-2 text-gray-600 hover:bg-muted hover:text-primary transition-colors",
        className,
      )}
      {...rest}
    >
      {children}
      {badge != null && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white leading-none">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </Comp>
  );
}

// ── Search input ───────────────────────────────────────────────
function SearchInput({ autoFocus }: { autoFocus?: boolean }) {
  return (
    <div className="relative flex items-center">
      <Search size={15} className="absolute left-4 text-gray-400 pointer-events-none" />
      <input
        autoFocus={autoFocus}
        type="search"
        placeholder="Search products, crops, nutrients..."
        className="w-full rounded-xl border border-border bg-muted py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/15"
      />
    </div>
  );
}
