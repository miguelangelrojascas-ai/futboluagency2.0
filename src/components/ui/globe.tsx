import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Cities that stand in for the agency's reach, weighted by presence. */
const GLOBE_CONFIG: Omit<COBEOptions, "width" | "height"> = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  // Without this the dots hover above the sphere instead of sitting on it.
  markerElevation: 0,
  baseColor: [1, 1, 1],
  // Brand red, normalised for cobe.
  markerColor: [176 / 255, 7 / 255, 23 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [40.4168, -3.7038], size: 0.06 },    // Madrid
    { location: [41.3874, 2.1686], size: 0.04 },    // Barcelona
    { location: [4.711, -74.0721], size: 0.045 },    // Bogotá
    { location: [19.4326, -99.1332], size: 0.045 },  // Ciudad de México
    { location: [-34.6037, -58.3816], size: 0.04 }, // Buenos Aires
    { location: [29.7604, -95.3698], size: 0.06 },   // Houston
    { location: [40.7128, -74.006], size: 0.05 },   // Nueva York
    { location: [34.0522, -118.2437], size: 0.045 }, // Los Ángeles
    { location: [41.8781, -87.6298], size: 0.04 },  // Chicago
    { location: [25.7617, -80.1918], size: 0.045 },  // Miami
  ],
};

/**
 * Rotating globe.
 *
 * cobe 2 dropped the `onRender` callback the older snippets rely on, so the
 * spin is driven here with requestAnimationFrame and the `update()` API.
 * Drag to spin it by hand.
 */
export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: Omit<COBEOptions, "width" | "height">;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let phi = 0;
    let width = canvas.offsetWidth;
    let dragFrom: number | null = null;
    let dragOffset = 0;
    let frame = 0;

    const globe = createGlobe(canvas, {
      ...config,
      width: width * 2,
      height: width * 2,
    });

    const tick = () => {
      if (dragFrom === null && !reducedMotion) phi += 0.004;
      globe.update({ phi: phi + dragOffset, width: width * 2, height: width * 2 });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const onDown = (e: PointerEvent) => {
      dragFrom = e.clientX - dragOffset * 200;
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (dragFrom === null) return;
      dragOffset = (e.clientX - dragFrom) / 200;
    };
    const onUp = () => {
      dragFrom = null;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onUp);

    const reveal = setTimeout(() => {
      canvas.style.opacity = "1";
    });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(reveal);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onUp);
      globe.destroy();
    };
    // Built once; the spin reads local state so it never needs rebuilding.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]", className)}>
      <canvas
        aria-hidden="true"
        className="size-full cursor-grab opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
      />
    </div>
  );
}

export default Globe;
