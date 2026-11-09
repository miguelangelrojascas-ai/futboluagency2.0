"use client";

import { useRef, useState } from "react";
import LocaleLink from "@/components/LocaleLink";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2 } from "lucide-react";
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

const Section = ({ n, total, title, es, children }: { n: number; total: number; title: string; es: boolean; children: React.ReactNode }) => (
  <fieldset>
    <legend className="float-left mb-6 w-full">
      <span className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-primary">
        {es ? `Paso ${n} de ${total}` : `Step ${n} of ${total}`}
      </span>
      <span className="mt-1 block font-display text-2xl font-bold text-foreground">{title}</span>
    </legend>
    <div className="clear-both grid gap-5 sm:grid-cols-2">{children}</div>
  </fieldset>
);

/** Same rules the CRM applies, checked before moving to the next step. */
const isValidAnswer = (q: FormQuestion, raw: string) => {
  const v = raw.trim();
  if (!v) return !q.obligatoria;
  switch (q.tipo) {
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    case "tel": {
      const digits = v.replace(/\D/g, "");
      return /^\+\d/.test(v) && digits.length >= 8 && digits.length <= 15;
    }
    case "url":
      try {
        const u = new URL(v);
        return u.protocol === "http:" || u.protocol === "https:";
      } catch {
        return false;
      }
    case "number": {
      const n = Number(v.replace(",", "."));
      if (!Number.isFinite(n)) return false;
      return q.id === "height" ? n >= 140 && n <= 220 : true;
    }
    case "date": {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
      const y = Number(v.slice(0, 4));
      return q.id === "birthDate" ? y >= 1990 && y <= 2015 : true;
    }
    case "select":
      return Boolean(q.opciones?.some((o) => o.es === v));
    default:
      return true;
  }
};

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
 * Player registration for the Talavera Showcase, one section per step.
 *
 * The questions come from the FUA CRM, where they can be edited; submissions
 * go to /api/showcase, which forwards them to the CRM's Showcase section.
 * Every step stays in the page (only hidden), so the final post carries all
 * the answers.
 */
