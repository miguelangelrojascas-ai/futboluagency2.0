"use client";

import { useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BUDGETS, BUDGET_UNSURE, COUNTRIES, COUNTRY_EN, START_TERMS, termLabelEs } from "@/data/leadOptions";
import {
  CONTACT_OF,
  ENGLISH_LEVELS,
  FEET,
  GENDERS,
  GRADUATIONS,
  LEAGUES,
  POSITIONS,
  SOURCES,
} from "@/data/showcaseOptions";

type Status = "idle" | "submitting" | "error" | "success";

const FIELD =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 font-body text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-destructive";
const LABEL = "mb-1.5 block font-body text-[13px] font-semibold text-foreground";
const HINT = "mt-1.5 font-body text-[13px] leading-relaxed text-muted-foreground";

/** Age on the first day of the Showcase (1 February 2027). */
const ageAtShowcase = (birthDate: string) => {
  const [y, m, d] = birthDate.split("-").map(Number);
  if (!y || !m || !d) return null;
  return 2027 - y - (2 < m || (m === 2 && 1 < d) ? 1 : 0);
};

const Section = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
  <fieldset className={n > 1 ? "border-t border-border pt-7" : undefined}>
    <legend className="float-left mb-5 flex w-full items-center gap-3 font-display text-lg font-bold text-foreground">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 font-body text-[13px] text-primary">{n}</span>
      {title}
    </legend>
    <div className="clear-both grid gap-5 sm:grid-cols-2">{children}</div>
  </fieldset>
);

/**
 * Player registration for the Talavera Showcase.
 *
 * Posts to /api/showcase, which forwards it to the "Showcase" section of the
 * FUA CRM. Questions merge the admissions form with what a showcase needs to
 * know: who to contact (parents for under-18s), the current team and level,
 * and the academic year coaches recruit by.
 */
