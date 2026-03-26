import { useState } from "react";
import { Dumbbell, Mail } from "lucide-react";
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
  { emoji: "🏀", name: "Basketball" },
  { emoji: "🎾", name: "Tennis" },
  { emoji: "🏐", name: "Volleyball" },
  { emoji: "🏃", name: "Track & Field" },
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(210,100%,50%,0.04),transparent_60%)]" />
        <div className="container-wide px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center mx-auto mb-5">
              <Dumbbell className="w-6 h-6 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {t("othersports.title")}
            </h2>
            <p className="font-body text-muted-foreground text-base leading-relaxed max-w-xl mx-auto mb-8">
              {t("othersports.desc")}
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {sports.map((sport) => (
                <button
                  key={sport.name}
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5 opacity-60 hover:opacity-100 hover:border-primary/40 transition-all cursor-pointer"
                >
                  <span className="text-xl">{sport.emoji}</span>
                  <span className="font-body text-sm text-muted-foreground">{sport.name}</span>
                </button>
              ))}
            </div>
            <p className="font-body text-xs text-muted-foreground mt-5 italic">
              {t("othersports.coming")}
            </p>
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
