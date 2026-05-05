import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import fuaSportsLogo from "@/assets/fua-sports-logo.png";

export const NAVY = "#12213a";
export const RED = "#b00717";
export const LIGHT = "#fafaf8";
export const GRAY = "#f3f4f6";

export const SportHero = ({
  title,
  subtitle,
  stats,
  image,
  headline,
}: {
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  image?: string;
  headline?: string;
}) => (
  <section
    className="relative py-24 md:py-32 px-4 overflow-hidden"
    style={{
      backgroundColor: NAVY,
      backgroundImage: image ? `url(${image})` : undefined,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {image && (
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,16,30,0.78) 0%, rgba(10,16,30,0.85) 60%, rgba(10,16,30,0.95) 100%)",
        }}
      />
    )}
    <div className="container-wide max-w-5xl mx-auto text-center relative z-10">
      <Link to="/sports" className="inline-block mb-8">
        <img
          src={fuaSportsLogo}
          alt="FUA Sports"
          className="h-20 sm:h-24 md:h-28 w-auto mx-auto"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </Link>
      {headline && (
        <p
          className="font-display uppercase tracking-[0.3em] text-xs sm:text-sm font-bold mb-6"
          style={{ color: RED }}
        >
          {headline}
        </p>
      )}
      <h1
        className="font-display font-bold text-white mb-6 leading-[1.05]"
        style={{
          fontSize: "clamp(40px, 7vw, 88px)",
          textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>
      <p className="font-body text-lg sm:text-xl md:text-2xl text-white/85 max-w-3xl mx-auto mb-12 leading-relaxed">
        {subtitle}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-white/15 px-4 py-6 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
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
