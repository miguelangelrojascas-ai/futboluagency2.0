import type { Metadata } from "next";
import { metadataFor } from "@/lib/pageMeta";
import { LOCALES, type Locale } from "@/lib/routes";
import Index from "@/views/Index";

/**
 * The home page with the scroll-scrubbed video header, kept next to the live
 * home so both can be compared. Not in the sitemap, not indexed, and its
 * canonical points at the real home, so it never competes with it in search.
 * Delete this folder once a version is chosen.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return {
    ...(await metadataFor((await params).locale, "home")),
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <Index hero="video" />;
}
