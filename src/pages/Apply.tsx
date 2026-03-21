import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Apply = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    country: "",
    position: "",
    level: "",
    videoLink: "",
    email: "",
    whatsapp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just show success - can integrate with HubSpot/backend later
    setSubmitted(true);
  };

  const positions = [
    "Goalkeeper", "Center Back", "Full Back", "Wing Back",
    "Defensive Midfielder", "Central Midfielder", "Attacking Midfielder",
    "Winger", "Striker",
  ];

  const levels = [
    t("apply.level.professional"),
    t("apply.level.semipro"),
    t("apply.level.academy"),
    t("apply.level.amateur"),
    t("apply.level.youth"),
  ];

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16 md:pt-20 flex items-center justify-center">
          <div className="text-center px-4">
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">{t("apply.success.title")}</h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
              {t("apply.success.desc")}
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        <section className="section-padding bg-background">
          <div className="container-wide px-4">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  {t("apply.title")} <span className="text-primary italic">{t("apply.title.highlight")}</span>
                </h1>
                <p className="font-body text-muted-foreground text-base sm:text-lg">
                  {t("apply.subtitle")}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">{t("apply.name")}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full h-11 rounded-lg border border-border bg-card px-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder={t("apply.name.placeholder")}
                  />
                </div>

                {/* Age + Country */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">{t("apply.age")}</label>
                    <input
                      type="number"
                      name="age"
                      required
                      min="13"
                      max="30"
                      value={form.age}
                      onChange={handleChange}
                      className="w-full h-11 rounded-lg border border-border bg-card px-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="18"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">{t("apply.country")}</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={form.country}
                      onChange={handleChange}
                      className="w-full h-11 rounded-lg border border-border bg-card px-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder={t("apply.country.placeholder")}
                    />
                  </div>
                </div>

                {/* Position + Level */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">{t("apply.position")}</label>
                    <select
                      name="position"
                      required
                      value={form.position}
                      onChange={handleChange}
                      className="w-full h-11 rounded-lg border border-border bg-card px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    >
                      <option value="">{t("apply.select")}</option>
                      {positions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">{t("apply.level")}</label>
                    <select
                      name="level"
                      required
                      value={form.level}
                      onChange={handleChange}
                      className="w-full h-11 rounded-lg border border-border bg-card px-4 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    >
                      <option value="">{t("apply.select")}</option>
                      {levels.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Video Link */}
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-1.5">{t("apply.video")}</label>
                  <input
                    type="url"
                    name="videoLink"
                    value={form.videoLink}
                    onChange={handleChange}
                    className="w-full h-11 rounded-lg border border-border bg-card px-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="https://youtube.com/..."
                  />
                </div>

                {/* Email + WhatsApp */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">{t("apply.email")}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full h-11 rounded-lg border border-border bg-card px-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">{t("apply.whatsapp")}</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={form.whatsapp}
                      onChange={handleChange}
                      className="w-full h-11 rounded-lg border border-border bg-card px-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-body font-bold text-base py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                >
                  {t("apply.submit")} <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Apply;
