"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import HomeCta from "@/components/home/HomeCta";

/** Closing block: a player pointing at the visitor and the same single CTA. */
const HomeFinalCta = () => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(45% 70% at 78% 85%, hsl(354 86% 45% / 0.45), transparent 70%)" }}
      />
      <div className="container-wide grid items-end gap-6 px-4 pt-20 sm:pt-28 lg:grid-cols-[1.15fr_1fr]">
        <div className="pb-4 lg:pb-28">
          <h2 className="font-druk text-white uppercase leading-[0.96] text-[clamp(3.75rem,16vw,8.5rem)] lg:text-[clamp(5rem,7vw,8.5rem)]">
            <span className="block whitespace-nowrap">{es ? "El siguiente" : "The next one"}</span>
            <span className="block pr-[0.08em] italic text-red-bright">{es ? "eres tú" : "is you"}</span>
          </h2>
          <p className="mt-6 max-w-md font-bebas text-[1.2rem] leading-snug tracking-[0.16em] text-white/75 sm:text-[1.35rem]">
            {es
              ? "Envíanos tu perfil. Lo revisamos y te decimos qué opciones reales tienes."
              : "Send us your profile. We review it and tell you what real options you have."}
          </p>
          <HomeCta className="mt-8" />
        </div>
        <div aria-hidden="true" className="relative mx-auto h-[420px] w-full sm:h-[520px] lg:h-[600px]">
          <Image
            src="/images/home/jugador-senala.png"
            alt=""
            width={451}
            height={1135}
            sizes="(min-width: 1024px) 22vw, 50vw"
            className="mx-auto h-full w-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeFinalCta;
