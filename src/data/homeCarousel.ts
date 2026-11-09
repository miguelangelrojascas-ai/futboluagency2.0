import type { SuccessCase } from "@/components/SuccessCaseCard";
import { players } from "@/data/players";
import omarAsset from "@/assets/success-omar.webp";

/* Home "Del club a la universidad" marquee: only the landscape commitment
   graphics, so every card shares the same design. */

const byName = new Map(players.map((p) => [p.name, p]));

const pick = (names: string[]): SuccessCase[] =>
  names.flatMap((name) => {
    const p = byName.get(name);
    return p ? [{ name: p.name, image: p.image, university: p.university, division: p.division, layout: "commitment" as const }] : [];
  });

export const homeTopRow: SuccessCase[] = [
  { image: omarAsset.src, name: "Omar Ocampos", origin: "Club América", university: "Cowley College", division: "NJCAA", layout: "landscape" },
  ...pick([
    "Ander González",
    "Santiago Abraham",
    "Iván Gómez Sumillera",
    "Eduardo Larsen",
    "Miguel Arnaiz de León",
    "Marcos Gallardo Rozano",
    "Víctor Sanz Paz",
  ]),
];

export const homeBottomRow: SuccessCase[] = pick([
  "Marcos de Elías",
  "Tomás del Grosso",
  "Francisco Grado",
  "Bentchey Domínguez",
  "Sebastián Faudoa",
  "Juan Argüelles",
  "Daniel Abreu",
  "Youssef El Madkouri",
]);
