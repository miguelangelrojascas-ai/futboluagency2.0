import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-fua.png";
import HubSpotFormModal from "@/components/HubSpotFormModal";
import { useHubSpotForm } from "@/hooks/useHubSpotForm";

const Navbar = () => {
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-border">
        <div className="flex items-center px-3 sm:px-6 h-14 md:h-20 gap-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="FutbolUAgency" className="h-8 md:h-14 w-auto" />
          </Link>

          {/* Nav links — always visible, horizontal scroll on mobile */}
          <div className="flex-1 overflow-x-auto scrollbar-hide min-w-0">
            <div className="flex items-center gap-0.5 md:gap-1 whitespace-nowrap md:justify-center">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body font-medium px-3 py-2 rounded-lg transition-colors flex-shrink-0
                    text-xs md:text-sm
                    ${isActive(link.to)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Apply button */}
          <div className="relative flex-shrink-0" ref={applyMenuRef}>
            <button
              onClick={() => setShowApplyMenu(!showApplyMenu)}
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold rounded-lg transition-colors
                text-[11px] px-3 py-1.5
                md:text-sm md:px-5 md:py-2.5"
            >
              {t("nav.applyCta")}
            </button>
            {showApplyMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a] border border-border rounded-xl shadow-xl overflow-hidden z-50">
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
      </nav>
      <HubSpotFormModal open={hubspotOpen} onOpenChange={setHubspotOpen} />
    </>
  );
};

export default Navbar;
