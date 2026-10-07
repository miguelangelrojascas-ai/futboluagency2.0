import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Glow colour. Defaults to a soft brand-red wash. */
  glow?: string;
  /** Diameter of the glow, in pixels. */
  radius?: number;
};

/**
 * Card that lights up under the cursor.
 *
 * The pointer position is written straight to CSS custom properties, so moving
 * the mouse never triggers a React render — only a style recalculation.
 */
const SpotlightCard = ({
  children,
  className,
  glow = "hsl(var(--primary) / 0.1)",
  radius = 260,
}: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group/spotlight relative overflow-hidden transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.25)]",
        "motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100 motion-reduce:transition-none"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glow}, transparent 70%)`,
        }}
      />
      {/* Positioned so content paints above the glow layer. */}
      <div className="relative">{children}</div>
    </div>
  );
};

export default SpotlightCard;
