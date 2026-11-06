"use client";

import { useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { COUNTRIES, COUNTRY_EN } from "@/data/leadOptions";
import { DIAL_CODES, dialCodeFor } from "@/data/dialCodes";
import type { FormQuestion, ShowcaseFormDefinition } from "@/lib/showcaseForm";

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

const AUTOCOMPLETE: Record<string, string> = {
  firstName: "given-name",
  lastName: "family-name",
  email: "email",
  whatsapp: "tel",
  city: "address-level2",
};

/**
 * WhatsApp / phone: country code picker plus the number, sent as one
 * international number (e.g. "+34 600123456") so the CRM can open WhatsApp
 * without guessing the country. The code follows the country chosen above
 * until the player picks one by hand.
 */
const PhoneField = ({
  q,
  es,
  invalid,
  required,
  help,
  country,
}: {
  q: FormQuestion;
  es: boolean;
  invalid: boolean;
  required: boolean;
  help?: string;
  country: string;
}) => {
  const [picked, setPicked] = useState<string | null>(null);
  const [custom, setCustom] = useState("");
  const [number, setNumber] = useState("");

  const dial = picked ?? (dialCodeFor(country) ? country : "España");
  const code = dial === "otro" ? custom.replace(/\D/g, "") : DIAL_CODES.find((d) => d.country === dial)?.code ?? "";
  const typed = number.trim();
  // Someone who types the full number with + or 00 has already given the code.
  const full = /^(\+|00)/.test(typed)
    ? `+${typed.replace(/^00/, "").replace(/\D/g, "")}`
    : code && typed
      ? `+${code} ${typed.replace(/\D/g, "").replace(/^0+/, "")}`
      : "";
  const id = `sc-${q.id}`;
  const label = es ? q.es : q.en || q.es;
  const placeholder = (es ? q.placeholderEs : q.placeholderEn || q.placeholderEs) || undefined;
  const bad = invalid ? { "aria-invalid": true as const } : {};
  /* FIELD is full width; the code picker and the number share the row instead. */
  const PART = FIELD.replace("w-full ", "");

  return (
    <div className={q.ancho === "completo" ? "sm:col-span-2" : undefined}>
      <label className={LABEL} htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      <div className="flex gap-2">
        <select
          aria-label={es ? "Prefijo del país" : "Country code"}
          value={dial}
          onChange={(e) => setPicked(e.target.value)}
          className={`${PART} w-[6.5rem] shrink-0 px-2.5`}
          {...bad}
        >
          {DIAL_CODES.map((d) => (
            <option key={d.country} value={d.country} title={es ? d.country : d.en}>
              {d.flag} +{d.code}
            </option>
          ))}
          <option value="otro">{es ? "Otro prefijo" : "Other code"}</option>
        </select>
        {dial === "otro" && (
          <input
            aria-label={es ? "Prefijo" : "Code"}
            inputMode="numeric"
            placeholder="+00"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className={`${PART} w-20 shrink-0`}
            {...bad}
          />
        )}
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={placeholder}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className={`${PART} min-w-0 flex-1`}
          {...bad}
        />
      </div>
      <input type="hidden" name={q.id} value={full} />
      <p className={`${HINT} ${invalid ? "text-destructive" : ""}`}>
        {invalid
          ? es
            ? "Revisa el prefijo y el número: tiene que ser un número completo de WhatsApp."
            : "Check the code and the number: it has to be a full WhatsApp number."
          : full && full.replace(/\D/g, "").length >= 8
            ? `${es ? "Te escribiremos al" : "We will message"} ${full}`
            : help}
      </p>
    </div>
  );
};

/** One question, drawn from its definition in the CRM. */
const Field = ({
  q,
  es,
  invalid,
  required,
  hint,
}: {
  q: FormQuestion;
  es: boolean;
  invalid: boolean;
  required: boolean;
  hint?: string | null;
}) => {
  const id = `sc-${q.id}`;
  const label = es ? q.es : q.en || q.es;
  const help = hint ?? (es ? q.ayudaEs : q.ayudaEn || q.ayudaEs);
  const placeholder = (es ? q.placeholderEs : q.placeholderEn || q.placeholderEs) || undefined;
  const common = { id, name: q.id, className: FIELD, ...(invalid ? { "aria-invalid": true as const } : {}) };
  const choose = es ? "Selecciona" : "Select";

  let control: React.ReactNode;
  switch (q.tipo) {
    case "textarea":
      control = <textarea {...common} rows={3} placeholder={placeholder} className={`${FIELD} resize-y`} />;
      break;
    case "select":
      control = (
        <select {...common} defaultValue="">
          <option value="" disabled={q.obligatoria}>{choose}</option>
          {q.opciones?.map((o) => (
            <option key={o.es} value={o.es}>{es ? o.es : o.en || o.es}</option>
          ))}
        </select>
      );
      break;
    case "country":
      control = (
        <select {...common} defaultValue="">
          <option value="" disabled={q.obligatoria}>{es ? "Selecciona tu país" : "Select your country"}</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{es ? c : COUNTRY_EN[c]}</option>
          ))}
        </select>
      );
      break;
    case "date":
      control =
        q.id === "birthDate" ? (
          <input {...common} type="date" min="1990-01-01" max="2015-12-31" />
        ) : (
          <input {...common} type="date" />
        );
      break;
    case "number":
      control = <input {...common} type="number" inputMode="decimal" placeholder={placeholder} />;
      break;
    default:
      control = <input {...common} type={q.tipo} placeholder={placeholder} autoComplete={AUTOCOMPLETE[q.id]} />;
  }

  return (
    <div className={q.ancho === "completo" || q.tipo === "textarea" ? "sm:col-span-2" : undefined}>
      <label className={LABEL} htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {control}
      {help && <p className={HINT}>{help}</p>}
    </div>
  );
};

