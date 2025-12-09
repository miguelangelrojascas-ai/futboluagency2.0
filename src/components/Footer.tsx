const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container-wide section-padding py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-display text-xl font-bold text-foreground">
              Futbol<span className="text-primary">U</span>Agency
            </h3>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <a
              href="#"
              className="font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Inicio
            </a>
            <a
              href="#video-section"
              className="font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Evaluación
            </a>
            <a
              href="#"
              className="font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Contacto
            </a>
          </nav>

          {/* Copyright */}
          <p className="font-body text-sm text-muted-foreground text-center md:text-right">
            FutbolUAgency © Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
