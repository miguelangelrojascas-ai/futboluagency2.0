"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { other, swapLocaleInPath, type Locale } from "@/lib/routes";

/**
 * Switches language by going to the same page in the other one.
 *
 * It used to flip a piece of state, which meant both languages lived at the
 * same URL and only one of them could ever be prerendered. Now each language
 * has its own address, so this is a link: the destination is the current path
 * with its locale segment and slug swapped.
 */
const LanguageSwitcher = () => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const target = other(language as Locale);

  return (
    <Link
      href={swapLocaleInPath(pathname, target)}
      hrefLang={target}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-full shadow-lg hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
      aria-label={
        target === "en" ? "Switch to English" : "Cambiar a español"
      }
    >
      <Globe className="w-5 h-5 text-primary" />
      <span className="font-body font-semibold text-sm text-foreground uppercase">
        {target}
      </span>
    </Link>
  );
};

export default LanguageSwitcher;
