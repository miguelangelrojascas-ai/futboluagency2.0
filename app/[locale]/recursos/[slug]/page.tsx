import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternatesFor } from "@/lib/pageMeta";
import { LOCALES, type Locale } from "@/lib/routes";
import { findGuide, guides } from "@/data/resources";
import ResourceGuide from "@/views/ResourceGuide";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    guides.map((guide) => ({ locale, slug: guide.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const guide = findGuide(params.slug);
  if (!guide) return {};
  const es = params.locale === "es";

  return {
    title: `${es ? guide.title.es : guide.title.en} | FutbolUAgency`,
    description: es ? guide.summary.es : guide.summary.en,
    alternates: alternatesFor(params.locale, "resources", guide.slug),
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  if (!findGuide(params.slug)) notFound();
  return <ResourceGuide />;
}
