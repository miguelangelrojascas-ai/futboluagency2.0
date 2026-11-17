import { LOCALES, href, type Locale } from "./routes";
import { tr } from "./i18n";

const SITE = "https://futboluagency.com";

/**
 * Who the site belongs to, in a form search and AI engines can read directly.
 *
 * Emitted from the layout so it lands in the served HTML of every page, which
 * matters for the engines that cite sources without running JavaScript.
 */
export function organizationSchema(locale: Locale) {

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
        description: tr(
          locale,
          "Agencia de reclutamiento que ayuda a futbolistas internacionales a conseguir becas deportivas en universidades NCAA, NAIA y NJCAA de Estados Unidos.",
          "Recruitment agency helping international footballers earn scholarships at NCAA, NAIA and NJCAA universities in the United States.",
        ),
        foundingDate: "2020",
        founder: { "@type": "Person", name: "Ignacio De Bejar", jobTitle: "CEO" },
        knowsAbout: [
          "College soccer scholarships",
          "NCAA",
          "NAIA",
          "NJCAA",
          "Student-athlete recruitment",
          "F-1 student visa",
          "Spanish football",
        ],
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

/** The Showcase, so Google can show its dates and place in results. */
export function showcaseEventSchema(locale: Locale) {
  const page = `${SITE}${href(locale, "showcase")}`;
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "@id": `${page}#event`,
    name: "FUA Showcase Talavera 2027",
    description: tr(
      locale,
      "Tres días de partidos en Talavera de la Reina ante entrenadores universitarios de EE.UU. 60 jugadores de España y Estados Unidos. Solo por invitación.",
      "Three days of matches in Talavera de la Reina in front of U.S. college coaches. 60 players from Spain and the United States. By invitation only.",
    ),
    startDate: "2027-02-01T09:00:00+01:00",
    endDate: "2027-02-03T17:00:00+01:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Soccer",
    inLanguage: locale,
    url: page,
    image: [`${SITE}/images/showcase/campo-principal.jpg`, `${SITE}/images/showcase/estadio-el-prado.jpg`],
    location: {
      "@type": "Place",
      name: "Ciudad Deportiva, Talavera de la Reina",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Polígono Sector VI",
        postalCode: "45683",
        addressLocality: "Cazalegas",
        addressRegion: "Toledo",
        addressCountry: "ES",
      },
    },
    organizer: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "FutbolUAgency LLC", url: SITE },
    offers: {
      "@type": "Offer",
      name: tr(locale, "Inscripción de jugador", "Player registration"),
      price: "45",
      priceCurrency: "EUR",
      url: page,
      availability: "https://schema.org/InStock",
    },
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
