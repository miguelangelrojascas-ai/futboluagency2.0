/**
 * Every page of the site, in both languages.
 *
 * This is the single source of truth for URLs. Links, canonicals, hreflang
 * tags, the sitemap and the middleware that rewrites the English paths are all
 * derived from it, so a slug is only ever written once.
 *
 * The Spanish slug doubles as the directory name under `app/[locale]/`. The
 * English paths are public only: middleware rewrites them onto the Spanish
 * ones, and the page renders in English because the locale says so.
 */

export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

export type RouteKey =
  | "home"
  | "usa"
  | "players"
  | "resources"
  | "about"
  | "apply"
  | "privacy";

/** Spanish slug (also the folder name) and the English slug it answers to. */
export const ROUTES: Record<RouteKey, { es: string; en: string }> = {
  home: { es: "", en: "" },
  usa: { es: "usa", en: "usa" },
  players: { es: "jugadores", en: "players" },
  resources: { es: "recursos", en: "resources" },
  about: { es: "nosotros", en: "about" },
  apply: { es: "aplicar", en: "apply" },
  privacy: { es: "privacidad", en: "privacy" },
};

/**
 * Builds a public path, e.g. href("en", "players", "ander-gonzalez")
 * gives "/en/players/ander-gonzalez".
 */
export function href(locale: Locale, key: RouteKey, ...segments: string[]) {
  const slug = ROUTES[key][locale];
  /* Filter first, then prefix: filtering a leading "" away would drop the
     leading slash and leave a path that resolves relative to the current one. */
  const parts = [locale, slug, ...segments].filter(Boolean);
  return `/${parts.join("/")}`;
}

/** The same page in the other language, for the language switcher. */
export function alternateHref(
  locale: Locale,
  key: RouteKey,
  ...segments: string[]
) {
  return href(other(locale), key, ...segments);
}

export const other = (locale: Locale): Locale => (locale === "es" ? "en" : "es");

/** Maps an English slug back to the Spanish folder it is served from. */
export const EN_TO_ES_SLUG: Record<string, string> = Object.fromEntries(
  Object.values(ROUTES)
    .filter((r) => r.en && r.en !== r.es)
    .map((r) => [r.en, r.es]),
);

/**
 * Paths the site used before it was split by language, pointing at their
 * Spanish replacement so old links and anything already indexed keep working.
 */
export const LEGACY_REDIRECTS: Record<string, RouteKey> = {
  "/usa": "usa",
  "/players": "players",
  "/recursos": "resources",
  "/about": "about",
  "/apply": "apply",
  "/privacidad": "privacy",
  "/spain": "usa",
};

/** Legacy paths whose trailing segment carries over, e.g. /recursos/<slug>. */
export const LEGACY_PREFIX_REDIRECTS: Record<string, RouteKey> = {
  "/recursos/": "resources",
  "/players/": "players",
};

/** Legacy path (as written across the components) to its route key. */
const LEGACY_PATH_KEYS: Array<[string, RouteKey]> = [
  ["/recursos", "resources"],
  ["/players", "players"],
  ["/jugadores", "players"],
  ["/usa", "usa"],
  ["/about", "about"],
  ["/nosotros", "about"],
  ["/apply", "apply"],
  ["/aplicar", "apply"],
  ["/privacidad", "privacy"],
];

/**
 * Turns a path written the old way into the right one for this language.
 *
 * Components across the site link with paths like "/recursos/las-divisiones"
 * or "/apply#agenda". Rather than rewrite every call site, this resolves them
 * against the route map, so "/recursos/las-divisiones" becomes
 * "/en/resources/las-divisiones" when the page is in English.
 */
export function resolveLegacyPath(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return path; // "#faq", "mailto:", "https://"

  const hashAt = path.indexOf("#");
  const hash = hashAt === -1 ? "" : path.slice(hashAt);
  const clean = (hashAt === -1 ? path : path.slice(0, hashAt)).replace(/\/$/, "");

  if (clean === "" || clean === "/") return href(locale, "home") + hash;

  for (const [prefix, key] of LEGACY_PATH_KEYS) {
    if (clean === prefix) return href(locale, key) + hash;
    if (clean.startsWith(`${prefix}/`)) {
      const segments = clean.slice(prefix.length + 1).split("/").filter(Boolean);
      return href(locale, key, ...segments) + hash;
    }
  }

  return path;
}

/** Spanish slug to the English one, for walking a path the other way. */
const ES_TO_EN_SLUG: Record<string, string> = Object.fromEntries(
  Object.values(ROUTES)
    .filter((r) => r.es && r.en !== r.es)
    .map((r) => [r.es, r.en]),
);

/**
 * Rewrites a path for the other language, swapping both the locale segment
 * and the slug: "/es/recursos/las-divisiones" becomes
 * "/en/resources/las-divisiones".
 */
export function swapLocaleInPath(pathname: string, target: Locale): string {
  const [, first, ...rest] = pathname.split("/");
  const segments = isLocale(first) ? rest : [first, ...rest].filter(Boolean);

  if (segments.length === 0) return href(target, "home");

  const [slug, ...tail] = segments;
  /* The incoming slug may be in either language; normalise, then re-localise. */
  const esSlug = EN_TO_ES_SLUG[slug] ?? slug;
  const localised = target === "es" ? esSlug : (ES_TO_EN_SLUG[esSlug] ?? esSlug);

  return `/${[target, localised, ...tail].filter(Boolean).join("/")}`;
}

/** Spanish slug to its English public slug, where the two differ. */
export const ES_TO_EN_PUBLIC: Record<string, string> = ES_TO_EN_SLUG;
