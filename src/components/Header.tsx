import logo from "@/assets/logo.png";

const Header = () => {
  const scrollToVideo = () => {
    document.getElementById("video-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-wide flex items-center justify-between py-4">
        <img 
          src={logo} 
          alt="FutbolUAgency" 
          className="h-12 md:h-14 w-auto"
        />
        
        <button
          onClick={scrollToVideo}
          className="bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          Evaluación Gratuita
        </button>
      </div>
    </header>
  );
};

export default Header;
