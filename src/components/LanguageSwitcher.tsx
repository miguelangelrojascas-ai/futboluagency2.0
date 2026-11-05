"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { LOCALES, swapLocaleInPath, type Locale } from "@/lib/routes";

/**
 * ES / EN toggle for the navbar.
 *
 * Each language has its own address, so both options are links: the target is
 * the current path with its locale segment and slug swapped. The current
 * language is shown as selected and is not a link.
 */
const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { language } = useLanguage();
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-[0.08em] ${className}`}
      aria-label={language === "es" ? "Idioma" : "Language"}
      role="group"
    >
      <Globe className="h-4 w-4 text-muted-foreground" aria-hidden />
      {LOCALES.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-border" aria-hidden>|</span>}
          {locale === language ? (
            <span className="text-primary" aria-current="true">
              {locale}
            </span>
          ) : (
            <Link
              href={swapLocaleInPath(pathname, locale as Locale)}
              hrefLang={locale}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={locale === "en" ? "English" : "Español"}
            >
              {locale}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
