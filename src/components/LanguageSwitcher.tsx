"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { LOCALES, swapLocaleInPath, type Locale } from "@/lib/routes";

const NAME: Record<Locale, string> = { es: "Español", en: "English", it: "Italiano", de: "Deutsch" };
const LABEL: Record<Locale, string> = { es: "Idioma", en: "Language", it: "Lingua", de: "Sprache" };

/**
 * Language picker for the navbar: a small button with the current language
 * that opens a list of the others. Each language has its own address, so every
 * option is a link to the current page in that language.
 */
const LanguageSwitcher = ({ className = "", dark = false }: { className?: string; dark?: boolean }) => {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const current = language as Locale;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Close after navigating to another language. */
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-body text-xs font-bold uppercase tracking-[0.08em] transition-colors ${
          dark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
        } ${open ? (dark ? "bg-white/10" : "bg-muted") : ""}`}
      >
        <Globe className={`h-4 w-4 ${dark ? "text-white/60" : "text-muted-foreground"}`} aria-hidden />
        {/* Read as "Idioma: es"; the visible code stays part of the name. */}
        <span className="sr-only">{LABEL[current]}: </span>
        {current}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      <ul
        id={menuId}
        aria-label={LABEL[current]}
        className={`absolute right-0 top-full z-50 mt-2 min-w-[11rem] origin-top-right overflow-hidden rounded-2xl border p-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-200 ease-out ${
          dark ? "border-white/10 bg-[#111]/95 backdrop-blur-md" : "border-border bg-background"
        } ${open ? "scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0"}`}
      >
        {LOCALES.map((locale) => {
          const active = locale === current;
          const row = `flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 font-body text-sm transition-colors ${
            dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-foreground/80 hover:bg-muted hover:text-foreground"
          }`;
          const body = (
            <>
              <span className="flex items-center gap-3">
                <span className={`w-6 font-bold uppercase tracking-[0.08em] ${dark ? "text-white/45" : "text-muted-foreground"}`}>{locale}</span>
                {NAME[locale as Locale]}
              </span>
              {active && <Check className="h-4 w-4 text-primary" aria-hidden />}
            </>
          );
          return (
            <li key={locale}>
              {active ? (
                <span className={`${row} font-semibold`} aria-current="true">
                  {body}
                </span>
              ) : (
                <Link
                  href={swapLocaleInPath(pathname, locale as Locale)}
                  hrefLang={locale}
                  lang={locale}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  className={row}
                >
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
