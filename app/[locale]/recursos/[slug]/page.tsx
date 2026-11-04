import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PAGE_META, alternatesFor, socialFor } from "@/lib/pageMeta";
import { LOCALES, href, isLocale, type Locale } from "@/lib/routes";
import { articleSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import { findGuide, guides } from "@/data/resources";
import ResourceGuide from "@/views/ResourceGuide";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    guides.map((guide) => ({ locale, slug: guide.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const guide = findGuide(resolved.slug);
  if (!guide || !isLocale(resolved.locale)) return {};
  const { locale } = resolved;
  const title = `${guide.seoTitle[locale]} | FutbolUAgency`;
  const description = guide.summary[locale];

  return {
    title,
    description,
    alternates: alternatesFor(locale, "resources", guide.slug),
    ...socialFor({
      locale,
      path: href(locale, "resources", guide.slug),
      title,
      description,
      image: { url: guide.image, alt: guide.title[locale] },
      type: "article",
    }),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const resolved = await params;
  const guide = findGuide(resolved.slug);
  if (!guide) notFound();
  const { locale } = resolved;
  const es = locale === "es";
  const path = href(locale, "resources", guide.slug);

  const schema = jsonLd(
    articleSchema({
      locale,
      path,
      headline: guide.seoTitle[locale],
      description: guide.summary[locale],
      image: guide.image,
      sections: guide.sections.map((s) => s.title[locale]),
    }),
    breadcrumbSchema([
      { name: es ? "Inicio" : "Home", path: href(locale, "home") },
      { name: PAGE_META.resources[locale].title.split(" |")[0], path: href(locale, "resources") },
      { name: guide.title[locale], path },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <ResourceGuide />
    </>
  );
}
