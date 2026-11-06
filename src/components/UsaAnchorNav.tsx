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
  const navRef = useRef<HTMLElement>(null);

  // Highlight whichever section currently sits under the bar.
  useEffect(() => {
    const handleScroll = () => {
      const probe = (navRef.current?.getBoundingClientRect().bottom ?? 0) + window.innerHeight * 0.15;
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
    const nav = navRef.current;
    const barBottom = bar && nav ? parseFloat(getComputedStyle(bar).top) + nav.offsetTop + nav.offsetHeight : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - barBottom + 1;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    // A floating pill docked under the navbar, inset from the screen edges
    // to match the navbar's shape.
    <div
      ref={barRef}
      // h-0: the wrapper takes no layout space, so no strip of page background
      // shows between the hero and the next section; the pill overlaps them.
      className="pointer-events-none sticky top-16 z-40 h-0 overflow-visible px-3 sm:px-4 md:top-20"
    >
      <nav
        ref={navRef}
        aria-label={es ? "Secciones de la página" : "Page sections"}
        className="pointer-events-auto container-wide relative top-2 overflow-x-auto rounded-full border border-border/60 navbar-shadow px-2 py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          backgroundColor: "hsl(var(--background) / 0.9)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
        }}
      >
        <ul className="mx-auto flex w-fit items-center gap-1 whitespace-nowrap">
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
