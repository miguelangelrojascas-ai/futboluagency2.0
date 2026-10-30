import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  ROUTES,
  href,
  type Locale,
  type RouteKey,
} from "./routes";

const SITE = "https://futboluagency.com";

type Copy = { title: string; description: string; ogTitle?: string; ogDescription?: string };

/**
 * Title and description per page, per language.
 *
 * Lives here rather than in each page component because the pages are client
 * components: metadata is emitted by the server route files, which read this.
 */
export const PAGE_META: Record<RouteKey, Record<Locale, Copy>> = {
  home: {
    es: {
      title: "FutbolUAgency LLC. | Becas Deportivas en Estados Unidos",
      description:
        "Ayudamos a futbolistas internacionales a obtener becas deportivas en universidades NCAA, NAIA y JUCO en Estados Unidos. Evaluación gratuita.",
      ogDescription:
        "Convierte tu talento en una beca deportiva. Ayudamos a futbolistas internacionales a entrar a universidades NCAA, NAIA y JUCO.",
    },
    en: {
      title: "FutbolUAgency LLC. | Soccer Scholarships in the United States",
      description:
        "We help international footballers earn soccer scholarships at NCAA, NAIA and JUCO universities in the United States. Free evaluation.",
      ogDescription:
        "Turn your talent into a scholarship. We help international footballers reach NCAA, NAIA and JUCO universities.",
    },
  },
  usa: {
    es: {
      title: "Fútbol Universitario en USA | Becas NCAA, NAIA y JUCO – FutbolUAgency",
      description:
        "Descubre cómo conseguir una beca de fútbol en universidades americanas NCAA, NAIA y JUCO. Proceso, requisitos y casos de éxito reales.",
      ogTitle: "Fútbol Universitario en USA | FutbolUAgency",
    },
    en: {
      title: "College Soccer in the USA | NCAA, NAIA and JUCO Scholarships – FutbolUAgency",
      description:
        "Find out how to earn a soccer scholarship at NCAA, NAIA and JUCO universities in the U.S. Process, requirements and real placements.",
      ogTitle: "College Soccer in the USA | FutbolUAgency",
    },
  },
  players: {
    es: {
      title: "Nuestros Jugadores | FutbolUAgency",
      description:
        "Los futbolistas de FutbolUAgency que ya estudian y compiten en universidades NCAA, NAIA y NJCAA de Estados Unidos.",
    },
    en: {
      title: "Our Players | FutbolUAgency",
      description:
        "The FutbolUAgency footballers already studying and competing at NCAA, NAIA and NJCAA universities in the United States.",
    },
  },
  resources: {
    es: {
      title: "Recursos | Guías sobre becas de fútbol en EE.UU. – FutbolUAgency",
      description:
        "Guías completas sobre becas de fútbol universitario en Estados Unidos: elegibilidad, requisitos, proceso, visado, costes y vida en el campus.",
    },
    en: {
      title: "Resources | Guides on U.S. soccer scholarships – FutbolUAgency",
      description:
        "Complete guides on U.S. college soccer scholarships: eligibility, requirements, process, visa, costs and campus life.",
    },
  },
  about: {
    es: {
      title: "Sobre Nosotros | Quiénes Somos – FutbolUAgency",
      description:
        "Conoce al equipo detrás de FutbolUAgency. Exfutbolistas profesionales que ayudan a jóvenes talentos a obtener becas deportivas en universidades americanas.",
    },
    en: {
      title: "About Us | Who We Are – FutbolUAgency",
      description:
        "Meet the team behind FutbolUAgency. Former professional footballers helping young talent earn scholarships at American universities.",
    },
  },
  apply: {
    es: {
      title: "Evaluación gratuita | FutbolUAgency",
      description:
        "Rellena el formulario de admisiones de FutbolUAgency y descubre qué opciones reales de beca tienes.",
    },
    en: {
      title: "Free evaluation | FutbolUAgency",
      description:
        "Fill in the FutbolUAgency admissions form and find out what real scholarship options you have.",
    },
  },
  privacy: {
    es: {
      title: "Política de Privacidad | FutbolUAgency",
      description:
        "Qué datos recoge FutbolUAgency, para qué los usa, con quién los comparte y cómo ejercer tus derechos.",
    },
    en: {
      title: "Privacy Policy | FutbolUAgency",
      description:
        "What data FutbolUAgency collects, what it is used for, who it is shared with and how to exercise your rights.",
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

/** Metadata for a fixed page, in the language being built. */
export function metadataFor(locale: Locale, key: RouteKey): Metadata {
  const copy = PAGE_META[key][locale];
  const url = `${SITE}${href(locale, key)}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: alternatesFor(locale, key),
    openGraph: {
      title: copy.ogTitle ?? copy.title,
      description: copy.ogDescription ?? copy.description,
      url,
      locale: locale === "es" ? "es_ES" : "en_US",
    },
  };
}

export { ROUTES };
