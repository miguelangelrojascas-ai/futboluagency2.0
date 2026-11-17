import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor, metaCopy, socialFor, withBrand } from "@/lib/pageMeta";
import { LOCALES, href, isLocale, type Locale } from "@/lib/routes";
import { articleSchema, breadcrumbSchema, jsonLd } from "@/lib/schema";
import { findGuide, guides } from "@/data/resources";
import ResourceGuide from "@/views/ResourceGuide";
import { pick, tr } from "@/lib/i18n";

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
  const title = withBrand(pick(locale, guide.seoTitle));
  const description = pick(locale, guide.summary);

  return {
    title,
    description,
    alternates: alternatesFor(locale, "resources", guide.slug),
    ...socialFor({
      locale,
      path: href(locale, "resources", guide.slug),
      title,
      description,
      image: { url: guide.image, alt: pick(locale, guide.title) },
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
  const path = href(locale, "resources", guide.slug);

  const schema = jsonLd(
    articleSchema({
      locale,
      path,
      headline: pick(locale, guide.seoTitle),
      description: pick(locale, guide.summary),
      image: guide.image,
      sections: guide.sections.map((s) => pick(locale, s.title)),
    }),
    breadcrumbSchema([
      { name: tr(locale, "Inicio", "Home"), path: href(locale, "home") },
      { name: pick(locale, { es: "Recursos", en: "Resources", it: "Risorse", de: "Ressourcen" }), path: href(locale, "resources") },
      { name: pick(locale, guide.title), path },
    ]),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <ResourceGuide />
    </>
  );
}
