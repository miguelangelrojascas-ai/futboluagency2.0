import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor, socialFor } from "@/lib/pageMeta";
import { LOCALES, href, isLocale, type Locale } from "@/lib/routes";
import { breadcrumbSchema, jsonLd, playerSchema } from "@/lib/schema";
import { findPlayerStory, playerStories } from "@/data/playerStories";
import PlayerStory from "@/views/PlayerStory";
import { pick, tr } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    playerStories.map((story) => ({ locale, slug: story.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const story = findPlayerStory(resolved.slug);
  if (!story || !isLocale(resolved.locale)) return {};
  const { locale } = resolved;
  const title = `${story.name} — ${story.university} | FutbolUAgency`;
  const description = pick(locale, story.summary);

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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const resolved = await params;
  const story = findPlayerStory(resolved.slug);
  if (!story) notFound();
  const { locale } = resolved;
  const path = href(locale, "players", story.slug);

  const schema = jsonLd(
    playerSchema({
      locale,
      path,
      name: story.name,
      description: pick(locale, story.summary),
      image: story.heroImage,
      university: story.university,
    }),
    breadcrumbSchema([
      { name: tr(locale, "Inicio", "Home"), path: href(locale, "home") },
      { name: tr(locale, "Jugadores", "Players"), path: href(locale, "players") },
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
