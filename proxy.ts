import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  ES_TO_SLUG,
  SLUG_TO_ES,
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
export function proxy(request: NextRequest) {
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
    const asked = request.headers.get("accept-language")?.toLowerCase().slice(0, 2);
    const preferred = asked && isLocale(asked) ? asked : DEFAULT_LOCALE;
    const suffix = pathname === "/" ? "" : pathname;
    return redirectTo(`/${preferred}${suffix}`);
  }

  if (first !== DEFAULT_LOCALE && rest.length > 0) {
    // This language's slug: serve it from the Spanish folder, keeping the URL.
    const mapped = SLUG_TO_ES[first][rest[0]];
    if (mapped) {
      const url = request.nextUrl.clone();
      url.pathname = `/${[first, mapped, ...rest.slice(1)].filter(Boolean).join("/")}`;
      return NextResponse.rewrite(url);
    }

    // The Spanish slug under another language would be a second address for
    // the same page, so it is sent to that language's own slug instead.
    const ownSlug = ES_TO_SLUG[first][rest[0]];
    if (ownSlug) {
      return redirectTo(`/${[first, ownSlug, ...rest.slice(1)].filter(Boolean).join("/")}`);
    }
  }

  return NextResponse.next();
}

export const config = {
  /* Everything except Next's own assets, the API and files in public/. */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

export const LOCALE_LIST = LOCALES;
