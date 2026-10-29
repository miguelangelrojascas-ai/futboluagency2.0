import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/pageMeta";
import { LOCALES, type Locale } from "@/lib/routes";
import { findPlayerStory, playerStories } from "@/data/playerStories";
import PlayerStory from "@/views/PlayerStory";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    playerStories.map((story) => ({ locale, slug: story.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const story = findPlayerStory(params.slug);
  if (!story) return {};

  return {
    title: `${story.name} — ${story.university} | FutbolUAgency`,
    description:
      params.locale === "es" ? story.summary.es : story.summary.en,
    alternates: alternatesFor(params.locale, "players", story.slug),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!findPlayerStory(params.slug)) notFound();
  return <PlayerStory />;
}
