"use client";

import type { LucideIcon } from "lucide-react";
import { Handshake, ScanSearch, ShieldCheck, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick, type Copy } from "@/lib/i18n";

type Pillar = { icon: LucideIcon; title: Copy; body: Copy };

/* Copy carries its own Italian and German, so it reads right without the dictionaries. */
const LABEL: Copy = {
  es: "Por qué FUA · Representación de élite",
  en: "Why FUA · Elite representation",
  it: "Perché FUA · Rappresentanza d'élite",
  de: "Warum FUA · Spitzenvertretung",
};
const HEAD: Copy<[string, string]> = {
  es: ["Un agente.", "Todo el camino."],
  en: ["One agent.", "All the way."],
  it: ["Un agente.", "Tutto il percorso."],
  de: ["Ein Agent.", "Den ganzen Weg."],
};
const LEDE: Copy = {
  es: "Creada por exfutbolistas que ya recorrieron este camino. Eliminamos la incertidumbre del proceso con un modelo basado en resultados reales y trato personal.",
  en: "Built by former players who have walked this road themselves. We take the uncertainty out of the process with a model built on real results and personal care.",
  it: "Nata da ex calciatori che questo percorso l'hanno già fatto. Togliamo l'incertezza dal processo con un modello basato su risultati reali e un rapporto personale.",
  de: "Gegründet von ehemaligen Fußballern, die diesen Weg selbst gegangen sind. Wir nehmen dem Prozess die Unsicherheit – mit einem Modell aus echten Ergebnissen und persönlicher Betreuung.",
};

const PILLARS: Pillar[] = [
  {
    icon: Handshake,
    title: { es: "Trabajo directo", en: "Direct work", it: "Lavoro diretto", de: "Direkte Arbeit" },
    body: {
      es: "Negociamos personalmente tu beca con entrenadores de EE.UU. y clubes en España, sin intermediarios ni plataformas automáticas.",
      en: "We negotiate your scholarship in person with U.S. coaches and clubs in Spain, with no middlemen and no automated platforms.",
      it: "Negoziamo personalmente la tua borsa di studio con gli allenatori negli USA e con i club in Spagna, senza intermediari né piattaforme automatiche.",
      de: "Wir verhandeln dein Stipendium persönlich mit Trainern in den USA und Vereinen in Spanien – ohne Zwischenhändler und ohne automatische Plattformen.",
    },
  },
  {
    icon: ScanSearch,
    title: { es: "Transparencia real", en: "Real transparency", it: "Trasparenza reale", de: "Echte Transparenz" },
    body: {
      es: "Analizamos tu nivel deportivo y académico con honestidad desde el día uno, sin falsas promesas.",
      en: "We assess your athletic and academic level honestly from day one, with no false promises.",
      it: "Valutiamo il tuo livello sportivo e accademico con onestà fin dal primo giorno, senza false promesse.",
      de: "Wir bewerten dein sportliches und schulisches Niveau vom ersten Tag an ehrlich – ohne falsche Versprechen.",
    },
  },
  {
    icon: ShieldCheck,
    title: { es: "Acompañamiento total", en: "Support all the way", it: "Accompagnamento totale", de: "Rundum-Begleitung" },
    body: {
      es: "Te guiamos desde la primera evaluación hasta tu graduación universitaria, incluida la gestión de transfers.",
      en: "We guide you from your first evaluation to your college graduation, transfers included.",
      it: "Ti seguiamo dalla prima valutazione fino alla laurea, compresa la gestione dei transfer.",
      de: "Wir begleiten dich von der ersten Bewertung bis zum Uni-Abschluss, inklusive Transfers.",
    },
  },
  {
    icon: TrendingUp,
    title: { es: "Resultados comprobados", en: "Proven results", it: "Risultati comprovati", de: "Bewiesene Ergebnisse" },
    body: {
      es: "Un sistema validado por más de 350 atletas que compiten en la NCAA, la NAIA, la NJCAA y el fútbol español.",
      en: "A system proven by more than 350 athletes competing in the NCAA, NAIA, NJCAA and Spanish football.",
      it: "Un sistema convalidato da oltre 350 atleti che giocano in NCAA, NAIA, NJCAA e nel calcio spagnolo.",
      de: "Ein System, bestätigt von über 350 Athleten in der NCAA, NAIA, NJCAA und im spanischen Fußball.",
    },
  },
];

/**
 * Why FUA: who is behind the agency and the four things a family can hold us
 * to. On black, after the visitor has seen the promise and the two paths.
 */
const HomeWhyUs = () => {
  const { language } = useLanguage();
  const [lineA, lineB] = pick(language, HEAD);

  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32" aria-labelledby="why-title">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(40% 55% at 8% 100%, hsl(354 86% 45% / 0.28), transparent 70%)" }}
      />
      <div className="container-wide grid gap-14 px-4 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <p className="label-bebas text-base text-white/55">{pick(language, LABEL)}</p>
          <h2 id="why-title" className="mt-5 leading-[0.9] text-white text-[clamp(3.25rem,11vw,6.75rem)]">
            {lineA}
            <span className="block pr-[0.08em] italic text-red-bright">{lineB}</span>
          </h2>
          <p className="mt-8 max-w-[46ch] font-body text-lg leading-relaxed text-white/75">{pick(language, LEDE)}</p>
        </div>

        <ol className="border-t border-white/12 lg:col-span-6 lg:col-start-7">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <li
              key={i}
              className="group relative grid grid-cols-[3.25rem_1fr] gap-5 border-b border-white/12 py-8 sm:grid-cols-[4rem_1fr] sm:gap-7 sm:py-10"
            >
              {/* Red rule that runs in along the top on hover. */}
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-0 bg-red-bright transition-[width] duration-500 ease-out group-hover:w-full"
              />
              <span className="flex h-[3.25rem] w-[3.25rem] self-start items-center justify-center rounded-2xl border border-white/15 text-white/80 transition-colors duration-300 group-hover:border-red-bright group-hover:bg-red-bright group-hover:text-white sm:h-16 sm:w-16">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <p className="font-bebas text-lg tracking-[0.12em] text-white/40">0{i + 1}</p>
                <h3 className="mt-1 font-druk text-3xl uppercase leading-none text-white sm:text-4xl">{pick(language, title)}</h3>
                <p className="mt-3 max-w-[52ch] font-body text-base leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/85">
                  {pick(language, body)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HomeWhyUs;
