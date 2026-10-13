import type { ComponentType, ReactNode, SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("grid w-full auto-rows-[18rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
    {children}
  </div>
);

type BentoCardProps = {
  name: string;
  className?: string;
  /** Rendered behind the copy — usually a photo. */
  background: ReactNode;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  description: string;
  /** Omit to render a card with no call to action. */
  href?: string;
  cta?: string;
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-border",
      "transform-gpu transition-colors duration-300 hover:border-primary/40",
      className,
    )}
  >
    {background}

    {/* Keeps the copy legible over any photo. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 45%, rgba(0,0,0,0.1) 100%)",
      }}
    />

    <div
      className={cn(
        "pointer-events-none relative z-10 flex transform-gpu flex-col gap-2 p-6 transition-transform duration-300",
        href && "group-hover:-translate-y-11",
      )}
    >
      <Icon className="h-8 w-8 origin-left transform-gpu text-white/80 transition-transform duration-300 ease-in-out group-hover:scale-90" />
      <h3 className="font-display text-xl font-bold leading-snug text-white">{name}</h3>
      <p className="font-body text-sm leading-relaxed text-white/70">{description}</p>
    </div>

    {href && cta && (
      <div className="pointer-events-none absolute bottom-0 z-10 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="pointer-events-auto text-white hover:bg-white/15 hover:text-white"
        >
          <a href={href}>
            {cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    )}
  </div>
);

export { BentoCard, BentoGrid };
