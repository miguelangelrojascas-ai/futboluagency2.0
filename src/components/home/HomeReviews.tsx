"use client";

import { ArrowUpRight, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pick, type Copy } from "@/lib/i18n";

/*
 * Real Google reviews of FutbolUAgency, quoted as written (original language,
 * original spelling). Reviewers are shown by first name and initial only.
 * Source: the agency's Google Business Profile, 5.0 from 100 reviews (Nov 2026).
 */
type Review = { name: string; text: string };

const REVIEWS: Review[] = [
  { name: "Andrea R.", text: "Honestos, con empatia y amabilidad. El staff realmente nos ayudó con las necesidades de mi hijo para seguir jugando fútbol en la universidad. Muy contenta y recomendio esta gran agencia." },
  { name: "Jeremy R.", text: "I worked with the them and they found me a better University with a better scholarship and better soccer program! Would totally recommend!" },
  { name: "Hugo F.", text: "Trabajar con esta agencia hace que el proceso de cambio de universidad sea mucho más fácil, les estoy muy agradecido." },
  { name: "Emmanuel N.", text: "Ignacio is a high level footballing mentor. With an even higher knowledge of the game. If you’re looking to play at the next level, this is the agency for you!" },
  { name: "Juan G.", text: "Me ayudaron muchísimo durante todo el proceso y siempre estuvieron pendientes de todo. Se nota que son muy buenos en lo que hacen y que tienen mucha experiencia. ¡Muy recomendables!" },
  { name: "Luca D.", text: "This agency was really professional and they know what they are doing. Helped guide me through the process and answered any questions I had. Thank you again" },
  { name: "Lola N.", text: "La mejor agencia hasta la fecha para poder comenzar tus estudios en Estados Unidos. Trato inmejorable y profesionales súper cualificados!!" },
  { name: "Christian N.", text: "Top agency, exceptionally reliable and trustworthy throughout college student athlete recruiting process." },
  { name: "José Emilio C.", text: "Muy buena Agencia y representantes, son muy atentos a cualquiera cosa y te ayudan en todo, y sobre todo lo más importante que te consiguen muy buenas universidades y muy buenas becas con varias opciones" },
  { name: "Javier L.", text: "Aconsejo está agencia, han tratado muy bien a mis hijos, totalmente recomendable." },
  { name: "Marcos A.", text: "Lo recomiendo 100% para deportistas jóvenes que estén buscando una oportunidad, el trato muy humano y cercano. Agradecido 100% con el equipo" },
  { name: "TheFlaco 08", text: "Excelente agencia, en mi experiencia con ellos me ayudaron a conseguir exactamente lo que estaba buscando y me acompañaron durante mi proceso al 100%" },
];

const ROWS = [REVIEWS.slice(0, 6), REVIEWS.slice(6)];
const GOOGLE_URL = "https://www.google.com/maps/search/?api=1&query=FutbolUAgency";

const LABEL: Copy = { es: "Reseñas de Google", en: "Google reviews", it: "Recensioni Google", de: "Google-Bewertungen" };
const HEAD: Copy<[string, string]> = {
  es: ["Lo que dicen", "jugadores y familias"],
  en: ["What players", "and families say"],
  it: ["Cosa dicono", "giocatori e famiglie"],
  de: ["Was Spieler", "und Familien sagen"],
};
const COUNT: Copy = { es: "100 reseñas en Google", en: "100 reviews on Google", it: "100 recensioni su Google", de: "100 Bewertungen auf Google" };
const SEE_ALL: Copy = { es: "Ver todas en Google", en: "See them all on Google", it: "Vedile tutte su Google", de: "Alle auf Google ansehen" };
const ORIGINAL: Copy = {
  es: "Reseñas reales, en su idioma original.",
  en: "Real reviews, in their original language.",
  it: "Recensioni reali, nella lingua originale.",
  de: "Echte Bewertungen in der Originalsprache.",
};

const Stars = ({ className = "h-4 w-4" }: { className?: string }) => (
  <span className="flex gap-0.5 text-[#f5b301]" aria-hidden="true">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`${className} fill-current`} strokeWidth={0} />
    ))}
  </span>
);

const Card = ({ review }: { review: Review }) => (
  <figure className="flex w-[19rem] shrink-0 flex-col rounded-[1.5rem] bg-[#f3f1ec] p-6 sm:w-[23rem] sm:p-7">
    <Stars />
    <blockquote className="mt-4 flex-1 font-body text-[15px] leading-relaxed text-ink/80">“{review.text}”</blockquote>
    <figcaption className="mt-6 flex items-center gap-3">
      <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-bebas text-lg text-white">
        {review.name[0]}
      </span>
      <span className="font-body text-sm font-semibold text-ink">{review.name}</span>
      <span className="ml-auto font-body text-xs text-ink/45">Google</span>
    </figcaption>
  </figure>
);

/**
 * Social proof before the FAQ: the Google rating and a slow double marquee of
 * real reviews. The rows stop on hover, and stand still (scrollable instead)
 * when the visitor prefers reduced motion.
 */
const HomeReviews = () => {
  const { language } = useLanguage();
  const [lineA, lineB] = pick(language, HEAD);

  return (
    <section className="overflow-hidden bg-background pb-24 sm:pb-32" aria-labelledby="reviews-title">
      <div className="container-wide px-4">
        <div className="flex flex-col gap-10 border-t border-ink/10 pt-20 sm:pt-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label-bebas text-base text-primary">{pick(language, LABEL)}</p>
            <h2 id="reviews-title" className="mt-4 leading-[0.9] text-ink text-[clamp(3rem,8vw,6rem)]">
              {lineA}
              <span className="block pr-[0.08em] italic text-primary">{lineB}</span>
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <p className="font-druk text-[5.5rem] leading-none text-ink">{language === "en" ? "5.0" : "5,0"}</p>
            <div>
              <Stars className="h-5 w-5" />
              <p className="mt-2 font-body text-sm font-semibold text-ink">{pick(language, COUNT)}</p>
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 font-body text-sm text-ink/60 underline-offset-4 hover:text-primary hover:underline"
              >
                {pick(language, SEE_ALL)} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="group mt-14 space-y-4 motion-reduce:overflow-x-auto">
        {ROWS.map((row, r) => (
          <div
            key={r}
            className="flex w-max gap-4 pl-4 group-hover:[animation-play-state:paused] motion-reduce:!animate-none"
            style={{ animation: `scroll ${r ? 80 : 70}s linear infinite${r ? " reverse" : ""}` }}
          >
            {/* Two copies, so the -50% loop is seamless; the second is hidden from screen readers. */}
            {[...row, ...row].map((review, i) => (
              <div key={i} aria-hidden={i >= row.length || undefined}>
                <Card review={review} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="container-wide mt-8 px-4 font-body text-xs text-ink/45">{pick(language, ORIGINAL)}</p>
    </section>
  );
};

export default HomeReviews;
