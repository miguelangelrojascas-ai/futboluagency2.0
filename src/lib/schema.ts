import { LOCALES, href, type Locale } from "./routes";

const SITE = "https://futboluagency.com";

/**
 * Who the site belongs to, in a form search and AI engines can read directly.
 *
 * Emitted from the layout so it lands in the served HTML of every page, which
 * matters for the engines that cite sources without running JavaScript.
 */
export function organizationSchema(locale: Locale) {
  const es = locale === "es";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "FutbolUAgency LLC",
        alternateName: "FUA",
        url: SITE,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/logo-fua.png`,
          width: 512,
          height: 512,
        },
        description: es
          ? "Agencia de reclutamiento que ayuda a futbolistas internacionales a conseguir becas deportivas en universidades NCAA, NAIA y NJCAA de Estados Unidos."
          : "Recruitment agency helping international footballers earn scholarships at NCAA, NAIA and NJCAA universities in the United States.",
        email: "futboluagency@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Houston",
          addressRegion: "TX",
          addressCountry: "US",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+34-603-331-990",
            contactType: "sales",
            areaServed: "ES",
            availableLanguage: ["es", "en"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+57-333-706-4037",
            contactType: "sales",
            areaServed: "CO",
            availableLanguage: ["es", "en"],
          },
        ],
        sameAs: [
          "https://www.instagram.com/futboluagency",
          "https://www.tiktok.com/@futboluagency",
          "https://youtube.com/@futboluagency",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}${href(locale, "home")}`,
        name: "FutbolUAgency",
        inLanguage: locale,
        publisher: { "@id": `${SITE}/#organization` },
        /* Both languages, so the two are understood as one site. */
        workTranslation: LOCALES.filter((l) => l !== locale).map((l) => ({
          "@type": "WebSite",
          url: `${SITE}${href(l, "home")}`,
          inLanguage: l,
        })),
      },
    ],
  };
}

const abs = (path: string) => (path.startsWith("http") ? path : `${SITE}${path}`);

/** Home > section > page trail, so results show the path instead of a bare URL. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** A long-form guide under /recursos. */
export function articleSchema({
  locale,
  path,
  headline,
  description,
  image,
  sections,
}: {
  locale: Locale;
  path: string;
  headline: string;
  description: string;
  image: string;
  sections: string[];
}) {
  return {
    "@type": "Article",
    "@id": `${abs(path)}#article`,
    mainEntityOfPage: abs(path),
    headline,
    description,
    image: abs(image),
    inLanguage: locale,
    articleSection: sections,
    author: { "@id": `${SITE}/#organization` },
    publisher: { "@id": `${SITE}/#organization` },
  };
}

/** A player's story page: the page is about one person. */
export function playerSchema({
  locale,
  path,
  name,
  description,
  image,
  university,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  image: string;
  university: string;
}) {
  return {
    "@type": "ProfilePage",
    "@id": `${abs(path)}#page`,
    url: abs(path),
    inLanguage: locale,
    description,
    mainEntity: {
      "@type": "Person",
      name,
      image: abs(image),
      affiliation: { "@type": "CollegeOrUniversity", name: university },
    },
    publisher: { "@id": `${SITE}/#organization` },
  };
}

/** Wraps nodes into one JSON-LD document, ready for a script tag. */
export const jsonLd = (...nodes: object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
    /</g,
    "\\u003c",
  );
