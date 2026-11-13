"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeCta from "@/components/home/HomeCta";
import { MIGUEL } from "@/components/home/spotlight";

/* Film grain for the studio backdrop, drawn once as an SVG. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Proposal B, "Statement": a single portrait on a textured red-black studio
 * backdrop, one short line and the credit of the player shown, like an agency
 * that lets its clients speak for it.
 */
const HomeHeroStatement = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="relative isolate overflow-hidden text-white" style={{ backgroundColor: "#140709" }}>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 75% at 72% 35%, hsl(354 70% 30% / 0.85), transparent 70%), radial-gradient(40% 50% at 20% 100%, hsl(354 80% 18% / 0.6), transparent 70%), linear-gradient(180deg, #1a090b 0%, #0a0a0a 100%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.22] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

      <div className="container-wide relative flex min-h-[100svh] flex-col px-4 pt-28 lg:grid lg:grid-cols-12 lg:items-center lg:pt-24">
        <div className="relative z-10 lg:col-span-7 lg:pb-10">
          <p
            aria-hidden="true"
            className={`font-druk uppercase leading-[0.92] text-white ${
              es ? "text-[clamp(3.5rem,16.5vw,7rem)]" : "text-[clamp(3.25rem,15vw,7rem)]"
            } lg:text-[clamp(6rem,9vw,10rem)]`}
          >
            {es ? "Del club" : "From club"}
            <span className="block pr-[0.08em] italic text-red-bright">{es ? "al campus." : "to campus."}</span>
          </p>
          <h1 className="mt-5 font-bebas text-[1.2rem] leading-snug tracking-[0.2em] text-white/80 sm:text-[1.4rem]">
            {es ? "Agencia de becas de fútbol en Estados Unidos" : "Soccer scholarship agency for the United States"}
          </h1>
          <p className="mt-4 hidden max-w-md font-body text-base leading-relaxed text-white/65 sm:block">
            {es
              ? "Presentamos tu perfil a entrenadores universitarios de EE.UU. y negociamos tu beca en tu nombre, de la primera llamada a tu llegada al campus."
              : "We put your profile in front of U.S. college coaches and negotiate your scholarship on your behalf, from the first call to your arrival on campus."}
          </p>
          <HomeCta className="mt-8" />
        </div>

        <div className="relative -mx-4 mt-2 h-[52svh] min-h-[340px] lg:col-span-5 lg:mx-0 lg:mt-0 lg:h-[calc(100svh-6rem)] lg:self-end">
          <Image
            src={MIGUEL.src}
            alt={es ? `${MIGUEL.name}, jugador de FUA, con la bandera de España` : `${MIGUEL.name}, FUA player, wrapped in the Spanish flag`}
            width={MIGUEL.width}
            height={MIGUEL.height}
            priority
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 lg:h-[88%] [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
          />
          <p className="absolute bottom-5 right-4 z-10 text-right font-bebas text-[13px] leading-snug tracking-[0.2em] text-white/60 lg:bottom-8 lg:right-0">
            <span className="block text-[15px] text-white">{MIGUEL.name}</span>
            {MIGUEL.university} · <span className="text-red-bright">{MIGUEL.division}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroStatement;
