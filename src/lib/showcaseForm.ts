/**
 * The Showcase registration questions.
 *
 * They are edited in the FUA CRM (Showcase → Editar preguntas) and read from
 * its public /api/showcase endpoint. The page re-checks every minute, so a
 * change in the CRM reaches the site without a deploy. If the CRM cannot be
 * reached, the form falls back to the copy bundled here.
 */
import fallback from "@/data/showcaseFormDefault.json";

export type FormOption = { es: string; en: string };
export type FormQuestion = {
  id: string;
  tipo: "text" | "textarea" | "email" | "tel" | "url" | "number" | "date" | "select" | "country";
  es: string;
  en: string;
  ayudaEs?: string;
  ayudaEn?: string;
  placeholderEs?: string;
  placeholderEn?: string;
  opciones?: FormOption[];
  obligatoria: boolean;
  activa: boolean;
  ancho?: "mitad" | "completo";
};
export type FormSection = { id: string; es: string; en: string; preguntas: FormQuestion[] };
export type ShowcaseFormDefinition = { secciones: FormSection[] };

export const CRM_URL =
  process.env.CRM_URL ?? "https://vetcrm-veterinary-clinic-dash-pi-blond.vercel.app";

/** How often (seconds) the page picks up changes made in the CRM. */
export const FORM_REVALIDATE = 60;

const FALLBACK = fallback as ShowcaseFormDefinition;

export async function getShowcaseForm(): Promise<ShowcaseFormDefinition> {
  try {
    const response = await fetch(`${CRM_URL}/api/showcase`, {
      next: { revalidate: FORM_REVALIDATE },
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) return FALLBACK;
    const data = (await response.json()) as ShowcaseFormDefinition;
    return Array.isArray(data?.secciones) && data.secciones.length ? data : FALLBACK;
  } catch {
    return FALLBACK;
  }
}
