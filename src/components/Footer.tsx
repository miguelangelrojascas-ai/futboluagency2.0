import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border py-8 sm:py-12">
      <div className="container-wide section-padding py-0 px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo / Brand */}
          <div className="text-center sm:text-left">
            <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
              Futbol<span className="text-primary">U</span>Agency
            </h3>
          </div>

          {/* Navigation */}
          <nav className="flex items-center justify-center gap-6 sm:gap-8">
            <a
              href="#"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.home")}
            </a>
            <a
              href="#video-section"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.evaluation")}
            </a>
            <a
              href="#"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("footer.contact")}
            </a>
          </nav>

          {/* Copyright */}
          <p className="font-body text-xs sm:text-sm text-muted-foreground text-center sm:text-right">
            FutbolUAgency © {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
