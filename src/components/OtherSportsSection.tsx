import { useState } from "react";
import { Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sports = [
  { es: "Béisbol", en: "Baseball" },
  { es: "Volleyball", en: "Volleyball" },
  { es: "Basketball", en: "Basketball" },
  { es: "Tennis", en: "Tennis" },
];

const OtherSportsSection = () => {
  const { t, language } = useLanguage();
  const isEs = language === "es";
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setModalOpen(false);
        setSubmitted(false);
        setEmail("");
      }, 2000);
    }
  };

  return (
    <>
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="container-wide px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("othersports.title")}
            </h2>
            <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {isEs
                ? "Estamos expandiendo nuestros programas a otros deportes. Pronto podrás acceder a las mismas oportunidades en más disciplinas."
                : "We're expanding our programs to other sports. Soon you'll have access to the same opportunities in more disciplines."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {sports.map((sport) => (
              <button
                key={sport.en}
                onClick={() => setModalOpen(true)}
                className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/60 px-4 py-8 hover:border-primary/40 transition-all duration-300 cursor-pointer"
                style={{ backgroundColor: "#141414" }}
              >
                <span className="font-display text-base sm:text-lg font-bold text-foreground">
                  {isEs ? sport.es : sport.en}
                </span>
                <span className="font-body text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                  {isEs ? "Próximamente" : "Coming Soon"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="bg-[#141414] border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              {isEs ? "Sé el primero en enterarte" : "Be the first to know"}
            </DialogTitle>
            <DialogDescription className="font-body text-muted-foreground text-base leading-relaxed mt-2">
              {isEs
                ? "Estamos estructurando nuestros programas universitarios para Volleyball, Tennis y más. Déjanos tu correo y te contactaremos apenas abramos el proceso de evaluación."
                : "We're building our university programs for Volleyball, Tennis and more. Leave your email and we'll contact you as soon as we open the evaluation process."}
            </DialogDescription>
          </DialogHeader>
          {submitted ? (
            <div className="py-6 text-center">
              <p className="font-body text-primary font-medium text-lg">
                {isEs ? "¡Listo! Te notificaremos." : "Done! We'll notify you."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  placeholder={isEs ? "Tu correo electrónico" : "Your email address"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Button type="submit" className="w-full">
                {isEs ? "Notificarme" : "Notify Me"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OtherSportsSection;
