"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const links: { id: string; es: string; en: string }[] = [
  { id: "oportunidad", es: "Oportunidad", en: "Opportunity" },
  { id: "vida-estudiantil", es: "Vida Estudiantil", en: "Student Life" },
  { id: "becas", es: "Becas", en: "Scholarships" },
  { id: "universidades", es: "Universidades", en: "Universities" },
  { id: "admision", es: "Admisión", en: "Admission" },
  { id: "proceso", es: "Proceso", en: "Process" },
  { id: "faq", es: "FAQ", en: "FAQ" },
];

const UsaAnchorNav = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const [activeId, setActiveId] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Highlight whichever section currently sits under the bar.
  useEffect(() => {
    const handleScroll = () => {
      const probe = (barRef.current?.getBoundingClientRect().bottom ?? 0) + window.innerHeight * 0.15;
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
    const el = document.getElementById(id);
    if (!el) return;
    /* Land the section just below the bar, so its heading is never under it. */
    /* Where the bar ends once docked (its sticky top + height), not where it
       is right now: from the top of the page it still sits below the hero. */
    const bar = barRef.current;
    const barBottom = bar ? parseFloat(getComputedStyle(bar).top) + bar.offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - barBottom + 1;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    // A full-width band docked under the navbar, like Apple's product
    // sub-nav. Content scrolls under a solid strip instead of colliding with
    // a floating pill.
    <div
      ref={barRef}
      className="sticky top-16 z-40 border-b border-border md:top-20"
      style={{
        backgroundColor: "hsl(var(--background) / 0.88)",
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
      }}
    >
      <nav
        aria-label={es ? "Secciones de la página" : "Page sections"}
        className="mx-auto w-fit max-w-full overflow-x-auto rounded-full px-4 py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
