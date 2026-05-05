import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, Trophy, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-fua.png";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showApplyMenu, setShowApplyMenu] = useState(false);
  const [showSportsMenu, setShowSportsMenu] = useState(false);
  const applyMenuRef = useRef<HTMLDivElement>(null);
  const sportsMenuRef = useRef<HTMLDivElement>(null);
  const sportsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { language, t } = useLanguage();
  const es = language === "es";
  const { isOpen: hubspotOpen, openForm, setIsOpen: setHubspotOpen } = useHubSpotForm();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/usa", label: t("nav.usa") },
    { to: "/spain", label: t("nav.spain") },
    { to: "/about", label: t("nav.about") },
  ];

  const sports = [
    { to: "/sports/tennis", label: es ? "Tenis" : "Tennis" },
    { to: "/sports/golf", label: "Golf" },
    { to: "/sports/track", label: es ? "Atletismo" : "Track & Field" },
    { to: "/sports/volleyball", label: es ? "Voleibol" : "Volleyball" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isSportsActive = location.pathname.startsWith("/sports");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (applyMenuRef.current && !applyMenuRef.current.contains(e.target as Node)) {
        setShowApplyMenu(false);
      }
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg navbar-shadow">
        <div className="container-wide flex items-center justify-between px-4 sm:px-6 h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="FutbolUAgency LLC." className="h-10 md:h-14 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.to)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* FUA Sports dropdown */}
            <div
              className="relative"
              ref={sportsMenuRef}
              onMouseEnter={openSports}
              onMouseLeave={scheduleCloseSports}
            >
              <Link
                to="/sports"
                onClick={() => setShowSportsMenu(false)}
                className={`font-body text-sm font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1 ${
                  isSportsActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                FUA Sports
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${showSportsMenu ? "rotate-180" : ""}`}
                />
              </Link>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-52 transition-all duration-200 origin-top ${
                  showSportsMenu
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="bg-white border border-border rounded-xl shadow-xl overflow-hidden">
                  {sports.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      onClick={() => setShowSportsMenu(false)}
                      className="block px-4 py-3 font-body text-sm text-foreground hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="https://calendly.com/futbolu-agency"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              {t("nav.applyCta")}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
            <div className="container-wide px-4 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`font-body text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.to)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile FUA Sports + sublinks */}
              <Link
                to="/sports"
                onClick={() => setIsOpen(false)}
                className={`font-body text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                  isSportsActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                FUA Sports
              </Link>
              <div className="pl-4 flex flex-col gap-1">
                {sports.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={() => setIsOpen(false)}
                    className="font-body text-sm px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>

              <button
                onClick={() => { setIsOpen(false); openForm(); }}
                className="mt-2 flex items-center gap-3 font-body text-sm font-semibold px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-muted/50"
              >
                <GraduationCap className="w-4 h-4 text-blue-500" />
                Aplicar — USA
              </button>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScXOeAxT7cjKKWiEql7DgAqDNdYJGLzASHtO_b_dLnYOKdcVA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 font-body text-sm font-semibold px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-muted/50"
              >
                <Trophy className="w-4 h-4 text-primary" />
                Aplicar — España
              </a>
            </div>
          </div>
        )}
      </nav>
      <HubSpotFormModal open={hubspotOpen} onOpenChange={setHubspotOpen} />
    </>
  );
};

export default Navbar;
