import type { Metadata } from "next";
import { metadataFor } from "@/lib/pageMeta";
import { LOCALES, type Locale } from "@/lib/routes";
import Players from "@/views/Players";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  return metadataFor(params.locale, "players");
}

export default function Page() {
  return <Players />;
}
