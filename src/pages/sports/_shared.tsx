import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

export const NAVY = "#12213a";
export const RED = "#b00717";
export const LIGHT = "#fafaf8";

export const SportHero = ({
  title,
  subtitle,
  stats,
}: {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
}) => (
  <section className="py-24 md:py-32 px-4" style={{ backgroundColor: NAVY }}>
    <div className="container-wide max-w-5xl mx-auto text-center">
      <h1
        className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
      >
        {title}
      </h1>
      <p className="font-body text-base sm:text-lg md:text-xl text-white/75 max-w-3xl mx-auto mb-12 leading-relaxed">
        {subtitle}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/10 px-4 py-6"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <div className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: RED }}>
              {s.value}
            </div>
            <div className="font-body text-xs sm:text-sm text-white/65 uppercase tracking-wider">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const SectionTitle = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <h2
    className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
    style={{ color: dark ? "#ffffff" : NAVY }}
  >
    {children}
  </h2>
);

export const SportSection = ({
  children,
  bg = LIGHT,
  className = "",
}: {
  children: ReactNode;
  bg?: string;
  className?: string;
}) => (
  <section className={`py-20 md:py-24 px-4 ${className}`} style={{ backgroundColor: bg }}>
    <div className="container-wide max-w-6xl mx-auto">{children}</div>
  </section>
);

export const FeatureCard = ({ title, desc }: { title: string; desc?: string }) => (
  <div
    className="rounded-xl p-6 sm:p-7 border bg-white"
    style={{ borderColor: "#e5e5e5" }}
  >
    <h3 className="font-display text-lg sm:text-xl font-bold mb-2" style={{ color: NAVY }}>
      {title}
    </h3>
    {desc && <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>}
  </div>
);

export const FinalCTA = ({ label, sub }: { label: string; sub: string }) => (
  <section className="py-24 px-4" style={{ backgroundColor: NAVY }}>
    <div className="container-wide max-w-3xl mx-auto text-center">
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">
        {label}
      </h2>
      <p className="font-body text-base sm:text-lg text-white/70 mb-8 leading-relaxed">{sub}</p>
      <a
        href="https://calendly.com/futbolu-agency"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-body font-semibold px-8 py-4 rounded-lg text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: RED }}
      >
        <Calendar className="w-5 h-5" />
        {label}
      </a>
    </div>
  </section>
);

export const BackToSports = () => (
  <div className="container-wide max-w-6xl mx-auto px-4 pt-6">
    <Link
      to="/sports"
      className="inline-flex items-center gap-2 font-body text-sm font-medium hover:opacity-70 transition-opacity"
      style={{ color: NAVY }}
    >
      ← FUA Sports
    </Link>
  </div>
);

export const ProcessStep = ({ n, title, desc }: { n: number; title: string; desc?: string }) => (
  <div className="rounded-xl p-6 border bg-white flex gap-4" style={{ borderColor: "#e5e5e5" }}>
    <div
      className="font-display text-2xl font-bold shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white"
      style={{ backgroundColor: RED }}
    >
      {n.toString().padStart(2, "0")}
    </div>
    <div>
      <h3 className="font-display text-lg font-bold mb-1" style={{ color: NAVY }}>
        {title}
      </h3>
      {desc && <p className="font-body text-sm text-muted-foreground leading-relaxed">{desc}</p>}
    </div>
  </div>
);

export const TwoCol = ({ children }: { children: ReactNode }) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);

export const ColCard = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-xl p-7 border bg-white" style={{ borderColor: "#e5e5e5" }}>
    <h3 className="font-display text-xl font-bold mb-4" style={{ color: RED }}>
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it} className="font-body text-sm leading-relaxed flex gap-2" style={{ color: NAVY }}>
          <span style={{ color: RED }}>•</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);
