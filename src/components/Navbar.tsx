"use client";

import { useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { resolveLegacyPath, type Locale } from "@/lib/routes";
import logoAsset from "@/assets/logo-fua.png";

/* Next resolves an image import to an object; the components want the URL. */
const logo = logoAsset.src;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();

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
        <div className="container-wide flex items-center justify-between px-4 sm:px-6 h-16 md:h-20">

          {/* Logo */}
          <LocaleLink to="/" className="flex-shrink-0">
            <img src={logo} alt="FutbolUAgency LLC." className="h-10 md:h-14 w-auto" />
          </LocaleLink>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">

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

            {/* Recursos */}
            <LocaleLink to="/recursos" className={navLinkClass(pathname.startsWith(resolveLegacyPath(language as Locale, "/recursos")))}>
              {t("nav.resources")}
            </LocaleLink>

            {/* Nosotros */}
            <LocaleLink to="/about" className={navLinkClass(isActive("/about"))}>
              {t("nav.about")}
            </LocaleLink>

            {/* CTA */}
            <LocaleLink
              to="/apply"
              className="ml-2 bg-primary hover:bg-primary-hover text-white font-body font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              {t("nav.applyCta")}
            </LocaleLink>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
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
