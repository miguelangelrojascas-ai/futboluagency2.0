import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import { LOCALES, isLocale, type Locale } from "@/lib/routes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { organizationSchema } from "@/lib/schema";
import Providers from "@/components/Providers";
import "@/index.css";

/**
 * Self-hosted by Next at build time. The stylesheet used to pull these from
 * Google Fonts with an @import placed after the @tailwind directives, which
 * PostCSS strips, so neither family ever actually loaded in production.
 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

/**
 * Playfair's figures are old-style (some sit lower than others), which looked
 * uneven in stats and prices. This face only covers digits and the symbols
 * around them, and sits first in the display stack, so every number in a
 * heading renders in a bold geometric sans close to the logo lettering.
 */
const digits = localFont({
  src: "../../src/fonts/montserrat-latin.woff2",
  weight: "500 800",
  display: "swap",
  variable: "--font-digits",
  adjustFontFallback: false,
  fallback: [],
  declarations: [{ prop: "unicode-range", value: "U+0024-0025, U+002B, U+0030-0039" }],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://futboluagency.com"),
  authors: [{ name: "FutbolUAgency LLC." }],
  openGraph: { type: "website", siteName: "FutbolUAgency", images: ["/og-image.jpg"] },
  /* No `site` handle: "@FutbolUAgencyLLC" is longer than X allows (15
     characters), so it pointed at an account that cannot exist. */
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
};

/* Only "es" and "en" exist. Anything else (e.g. /favicon.ico reaching this
   segment) is a 404 instead of being rendered as an unknown language. */
export const dynamicParams = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/** Both languages are known up front, so both are built as static HTML. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: requested } = await params;
  if (!isLocale(requested)) notFound();
  const locale = requested as Locale;

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable} ${digits.variable}`}>
      <body>
        {/* Entity data for search and AI engines, in the served HTML so a
            crawler that never runs JavaScript still reads it. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema(locale)),
          }}
        />
        <LanguageProvider locale={locale}>
          <Providers>{children}</Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
