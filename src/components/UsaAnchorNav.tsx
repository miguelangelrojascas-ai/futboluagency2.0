import { useEffect, useState } from "react";
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
  const [activeId, setActiveId] = useState<string | null>(null);

  // Highlight whichever section currently sits under the bar.
  useEffect(() => {
    const handleScroll = () => {
      const probe = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= probe) current = link.id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    // Transparent rail so the pill floats clear of the navbar instead of
    // reading as a second toolbar glued to it.
    <div className="pointer-events-none sticky top-[4.5rem] z-40 px-4 py-3 md:top-[5.5rem] md:px-8">
      <nav
        aria-label={es ? "Secciones de la página" : "Page sections"}
        className="pointer-events-auto mx-auto w-fit max-w-full overflow-x-auto rounded-full border border-border p-1.5 shadow-card [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          backgroundColor: "hsl(var(--card) / 0.9)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
        }}
      >
        <ul className="flex items-center gap-1 whitespace-nowrap">
          {links.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={scrollToSection(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`block rounded-full px-3.5 py-2 font-body text-[13px] font-semibold transition-colors duration-200 sm:px-4 ${
                    isActive
                      ? "bg-secondary text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {es ? link.es : link.en}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default UsaAnchorNav;
