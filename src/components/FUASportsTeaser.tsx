import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import fuaSportsLogo from "@/assets/fua-sports-logo.png";

const sports = ["Volleyball", "Tenis", "Béisbol", "Golf", "Track & Field"];

const FUASportsTeaser = () => {
  return (
    <section className="py-24" style={{ backgroundColor: "#0d0d1a" }}>
      <div className="container-wide px-4">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Logo + tagline */}
          <div className="text-center md:text-left">
            <img
              src={fuaSportsLogo}
              alt="FUA Sports"
              className="h-32 sm:h-40 md:h-48 w-auto mx-auto md:mx-0 mb-6"
              style={{ mixBlendMode: "screen" }}
            />
            <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              La misma metodología.
              <br />
              <span className="text-primary">Más deportes.</span>
            </p>
          </div>

          {/* Right: Sport pills + CTA */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {sports.map((sport) => (
                <div
                  key={sport}
                  className="rounded-xl border border-white/10 px-4 py-5 text-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <div className="font-display text-base sm:text-lg font-bold text-white mb-1">
                    {sport}
                  </div>
                  <div className="font-body text-[10px] tracking-[0.12em] uppercase text-white/50">
                    Próximamente
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/sports"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-body font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Explorar FUA Sports
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FUASportsTeaser;
