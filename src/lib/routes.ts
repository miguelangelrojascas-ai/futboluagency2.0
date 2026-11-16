/**
 * Every page of the site, in both languages.
 *
 * This is the single source of truth for URLs. Links, canonicals, hreflang
 * tags, the sitemap and the middleware that rewrites the English paths are all
 * derived from it, so a slug is only ever written once.
 *
 * The Spanish slug doubles as the directory name under `app/[locale]/`. The
 * other languages' paths are public only: middleware rewrites them onto the
 * Spanish ones, and the page renders in that language because the locale
 * says so.
 */

export const LOCALES = ["es", "en", "it", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

export type RouteKey =
  | "home"
  | "usa"
  | "spain"
  | "showcase"
  | "players"
  | "resources"
  | "about"
  | "apply"
  | "privacy";

/** Spanish slug (also the folder name) and the slug each language answers to. */
export const ROUTES: Record<RouteKey, Record<Locale, string>> = {
  home: { es: "", en: "", it: "", de: "" },
  usa: { es: "usa", en: "usa", it: "usa", de: "usa" },
  spain: { es: "espana", en: "spain", it: "spagna", de: "spanien" },
  showcase: { es: "showcase", en: "showcase", it: "showcase", de: "showcase" },
  players: { es: "jugadores", en: "players", it: "giocatori", de: "spieler" },
  resources: { es: "recursos", en: "resources", it: "risorse", de: "ressourcen" },
  about: { es: "nosotros", en: "about", it: "chi-siamo", de: "ueber-uns" },
  apply: { es: "aplicar", en: "apply", it: "candidati", de: "bewerben" },
  privacy: { es: "privacidad", en: "privacy", it: "privacy", de: "datenschutz" },
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

/** Per language: its public slug back to the Spanish folder it is served from. */
export const SLUG_TO_ES: Record<Locale, Record<string, string>> = Object.fromEntries(
  LOCALES.map((l) => [
    l,
    Object.fromEntries(
      Object.values(ROUTES)
        .filter((r) => r[l] && r[l] !== r.es)
        .map((r) => [r[l], r.es]),
    ),
  ]),
) as Record<Locale, Record<string, string>>;

/** Per language: the Spanish folder to that language's public slug. */
export const ES_TO_SLUG: Record<Locale, Record<string, string>> = Object.fromEntries(
  LOCALES.map((l) => [
    l,
    Object.fromEntries(
      Object.values(ROUTES)
        .filter((r) => r.es && r[l] !== r.es)
        .map((r) => [r.es, r[l]]),
    ),
  ]),
) as Record<Locale, Record<string, string>>;

/** Any language's public slug back to the Spanish folder. */
export const EN_TO_ES_SLUG: Record<string, string> = Object.assign({}, ...LOCALES.map((l) => SLUG_TO_ES[l]));

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
  "/spain": "spain",
  /* FUA Sports (tennis, golf, track, volleyball) is no longer on this site;
     the old pages send visitors home rather than to a 404. */
  "/sports": "home",
  "/sports/volleyball": "home",
  "/sports/golf": "home",
  "/sports/tennis": "home",
  "/sports/track": "home",
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
  ["/spain", "spain"],
  ["/espana", "spain"],
  ["/showcase", "showcase"],
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
  /* The incoming slug may be in any language; normalise, then re-localise. */
  const esSlug = EN_TO_ES_SLUG[slug] ?? slug;
  const localised = ES_TO_SLUG[target][esSlug] ?? esSlug;

  return `/${[target, localised, ...tail].filter(Boolean).join("/")}`;
}

/** Spanish slug to its English public slug, where the two differ. */
export const ES_TO_EN_PUBLIC: Record<string, string> = ES_TO_SLUG.en;
