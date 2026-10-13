import { topRow, bottomRow } from "@/data/successCases";

export type Player = {
  name: string;
  /** Commitment graphic. Omit to render an empty slot. */
  image?: string;
  /** Where they play. */
  university?: string;
  division?: string;
  origin?: string;
};

/** Footballers already committed to a U.S. university.
 *  Landscape cards are skipped: they are built for the home marquee and
 *  break the portrait grid here. */
export const players: Player[] = [...topRow, ...bottomRow]
  .filter((c) => c.layout !== "landscape")
  .map((c) => ({
    name: c.name,
    image: c.image,
    university: c.university,
    division: c.division,
    origin: c.origin,
  }));

/** Empty cards rendered after the real ones, to be filled in later. */
export const placeholderCount = 4;
