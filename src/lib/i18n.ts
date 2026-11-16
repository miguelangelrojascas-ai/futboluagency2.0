import { Fragment, createElement, type ReactNode } from "react";
import itDict from "@/locales/it.json";
import deDict from "@/locales/de.json";

/**
 * Copy in every language the site speaks.
 *
 * Spanish and English are written in the components. Italian and German come
 * from src/locales/<lang>.json, keyed by the English text, so a component
 * never has to change when a translation is added or corrected. Anything not
 * translated yet falls back to English rather than showing a gap.
 */
export type Copy<T = string> = { es: T; en: T; it?: T; de?: T };

const DICT: Record<string, Record<string, string>> = { it: itDict, de: deDict };

/** The English text in another language, or the English text itself. */
export function translate(language: string, en: string): string {
  return DICT[language]?.[en] ?? en;
}

/* Walks strings, arrays and plain objects, translating every string. */
function deep<T>(value: T, language: string): T {
  if (typeof value === "string") return translate(language, value) as T;
  if (Array.isArray(value)) return value.map((v) => deep(v, language)) as T;
  /* React elements are plain objects too; they stay as written. */
  if (value && typeof value === "object" && !("$$typeof" in value) && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deep(v, language)])) as T;
  }
  return value;
}

/**
 * One string written as Spanish/English, in the current language. Values that
 * change (a name, a count) are passed in `vars` and written as {0}, {1}… so
 * the dictionary holds one entry per sentence.
 */
export function tr(language: string, es: string, en: string, vars?: unknown[]): string {
  const text = language === "es" ? es : language === "en" ? en : translate(language, en);
  return vars ? text.replace(/\{(\d+)\}/g, (_, i) => String(vars[Number(i)] ?? "")) : text;
}

/** A { es, en, it?, de? } value (string, list or object) in the current language. */
export function pick<T>(language: string, copy: { es: T; en: T; it?: T; de?: T }): T {
  const own = (copy as Record<string, T | undefined>)[language];
  if (own !== undefined) return own;
  return language === "es" ? copy.es : deep(copy.en, language);
}

/** "Fall 2027" in the visitor's language; the submitted value stays in English. */
const TERM: Record<string, [string, string]> = { it: ["Autunno", "Primavera"], de: ["Herbst", "Frühjahr"] };
export function termLabel(language: string, term: string): string {
  const t = TERM[language];
  return t ? term.replace("Fall", t[0]).replace("Spring", t[1]) : term;
}

/**
 * tr() for a sentence with inline markup: <b>…</b> and <a>…</a> in the text
 * are rendered by the matching function, so translators keep the markup.
 */
export function rich(
  language: string,
  es: string,
  en: string,
  tags: Partial<Record<"b" | "a", (inner: string) => ReactNode>>,
): ReactNode {
  const text = tr(language, es, en);
  const parts = text.split(/(<(?:b|a)>.*?<\/(?:b|a)>)/g);
  return createElement(
    Fragment,
    null,
    ...parts.map((part, i) => {
      const m = part.match(/^<(b|a)>(.*?)<\/\1>$/);
      const render = m ? tags[m[1] as "b" | "a"] : undefined;
      return createElement(Fragment, { key: i }, m && render ? render(m[2]) : part);
    }),
  );
}
