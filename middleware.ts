import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "zh"];

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const preferredLocales = acceptLanguage.split(",").map(lang => lang.split(";")[0]);
  return preferredLocales.find(lang => locales.includes(lang)) ?? "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|_vercel|favicon.ico).*)"],
};