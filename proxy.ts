import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  EN_TO_ES_SLUG,
  ES_TO_EN_PUBLIC,
  LEGACY_PREFIX_REDIRECTS,
  LEGACY_REDIRECTS,
  LOCALES,
  ROUTES,
  isLocale,
} from "./src/lib/routes";

/**
 * Sends every request to a language-prefixed URL and serves the English paths.
 *
 * Three jobs:
 *  - `/` and any un-prefixed path go to the Spanish equivalent, permanently,
 *    so links from before the split and anything already indexed still land.
 *  - `/en/resources` is rewritten onto `/en/recursos`, the folder it is
 *    actually served from. The address bar keeps the English slug.
 *  - A visitor whose browser asks for English gets `/en` from the bare root.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url), 308);

  // Old single-language paths.
  const legacy = LEGACY_REDIRECTS[pathname];
  if (legacy) {
    const slug = ROUTES[legacy].es;
    return redirectTo(`/${DEFAULT_LOCALE}${slug ? `/${slug}` : ""}`);
  }
  for (const [prefix, key] of Object.entries(LEGACY_PREFIX_REDIRECTS)) {
    if (pathname.startsWith(prefix)) {
      const tail = pathname.slice(prefix.length);
      return redirectTo(`/${DEFAULT_LOCALE}/${ROUTES[key].es}/${tail}`);
    }
  }

  const [, first, ...rest] = pathname.split("/");

  // Nothing language-prefixed: pick one and send them there.
  if (!isLocale(first)) {
    const preferred = request.headers
      .get("accept-language")
      ?.toLowerCase()
      .startsWith("en")
      ? "en"
      : DEFAULT_LOCALE;
    const suffix = pathname === "/" ? "" : pathname;
    return redirectTo(`/${preferred}${suffix}`);
  }

  if (first === "en" && rest.length > 0) {
    // English slug: serve it from the Spanish folder, keeping the URL.
    const mapped = EN_TO_ES_SLUG[rest[0]];
    if (mapped) {
      const url = request.nextUrl.clone();
      url.pathname = `/${["en", mapped, ...rest.slice(1)].filter(Boolean).join("/")}`;
      return NextResponse.rewrite(url);
    }

    // The Spanish slug under /en would be a second address for the same page,
    // so it is sent to the English one rather than left to compete with it.
    const englishSlug = ES_TO_EN_PUBLIC[rest[0]];
    if (englishSlug) {
      return redirectTo(`/${["en", englishSlug, ...rest.slice(1)].filter(Boolean).join("/")}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  /* Everything except Next's own assets, the API and files in public/. */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

export const LOCALE_LIST = LOCALES;
