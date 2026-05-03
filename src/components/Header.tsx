import logo from "@/assets/logo-fua.png";

interface HeaderProps {
  onOpenForm: () => void;
}

const Header = ({ onOpenForm }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container-wide flex flex-col items-center py-4">
        <img 
          src={logo} 
          alt="FutbolUAgency LLC." 
          className="h-14 md:h-16 w-auto mb-3"
        />
        
        <button
          onClick={onOpenForm}
          className="bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          Evaluación Gratuita
        </button>
      </div>
    </header>
  );
};

export default Header;
