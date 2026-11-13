import type { Metadata } from "next";
import { LOCALES } from "@/lib/routes";
import Index from "@/views/Index";

/* Local review only: proposal B of the home header. Remove once one is chosen. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Home · Propuesta B",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Index variant="b" />;
}
