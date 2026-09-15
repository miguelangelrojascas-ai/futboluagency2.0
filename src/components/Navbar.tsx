import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-fua.png";

const fuaDropdown = [
  { to: "/sports/volleyball", label: "Volleyball" },
  { to: "/sports/golf",       label: "Golf" },
  { to: "/sports/tennis",     label: "Tenis" },
  { to: "/sports/track",      label: "Track & Field" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSportsMenu, setShowSportsMenu] = useState(false);
  const [showMobileSports, setShowMobileSports] = useState(false);
  const sportsMenuRef = useRef<HTMLDivElement>(null);
  const sportsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;
  const isSportsActive = location.pathname.startsWith("/sports/");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sportsMenuRef.current && !sportsMenuRef.current.contains(e.target as Node)) {
        setShowSportsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openSports = () => {
    if (sportsCloseTimer.current) clearTimeout(sportsCloseTimer.current);
    setShowSportsMenu(true);
  };
  const scheduleCloseSports = () => {
    if (sportsCloseTimer.current) clearTimeout(sportsCloseTimer.current);
    sportsCloseTimer.current = setTimeout(() => setShowSportsMenu(false), 150);
  };

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

            {/* FUA Sports dropdown (hover) */}
            <div
              className="relative"
              ref={sportsMenuRef}
              onMouseEnter={openSports}
              onMouseLeave={scheduleCloseSports}
            >
              <Link
                to="/sports"
                onClick={() => setShowSportsMenu(false)}
                className={`${navLinkClass(isSportsActive)} inline-flex items-center gap-1`}
              >
                FUA Sports
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${showSportsMenu ? "rotate-180" : ""}`}
                />
              </Link>

              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-52 origin-top ${
                  showSportsMenu
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              style={{ transition: "opacity 150ms ease-out, transform 150ms cubic-bezier(0.23,1,0.32,1)" }}
              >
                <div
                  style={{
                    background: "white",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(18,33,58,0.1)",
                    overflow: "hidden",
                  }}
                >
                  {fuaDropdown.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      onClick={() => setShowSportsMenu(false)}
                      className="block transition-colors hover:bg-[#f5f4f2]"
                      style={{
                        padding: "10px 16px",
                        fontSize: "14px",
                        color: isActive(s.to) ? "#b00717" : "#12213a",
                        fontWeight: isActive(s.to) ? 600 : 400,
                      }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* España */}
            <Link to="/spain" className={navLinkClass(isActive("/spain"))}>
              {t("nav.spain")}
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
              className="ml-2 bg-[#b00717] hover:bg-[#900612] text-white font-body font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
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

              {/* FUA Sports dropdown (click) */}
              <button
                onClick={() => setShowMobileSports(!showMobileSports)}
                className={`${mobileNavLinkClass(isSportsActive)} inline-flex items-center justify-center w-full gap-1`}
              >
                FUA Sports
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${showMobileSports ? "rotate-180" : ""}`}
                />
              </button>
              {showMobileSports && (
                <div className="flex flex-col gap-0.5">
                  {fuaDropdown.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      onClick={() => { setIsOpen(false); setShowMobileSports(false); }}
                      className="block px-4 py-2 rounded-lg font-body text-sm font-bold text-center transition-colors hover:bg-muted/50"
                      style={{ color: isActive(s.to) ? "#b00717" : undefined }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* España */}
              <Link to="/spain" onClick={() => setIsOpen(false)} className={mobileNavLinkClass(isActive("/spain"))}>
                {t("nav.spain")}
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
                className="mt-2 flex items-center gap-3 font-body text-sm font-semibold px-4 py-3 rounded-lg transition-colors bg-[#b00717] hover:bg-[#900612] text-white"
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
