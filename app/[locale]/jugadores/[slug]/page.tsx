import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor, socialFor } from "@/lib/pageMeta";
import { LOCALES, href, isLocale, type Locale } from "@/lib/routes";
import { breadcrumbSchema, jsonLd, playerSchema } from "@/lib/schema";
import { findPlayerStory, playerStories } from "@/data/playerStories";
import PlayerStory from "@/views/PlayerStory";

export const dynamicParams = false;

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
  if (!story || !isLocale(params.locale)) return {};
  const { locale } = params;
  const title = `${story.name} — ${story.university} | FutbolUAgency`;
  const description = story.summary[locale];

  return {
    title,
    description,
    alternates: alternatesFor(locale, "players", story.slug),
    ...socialFor({
      locale,
      path: href(locale, "players", story.slug),
      title,
      description,
      image: { url: story.heroImage, alt: story.name },
      type: "profile",
    }),
  };
}

export default function Page({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const story = findPlayerStory(params.slug);
  if (!story) notFound();
  const { locale } = params;
  const es = locale === "es";
  const path = href(locale, "players", story.slug);

  const schema = jsonLd(
    playerSchema({
      locale,
      path,
      name: story.name,
      description: story.summary[locale],
      image: story.heroImage,
      university: story.university,
    }),
    breadcrumbSchema([
      { name: es ? "Inicio" : "Home", path: href(locale, "home") },
      { name: es ? "Jugadores" : "Players", path: href(locale, "players") },
      { name: story.name, path },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <PlayerStory />
    </>
  );
}
