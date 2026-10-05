import { SUPPORT_EMAIL, FORM_ENDPOINT } from "@/config/siteConfig";

/**
 * One submission path for every lead the site collects.
 *
 * The site is static — the Vercel output is plain files, there is no server —
 * so "send an email" has to be somebody else's endpoint. FORM_ENDPOINT points
 * at a form backend (Formspree and its equivalents all accept a plain JSON
 * POST and forward to a configured inbox), and the inbox is set in that
 * service's dashboard rather than here, which is what keeps the destination
 * address out of the bundle.
 *
 * When no endpoint is configured the form does not pretend to work and does
 * not silently drop the message: it hands the visitor a prefilled mail draft
 * to the public support address instead. That is worse UX than a real POST,
 * but every field they typed survives, which is the part that matters. The
 * previous behaviour was to hide every call to action on the site, so a
 * degraded path is a strict improvement.
 */

export const FORM_MODE = FORM_ENDPOINT ? "endpoint" : "mailto";

const LABELS = {
  name: "Name",
  email: "Email",
  business: "Business",
  phone: "Phone",
  venues: "Venues",
  message: "Message",
  plan: "Plan",
  type: "Request",
};

/** Human-readable body, used for the mail draft and as the email's text part. */
function asText(fields) {
  return Object.entries(fields)
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([k, v]) => `${LABELS[k] || k}: ${v}`)
    .join("\n");
}

function mailtoHref(fields, subject) {
  const params = new URLSearchParams({
    subject,
    body: asText(fields),
  });
  // URLSearchParams encodes spaces as "+", which some mail clients paste
  // literally into the body. Newlines matter more here than brevity.
  return `mailto:${SUPPORT_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

/**
 * Returns { ok, mode, error }. Never throws: a form that explodes on a network
 * blip is worse than one that says it could not send.
 */
export async function submitLead(fields, { subject = "Website enquiry" } = {}) {
  if (FORM_MODE === "mailto") {
    if (typeof window !== "undefined") {
      window.location.href = mailtoHref(fields, subject);
    }
    return { ok: true, mode: "mailto" };
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        _subject: subject,
        // Plain-text rendering for inboxes that show the raw payload.
        summary: asText(fields),
      }),
    });

    if (res.ok) return { ok: true, mode: "endpoint" };

    // Form backends return field-level problems as JSON; surface the first one
    // rather than a generic failure, since it is usually actionable ("email is
    // invalid") rather than infrastructural.
    let detail = "";
    try {
      const body = await res.json();
      detail = body?.errors?.[0]?.message || body?.error || "";
    } catch {
      /* non-JSON error body */
    }
    return { ok: false, mode: "endpoint", error: detail || `Request failed (${res.status})` };
  } catch {
    return { ok: false, mode: "endpoint", error: "Could not reach the server. Check your connection and try again." };
  }
}

export { mailtoHref };
