import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-fua.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/usa", label: t("nav.usa") },
    { to: "/spain", label: t("nav.spain") },
    { to: "/players", label: t("nav.players") },
    { to: "/apply", label: t("nav.apply") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
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
          <Link
            to="/apply"
            className="ml-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
          >
            {t("nav.applyCta")}
          </Link>
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
            <Link
              to="/apply"
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-5 py-3 rounded-lg transition-colors text-sm text-center"
            >
              {t("nav.applyCta")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