/**
 * Player registration for the Talavera Showcase.
 *
 * The questions come from the FUA CRM, where they can be edited; submissions
 * go to /api/showcase, which forwards them to the CRM's Showcase section.
 */
const ShowcaseForm = ({ definition }: { definition: ShowcaseFormDefinition }) => {
  const { language } = useLanguage();
  const es = language === "es";

  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<string[]>([]);
  // Watched to adapt the guardian question to under-18 players.
  const [birthDate, setBirthDate] = useState("");
  const [contactOf, setContactOf] = useState("");
  const [country, setCountry] = useState("");

  const age = birthDate ? ageAtShowcase(birthDate) : null;
  const minor = age != null && age < 18;
  const needsGuardian = minor && (contactOf === "" || contactOf === "Jugador");

  const sections = definition.secciones
    .map((s) => ({ ...s, preguntas: s.preguntas.filter((q) => q.activa) }))
    .filter((s) => s.preguntas.length > 0);

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

  /* Live hints for the questions the form knows about. */
  const hintFor = (q: FormQuestion) => {
    if (q.id === "birthDate" && age != null && age > 0) {
      return es ? `Tendrás ${age} años en el showcase.` : `You will be ${age} at the Showcase.`;
    }
    if (q.id === "guardianEmail" && minor) {
      return es
        ? "Como serás menor de edad en el showcase, necesitamos el contacto de tu familia."
        : "You will be under 18 at the Showcase, so we need a family contact.";
    }
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={(e) => {
        const t = e.target as unknown as HTMLInputElement;
        if (t.name === "birthDate") setBirthDate(t.value);
        if (t.name === "contactOf") setContactOf(t.value);
        if (t.name === "country") setCountry(t.value);
      }}
      noValidate
      className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Bots fill this in; it is never shown to a person. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="sc-website">Website</label>
        <input id="sc-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {sections.map((s, i) => (
        <Section key={s.id} n={i + 1} title={es ? s.es : s.en || s.es}>
          {s.preguntas.map((q) =>
            q.tipo === "tel" ? (
              <PhoneField
                key={q.id}
                q={q}
                es={es}
                invalid={invalid.includes(q.id)}
                required={q.obligatoria}
                help={es ? q.ayudaEs : q.ayudaEn || q.ayudaEs}
                country={country}
              />
            ) : (
            <Field
              key={q.id}
              q={q}
              es={es}
              invalid={invalid.includes(q.id)}
              required={q.obligatoria || (q.id === "guardianEmail" && needsGuardian)}
              hint={hintFor(q)}
            />
            ),
          )}
        </Section>
      ))}

      <label
        htmlFor="sc-consent"
        className="flex cursor-pointer items-start gap-3 border-t border-border pt-7 font-body text-[14px] leading-relaxed text-muted-foreground"
      >
        <input
          id="sc-consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[hsl(var(--primary))]"
          {...(invalid.includes("consent") ? { "aria-invalid": true as const } : {})}
        />
        <span className={invalid.includes("consent") ? "text-destructive" : undefined}>
          {es
            ? "Acepto que FutbolUAgency use estos datos para valorar mi inscripción y contactarme sobre el showcase. Si soy menor de edad, mi familia está informada. "
            : "I agree that FutbolUAgency may use these details to assess my registration and contact me about the Showcase. If I am under 18, my family knows. "}
          <LocaleLink to="/privacidad" className="font-semibold text-primary underline-offset-4 hover:underline">
            {es ? "Política de datos" : "Data policy"}
          </LocaleLink>
          . *
        </span>
      </label>

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
