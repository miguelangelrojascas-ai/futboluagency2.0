import { topRow, bottomRow } from "@/data/successCases";
import { playerStories } from "@/data/playerStories";

/** Players who have a long-form story page, keyed by the name on their card. */
const storySlugByName = new Map(playerStories.map((story) => [story.name, story.slug]));

export type Player = {
  name: string;
  /** Commitment graphic. Omit to render an empty slot. */
  image?: string;
  /** Where they play. */
  university?: string;
  division?: string;
  origin?: string;
  /** Slug of this player's story page, when they have one. */
  story?: string;
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
    story: storySlugByName.get(c.name),
  }));

/** Empty cards rendered after the real ones, to be filled in later. */
export const placeholderCount = 4;
