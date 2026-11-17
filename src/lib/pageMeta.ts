import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  ROUTES,
  href,
  isLocale,
  type Locale,
  type RouteKey,
} from "./routes";
import { pick } from "./i18n";

const SITE = "https://futboluagency.com";

type Copy = { title: string; description: string; ogTitle?: string; ogDescription?: string };

/**
 * Title and description per page, per language.
 *
 * Lives here rather than in each page component because the pages are client
 * components: metadata is emitted by the server route files, which read this.
 */
export const PAGE_META: Record<RouteKey, Record<"es" | "en", Copy> & Partial<Record<Locale, Copy>>> = {
  /* Titles stay within ~60 characters and descriptions within ~160, so Google
     shows them whole. Each language is written out, not looked up. */
  home: {
    es: {
      title: "Becas de fútbol en EE.UU. | FutbolUAgency",
      description:
        "Agencia de becas de fútbol universitario en EE.UU. Más de 350 jugadores en NCAA, NAIA y NJCAA y más de $10M en becas. Evaluación gratuita y sin compromiso.",
    },
    en: {
      title: "Soccer Scholarships in the USA | FutbolUAgency",
      description:
        "College soccer scholarship agency for the USA. 350+ players placed in the NCAA, NAIA and NJCAA and over $10M in scholarships. Free, no-obligation evaluation.",
    },
    it: {
      title: "Borse di studio calcio negli USA | FutbolUAgency",
      description:
        "Agenzia di borse di studio per il calcio universitario negli USA. Oltre 350 giocatori in NCAA, NAIA e NJCAA e più di 10 M$ in borse. Valutazione gratuita.",
    },
    de: {
      title: "Fußball-Stipendien in den USA | FutbolUAgency",
      description:
        "Agentur für College-Fußball-Stipendien in den USA. Über 350 Spieler in NCAA, NAIA und NJCAA und mehr als 10 Mio. $ an Stipendien. Kostenlose Bewertung.",
    },
  },
  spain: {
    es: {
      title: "Temporada en el fútbol español | FutbolUAgency",
      description:
        "Entrena y compite una temporada completa en clubes de España y Portugal como el CF Talavera o el CE Sabadell, en alianza con Prime Play. De 16 a 23 años.",
    },
    en: {
      title: "A Season in Spanish Football | FutbolUAgency",
      description:
        "Train and compete for a full season at clubs in Spain and Portugal such as CF Talavera and CE Sabadell, in partnership with Prime Play. Ages 16 to 23.",
    },
    it: {
      title: "Una stagione nel calcio spagnolo | FutbolUAgency",
      description:
        "Allenati e gioca un'intera stagione in club di Spagna e Portogallo come il CF Talavera e il CE Sabadell, in collaborazione con Prime Play. Dai 16 ai 23 anni.",
    },
    de: {
      title: "Eine Saison im spanischen Fußball | FutbolUAgency",
      description:
        "Trainiere und spiele eine ganze Saison bei Vereinen in Spanien und Portugal wie CF Talavera und CE Sabadell, in Partnerschaft mit Prime Play. 16 bis 23 Jahre.",
    },
  },
  usa: {
    es: {
      title: "Becas NCAA, NAIA y JUCO en EE.UU. | FutbolUAgency",
      description:
        "Descubre cómo conseguir una beca de fútbol en universidades americanas NCAA, NAIA y JUCO. Proceso, requisitos y casos de éxito reales.",
    },
    en: {
      title: "NCAA, NAIA & JUCO Soccer Scholarships | FutbolUAgency",
      description:
        "Find out how to earn a soccer scholarship at NCAA, NAIA and JUCO universities in the U.S. Process, requirements and real placements.",
    },
    it: {
      title: "Borse di studio NCAA, NAIA e JUCO | FutbolUAgency",
      description:
        "Come ottenere una borsa di studio per il calcio nelle università NCAA, NAIA e JUCO degli Stati Uniti: processo, requisiti e casi reali.",
    },
    de: {
      title: "NCAA-, NAIA- & JUCO-Stipendien | FutbolUAgency",
      description:
        "So bekommst du ein Fußball-Stipendium an NCAA-, NAIA- und JUCO-Universitäten in den USA: Ablauf, Voraussetzungen und echte Platzierungen.",
    },
  },
  showcase: {
    es: {
      title: "Showcase Talavera 2027 | FutbolUAgency",
      description:
        "1, 2 y 3 de febrero de 2027 en Talavera de la Reina, a 1h30 de Madrid. 60 jugadores de España y EE.UU. ante entrenadores universitarios. Solo por invitación.",
    },
    en: {
      title: "Showcase Talavera 2027 | FutbolUAgency",
      description:
        "February 1–3, 2027 in Talavera de la Reina, 90 minutes from Madrid. 60 players from Spain and the U.S. evaluated live by college coaches. By invitation only.",
    },
    it: {
      title: "Showcase Talavera 2027 | FutbolUAgency",
      description:
        "1, 2 e 3 febbraio 2027 a Talavera de la Reina, a 1h30 da Madrid. 60 giocatori di Spagna e USA davanti agli allenatori universitari. Solo su invito.",
    },
    de: {
      title: "Showcase Talavera 2027 | FutbolUAgency",
      description:
        "1.–3. Februar 2027 in Talavera de la Reina, 90 Minuten von Madrid. 60 Spieler aus Spanien und den USA vor US-College-Trainern. Nur auf Einladung.",
    },
  },
  players: {
    es: {
      title: "Nuestros jugadores en EE.UU. | FutbolUAgency",
      description:
        "Conoce a los futbolistas de FutbolUAgency que ya estudian y compiten con beca en universidades NCAA, NAIA y NJCAA de Estados Unidos.",
    },
    en: {
      title: "Our Players in the USA | FutbolUAgency",
      description:
        "Meet the FutbolUAgency footballers already studying and competing on scholarship at NCAA, NAIA and NJCAA universities in the United States.",
    },
    it: {
      title: "I nostri giocatori negli USA | FutbolUAgency",
      description:
        "Scopri i calciatori di FutbolUAgency che già studiano e giocano con borsa di studio nelle università NCAA, NAIA e NJCAA degli Stati Uniti.",
    },
    de: {
      title: "Unsere Spieler in den USA | FutbolUAgency",
      description:
        "Lerne die Fußballer von FutbolUAgency kennen, die bereits mit Stipendium an NCAA-, NAIA- und NJCAA-Universitäten in den USA studieren und spielen.",
    },
  },
  resources: {
    es: {
      title: "Guías sobre becas de fútbol en EE.UU. | FutbolUAgency",
      description:
        "Guías completas sobre becas de fútbol universitario en Estados Unidos: elegibilidad, requisitos, proceso, visado, costes y vida en el campus.",
    },
    en: {
      title: "Guides to U.S. Soccer Scholarships | FutbolUAgency",
      description:
        "Complete guides to U.S. college soccer scholarships: eligibility, requirements, the process, visas, costs and campus life.",
    },
    it: {
      title: "Guide alle borse di studio negli USA | FutbolUAgency",
      description:
        "Guide complete sulle borse di studio per il calcio universitario negli USA: idoneità, requisiti, processo, visto, costi e vita nel campus.",
    },
    de: {
      title: "Ratgeber zu US-Fußball-Stipendien | FutbolUAgency",
      description:
        "Umfassende Ratgeber zu College-Fußball-Stipendien in den USA: Berechtigung, Voraussetzungen, Ablauf, Visum, Kosten und Campusleben.",
    },
  },
  about: {
    es: {
      title: "Quiénes somos | FutbolUAgency",
      description:
        "Conoce al equipo de FutbolUAgency: exfutbolistas que hicieron el camino a EE.UU. y hoy acompañan a jóvenes talentos hasta una beca en una universidad americana.",
    },
    en: {
      title: "About Us | FutbolUAgency",
      description:
        "Meet the FutbolUAgency team: former players who made the move to the U.S. themselves and now guide young talent to a scholarship at an American university.",
    },
    it: {
      title: "Chi siamo | FutbolUAgency",
      description:
        "Conosci il team di FutbolUAgency: ex calciatori che hanno fatto il percorso verso gli USA e oggi accompagnano i giovani talenti fino a una borsa di studio.",
    },
    de: {
      title: "Über uns | FutbolUAgency",
      description:
        "Lerne das Team von FutbolUAgency kennen: ehemalige Spieler, die selbst in die USA gegangen sind und junge Talente bis zum Stipendium begleiten.",
    },
  },
  apply: {
    es: {
      title: "Evaluación gratuita de tu perfil | FutbolUAgency",
      description:
        "Envía tu perfil a FutbolUAgency y descubre qué opciones reales de beca de fútbol tienes en universidades de EE.UU. Evaluación gratuita y sin compromiso.",
    },
    en: {
      title: "Free Profile Evaluation | FutbolUAgency",
      description:
        "Send your profile to FutbolUAgency and find out what real soccer scholarship options you have at U.S. universities. Free, with no obligation.",
    },
    it: {
      title: "Valutazione gratuita del profilo | FutbolUAgency",
      description:
        "Invia il tuo profilo a FutbolUAgency e scopri quali opzioni reali di borsa di studio hai nelle università degli USA. Valutazione gratuita e senza impegno.",
    },
    de: {
      title: "Kostenlose Profilbewertung | FutbolUAgency",
      description:
        "Schick FutbolUAgency dein Profil und finde heraus, welche echten Stipendienchancen du an US-Universitäten hast. Kostenlos und unverbindlich.",
    },
  },
  privacy: {
    es: {
      title: "Política de privacidad | FutbolUAgency",
      description:
        "Política de privacidad de FutbolUAgency: qué datos recogemos, para qué los usamos, con quién los compartimos y cómo puedes ejercer tus derechos.",
    },
    en: {
      title: "Privacy Policy | FutbolUAgency",
      description:
        "FutbolUAgency privacy policy: what data we collect, what we use it for, who we share it with and how you can exercise your rights.",
    },
    it: {
      title: "Informativa sulla privacy | FutbolUAgency",
      description:
        "Informativa sulla privacy di FutbolUAgency: quali dati raccogliamo, per cosa li usiamo, con chi li condividiamo e come esercitare i tuoi diritti.",
    },
    de: {
      title: "Datenschutzerklärung | FutbolUAgency",
      description:
        "Datenschutzerklärung von FutbolUAgency: welche Daten wir erheben, wofür wir sie nutzen, mit wem wir sie teilen und wie du deine Rechte ausübst.",
    },
  },
};

