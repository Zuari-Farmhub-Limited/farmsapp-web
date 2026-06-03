import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { COOKIE_ACCESS_TOKEN } from "@/config/constants";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ["/checkout", "/orders", "/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strip any locale prefix to check the real path
  const localePattern = new RegExp(
    `^/(${routing.locales.join("|")})(/|$)`,
  );
  const strippedPath = pathname.replace(localePattern, "/");

  const isProtected = PROTECTED_PATHS.some((p) => strippedPath.startsWith(p));

  if (isProtected) {
    const token = request.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and _next internals
    "/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\..*).*)",
  ],
};
