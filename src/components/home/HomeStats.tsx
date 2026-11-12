"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useCountUp } from "@/hooks/useCountUp";

const Stat = ({ value, label }: { value: string; label: string }) => {
  const [, prefix = "", digits = "0", unit = "", plus = ""] = value.match(/^(\$?)(\d+)([^+]*)(\+?)$/) ?? [];
  const { count, ref } = useCountUp(Number(digits), 1600);

  return (
    <div ref={ref} className="border-t border-white/15 pt-5">
      <p className="font-druk text-[clamp(3.5rem,13vw,6.5rem)] leading-none text-white lg:text-[clamp(4rem,6.4vw,7rem)]">
        {prefix}
        {count}
        {unit}
        <span className="text-red-bright">{plus}</span>
      </p>
      <p className="mt-3 font-bebas text-[15px] tracking-[0.22em] text-white/55 sm:text-base">{label}</p>
    </div>
  );
};

/** Numbers band straight under the hero, on the same black. */
const HomeStats = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const stats = [
    { value: "250+", label: es ? "Atletas en EE.UU." : "Athletes in the USA" },
    { value: "350+", label: es ? "Universidades en nuestra red" : "Universities in our network" },
    { value: "$10M+", label: es ? "En becas conseguidas" : "In scholarships secured" },
    { value: "45+", label: es ? "Estados cubiertos" : "States covered" },
  ];

  return (
    <section className="bg-ink pb-20 pt-10 text-white sm:pb-24 lg:pt-16">
      <div className="container-wide grid grid-cols-2 gap-x-6 gap-y-10 px-4 lg:grid-cols-4 lg:gap-x-10">
        {stats.map((s) => (
          <Stat key={s.value} {...s} />
        ))}
      </div>
    </section>
  );
};

export default HomeStats;
