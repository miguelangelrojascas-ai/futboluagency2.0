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
