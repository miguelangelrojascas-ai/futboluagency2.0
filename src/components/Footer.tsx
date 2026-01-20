import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-fua.png";

// Social media icons as inline SVGs since lucide doesn't have TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: "TikTok", 
      href: "https://www.tiktok.com/@futboluagency", 
      icon: TikTokIcon 
    },
    { 
      name: "Instagram", 
      href: "https://www.instagram.com/futboluagency", 
      icon: InstagramIcon 
    },
    { 
      name: "YouTube", 
      href: "https://youtube.com/@futboluagency", 
      icon: YouTubeIcon 
    },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container-wide section-padding py-12 sm:py-16 px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-10">
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
                href="tel:+34603331990" 
                className="flex items-center justify-center md:justify-start gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +34 603 331 990
              </a>
              <div className="flex items-center justify-center md:justify-start gap-2 font-body text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Houston, Texas, USA
              </div>
            </div>
          </div>

          {/* Social Column */}
          <div className="text-center md:text-left">
            <h4 className="font-display text-base font-semibold text-foreground mb-4">
              Síguenos
            </h4>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
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
