import type { Metadata } from "next";
import { metadataFor } from "@/lib/pageMeta";
import { LOCALES, type Locale } from "@/lib/routes";
import { getShowcaseForm } from "@/lib/showcaseForm";
import { showcaseEventSchema } from "@/lib/schema";
import Showcase from "@/views/Showcase";

/* Picks up question changes made in the CRM (see src/lib/showcaseForm.ts). */
export const revalidate = 60;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return metadataFor((await params).locale, "showcase");
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseEventSchema(locale)) }}
      />
      <Showcase form={await getShowcaseForm()} />
    </>
  );
}