/**
 * Canonical plus the hreflang pair, so each language declares itself and points
 * at its counterpart. Without this the two would compete as duplicates.
 */
export function alternatesFor(
  locale: Locale,
  key: RouteKey,
  ...segments: string[]
): Metadata["alternates"] {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, href(l, key, ...segments)]),
  ) as Record<Locale, string>;

  return {
    canonical: href(locale, key, ...segments),
    languages: {
      ...languages,
      "x-default": href(DEFAULT_LOCALE, key, ...segments),
    },
  };
}

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "FutbolUAgency",
};

const OG_LOCALE: Record<Locale, string> = { es: "es_ES", en: "en_US", it: "it_IT", de: "de_DE" };
const ogLocale = (locale: Locale) => OG_LOCALE[locale];

/**
 * Open Graph and Twitter tags for one page.
 *
 * Next replaces the layout's `openGraph` object instead of merging it, so a
 * page that sets its own loses the image unless it is repeated here.
 */
export function socialFor({
  locale,
  path,
  title,
  description,
  image = OG_IMAGE,
  type = "website",
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
  type?: "website" | "article" | "profile";
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      siteName: "FutbolUAgency",
      title,
      description,
      url: `${SITE}${path}`,
      locale: ogLocale(locale),
      alternateLocale: LOCALES.filter((l) => l !== locale).map(ogLocale),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/**
 * Adds the brand to a page title only when the whole thing still fits in about
 * 60 characters; Google shows the site name on its own anyway.
 */
export const withBrand = (title: string) =>
  title.length + " | FutbolUAgency".length <= 60 ? `${title} | FutbolUAgency` : title;

/** A page's title and description in the language being built. */
export function metaCopy(key: RouteKey, locale: Locale): Copy {
  return pick(locale, PAGE_META[key]);
}

/** Metadata for a fixed page, in the language being built. */
export function metadataFor(locale: Locale, key: RouteKey): Metadata {
  /* Paths with a dot in the first segment (/favicon.ico, /wp-login.php) skip
     the middleware and arrive here as a "locale". Without this guard the
     lookup below throws and the request ends in a 500. */
  if (!isLocale(locale)) return {};
  const copy = metaCopy(key, locale);

  return {
    title: copy.title,
    description: copy.description,
    alternates: alternatesFor(locale, key),
    ...socialFor({
      locale,
      path: href(locale, key),
      title: copy.ogTitle ?? copy.title,
      description: copy.ogDescription ?? copy.description,
    }),
  };
}

export { ROUTES };
