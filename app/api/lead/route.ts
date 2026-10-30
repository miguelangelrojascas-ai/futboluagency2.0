import { BUDGETS, COUNTRIES, START_TERMS } from "@/data/leadOptions";

/**
 * Receives an admissions form submission and writes it to the CRM.
 *
 * The Airtable token lives only in the AIRTABLE_TOKEN environment variable, so
 * it never reaches the browser. Records are created with `typecast` off and
 * every select is checked against a closed list, which means a crafted request
 * cannot invent new select options in the base.
 */

const BASE_ID = "appwUisPpFsktV9d5";
const TABLE_ID = "tbliwN3tDaKzYzVVa";

const FIELD = {
  name: "fldp81ekfc7PAs2Uu",
  email: "fldSJhlTR6xmeES8U",
  whatsapp: "fldelhx52GV5tX3MS",
  instagram: "fldFUwMN2dJvUIqcy",
  country: "fldAzbYHq4mTdx4NK",
  age: "fldVQqQJrjte0GT5J",
  major: "fldyKDhRL7Hy7BElg",
  position: "fldcWjPFrZwBkD3Rk",
  stats: "fldzDozgGTPNQIeeW",
  highlightVideo: "fldJR1x7Zs5nYTjxQ",
  fullMatchVideo: "fldciiFFSTx9QHQk2",
  startTerm: "fldPLGO0qOwdhgBfn",
  budget: "fld7NHC4YebrXkXdi",
  notes: "fld4FWIPCyeYIOvAQ",
  sport: "fldnzcYj7SBm1N1hE",
  stage: "flduKFfELyHMWCuFO",
  contactDate: "fldanL2TbwukyWSae",
} as const;

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
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    console.error("AIRTABLE_TOKEN is not set");
    return json(500, { error: "server_misconfigured" });
  }

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

  const fields: Record<string, unknown> = {
    [FIELD.name]: name,
    [FIELD.email]: email,
    [FIELD.whatsapp]: whatsapp,
    [FIELD.country]: country,
    [FIELD.age]: Math.round(age),
    [FIELD.position]: position,
    [FIELD.highlightVideo]: highlightVideo,
    [FIELD.budget]: budget,
    // Set for the team so a new lead lands in the pipeline ready to work.
    [FIELD.sport]: "Futbol",
    [FIELD.stage]: "Nuevo lead",
    [FIELD.contactDate]: new Date().toISOString().slice(0, 10),
  };

  const instagram = text(body.instagram, 120);
  const major = text(body.major, 200);
  const stats = text(body.stats);
  const fullMatchVideo = httpUrl(body.fullMatchVideo);
  const startTerm = oneOf(body.startTerm, START_TERMS);
  const notes = text(body.notes, MAX_NOTES);

  if (instagram) fields[FIELD.instagram] = instagram;
  if (major) fields[FIELD.major] = major;
  if (stats) fields[FIELD.stats] = stats;
  if (fullMatchVideo) fields[FIELD.fullMatchVideo] = fullMatchVideo;
  if (startTerm) fields[FIELD.startTerm] = startTerm;
  if (notes) fields[FIELD.notes] = notes;

  const response = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }], typecast: false }),
    },
  );

  if (!response.ok) {
    // Logged for us, not returned: the reply would otherwise describe the base.
    console.error("Airtable rejected the lead", response.status, await response.text());
    return json(502, { error: "crm_unavailable" });
  }

  return json(200, { ok: true });
}