const ShowcaseForm = ({ definition }: { definition: ShowcaseFormDefinition }) => {
  const { language } = useLanguage();
  const es = language === "es";
  const formRef = useRef<HTMLFormElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
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
  const last = sections.length - 1;

  const goTo = (i: number) => {
    setStep(i);
    setReached((r) => Math.max(r, i));
    const top = formRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) window.scrollTo({ top: window.scrollY + top - 100, behavior: "smooth" });
  };

  /** Ids of the questions in a step that are missing or wrong. */
  const problemsIn = (i: number) => {
    const form = formRef.current;
    if (!form) return [];
    const data = new FormData(form);
    return sections[i].preguntas
      .filter((q) => {
        const value = String(data.get(q.id) ?? "");
        if (q.id === "guardianEmail" && needsGuardian && !value.trim()) return true;
        return !isValidAnswer(q, value);
      })
      .map((q) => q.id);
  };

  const next = () => {
    const problems = problemsIn(step);
    setInvalid(problems);
    if (problems.length) {
      setStatus("error");
      formRef.current?.querySelector<HTMLElement>(`#sc-${problems[0]}`)?.focus();
      return;
    }
    setStatus("idle");
    goTo(step + 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    // Enter on an earlier step moves on instead of sending.
    if (step < last) return next();

    const form = event.currentTarget;
    const consent = (form.elements.namedItem("consent") as HTMLInputElement | null)?.checked ?? false;
    const problems = [...problemsIn(step), ...(consent ? [] : ["consent"])];
    if (problems.length) {
      setInvalid(problems);
      setStatus("error");
      return;
    }

    const data: Record<string, unknown> = Object.fromEntries(new FormData(form));
    data.consent = consent;
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
      // Send the player back to the first step with something to fix.
      const at = sections.findIndex((s) => s.preguntas.some((q) => fields.includes(q.id)));
      if (at >= 0 && at !== step) goTo(at);
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
            ? "El showcase es solo por invitación y hay 60 plazas. Revisamos cada perfil uno a uno; si encajas, te escribimos por WhatsApp o correo con la invitación y cómo pagar la inscripción (45 €)."
            : "The Showcase is by invitation only and there are 60 places. We review every profile one by one; if you are a fit, we will write on WhatsApp or by email with your invitation and how to pay the registration fee (€45)."}
        </p>
        <LocaleLink
          to="/recursos"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
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
      ref={formRef}
      onSubmit={handleSubmit}
      onChange={(e) => {
        const t = e.target as unknown as HTMLInputElement;
        if (t.name === "birthDate") setBirthDate(t.value);
        if (t.name === "contactOf") setContactOf(t.value);
        if (t.name === "country") setCountry(t.value);
      }}
      noValidate
      className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
    >
      {/* Bots fill this in; it is never shown to a person. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="sc-website">Website</label>
        <input id="sc-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Numbered steps. Steps already seen can be reopened. */}
      <ol className="mb-8 flex items-center" aria-label={es ? "Pasos" : "Steps"}>
        {sections.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={s.id} className={`flex items-center ${i < last ? "flex-1" : ""}`}>
              <button
                type="button"
                onClick={() => i <= reached && goTo(i)}
                disabled={i > reached}
                aria-current={current ? "step" : undefined}
                aria-label={`${es ? "Paso" : "Step"} ${i + 1}: ${es ? s.es : s.en || s.es}`}
                className="group flex shrink-0 items-center gap-2 disabled:cursor-default"
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full font-body text-sm font-bold transition-colors ${
                    current
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                      : done || i <= reached
                        ? "bg-primary/10 text-primary group-hover:bg-primary/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={`hidden font-body text-[13px] font-semibold lg:inline ${current ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {es ? s.es : s.en || s.es}
                </span>
              </button>
              {i < last && <span className={`mx-2 h-0.5 flex-1 rounded-full ${i < step ? "bg-primary/40" : "bg-border"}`} />}
            </li>
          );
        })}
      </ol>

      {sections.map((s, i) => (
        <div key={s.id} hidden={i !== step}>
          <Section n={i + 1} total={sections.length} title={es ? s.es : s.en || s.es} es={es}>
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
        </div>
      ))}

      {step === last && (
        <div className="mt-7 space-y-5 border-t border-border pt-7">
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-xl bg-muted/60 px-4 py-3 font-body text-[14px] leading-relaxed text-muted-foreground">
            <span className="font-display text-xl font-bold text-foreground">45 €</span>
            {es
              ? "es la inscripción para jugadores de España (incluye equipación, sudadera y seguro). No pagas nada al enviar este formulario: primero te confirmamos si tienes plaza."
              : "is the registration fee for players from Spain (kit, hoodie and insurance included). You pay nothing when you send this form: we first confirm whether you have a place."}
          </p>
          <label
            htmlFor="sc-consent"
            className="flex cursor-pointer items-start gap-3 font-body text-[14px] leading-relaxed text-muted-foreground"
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
        </div>
      )}

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-destructive/40 px-4 py-3 font-body text-[14px] leading-relaxed text-destructive"
          style={{ backgroundColor: "hsl(var(--destructive) / 0.07)" }}
        >
          {invalid.length > 0
            ? invalid.length === 1 && invalid[0] === "consent"
              ? es
                ? "Marca la casilla de la política de datos para enviarlo."
                : "Tick the data policy box to send it."
              : es
                ? "Revisa los campos marcados en rojo."
                : "Check the fields marked in red."
            : es
              ? "No hemos podido enviarlo. Inténtalo otra vez o escríbenos a futboluagency@gmail.com."
              : "We could not send it. Try again or write to us at futboluagency@gmail.com."}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setInvalid([]);
              setStatus("idle");
              goTo(step - 1);
            }}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-3 font-body font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {es ? "Atrás" : "Back"}
          </button>
        ) : (
          <span />
        )}
        {step < last ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {es ? "Siguiente" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 py-3.5 font-body font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {es ? "Enviando…" : "Sending…"}
              </>
            ) : (
              <>
                {es ? "Enviar inscripción" : "Send registration"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default ShowcaseForm;
