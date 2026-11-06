"use client";

/*
 * Location card that opens into a live Google Map (adapted from 21st.dev
 * "expanded-map"). Changes from the original: the open card shows a Google
 * Maps embed (no API key needed) instead of tile images, the accent is FUA
 * red, the open size fits a 375px phone, and it works from the keyboard.
 */

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LocationMapProps {
  /** Location name to display */
  location: string;
  latitude: number;
  longitude: number;
  /** Google Maps zoom level (1-20) */
  zoom?: number;
  className?: string;
  /** Whether the card starts open */
  defaultExpanded?: boolean;
  /** Hint shown on the closed card, e.g. "Tap to open" */
  hint?: string;
  /** Text for the close button (screen readers) */
  closeLabel?: string;
  /** Link shown on the open card (e.g. the Google Maps page) */
  mapsUrl?: string;
  mapsLabel?: string;
  /** Size when open on screens 640px and wider (phones always get 320x300) */
  expandedWidth?: number;
  expandedHeight?: number;
}

const ACCENT = "hsl(354 92% 42%)";
const ACCENT_GLOW = "hsl(354 92% 42% / 0.45)";

function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export function LocationMap({
  location,
  latitude,
  longitude,
  zoom = 13,
  className,
  defaultExpanded = false,
  hint,
  closeLabel = "Close map",
  mapsUrl,
  mapsLabel = "Google Maps",
  expandedWidth = 320,
  expandedHeight = 300,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  // Phones always use the small open size so the card never overflows.
  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const openW = isWide ? expandedWidth : 320;
  const openH = isWide ? expandedHeight : 300;

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const coordinates = useMemo(
    () => formatCoordinates(latitude, longitude),
    [latitude, longitude],
  );
  const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

  // Tilt only while closed: an open map has to stay still to be usable.
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isExpanded) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };
  const resetTilt = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const open = () => {
    resetTilt();
    setIsExpanded(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className ?? ""}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        resetTilt();
        setIsHovered(false);
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-card"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        initial={false}
        animate={{
          width: isExpanded ? openW : 240,
          height: isExpanded ? openH : 140,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute inset-0 bg-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <iframe
                title={location}
                src={embedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isExpanded ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-background via-background/90 to-transparent px-4 pb-3 pt-8">
            <div className="min-w-0">
              <p className="truncate font-body text-sm font-semibold tracking-tight text-foreground">{location}</p>
              <p className="font-mono text-xs text-muted-foreground">{coordinates}</p>
            </div>
            <div className="pointer-events-auto flex shrink-0 items-center gap-2">
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 font-body text-xs font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  {mapsLabel}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              )}
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                aria-label={closeLabel}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground ring-1 ring-border transition-colors hover:bg-muted"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={open}
            aria-expanded={false}
            aria-label={hint ? `${location}. ${hint}` : location}
            className="absolute inset-0 z-20 flex flex-col justify-between rounded-2xl p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {/* Grid pattern */}
            <svg width="100%" height="100%" className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
              <defs>
                <pattern id="expanded-map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-foreground" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#expanded-map-grid)" />
            </svg>

            <span className="relative flex w-full items-start justify-between">
              <motion.svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={ACCENT}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                animate={{
                  filter: isHovered ? `drop-shadow(0 0 8px ${ACCENT_GLOW})` : "drop-shadow(0 0 0px transparent)",
                }}
                transition={{ duration: 0.3 }}
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" x2="9" y1="3" y2="18" />
                <line x1="15" x2="15" y1="6" y2="21" />
              </motion.svg>
              {hint && <span className="font-body text-[11px] text-muted-foreground">{hint}</span>}
            </span>

            <span className="relative block w-full space-y-1">
              <motion.span
                className="block font-body text-sm font-semibold tracking-tight text-foreground"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {location}
              </motion.span>
              <motion.span
                className="block h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent"
                initial={{ scaleX: 0.3, originX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </span>
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default LocationMap;
