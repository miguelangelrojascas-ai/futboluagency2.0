"use client";

import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/** Home banner for the Talavera showcase; the details live on /showcase. */
const ShowcaseTeaser = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="container-wide">
        <LocaleLink
          to="/showcase"
          className="group relative block overflow-hidden rounded-3xl bg-footer-dark"
        >
          <Image
            src="/images/showcase/campo-grada.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover opacity-40 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="relative flex flex-col gap-8 px-6 py-10 sm:px-10 md:flex-row md:items-end md:justify-between md:px-14 md:py-14">
            <div className="max-w-xl">
              <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                {es ? "Edición privada · Solo por invitación" : "Private edition · By invitation only"}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl">
                Showcase <span className="text-red-600 italic">Talavera</span> 2027
              </h2>
              <p className="mt-4 font-body text-base leading-relaxed text-white/75">
                {es
                  ? "60 jugadores de España y EE.UU. jugando ante entrenadores universitarios americanos, a hora y media de Madrid."
                  : "60 players from Spain and the U.S. playing in front of American college coaches, 90 minutes from Madrid."}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-body text-sm font-semibold text-white">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-red-500" />
                  {es ? "1 – 3 febrero 2027" : "February 1–3, 2027"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Talavera de la Reina
                </span>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-primary px-6 py-3.5 font-body font-semibold text-white transition-colors group-hover:bg-primary-hover md:self-auto">
              {es ? "Ver el showcase" : "See the Showcase"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </LocaleLink>
      </div>
    </section>
  );
};

export default ShowcaseTeaser;
