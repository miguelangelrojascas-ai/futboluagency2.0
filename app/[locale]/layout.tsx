import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://futboluagency.com"),
  authors: [{ name: "FutbolUAgency LLC." }],
  openGraph: { type: "website", images: ["/og-image.jpg"] },
  twitter: {
    card: "summary_large_image",
    site: "@FutbolUAgencyLLC",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/** Both languages are known up front, so both are built as static HTML. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
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
