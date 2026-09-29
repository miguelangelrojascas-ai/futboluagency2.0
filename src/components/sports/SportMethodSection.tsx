import type { LucideIcon } from "lucide-react";

type MethodStep = { icon: LucideIcon; title: string; desc: string; points: string[] };

interface SportMethodSectionProps {
  image: string;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
  steps: MethodStep[];
}

const SportMethodSection = ({ image, eyebrow, title, highlight, subtitle, steps }: SportMethodSectionProps) => (
  <section className="relative isolate overflow-hidden px-4 py-24 md:py-32">
    <img
      src={image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_30%]"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 bg-gradient-to-br from-black/90 via-black/75 to-black/60"
    />

    <div className="container-wide mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <header className="flex flex-col lg:sticky lg:top-32 lg:self-start">
        <p className="mb-5 flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
          <span aria-hidden="true" className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
        <h2 className="mb-6 text-balance font-display text-4xl font-bold leading-[1.05] !text-white sm:text-5xl lg:text-6xl">
          {title} <span className="italic text-primary">{highlight}</span>
        </h2>
        <p className="max-w-md text-pretty font-body text-lg leading-relaxed text-white/75">{subtitle}</p>
        <p className="mt-10 font-display text-8xl font-bold leading-none text-white/10" aria-hidden="true">
          {String(steps.length).padStart(2, "0")}
        </p>
      </header>

      <ol className="flex flex-col gap-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li
              key={step.title}
              className="group grid grid-cols-[auto_1fr] gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-primary/60 hover:bg-white/10 md:p-8"
            >
              <span className="font-display text-4xl font-bold italic leading-none text-primary md:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-white/60" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold !text-white md:text-2xl">{step.title}</h3>
                </div>
                <p className="font-body leading-relaxed text-white/75">{step.desc}</p>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {step.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-white/15 px-3 py-1 font-body text-xs text-white/80"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default SportMethodSection;
