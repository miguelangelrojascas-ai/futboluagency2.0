import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, X } from "lucide-react";

const EVENT_DATE = new Date("2026-06-16T10:00:00+02:00").getTime();

const calc = () => {
  const diff = EVENT_DATE - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
};

const ShowcaseCountdownBanner = () => {
  const [time, setTime] = useState(calc());
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time || closed) return null;

  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center px-2 sm:px-3">
      <span className="font-display text-xl sm:text-2xl font-bold leading-none tabular-nums text-white">
        {v.toString().padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/70 mt-1">
        {l}
      </span>
    </div>
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] text-white"
      style={{
        background: "linear-gradient(90deg, #b00717 0%, #7a0510 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <div className="container-wide mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <Link
          to="/showcase"
          className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 hover:opacity-90 transition-opacity"
        >
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-[10px] uppercase tracking-widest font-bold">
            <Calendar className="w-3 h-3" /> Showcase USA
          </span>
          <span className="font-body text-xs sm:text-sm font-semibold truncate">
            <span className="sm:hidden">Showcase USA · </span>
            16 Junio · Talavera de la Reina
          </span>
        </Link>

        <div className="flex items-center divide-x divide-white/20">
          <Box v={time.days} l="d" />
          <Box v={time.hours} l="h" />
          <Box v={time.minutes} l="m" />
          <div className="hidden sm:block">
            <Box v={time.seconds} l="s" />
          </div>
        </div>

        <button
          onClick={() => setClosed(true)}
          aria-label="Cerrar"
          className="p-1 rounded-full hover:bg-white/15 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ShowcaseCountdownBanner;
