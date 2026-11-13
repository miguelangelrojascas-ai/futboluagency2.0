"use client";

import Image, { type StaticImageData } from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick, type Copy } from "@/lib/i18n";
import talaveraCrest from "@/assets/spain-clubs/talavera-logo.png";

type Club = {
  name: string;
  /* Initials shown until the crest file is in the repo. */
  mono: string;
  place: Copy;
  crest?: StaticImageData;
};

/*
 * Destination and competition clubs in Spain and Portugal. Crests still
 * missing: drop the file in src/assets/spain-clubs/ and add it as `crest`.
 */
const CLUBS: Club[] = [
  {
    name: "CF Talavera de la Reina",
    mono: "CFT",
    crest: talaveraCrest,
    place: { es: "Talavera de la Reina · España", en: "Talavera de la Reina · Spain", it: "Talavera de la Reina · Spagna", de: "Talavera de la Reina · Spanien" },
  },
  {
    name: "C.E. Sabadell",
    mono: "CES",
    place: { es: "Sabadell · España", en: "Sabadell · Spain", it: "Sabadell · Spagna", de: "Sabadell · Spanien" },
  },
  {
    name: "Sport Extremadura CD",
    mono: "SE",
    place: { es: "Extremadura · España", en: "Extremadura · Spain", it: "Estremadura · Spagna", de: "Extremadura · Spanien" },
  },
  {
    name: "OS Marialvas",
    mono: "OSM",
    place: { es: "Portugal", en: "Portugal", it: "Portogallo", de: "Portugal" },
  },
];

/** Crests of the clubs our players join and compete with. */
const SpainClubsStrip = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-ink py-20 text-white sm:py-28" aria-labelledby="spain-clubs-title">
      <div className="container-wide px-4">
        <h2 id="spain-clubs-title" className="leading-[0.92] text-white text-[clamp(2.75rem,8vw,5.5rem)]">
          {pick(language, { es: "Dónde vas a", en: "Where you will", it: "Dove andrai a", de: "Wo du" })}{" "}
          <span className="pr-[0.08em] italic text-red-bright">
            {pick(language, { es: "competir", en: "compete", it: "giocare", de: "spielen wirst" })}
          </span>
        </h2>
        <p className="label-bebas mt-4 text-base text-white/55">
          {pick(language, {
            es: "Clubes de destino y competición · España y Portugal",
            en: "Destination and competition clubs · Spain and Portugal",
            it: "Club di destinazione e competizione · Spagna e Portogallo",
            de: "Ziel- und Wettbewerbsvereine · Spanien und Portugal",
          })}
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 lg:grid-cols-4">
          {CLUBS.map((c) => (
            <li key={c.name} className="flex flex-col items-center bg-ink px-4 py-10 text-center sm:py-12">
              <div className="flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
                {c.crest ? (
                  <Image
                    src={c.crest}
                    alt={pick(language, { es: `Escudo del ${c.name}`, en: `${c.name} crest`, it: `Stemma del ${c.name}`, de: `Wappen von ${c.name}` })}
                    sizes="112px"
                    className="h-full w-full rounded-2xl object-contain"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-full w-full items-center justify-center rounded-full border border-white/20 font-druk text-2xl text-white/80"
                  >
                    {c.mono}
                  </span>
                )}
              </div>
              <p className="mt-6 font-body text-base font-semibold text-white">{c.name}</p>
              <p className="label-bebas mt-1 text-sm text-white/50">{pick(language, c.place)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SpainClubsStrip;
