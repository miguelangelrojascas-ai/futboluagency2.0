import type { Metadata } from "next";
import { metadataFor } from "@/lib/pageMeta";
import { LOCALES, type Locale } from "@/lib/routes";
import Resources from "@/views/Resources";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  return metadataFor(params.locale, "resources");
}

export default function Page() {
  return <Resources />;
}
