import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, GraduationCap, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-fua.png";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showApplyMenu, setShowApplyMenu] = useState(false);
  const applyMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { t } = useLanguage();
  const { isOpen: hubspotOpen, openForm, setIsOpen: setHubspotOpen } = useHubSpotForm();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/usa", label: t("nav.usa") },
    { to: "/spain", label: t("nav.spain") },
    { to: "/about", label: t("nav.about") },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (applyMenuRef.current && !applyMenuRef.current.contains(e.target as Node)) {
        setShowApplyMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="container-wide flex items-center justify-between px-4 sm:px-6 h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="FutbolUAgency" className="h-10 md:h-14 w-auto" />
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
            <div className="relative ml-2" ref={applyMenuRef}>
              <button
                onClick={() => setShowApplyMenu(!showApplyMenu)}
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                {t("nav.applyCta")}
              </button>
              {showApplyMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#ffffff] border border-border rounded-xl shadow-xl overflow-hidden z-50">
                  <button
                    onClick={() => { setShowApplyMenu(false); openForm(); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left font-body text-sm text-foreground hover:bg-muted/50 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-blue-500" />
                    Programa USA
                  </button>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScXOeAxT7cjKKWiEql7DgAqDNdYJGLzASHtO_b_dLnYOKdcVA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowApplyMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left font-body text-sm text-foreground hover:bg-muted/50 transition-colors border-t border-border"
                  >
                    <Trophy className="w-4 h-4 text-primary" />
                    Programa España
                  </a>
                </div>
              )}
            </div>
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
