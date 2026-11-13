"use client";

import { useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { resolveLegacyPath, type Locale } from "@/lib/routes";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import logoAsset from "@/assets/logo-fua.png";

/* Next resolves an image import to an object; the components want the URL. */
const logo = logoAsset.src;

/** `dark` floats the bar over a black hero (the home); `light` is the default. */
const Navbar = ({ tone = "light" }: { tone?: "light" | "dark" }) => {
  const dark = tone === "dark";
  const [isOpen, setIsOpen] = useState(false);
  /* Desktop "Becas EE.UU." dropdown, which holds the Showcase. */
  const [usaOpen, setUsaOpen] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const usaLabel = language === "es" ? "Becas Fútbol EE.UU." : "Soccer Scholarships USA";

  const isActive = (path: string) =>
    pathname === resolveLegacyPath(language as Locale, path);

  const navLinkClass = (active: boolean) =>
    `font-body text-sm font-medium px-4 py-2 rounded-full transition-colors ${
      active
        ? dark ? "text-white bg-white/10" : "text-primary bg-primary/10"
        : dark ? "text-white/65 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  const mobileNavLinkClass = (active: boolean) =>
    `font-body text-sm font-bold text-center px-4 py-3 rounded-full transition-colors ${
      active
        ? dark ? "text-white bg-white/10" : "text-primary bg-primary/10"
        : dark ? "text-white/65 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-3 pt-2 sm:px-4 md:pt-3">
        <div className={`container-wide grid grid-cols-[1fr_auto_1fr] items-center rounded-full backdrop-blur-lg border pl-5 ${dark ? "bg-[#0a0a0a]/70 border-white/10" : "bg-background/95 navbar-shadow border-border/60"} pr-3 sm:pl-6 sm:pr-4 h-14 md:h-16`}>

          {/* Logo */}
          <LocaleLink to="/" className="flex-shrink-0 justify-self-start">
            {/* On the home the hero's F·U·A letters fly into this spot and hand
                over to it (--fua-logo-reveal); everywhere else it is always shown. */}
            <img
              src={logo}
              alt="FutbolUAgency LLC."
              data-nav-logo
              className="h-10 md:h-14 w-auto"
              style={{ opacity: "var(--fua-logo-reveal, 1)" }}
            />
          </LocaleLink>

          {/* Desktop nav — centrado en la columna del medio */}
          <div className="hidden lg:flex items-center justify-center gap-1">

            {/* Inicio */}
            <LocaleLink to="/" className={navLinkClass(isActive("/"))}>
              {t("nav.home")}
            </LocaleLink>

            {/* Becas Fútbol EE.UU. — the label opens the page, the dropdown adds the Showcase */}
            <div
              className="relative"
              onMouseEnter={() => setUsaOpen(true)}
              onMouseLeave={() => setUsaOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setUsaOpen(false);
              }}
              onKeyDown={(e) => e.key === "Escape" && setUsaOpen(false)}
            >
              <div className={`flex items-center ${navLinkClass(isActive("/usa") || isActive("/showcase"))} !pr-2`}>
                <LocaleLink to="/usa">{usaLabel}</LocaleLink>
                <button
                  type="button"
                  onClick={() => setUsaOpen((v) => !v)}
                  aria-expanded={usaOpen}
                  aria-label={language === "es" ? "Más opciones de becas en EE.UU." : "More USA scholarship options"}
                  className="ml-1 rounded-full p-0.5"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${usaOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              {usaOpen && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                  <div className="w-64 rounded-2xl border border-border/60 bg-background p-2 navbar-shadow">
                    <LocaleLink
                      to="/usa"
                      onClick={() => setUsaOpen(false)}
                      className="block rounded-xl px-4 py-2.5 font-body text-sm font-medium text-foreground transition-colors hover:bg-muted/60"
                    >
                      {usaLabel}
                    </LocaleLink>
                    <LocaleLink
                      to="/showcase"
                      onClick={() => setUsaOpen(false)}
                      className="block rounded-xl px-4 py-2.5 transition-colors hover:bg-muted/60"
                    >
                      <span className="block font-body text-sm font-medium text-foreground">Showcase Talavera 2027</span>
                      <span className="block font-body text-xs text-muted-foreground">
                        {language === "es" ? "Juega ante entrenadores universitarios" : "Play in front of college coaches"}
                      </span>
                    </LocaleLink>
                  </div>
                </div>
              )}
            </div>

            {/* España */}
            <LocaleLink to="/spain" className={navLinkClass(isActive("/spain"))}>
              {t("nav.spain")}
            </LocaleLink>

            {/* Players */}
            <LocaleLink to="/players" className={navLinkClass(isActive("/players"))}>
              {t("nav.players")}
            </LocaleLink>

            {/* Recursos */}
            <LocaleLink to="/recursos" className={navLinkClass(pathname.startsWith(resolveLegacyPath(language as Locale, "/recursos")))}>
              {t("nav.resources")}
            </LocaleLink>

            {/* Nosotros */}
            <LocaleLink to="/about" className={navLinkClass(isActive("/about"))}>
              {t("nav.about")}
            </LocaleLink>

          </div>

          {/* Language + CTA */}
          <div className="col-start-3 flex items-center justify-self-end gap-3 md:gap-5">
            <LanguageSwitcher dark={dark} />
            <LocaleLink
              to="/apply"
              className="hidden lg:inline-flex bg-primary hover:bg-primary-hover text-white font-body font-semibold px-5 py-2.5 rounded-full transition-colors text-sm"
            >
              {t("nav.applyCta")}
            </LocaleLink>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 ${dark ? "text-white" : "text-foreground"}`}
              aria-label={isOpen ? (language === "es" ? "Cerrar menú" : "Close menu") : language === "es" ? "Abrir menú" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className={`lg:hidden mt-2 rounded-3xl backdrop-blur-lg border ${dark ? "bg-[#0a0a0a]/90 border-white/10" : "bg-background/95 border-border/60 navbar-shadow"}`}>
            <div className="px-4 py-4 flex flex-col gap-1">

              {/* Inicio */}
              <LocaleLink to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/"))}>
                {t("nav.home")}
              </LocaleLink>

              {/* Becas Fútbol EE.UU. */}
              <LocaleLink to="/usa" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/usa"))}>
                {usaLabel}
              </LocaleLink>

              {/* Showcase, inside Becas EE.UU. */}
              <LocaleLink
                to="/showcase"
                onClick={() => setIsOpen(false)}
                className={`${mobileNavLinkClass(isActive("/showcase"))} !py-2 !font-semibold text-[13px]`}
              >
                ↳ Showcase Talavera 2027
              </LocaleLink>

              {/* España */}
              <LocaleLink to="/spain" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/spain"))}>
                {t("nav.spain")}
              </LocaleLink>

              {/* Players */}
              <LocaleLink to="/players" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/players"))}>
                {t("nav.players")}
              </LocaleLink>

              {/* Recursos */}
              <LocaleLink to="/recursos" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(pathname.startsWith(resolveLegacyPath(language as Locale, "/recursos")))}>
                {t("nav.resources")}
              </LocaleLink>

              {/* Nosotros */}
              <LocaleLink to="/about" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/about"))}>
                {t("nav.about")}
              </LocaleLink>

              {/* CTA */}
              <LocaleLink
                to="/apply"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center gap-3 font-body text-sm font-semibold px-4 py-3 rounded-full transition-colors bg-primary hover:bg-primary-hover text-white"
              >
                <GraduationCap className="w-4 h-4" />
                {t("nav.applyCta")}
              </LocaleLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
