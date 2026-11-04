"use client";

import { useEffect, useRef, useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ChevronDown, ArrowRight } from "lucide-react";
import { useGuideIndex } from "@/contexts/GuideIndexContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { resolveLegacyPath, type Locale } from "@/lib/routes";
import logoAsset from "@/assets/logo-fua.png";

/* Next resolves an image import to an object; the components want the URL. */
const logo = logoAsset.src;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const guideIndex = useGuideIndex();
  const es = language === "es";

  /* Resources mega-menu. Opens on hover or keyboard focus; a short delay on
     close lets the pointer travel from the link down into the panel. */
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const openResources = () => {
    clearTimeout(closeTimer.current);
    setResourcesOpen(true);
  };
  const closeResources = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setResourcesOpen(false), 140);
  };
  useEffect(() => {
    setResourcesOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!resourcesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setResourcesOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resourcesOpen]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const isActive = (path: string) =>
    pathname === resolveLegacyPath(language as Locale, path);

  const navLinkClass = (active: boolean) =>
    `font-body text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
      active
        ? "text-primary bg-primary/10"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  const mobileNavLinkClass = (active: boolean) =>
    `font-body text-sm font-bold text-center px-4 py-3 rounded-lg transition-colors ${
      active
        ? "text-primary bg-primary/10"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg navbar-shadow">
        <div className="container-wide grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 h-16 md:h-20">

          {/* Logo */}
          <LocaleLink to="/" className="flex-shrink-0 justify-self-start">
            <img src={logo} alt="FutbolUAgency LLC." className="h-10 md:h-14 w-auto" />
          </LocaleLink>

          {/* Desktop nav — centrado en la columna del medio */}
          <div className="hidden md:flex items-center justify-center gap-1">

            {/* Inicio */}
            <LocaleLink to="/" className={navLinkClass(isActive("/"))}>
              {t("nav.home")}
            </LocaleLink>

            {/* Becas Fútbol EE.UU. — direct link, no dropdown */}
            <LocaleLink to="/usa" className={navLinkClass(isActive("/usa"))}>
              Becas Fútbol EE.UU.
            </LocaleLink>

            {/* Players */}
            <LocaleLink to="/players" className={navLinkClass(isActive("/players"))}>
              {t("nav.players")}
            </LocaleLink>

            {/* Recursos — opens the guides panel on hover */}
            <div
              onMouseEnter={openResources}
              onMouseLeave={closeResources}
              onFocus={openResources}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) closeResources();
              }}
            >
              <LocaleLink
                to="/recursos"
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                className={`inline-flex items-center gap-1 ${navLinkClass(
                  pathname.startsWith(resolveLegacyPath(language as Locale, "/recursos")),
                )}`}
              >
                {t("nav.resources")}
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform duration-200"
                  style={{ transform: resourcesOpen ? "rotate(180deg)" : "none" }}
                />
              </LocaleLink>

              {/* Panel: full width under the bar, slides down by unclipping. */}
              <div
                className="absolute left-0 right-0 top-full motion-reduce:transition-none"
                style={{
                  clipPath: resourcesOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                  visibility: resourcesOpen ? "visible" : "hidden",
                  transition: resourcesOpen
                    ? "clip-path 320ms cubic-bezier(0.23,1,0.32,1), visibility 0s"
                    : "clip-path 200ms ease-in, visibility 0s 200ms",
                }}
              >
                <div className="border-t border-border bg-background shadow-[0_24px_48px_-12px_rgba(18,33,58,0.18)]">
                  <div
                    className="container-wide px-4 py-8 sm:px-6 motion-reduce:transition-none"
                    style={{
                      opacity: resourcesOpen ? 1 : 0,
                      transform: resourcesOpen ? "translateY(0)" : "translateY(-10px)",
                      transition: "opacity 260ms ease-out, transform 320ms cubic-bezier(0.23,1,0.32,1)",
                    }}
                  >
                    <div className="grid grid-cols-3 gap-x-10 gap-y-8">
                      {guideIndex.map((guide) => {
                        const shown = guide.sections.slice(0, 4);
                        const more = guide.sections.length - shown.length;
                        return (
                          <div key={guide.slug}>
                            <LocaleLink
                              to={`/recursos/${guide.slug}`}
                              className="group/guide mb-3 flex items-baseline gap-3"
                            >
                              <span className="font-display text-sm font-bold text-primary">{guide.number}</span>
                              <span className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover/guide:text-primary">
                                {guide.title[language as Locale]}
                              </span>
                            </LocaleLink>
                            <ul className="space-y-1.5 border-l border-border pl-[2.15rem]">
                              {shown.map((section) => (
                                <li key={section.id}>
                                  <LocaleLink
                                    to={`/recursos/${guide.slug}#${section.id}`}
                                    className="block font-body text-[13px] leading-snug text-muted-foreground transition-colors hover:text-foreground"
                                  >
                                    {section.title[language as Locale]}
                                  </LocaleLink>
                                </li>
                              ))}
                              {more > 0 && (
                                <li>
                                  <LocaleLink
                                    to={`/recursos/${guide.slug}`}
                                    className="font-body text-[13px] font-semibold text-primary hover:text-primary-hover"
                                  >
                                    {es ? `+${more} más` : `+${more} more`}
                                  </LocaleLink>
                                </li>
                              )}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                      <p className="font-body text-sm text-muted-foreground">
                        {es
                          ? "Todo lo que necesitas saber antes de empezar, explicado paso a paso."
                          : "Everything you need to know before you start, step by step."}
                      </p>
                      <LocaleLink
                        to="/recursos"
                        className="inline-flex items-center gap-2 font-body text-sm font-bold text-primary hover:text-primary-hover"
                      >
                        {es ? "Ver todos los recursos" : "See all resources"}
                        <ArrowRight className="h-4 w-4" />
                      </LocaleLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nosotros */}
            <LocaleLink to="/about" className={navLinkClass(isActive("/about"))}>
              {t("nav.about")}
            </LocaleLink>

          </div>

          {/* CTA */}
          <LocaleLink
            to="/apply"
            className="hidden md:inline-flex justify-self-end bg-primary hover:bg-primary-hover text-white font-body font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
          >
            {t("nav.applyCta")}
          </LocaleLink>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden col-start-3 justify-self-end p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
            <div className="container-wide px-4 py-4 flex flex-col gap-1">

              {/* Inicio */}
              <LocaleLink to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/"))}>
                {t("nav.home")}
              </LocaleLink>

              {/* Becas Fútbol EE.UU. */}
              <LocaleLink to="/usa" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/usa"))}>
                Becas Fútbol EE.UU.
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
                className="mt-2 flex items-center gap-3 font-body text-sm font-semibold px-4 py-3 rounded-lg transition-colors bg-primary hover:bg-primary-hover text-white"
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