const ShowcaseForm = () => {
  const { language } = useLanguage();
  const es = language === "es";
  const l = (o: { value: string; en: string }) => (es ? o.value : o.en);

  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<string[]>([]);
  const [birthDate, setBirthDate] = useState("");
  const [contactOf, setContactOf] = useState("");
  const [budget, setBudget] = useState("");

  const age = birthDate ? ageAtShowcase(birthDate) : null;
  const minor = age != null && age < 18;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const data: Record<string, unknown> = Object.fromEntries(new FormData(form));
    data.consent = (form.elements.namedItem("consent") as HTMLInputElement | null)?.checked ?? false;
    data.language = language;

    setStatus("submitting");
    setInvalid([]);
    try {
      const response = await fetch("/api/showcase", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("success");
        document.getElementById("inscripcion")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const payload = await response.json().catch(() => null);
      const fields: string[] = Array.isArray(payload?.fields) ? payload.fields : [];
      setInvalid(fields);
      setStatus("error");
      if (fields[0]) form.querySelector<HTMLElement>(`[name="${fields[0]}"]`)?.focus();
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
          {es ? "Inscripción recibida" : "Registration received"}
        </h3>
        <p className="mb-6 max-w-xl font-body text-base leading-relaxed text-muted-foreground">
          {es
            ? "El showcase es solo por invitación y hay 60 plazas. Revisamos cada perfil y su vídeo uno a uno; si encajas, te escribimos por WhatsApp o correo con la invitación y los siguientes pasos."
            : "The Showcase is by invitation only and there are 60 places. We review every profile and video one by one; if you are a fit, we will write on WhatsApp or by email with your invitation and next steps."}
        </p>
        <LocaleLink
          to="/recursos"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          {es ? "Mientras, lee las guías" : "Meanwhile, read the guides"}
          <ArrowRight className="h-4 w-4" />
        </LocaleLink>
      </div>
    );
  }

  const bad = (field: string) => (invalid.includes(field) ? { "aria-invalid": true as const } : {});
  const req = " *";


  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
      {/* Bots fill this in; it is never shown to a person. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="sc-website">Website</label>
        <input id="sc-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Section n={1} title={es ? "El jugador" : "The player"}>
        <div>
          <label className={LABEL} htmlFor="sc-firstName">{es ? "Nombre" : "First name"}{req}</label>
          <input id="sc-firstName" name="firstName" type="text" autoComplete="given-name" className={FIELD} {...bad("firstName")} />
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-lastName">{es ? "Apellidos" : "Last name"}{req}</label>
          <input id="sc-lastName" name="lastName" type="text" autoComplete="family-name" className={FIELD} {...bad("lastName")} />
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-birthDate">{es ? "Fecha de nacimiento" : "Date of birth"}{req}</label>
          <input
            id="sc-birthDate"
            name="birthDate"
            type="date"
            min="1990-01-01"
            max="2015-12-31"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={FIELD}
            {...bad("birthDate")}
          />
          {age != null && age > 0 && (
            <p className={HINT}>{es ? `Tendrás ${age} años en el showcase.` : `You will be ${age} at the Showcase.`}</p>
          )}
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-gender">{es ? "Género" : "Gender"}{req}</label>
          <select id="sc-gender" name="gender" defaultValue="" className={FIELD} {...bad("gender")}>
            <option value="" disabled>{es ? "Selecciona" : "Select"}</option>
            {GENDERS.map((o) => <option key={o.value} value={o.value}>{l(o)}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-country">{es ? "País" : "Country"}{req}</label>
          <select id="sc-country" name="country" defaultValue="" className={FIELD} {...bad("country")}>
            <option value="" disabled>{es ? "Selecciona tu país" : "Select your country"}</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{es ? c : COUNTRY_EN[c]}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-city">{es ? "Ciudad" : "City"}</label>
          <input id="sc-city" name="city" type="text" autoComplete="address-level2" className={FIELD} />
        </div>
      </Section>

      <Section n={2} title={es ? "Contacto" : "Contact"}>
        <div>
          <label className={LABEL} htmlFor="sc-email">{es ? "Correo electrónico" : "Email"}{req}</label>
          <input id="sc-email" name="email" type="email" autoComplete="email" className={FIELD} {...bad("email")} />
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-whatsapp">WhatsApp{req}</label>
          <input
            id="sc-whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder={es ? "Con el prefijo de tu país" : "With your country code"}
            className={FIELD}
            {...bad("whatsapp")}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-contactOf">{es ? "Este email y WhatsApp son del…" : "These contact details are…"}{req}</label>
          <select
            id="sc-contactOf"
            name="contactOf"
            value={contactOf}
            onChange={(e) => setContactOf(e.target.value)}
            className={FIELD}
            {...bad("contactOf")}
          >
            <option value="" disabled>{es ? "Selecciona" : "Select"}</option>
            {CONTACT_OF.map((o) => <option key={o.value} value={o.value}>{es ? o.value.toLowerCase() : o.en}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-instagram">Instagram</label>
          <input id="sc-instagram" name="instagram" type="text" placeholder="@" className={FIELD} />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="sc-guardianEmail">
            {es ? "Email del padre, madre o tutor" : "Parent or guardian's email"}
            {minor && contactOf === "Jugador" ? req : ""}
          </label>
          <input id="sc-guardianEmail" name="guardianEmail" type="email" className={FIELD} {...bad("guardianEmail")} />
          <p className={HINT}>
            {minor
              ? es
                ? "Como serás menor de edad en el showcase, necesitamos el contacto de tu familia."
                : "You will be under 18 at the Showcase, so we need a family contact."
              : es
                ? "Opcional si eres mayor de edad."
                : "Optional if you are 18 or over."}
          </p>
        </div>
      </Section>

      <Section n={3} title={es ? "Perfil deportivo" : "Football profile"}>
        <div>
          <label className={LABEL} htmlFor="sc-position">{es ? "Posición principal" : "Main position"}{req}</label>
          <select id="sc-position" name="position" defaultValue="" className={FIELD} {...bad("position")}>
            <option value="" disabled>{es ? "Selecciona" : "Select"}</option>
            {POSITIONS.map((o) => <option key={o.value} value={o.value}>{l(o)}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-secondaryPosition">{es ? "Posición secundaria" : "Second position"}</label>
          <select id="sc-secondaryPosition" name="secondaryPosition" defaultValue="" className={FIELD}>
            <option value="">{es ? "Ninguna" : "None"}</option>
            {POSITIONS.map((o) => <option key={o.value} value={o.value}>{l(o)}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-foot">{es ? "Pie dominante" : "Strong foot"}</label>
          <select id="sc-foot" name="foot" defaultValue="" className={FIELD}>
            <option value="">{es ? "Selecciona" : "Select"}</option>
            {FEET.map((o) => <option key={o.value} value={o.value}>{l(o)}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-height">{es ? "Altura (cm)" : "Height (cm)"}</label>
          <input id="sc-height" name="height" type="number" inputMode="numeric" min={140} max={220} placeholder="178" className={FIELD} {...bad("height")} />
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-currentTeam">{es ? "Equipo actual" : "Current team"}{req}</label>
          <input id="sc-currentTeam" name="currentTeam" type="text" className={FIELD} {...bad("currentTeam")} />
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-league">{es ? "Categoría o liga" : "Category or league"}{req}</label>
          <select id="sc-league" name="league" defaultValue="" className={FIELD} {...bad("league")}>
            <option value="" disabled>{es ? "Selecciona" : "Select"}</option>
            {LEAGUES.map((o) => <option key={o.value} value={o.value}>{l(o)}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="sc-highlightVideo">{es ? "Enlace a tu vídeo de highlights" : "Link to your highlight video"}{req}</label>
          <input id="sc-highlightVideo" name="highlightVideo" type="url" placeholder="https://youtube.com/..." className={FIELD} {...bad("highlightVideo")} />
          <p className={HINT}>
            {es
              ? "De 4 a 6 minutos con tus mejores jugadas. Es lo que usamos para decidir las invitaciones."
              : "Four to six minutes of your best plays. It is what we use to decide the invitations."}
          </p>
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="sc-fullMatchVideo">{es ? "Vídeo de un partido completo" : "Full match video"}</label>
          <input id="sc-fullMatchVideo" name="fullMatchVideo" type="url" placeholder="https://youtube.com/..." className={FIELD} />
        </div>
      </Section>

      <Section n={4} title={es ? "Estudios y planes" : "Studies and plans"}>
        <div>
          <label className={LABEL} htmlFor="sc-graduation">{es ? "¿En qué año acabas bachillerato?" : "High school graduation year"}{req}</label>
          <select id="sc-graduation" name="graduation" defaultValue="" className={FIELD} {...bad("graduation")}>
            <option value="" disabled>{es ? "Selecciona" : "Select"}</option>
            {GRADUATIONS.map((o) => <option key={o.value} value={o.value}>{l(o)}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-gpa">{es ? "Nota media" : "GPA / average grade"}</label>
          <input id="sc-gpa" name="gpa" type="text" placeholder={es ? "Ej.: 7,5 / 10" : "E.g. 3.4 / 4.0"} className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-english">{es ? "Nivel de inglés" : "English level"}</label>
          <select id="sc-english" name="english" defaultValue="" className={FIELD}>
            <option value="">{es ? "Selecciona" : "Select"}</option>
            {ENGLISH_LEVELS.map((o) => <option key={o.value} value={o.value}>{l(o)}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-startTerm">{es ? "¿Cuándo te gustaría empezar en EE.UU.?" : "When would you like to start in the U.S.?"}</label>
          <select id="sc-startTerm" name="startTerm" defaultValue="" className={FIELD}>
            <option value="">{es ? "Aún no lo sé" : "Not sure yet"}</option>
            {START_TERMS.map((t) => <option key={t} value={t}>{es ? termLabelEs(t) : t}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-major">{es ? "¿Qué te gustaría estudiar?" : "What would you like to study?"}</label>
          <input id="sc-major" name="major" type="text" className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="sc-budget">{es ? "Presupuesto anual de la familia" : "Family budget per year"}</label>
          <select id="sc-budget" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={FIELD}>
            <option value="">{es ? "Prefiero hablarlo en la llamada" : "I'd rather discuss it on a call"}</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b === BUDGET_UNSURE && !es ? "I don't know yet" : b}</option>)}
          </select>
          <p className={HINT}>
            {es ? "Para la universidad en EE.UU., con vivienda y comida." : "For college in the U.S., housing and food included."}
          </p>
        </div>
      </Section>

      <Section n={5} title={es ? "Último paso" : "Last step"}>
        <div>
          <label className={LABEL} htmlFor="sc-source">{es ? "¿Cómo conociste el showcase?" : "How did you hear about the Showcase?"}</label>
          <select id="sc-source" name="source" defaultValue="" className={FIELD}>
            <option value="">{es ? "Selecciona" : "Select"}</option>
            {SOURCES.map((o) => <option key={o.value} value={o.value}>{l(o)}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="sc-comments">{es ? "¿Algo más que debamos saber?" : "Anything else we should know?"}</label>
          <textarea
            id="sc-comments"
            name="comments"
            rows={3}
            placeholder={es ? "Lesiones, convocatorias, objetivos, dudas sobre el viaje…" : "Injuries, call-ups, goals, travel questions…"}
            className={`${FIELD} resize-y`}
          />
        </div>
        <label
          htmlFor="sc-consent"
          className="flex cursor-pointer items-start gap-3 font-body text-[14px] leading-relaxed text-muted-foreground sm:col-span-2"
        >
          <input
            id="sc-consent"
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
            {...bad("consent")}
          />
          <span className={invalid.includes("consent") ? "text-destructive" : undefined}>
            {es
              ? "Acepto que FutbolUAgency use estos datos para valorar mi inscripción y contactarme sobre el showcase. Si soy menor de edad, mi familia está informada. "
              : "I agree that FutbolUAgency may use these details to assess my registration and contact me about the Showcase. If I am under 18, my family knows. "}
            <LocaleLink to="/privacidad" className="font-semibold text-primary underline-offset-4 hover:underline">
              {es ? "Política de datos" : "Data policy"}
            </LocaleLink>
            .{req}
          </span>
        </label>
      </Section>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 px-4 py-3 font-body text-[14px] leading-relaxed text-destructive"
          style={{ backgroundColor: "hsl(var(--destructive) / 0.07)" }}
        >
          {invalid.length > 0
            ? es
              ? "Revisa los campos marcados en rojo y vuelve a enviarlo."
              : "Check the fields marked in red and send it again."
            : es
              ? "No hemos podido enviarlo. Inténtalo otra vez o escríbenos a futboluagency@gmail.com."
              : "We could not send it. Try again or write to us at futboluagency@gmail.com."}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
              {es ? "Enviar mi inscripción" : "Send my registration"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="font-body text-[13px] leading-relaxed text-muted-foreground">
          {es ? "Enviarla no te compromete a nada: primero te confirmamos si tienes plaza." : "Sending it commits you to nothing: we first confirm whether you have a place."}
        </p>
      </div>
    </form>
  );
};

export default ShowcaseForm;
