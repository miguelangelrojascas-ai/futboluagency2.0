import type { Metadata } from "next";
import { metadataFor } from "@/lib/pageMeta";
import { LOCALES, type Locale } from "@/lib/routes";
import Spain from "@/views/Spain";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return metadataFor((await params).locale, "spain");
}

export default function Page() {
  return <Spain />;
}
