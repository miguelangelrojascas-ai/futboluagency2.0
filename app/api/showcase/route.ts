/**
 * Receives a Showcase registration and hands it to the FUA CRM.
 *
 * The CRM (CRM-FUA, /api/showcase) does the validation and stores it in its
 * "Showcase" section. Forwarding from here rather than from the browser keeps
 * the CRM address out of the page and avoids cross-site requests. Set CRM_URL
 * to point at another CRM deployment.
 */

const CRM_URL =
  process.env.CRM_URL ?? "https://vetcrm-veterinary-clinic-dash-pi-blond.vercel.app";

/** Generous ceiling for a form post; anything bigger is not a real person. */
const MAX_BYTES = 20_000;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export async function POST(request: Request): Promise<Response> {
  const raw = await request.text();
  if (raw.length > MAX_BYTES) return json(413, { error: "too_large" });

  try {
    JSON.parse(raw);
  } catch {
    return json(400, { error: "invalid_json" });
  }

  try {
    const response = await fetch(`${CRM_URL}/api/showcase`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: raw,
      signal: AbortSignal.timeout(15_000),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("CRM rejected the showcase registration", response.status, payload);
    }
    // Pass on only what the form needs: success, or which fields to fix.
    return json(response.ok ? 200 : response.status === 400 ? 400 : 502, {
      ok: response.ok,
      fields: Array.isArray(payload?.fields) ? payload.fields : undefined,
    });
  } catch (error) {
    console.error("Could not reach the CRM", error);
    return json(502, { error: "crm_unavailable" });
  }
}
