import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CALENDLY = "https://calendly.com/futbolu-agency";

export type BenchmarkMetric = { icon: LucideIcon; label: string; desc: string };

interface SportBenchmarksProps {
  title: string;
  highlight: string;
  subtitle: string;
  metrics: BenchmarkMetric[];
  columns: string[];
  rows: string[][];
  caption: string;
}

const SportBenchmarks = ({ title, highlight, subtitle, metrics, columns, rows, caption }: SportBenchmarksProps) => {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <section id="benchmarks" className="section-alt scroll-mt-24 px-4 py-20 md:py-28">
      <div className="container-wide mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {es ? "¿Tengo nivel para una beca?" : "Do I qualify for a scholarship?"}
            </p>
            <h2 className="mb-4 text-balance font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              {title} <span className="italic text-primary">{highlight}</span>
            </h2>
            <p className="text-pretty font-body text-base leading-relaxed text-muted-foreground">{subtitle}</p>
          </div>
          <Button asChild variant="outline" className="shrink-0 gap-2 self-start md:self-auto">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              {es ? "Evalúa tu perfil" : "Evaluate your profile"}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ icon: Icon, label, desc }) => (
            <li key={label} className="premium-card flex flex-col gap-3 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-lg font-bold">{label}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </li>
          ))}
        </ul>

        <figure className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left font-body text-sm">
              <thead>
                <tr className="border-b border-border">
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                        i === 0 ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                    {r.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-6 py-4 font-display text-base font-bold text-foreground">
                          {cell}
                        </th>
                      ) : (
                        <td
                          key={i}
                          className={`px-6 py-4 tabular-nums ${
                            i === r.length - 1 ? "font-semibold text-primary" : "text-foreground"
                          }`}
                        >
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="border-t border-border px-6 py-4 font-body text-xs text-muted-foreground">
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default SportBenchmarks;
