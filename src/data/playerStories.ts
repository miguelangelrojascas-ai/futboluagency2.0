import anderMeet from "@/assets/ander-meet.jpg";
import anderGfi from "@/assets/ander-gfi.jpg";
import anderCareer from "@/assets/ander-career.jpg";
import anderCommitted from "@/assets/ander-committed.jpg";

/**
 * The long-form story behind a player in the roster.
 *
 * Only a few players have one. A card on /players links to its story when the
 * slug here matches, so adding a story is a matter of adding an entry and
 * pointing the roster entry at it.
 */

type Bilingual = { es: string; en: string };

export type StoryChapter = {
  year: string;
  title: Bilingual;
  body: Bilingual;
  image: string;
  alt: Bilingual;
};

export type PlayerStory = {
  slug: string;
  name: string;
  university: string;
  division: string;
  heroImage: string;
  /** Short line above the name. */
  eyebrow: Bilingual;
  summary: Bilingual;
  chapters: StoryChapter[];
  video?: { src: string; poster: string };
};

export const playerStories: PlayerStory[] = [
  {
    slug: "ander-gonzalez",
    name: "Ander González",
    university: "St. John's University",
    division: "NCAA Division 1",
    heroImage: anderMeet,
    eyebrow: {
      es: "De México a una beca NCAA D1",
      en: "From Mexico to an NCAA D1 scholarship",
    },
    summary: {
      es: "Ander salió de México para formarse en Europa y acabó firmando una beca completa en una universidad de la NCAA Division 1. Este es el camino, año por año.",
      en: "Ander left Mexico to develop in Europe and ended up signing a full scholarship at an NCAA Division 1 university. This is the path, year by year.",
    },
    chapters: [
      {
        year: "2024",
        title: {
          es: "Identificado en GFI Academy",
          en: "Identified at GFI Academy",
        },
        body: {
          es: "Nuestros scouts lo vieron competir y reconocieron su potencial para dar el salto al fútbol universitario estadounidense. A partir de ahí empezamos a construir su perfil deportivo y académico.",
          en: "Our scouts watched him compete and recognised his potential to make the jump to U.S. college soccer. From there we started building his athletic and academic profile.",
        },
        image: anderGfi,
        alt: {
          es: "Ander González entrenando en GFI Academy",
          en: "Ander González training at GFI Academy",
        },
      },
      {
        year: "2025",
        title: { es: "Debut en CF Fuenlabrada", en: "CF Fuenlabrada debut" },
        body: {
          es: "Entró en el programa de residencia y debutó con el primer equipo profesional. Competir contra adultos cambió su perfil: pasó de promesa a jugador con minutos reales que enseñar a los entrenadores.",
          en: "He joined the boarding programme and debuted with the professional first team. Competing against adults changed his profile: he went from prospect to a player with real minutes to show coaches.",
        },
        image: anderCareer,
        alt: {
          es: "Ander González con la equipación del CF Fuenlabrada",
          en: "Ander González in CF Fuenlabrada kit",
        },
      },
      {
        year: "2026",
        title: {
          es: "Beca completa en St. John's",
          en: "Full scholarship at St. John's",
        },
        body: {
          es: "Presentamos su perfil, abrimos la conversación con varios programas y negociamos las condiciones. Firmó una beca completa en St. John's University, en la NCAA Division 1.",
          en: "We put his profile in front of coaches, opened conversations with several programmes and negotiated the terms. He signed a full scholarship at St. John's University, in NCAA Division 1.",
        },
        image: anderCommitted,
        alt: {
          es: "Ander González el día de su compromiso con St. John's University",
          en: "Ander González on his commitment day with St. John's University",
        },
      },
    ],
    video: { src: "/videos/ander-highlights.mp4", poster: anderMeet },
  },
];

export const findPlayerStory = (slug?: string) =>
  playerStories.find((story) => story.slug === slug);
