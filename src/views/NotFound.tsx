"use client";

import LocaleLink from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { ArrowRight, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const pathname = usePathname();
  const { language } = useLanguage();
  const es = language === "es";


  const links = [
    {
      to: "/usa",
      title: es ? "Becas de fútbol en EE.UU." : "U.S. soccer scholarships",
      desc: es ? "El programa principal: divisiones, proceso y requisitos." : "The main program: divisions, process and requirements.",
    },
    {
      to: "/players",
      title: es ? "Nuestros jugadores" : "Our players",
      desc: es ? "Los futbolistas que ya compiten y estudian en Estados Unidos." : "The players already competing and studying in the United States.",
    },
    {
      to: "/recursos",
      title: es ? "Recursos" : "Resources",
      desc: es ? "Guías sobre becas, elegibilidad, visado y costes." : "Guides on scholarships, eligibility, visa and costs.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        <section className="section-padding relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.07),transparent_60%)]" />
          <div className="container-wide relative px-4">
            <div className="mx-auto max-w-3xl">
              <span className="mb-4 inline-block font-display text-6xl font-bold leading-none text-primary/30 sm:text-7xl">
                404
              </span>
              <h1 className="mb-5 font-display text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                {es ? "Esta página no existe" : "This page does not exist"}
              </h1>
              <p className="mb-2 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                {es
                  ? "O la dirección está mal escrita, o la página se movió. Si llegaste desde un enlace nuestro, avísanos."
                  : "Either the address is mistyped, or the page has moved. If you got here from one of our links, let us know."}
              </p>
              {/* Helps a visitor report the broken link accurately. */}
              <p className="mb-10 font-body text-sm text-muted-foreground/70">
                <code className="rounded bg-muted px-2 py-1">{pathname}</code>
              </p>

              <div className="mb-10 flex flex-col gap-3 sm:flex-row">
                <LocaleLink
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  <Home className="h-4 w-4" />
                  {es ? "Volver al inicio" : "Back to home"}
                </LocaleLink>
                <LocaleLink
                  to="/apply"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 font-body font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-muted"
                >
                  {es ? "Evaluación gratuita" : "Free evaluation"}
                  <ArrowRight className="h-4 w-4" />
                </LocaleLink>
              </div>

              <h2 className="mb-4 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {es ? "Quizá buscabas" : "You may have been looking for"}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <LocaleLink
                      to={link.to}
                      className="group block h-full rounded-xl border border-border p-5 transition-colors hover:border-primary/40"
                      style={{ backgroundColor: "hsl(var(--card))" }}
                    >
                      <span className="mb-1.5 flex items-center gap-2 font-display text-base font-bold text-foreground">
                        {link.title}
                        <ArrowRight className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
                      </span>
                      <span className="font-body text-sm leading-relaxed text-muted-foreground">
                        {link.desc}
                      </span>
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default NotFound;
