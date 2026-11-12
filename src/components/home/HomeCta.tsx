"use client";

import { ArrowRight } from "lucide-react";
import LocaleLink from "@/components/LocaleLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

/** The one call to action on the home: every section points to the same form. */
const HomeCta = ({ className, note = true, dark = true }: { className?: string; note?: boolean; dark?: boolean }) => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      <LocaleLink
        to="/apply"
        className="group inline-flex h-14 items-center gap-3 rounded-full bg-red-bright pl-8 pr-7 font-bebas text-[1.35rem] leading-none tracking-[0.12em] text-white shadow-[0_10px_40px_-10px_hsl(354_86%_50%/0.7)] transition-[background-color,transform] duration-150 ease-out hover:bg-primary active:scale-[0.97] sm:h-16 sm:pl-10 sm:pr-9 sm:text-2xl"
      >
        <span className="pt-[0.12em]">{es ? "Envía tu perfil" : "Send your profile"}</span>
        <ArrowRight className="h-5 w-5 transition-transform duration-150 ease-out group-hover:translate-x-1" />
      </LocaleLink>
      {note && (
        <p className={cn("font-body text-[13px]", dark ? "text-white/55" : "text-muted-foreground")}>
          {es ? "Evaluación gratuita y sin compromiso" : "Free evaluation, no commitment"}
        </p>
      )}
    </div>
  );
};

export default HomeCta;
