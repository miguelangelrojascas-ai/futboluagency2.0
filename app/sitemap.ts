import type { MetadataRoute } from "next";
import { LOCALES, ROUTES, href, type RouteKey } from "@/lib/routes";
import { guides } from "@/data/resources";
import { playerStories } from "@/data/playerStories";

const SITE = "https://futboluagency.com";

/** Priority per page, highest for the ones that win traffic. */
const PRIORITY: Record<RouteKey, number> = {
  home: 1,
  usa: 0.9,
  resources: 0.8,
  apply: 0.8,
  players: 0.6,
  about: 0.5,
  privacy: 0.2,
};

/**
 * Both languages of every page, each entry declaring its counterpart so search
 * engines treat them as translations rather than competing duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const withAlternates = (key: RouteKey, priority: number, ...segments: string[]) => {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE}${href(locale, key, ...segments)}`,
        priority,
        changeFrequency: "monthly",
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${SITE}${href(l, key, ...segments)}`]),
          ),
        },
      });
    }
  };

  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    withAlternates(key, PRIORITY[key]);
  }
  for (const guide of guides) {
    withAlternates("resources", 0.7, guide.slug);
  }
  for (const story of playerStories) {
    withAlternates("players", 0.5, story.slug);
  }

  return entries;
}
