import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-fua.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

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
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="FutbolUAgency LLC." className="h-10 md:h-14 w-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">

            {/* Inicio */}
            <Link to="/" className={navLinkClass(isActive("/"))}>
              {t("nav.home")}
            </Link>

            {/* Becas Fútbol EE.UU. — direct link, no dropdown */}
            <Link to="/usa" className={navLinkClass(isActive("/usa"))}>
              Becas Fútbol EE.UU.
            </Link>

            {/* España */}
            <Link to="/spain" className={navLinkClass(isActive("/spain"))}>
              {t("nav.spain")}
            </Link>

            {/* Players */}
            <Link to="/players" className={navLinkClass(isActive("/players"))}>
              {t("nav.players")}
            </Link>

            {/* Recursos */}
            <Link to="/recursos" className={navLinkClass(location.pathname.startsWith("/recursos"))}>
              {t("nav.resources")}
            </Link>

            {/* Nosotros */}
            <Link to="/about" className={navLinkClass(isActive("/about"))}>
              {t("nav.about")}
            </Link>

            {/* CTA */}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                (window as any).Calendly?.initPopupWidget({ url: "https://calendly.com/miguelangelrojascas/new-meeting" });
              }}
              className="ml-2 bg-primary hover:bg-primary-hover text-white font-body font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              {t("nav.applyCta")}
            </a>
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
              <Link to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/"))}>
                {t("nav.home")}
              </Link>

              {/* Becas Fútbol EE.UU. */}
              <Link to="/usa" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/usa"))}>
                Becas Fútbol EE.UU.
              </Link>

              {/* España */}
              <Link to="/spain" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/spain"))}>
                {t("nav.spain")}
              </Link>

              {/* Players */}
              <Link to="/players" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/players"))}>
                {t("nav.players")}
              </Link>

              {/* Recursos */}
              <Link to="/recursos" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(location.pathname.startsWith("/recursos"))}>
                {t("nav.resources")}
              </Link>

              {/* Nosotros */}
              <Link to="/about" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/about"))}>
                {t("nav.about")}
              </Link>

              {/* CTA */}
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  (window as any).Calendly?.initPopupWidget({ url: "https://calendly.com/miguelangelrojascas/new-meeting" });
                }}
                className="mt-2 flex items-center gap-3 font-body text-sm font-semibold px-4 py-3 rounded-lg transition-colors bg-primary hover:bg-primary-hover text-white"
              >
                <GraduationCap className="w-4 h-4" />
                {t("nav.applyCta")}
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
