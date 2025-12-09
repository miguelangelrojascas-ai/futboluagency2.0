import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-full shadow-lg hover:bg-card/80 transition-all duration-300 hover:scale-105 group"
      aria-label="Change language"
    >
      <Globe className="w-5 h-5 text-primary" />
      <span className="font-body font-semibold text-sm text-foreground uppercase">
        {language === "es" ? "EN" : "ES"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
