"use client";

import { createContext, useContext } from "react";

type Bilingual = { es: string; en: string };

/** What the Resources menu needs from each guide: no body text. */
export type GuideIndexItem = {
  slug: string;
  number: string;
  title: Bilingual;
  sections: { id: string; title: Bilingual }[];
};

const GuideIndexContext = createContext<GuideIndexItem[]>([]);

/**
 * Hands the guide list to the navbar.
 *
 * The layout builds it on the server from the full guides, so the long text
 * of every guide is not shipped to every page just to draw a menu.
 */
export function GuideIndexProvider({
  guides,
  children,
}: {
  guides: GuideIndexItem[];
  children: React.ReactNode;
}) {
  return <GuideIndexContext.Provider value={guides}>{children}</GuideIndexContext.Provider>;
}

export const useGuideIndex = () => useContext(GuideIndexContext);
