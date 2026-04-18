import { useLanguage } from "@/contexts/LanguageContext";
import realMadridLogo from "@/assets/clubs/real-madrid.png";
import atleticoLogo from "@/assets/clubs/atletico-madrid.png";
import getafeLogo from "@/assets/clubs/getafe.png";
import leganesLogo from "@/assets/clubs/leganes.png";

const madridClubs = [
  { name: "Real Madrid", logo: realMadridLogo },
  { name: "Atlético de Madrid", logo: atleticoLogo },
  { name: "Getafe CF", logo: getafeLogo },
  { name: "CD Leganés", logo: leganesLogo },
];

const SpainMadridSection = () => {
  const { language } = useLanguage();
  const isEs = language === "es";

  return (
    <section className="section-padding" style={{ backgroundColor: "#ffffff" }}>
      <div className="container-wide px-4">
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block mb-4 text-primary font-body text-xs tracking-[0.15em] uppercase">
            {isEs ? "Ubicación Estratégica" : "Strategic Location"}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left — text */}
            <div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {isEs ? "A minutos de Madrid" : "Minutes from Madrid"}
              </h2>
              <p className="font-body text-muted-foreground text-base leading-relaxed mb-4">
                {isEs
                  ? "Talavera de la Reina está a solo una hora de Madrid, dando acceso directo a un ecosistema futbolístico de primer nivel mundial. Los jugadores pueden ser vistos por scouts de los clubes más importantes de España."
                  : "Talavera de la Reina is just one hour from Madrid, giving direct access to a world-class football ecosystem. Players can be scouted by the most important clubs in Spain."}
              </p>
              <p className="font-body text-muted-foreground text-base leading-relaxed">
                {isEs
                  ? "La proximidad a la capital permite participar en torneos, amistosos y showcases con equipos de Primera y Segunda División."
                  : "The proximity to the capital allows participation in tournaments, friendlies and showcases with First and Second Division teams."}
              </p>
            </div>

            {/* Right — 2x2 grid with logos */}
            <div className="grid grid-cols-2 gap-3">
              {madridClubs.map((club) => (
                <div
                  key={club.name}
                  className="rounded-xl border border-border bg-[#ffffff] p-5 flex flex-col items-center justify-center text-center min-h-[120px] hover:border-primary/30 transition-colors ring-1 ring-red-500/10 shadow-[0_0_30px_rgba(220,38,38,0.08)]"
                >
                  <img
                    src={club.logo}
                    alt={club.name}
                    className="w-12 h-12 object-contain mb-3"
                  />
                  <span className="font-body text-sm font-medium text-foreground">
                    {club.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpainMadridSection;
