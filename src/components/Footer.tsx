import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-new.png";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-wide section-padding py-12 sm:py-16 px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <img 
              src={logo} 
              alt="FutbolUAgency" 
              className="h-16 sm:h-20 w-auto mx-auto md:mx-0 mb-4"
            />
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              FutbolUAgency
            </h3>
            <p className="font-body text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
              Ayudamos a futbolistas internacionales a conseguir becas deportivas en universidades de Estados Unidos.
            </p>
          </div>

          {/* Contact Column */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-base font-semibold text-foreground mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:futboluagency@gmail.com" 
                className="flex items-center justify-center md:justify-start gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                futboluagency@gmail.com
              </a>
              <a 
                href="tel:+18327411634" 
                className="flex items-center justify-center md:justify-start gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (832) 741-1634
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2 font-body text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Houston, Texas, USA
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-base font-semibold text-foreground mb-4">
              Legal
            </h4>
            <nav className="space-y-3">
              <a
                href="#"
                className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Términos y Condiciones
              </a>
              <a
                href="#"
                className="block font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Cookies
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="font-body text-xs text-muted-foreground">
              © {currentYear} FutbolUAgency. {t("footer.rights")}.
            </p>
            <p className="font-body text-xs text-muted-foreground">
              Diseñado con pasión por el fútbol y la educación.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
