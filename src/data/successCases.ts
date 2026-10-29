import type { SuccessCase } from "@/components/SuccessCaseCard";
import successZak from "@/assets/success-zak.webp";
import successVictor from "@/assets/success-victor.webp";
import successBentchey from "@/assets/success-bentchey.webp";
import successEduardo from "@/assets/success-eduardo.webp";
import successPablo from "@/assets/success-pablo.webp";
import successMiguel from "@/assets/success-miguel.webp";
import successChase from "@/assets/success-chase.webp";
import successDaniel from "@/assets/success-daniel.webp";
import successOmar from "@/assets/success-omar.webp";
import committedAnder from "@/assets/committed-ander.webp";
import committedIvan from "@/assets/committed-ivan.webp";
import committedSimone from "@/assets/committed-simone.webp";
import committedFrancisco from "@/assets/committed-francisco.webp";
import committedJuan from "@/assets/committed-juan.webp";
import committedJose from "@/assets/committed-jose.webp";

/** Marquee row shown first on the home page. */
export const topRow: SuccessCase[] = [
  { image: successOmar, name: "Omar Ocampos", origin: "Club América", university: "Cowley College", division: "NJCAA", layout: "landscape" },
  { image: committedAnder, name: "Ander González", university: "St. John's University", division: "NCAA D1" },
  { image: successZak, name: "Zak McGall", university: "Seward County CC", division: "NJCAA" },
  { image: committedIvan, name: "Iván Gómez Sumillera", university: "Delta State University", division: "NCAA D2" },
  { image: successVictor, name: "Victor Paz", university: "Illinois Central College", division: "NJCAA" },
  { image: committedSimone, name: "Simone Pitale", university: "Monroe University", division: "NJCAA" },
  { image: successEduardo, name: "Eduardo Larsen", university: "Beloit College", division: "NCAA D3" },
];

/** Marquee row shown second on the home page, scrolling the other way. */
export const bottomRow: SuccessCase[] = [
  { image: committedJose, name: "Jose Contreras", university: "University of West Florida", division: "NCAA D2" },
  { image: successBentchey, name: "Bentchey Dominguez", university: "East Mississippi CC", division: "NJCAA" },
  { image: committedFrancisco, name: "Francisco Giraldo", university: "Regis University", division: "NCAA D2" },
  { image: successPablo, name: "Pablo Exposito", university: "Crowder College", division: "NJCAA" },
  { image: committedJuan, name: "Juan Argüelles", university: "Prairie State College", division: "NJCAA" },
  { image: successMiguel, name: "Miguel Arnaiz", university: "NIACC", division: "NJCAA" },
  { image: successChase, name: "Chase Nasir", university: "Lake Erie College", division: "NCAA D2" },
  { image: successDaniel, name: "Daniel Abreu", university: "East Mississippi CC", division: "NJCAA" },
];

/** Every case, for the full gallery on /players. */
export const allSuccessCases: SuccessCase[] = [...topRow, ...bottomRow];
