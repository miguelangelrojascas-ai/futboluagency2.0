import { BUDGETS, COUNTRIES, START_TERMS } from "@/data/leadOptions";
import { CRM_URL } from "@/lib/showcaseForm";

/**
 * Receives an admissions form submission ("Aplicar") and hands it to the FUA CRM.
 *
 * Checked here first (every select against a closed list) so obvious junk never
 * leaves the site, then forwarded server to server to the CRM (CRM-FUA,
 * /api/lead), which creates the lead with all its fields and a follow-up for
 * today. The CRM address stays out of the page.
 */

/** Longest value we accept per text field, so a submission cannot be huge. */
const MAX_TEXT = 500;
const MAX_NOTES = 4000;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const text = (value: unknown, limit = MAX_TEXT) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

/** Accepts only http(s) links, so the video fields cannot carry a javascript: URL. */
const httpUrl = (value: unknown) => {
  const raw = text(value);
  if (!raw) return "";
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : "";
  } catch {
    return "";
  }
};

const oneOf = <T extends readonly string[]>(value: unknown, allowed: T) => {
  const raw = text(value, 100);
  return (allowed as readonly string[]).includes(raw) ? raw : "";
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // Bots fill in every field they find; a real person never sees this one.
  if (text(body.website)) return json(200, { ok: true });

  const name = text(body.name, 200);
  const email = text(body.email, 200).toLowerCase();
  const whatsapp = text(body.whatsapp, 40);
  const country = oneOf(body.country, COUNTRIES);
  const position = text(body.position, 120);
  const highlightVideo = httpUrl(body.highlightVideo);
  const budget = oneOf(body.budget, BUDGETS);
  const age = Number(body.age);

  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!isEmail(email)) missing.push("email");
  if (!whatsapp) missing.push("whatsapp");
  if (!country) missing.push("country");
  if (!Number.isFinite(age) || age < 13 || age > 40) missing.push("age");
  if (!position) missing.push("position");
  if (!highlightVideo) missing.push("highlightVideo");
  if (!budget) missing.push("budget");

  if (missing.length > 0) {
    return json(400, { error: "invalid_fields", fields: missing });
  }

  const lead = {
    name,
    email,
    whatsapp,
    country,
    age: Math.round(age),
    position,
    highlightVideo,
    budget,
    instagram: text(body.instagram, 120),
    major: text(body.major, 200),
    stats: text(body.stats),
    fullMatchVideo: httpUrl(body.fullMatchVideo),
    startTerm: oneOf(body.startTerm, START_TERMS),
    notes: text(body.notes, MAX_NOTES),
  };

  try {
    const response = await fetch(`${CRM_URL}/api/lead`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(15_000),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      // Logged for us, not returned: the reply would otherwise describe the CRM.
      console.error("CRM rejected the lead", response.status, payload);
      return json(response.status === 400 ? 400 : 502, {
        error: "crm_unavailable",
        fields: Array.isArray(payload?.fields) ? payload.fields : undefined,
      });
    }
    return json(200, { ok: true });
  } catch (error) {
    console.error("Could not reach the CRM", error);
    return json(502, { error: "crm_unavailable" });
  }
}
