"use client";

import { useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUDGETS, BUDGET_UNSURE, COUNTRIES, START_TERMS } from "@/data/leadOptions";

type Status = "idle" | "submitting" | "error" | "success";

const FIELD_CLASS =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-body text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive";

const LABEL_CLASS =
  "mb-1.5 block font-body text-[13px] font-semibold text-foreground";

/**
 * The admissions form.
 *
 * Posts to /api/lead, which writes straight into the Airtable CRM. Built in
 * the page rather than embedded from Airtable so it follows the design system,
 * speaks both languages and can collect the email address the CRM needs.
 */
const ApplyForm = () => {
  const { language } = useLanguage();
  const es = language === "es";

  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<string[]>([]);
  const [budget, setBudget] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("submitting");
    setInvalid([]);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const payload = await response.json().catch(() => null);
      setInvalid(Array.isArray(payload?.fields) ? payload.fields : []);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
        <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="mb-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
          {es ? "Recibido" : "Received"}
        </h3>
        <p className="mb-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground">
          {es
            ? "Tu perfil ya está con el equipo de admisiones. Lo revisamos uno a uno, así que no es automático: si vemos opciones reales para ti, te escribimos por WhatsApp o correo con el enlace para agendar la llamada."
            : "Your profile is now with the admissions team. We review these one by one, so it is not automatic: if we see real options for you, we will write on WhatsApp or by email with the link to book the call."}
        </p>
        <p className="mb-8 max-w-xl font-body text-[15px] leading-relaxed text-muted-foreground">
          {es
            ? "Mientras esperas, lo más útil que puedes hacer es leer las guías. Llegarás a la llamada sabiendo qué preguntar."
            : "While you wait, the most useful thing you can do is read the guides. You will come to the call knowing what to ask."}
        </p>
        <LocaleLink
          to="/recursos"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          {es ? "Ver los recursos" : "See the resources"}
          <ArrowRight className="h-4 w-4" />
        </LocaleLink>
      </div>
    );
  }

  const invalidProps = (field: string) =>
    invalid.includes(field) ? { "aria-invalid": true as const } : {};

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Bots fill this in; it is never shown to a person. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL_CLASS} htmlFor="name">
            {es ? "Nombre completo" : "Full name"} *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={FIELD_CLASS}
            {...invalidProps("name")}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="email">
            {es ? "Correo electrónico" : "Email"} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD_CLASS}
            {...invalidProps("email")}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="whatsapp">
            {es ? "WhatsApp" : "WhatsApp"} *
          </label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            required
            autoComplete="tel"
            placeholder={es ? "Con el prefijo de tu país" : "With your country code"}
            className={FIELD_CLASS}
            {...invalidProps("whatsapp")}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="instagram">
            Instagram
          </label>
          <input
            id="instagram"
            name="instagram"
            type="text"
            placeholder="@"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="country">
            {es ? "País" : "Country"} *
          </label>
          <select
            id="country"
            name="country"
            required
            defaultValue=""
            className={FIELD_CLASS}
            {...invalidProps("country")}
          >
            <option value="" disabled>
              {es ? "Selecciona tu país" : "Select your country"}
            </option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="age">
            {es ? "Edad" : "Age"} *
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min={13}
            max={40}
            required
            className={FIELD_CLASS}
            {...invalidProps("age")}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="position">
            {es ? "Posición" : "Position"} *
          </label>
          <input
            id="position"
            name="position"
            type="text"
            required
            placeholder={es ? "Extremo izquierdo, portero…" : "Left winger, goalkeeper…"}
            className={FIELD_CLASS}
            {...invalidProps("position")}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="stats">
            {es ? "Estadísticas recientes" : "Recent stats"}
          </label>
          <input
            id="stats"
            name="stats"
            type="text"
            placeholder={es ? "Partidos, goles, asistencias…" : "Games, goals, assists…"}
            className={FIELD_CLASS}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL_CLASS} htmlFor="highlightVideo">
            {es ? "Enlace a tu vídeo de highlights" : "Link to your highlight video"} *
          </label>
          <input
            id="highlightVideo"
            name="highlightVideo"
            type="url"
            required
            placeholder="https://youtube.com/..."
            className={FIELD_CLASS}
            {...invalidProps("highlightVideo")}
          />
          <p className="mt-1.5 font-body text-[13px] leading-relaxed text-muted-foreground">
            {es
              ? "De 4 a 6 minutos con tus mejores jugadas. Es lo primero que mira un entrenador."
              : "Four to six minutes of your best plays. It is the first thing a coach looks at."}
          </p>
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL_CLASS} htmlFor="fullMatchVideo">
            {es ? "Vídeo de partido completo" : "Full match video"}
          </label>
          <input
            id="fullMatchVideo"
            name="fullMatchVideo"
            type="url"
            placeholder="https://youtube.com/..."
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="startTerm">
            {es ? "¿Cuándo quieres empezar?" : "When do you want to start?"}
          </label>
          <select
            id="startTerm"
            name="startTerm"
            defaultValue=""
            className={FIELD_CLASS}
          >
            <option value="">{es ? "Aún no lo sé" : "Not sure yet"}</option>
            {START_TERMS.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="budget">
            {es ? "Presupuesto anual de la familia" : "Family budget per year"} *
          </label>
          <select
            id="budget"
            name="budget"
            required
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className={FIELD_CLASS}
            {...invalidProps("budget")}
          >
            <option value="" disabled>
              {es ? "Selecciona un rango" : "Select a range"}
            </option>
            {BUDGETS.map((range) => (
              <option key={range} value={range}>
                {range === BUDGET_UNSURE && !es ? "I don't know yet" : range}
              </option>
            ))}
          </select>
          <p className="mt-1.5 font-body text-[13px] leading-relaxed text-muted-foreground">
            {es
              ? "Lo que podríais asumir al año, incluyendo vivienda y comida."
              : "What you could cover per year, housing and food included."}
          </p>
        </div>

        {budget === BUDGET_UNSURE && (
          <p
            className="rounded-lg border border-primary/30 px-4 py-3 font-body text-[14px] leading-relaxed text-muted-foreground sm:col-span-2"
            style={{ backgroundColor: "hsl(var(--primary) / 0.06)" }}
          >
            {es ? "Sin problema. " : "No problem. "}
            <LocaleLink
              to="/recursos/costes-y-financiacion"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {es ? "La guía de costes" : "The costs guide"}
            </LocaleLink>
            {es
              ? " desglosa lo que cuesta un año y qué parte cubre normalmente la beca. Puedes enviarlo así y lo vemos juntos en la llamada."
              : " breaks down what a year costs and how much a scholarship usually covers. You can send this as it is and we will go through it on the call."}
          </p>
        )}

        <div className="sm:col-span-2">
          <label className={LABEL_CLASS} htmlFor="major">
            {es ? "¿Qué te gustaría estudiar?" : "What would you like to study?"}
          </label>
          <input id="major" name="major" type="text" className={FIELD_CLASS} />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL_CLASS} htmlFor="notes">
            {es
              ? "¿Cuáles son tus objetivos dentro y fuera del campo?"
              : "What are your goals on and off the pitch?"}
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className={`${FIELD_CLASS} resize-y`}
          />
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-destructive/40 px-4 py-3 font-body text-[14px] leading-relaxed text-destructive"
          style={{ backgroundColor: "hsl(var(--destructive) / 0.07)" }}
        >
          {invalid.length > 0
            ? es
              ? "Revisa los campos marcados y vuelve a enviarlo."
              : "Check the highlighted fields and send it again."
            : es
              ? "No hemos podido enviarlo. Inténtalo otra vez o escríbenos a futboluagency@gmail.com."
              : "We could not send it. Try again or write to us at futboluagency@gmail.com."}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-4 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {es ? "Enviando…" : "Sending…"}
            </>
          ) : (
            <>
              {es ? "Enviar mi perfil" : "Send my profile"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="font-body text-[13px] leading-relaxed text-muted-foreground">
          {es
            ? "Sin coste y sin compromiso. Usamos tus datos solo para evaluar tu perfil: "
            : "No cost, no commitment. We use your details only to assess your profile: "}
          <LocaleLink
            to="/privacidad"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            {es ? "política de datos" : "data policy"}
          </LocaleLink>
          .
        </p>
      </div>
    </form>
  );
};

export default ApplyForm;
