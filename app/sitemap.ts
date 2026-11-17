import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, ROUTES, href, type RouteKey } from "@/lib/routes";
import { guides } from "@/data/resources";
import { playerStories } from "@/data/playerStories";

const SITE = "https://futboluagency.com";

/* The date the site was built. Google ignores priority and change frequency,
   but uses lastModified to decide when to recrawl. */
const BUILT = new Date();

/**
 * Both languages of every page, each entry declaring its counterpart so search
 * engines treat them as translations rather than competing duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const withAlternates = (key: RouteKey, ...segments: string[]) => {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE}${href(locale, key, ...segments)}`,
        lastModified: BUILT,
        alternates: {
          languages: {
            ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE}${href(l, key, ...segments)}`])),
            "x-default": `${SITE}${href(DEFAULT_LOCALE, key, ...segments)}`,
          },
        },
      });
    }
  };

  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    withAlternates(key);
  }
  for (const guide of guides) {
    withAlternates("resources", guide.slug);
  }
  for (const story of playerStories) {
    withAlternates("players", story.slug);
  }

  return entries;
}
