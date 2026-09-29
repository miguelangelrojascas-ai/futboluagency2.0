import { useLanguage } from "@/contexts/LanguageContext";

const links: { id: string; es: string; en: string }[] = [
  { id: "oportunidad", es: "Oportunidad", en: "Opportunity" },
  { id: "vida-estudiantil", es: "Vida Estudiantil", en: "Student Life" },
  { id: "becas", es: "Becas", en: "Scholarships" },
  { id: "universidades", es: "Universidades", en: "Universities" },
  { id: "admision", es: "Admisión", en: "Admission" },
  { id: "perfiles", es: "Perfiles", en: "Profiles" },
  { id: "proceso", es: "Proceso", en: "Process" },
  { id: "faq", es: "FAQ", en: "FAQ" },
];

const UsaAnchorNav = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-border overflow-x-auto">
      <div className="container-wide px-4 flex gap-6 whitespace-nowrap">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={scrollToSection(link.id)}
            className="font-body text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary py-3 transition-colors"
          >
            {es ? link.es : link.en}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default UsaAnchorNav;
