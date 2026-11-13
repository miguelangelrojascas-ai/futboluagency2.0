import { players } from "@/data/players";

/** Cut-outs of real FUA players, matched to the roster by kit and announcement photo. */
const CUTOUTS = [
  { name: "Ander González", surname: "González", src: "/images/home/jugador-balon.png", width: 576, height: 1189 },
  { name: "Tomás del Grosso", surname: "Del Grosso", src: "/images/home/jugador-senala.png", width: 451, height: 1135 },
  { name: "Miguel Arnaiz de León", surname: "Arnaiz", src: "/images/home/jugador-bandera.png", width: 605, height: 1423 },
];

export type SpotlightPlayer = (typeof CUTOUTS)[number] & { university: string; division: string };

const byName = new Map(players.map((p) => [p.name, p]));

/* School and division come from the roster, so the hero never disagrees with /jugadores. */
export const SPOTLIGHT: SpotlightPlayer[] = CUTOUTS.flatMap((c) => {
  const p = byName.get(c.name);
  return p ? [{ ...c, university: p.university, division: p.division }] : [];
});

export const MIGUEL = SPOTLIGHT.find((p) => p.name === "Miguel Arnaiz de León")!;
