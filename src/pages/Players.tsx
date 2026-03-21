import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Player {
  name: string;
  country: string;
  university: string;
  year: string;
  flag: string;
  image?: string;
}

const players: Player[] = [
  { name: "Ander González", country: "Spain", university: "St. John's University (NCAA D1)", year: "2026", flag: "🇪🇸" },
  { name: "Carlos Méndez", country: "Mexico", university: "University of South Florida", year: "2025", flag: "🇲🇽" },
  { name: "Lucas Ferreira", country: "Brazil", university: "Penn State University", year: "2025", flag: "🇧🇷" },
  { name: "Diego Romero", country: "Colombia", university: "Gardner-Webb University", year: "2024", flag: "🇨🇴" },
  { name: "Santiago Martínez", country: "Argentina", university: "Cleveland State University", year: "2025", flag: "🇦🇷" },
  { name: "Pablo Ruiz", country: "Spain", university: "Northwestern University", year: "2026", flag: "🇪🇸" },
];

const Players = () => {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(355,77%,56%,0.06),transparent_60%)]" />
          <div className="container-wide px-4 relative text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t("players.title")} <span className="text-primary italic">{t("players.title.highlight")}</span>
            </h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {t("players.subtitle")}
            </p>
          </div>
        </section>

        {/* Player Grid */}
        <section className="section-padding bg-background-alt">
          <div className="container-wide px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {players.map((player, i) => (
                <div
                  key={i}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-300"
                >
                  {/* Photo placeholder */}
                  <div className="aspect-[4/3] bg-muted/50 flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl">{player.flag}</div>
                    <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground font-body text-xs font-semibold px-2.5 py-1 rounded-full">
                      {player.year}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{player.name}</h3>
                    <p className="font-body text-sm text-muted-foreground mb-2">{player.flag} {player.country}</p>
                    <p className="font-body text-sm text-[hsl(210,100%,50%)] font-medium">{player.university}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Players;
