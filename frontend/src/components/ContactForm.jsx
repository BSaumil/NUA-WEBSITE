import React, { useRef, useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { submitLead, FORM_MODE } from "@/lib/submitLead";
import { SUPPORT_EMAIL } from "@/config/siteConfig";

const VENUE_OPTIONS = ["1 venue", "2–10 venues", "11–49 venues", "50+ venues"];

const EMPTY = { name: "", email: "", business: "", phone: "", venues: "", message: "" };

// Declaration order, so "first invalid" means first on the page.
const FIELD_ORDER = ["name", "email", "business", "phone", "venues", "message"];

// Deliberately permissive. The purpose is to catch a typo like a missing "@",
// not to adjudicate RFC 5322 — a form that rejects a real address is worse
// than one that lets a bad one through, because the second case the sender can
// still be chased and the first loses the lead entirely.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [failure, setFailure] = useState("");
  const statusRef = useRef(null);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // Clear a field's error as soon as the person starts addressing it, rather
    // than leaving it shouting until the next submit.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "Please add an email so we can reply.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "That does not look like an email address.";
    if (!form.message.trim()) next.message = "Please tell us what you would like to know.";
    return next;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate();
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((k) => found[k]);
    if (firstInvalid) {
      // Move focus to the first problem. Without this a screen reader user is
      // told something failed but not where, and a sighted keyboard user has
      // to hunt back up the form.
      //
      // By id rather than by ref: the ref is only attached on the render that
      // follows setErrors, so it is still null here. The element itself is
      // already in the DOM, which makes the lookup the reliable route.
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    setFailure("");
    const result = await submitLead(form, { subject: "Website enquiry" });

    if (result.ok) {
      setStatus("sent");
      setForm(EMPTY);
      statusRef.current?.focus();
    } else {
      setStatus("error");
      setFailure(result.error || "Something went wrong.");
      statusRef.current?.focus();
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        data-testid="contact-form-success"
        className="rounded-2xl bg-nua-surface border border-nua-border p-8 text-center"
        role="status"
      >
        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7" style={{ color: "#046C4E" }} />
        </div>
        <h2 className="font-display text-xl font-bold text-nua-ink">
          {FORM_MODE === "mailto" ? "Your email is ready to send." : "Message sent."}
        </h2>
        <p className="mt-2 text-sm text-nua-ink2 max-w-sm mx-auto">
          {FORM_MODE === "mailto"
            ? `We have opened a draft to ${SUPPORT_EMAIL} with your details filled in. Send it and a real person will reply.`
            : "A real person on the team will reply, usually within one business day."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          data-testid="contact-form-again"
          className="mt-6 px-5 py-2.5 rounded-full border border-nua-border text-nua-ink text-sm font-medium hover:bg-nua-bgAlt transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  const field = (key, label, { as, ...props } = {}) => {
    const invalid = Boolean(errors[key]);
    const common = {
      id: `contact-${key}`,
      name: key,
      value: form[key],
      onChange: update(key),
      "aria-invalid": invalid || undefined,
      "aria-describedby": invalid ? `contact-${key}-error` : undefined,
      className: `mt-1.5 w-full rounded-xl bg-nua-surface px-3.5 py-2.5 text-sm text-nua-ink placeholder:text-nua-muted border ${
        invalid ? "border-[#B01B1B]" : "border-nua-borderControl"
      }`,
      ...props,
    };
    return (
      <div>
        <label htmlFor={`contact-${key}`} className="font-mono text-[11px] uppercase tracking-widest text-nua-ink2">
          {label}
        </label>
        {as === "textarea" ? (
          <textarea {...common} rows={5} />
        ) : as === "select" ? (
          <select {...common}>
            <option value="">Select…</option>
            {VENUE_OPTIONS.map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        ) : (
          <input {...common} />
        )}
        {invalid && (
          <p id={`contact-${key}-error`} className="mt-1.5 text-[13px]" style={{ color: "#B01B1B" }}>
            {errors[key]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-testid="contact-form"
      className="rounded-2xl bg-nua-surface border border-nua-border p-6 sm:p-8"
    >
      <h2 className="font-display text-xl font-bold text-nua-ink">Send us a message</h2>
      <p className="mt-1.5 text-sm text-nua-ink2">
        Everything here reaches the same inbox as {SUPPORT_EMAIL}. A real person replies.
      </p>

      {/*
        Honeypot. Named like a real field because bots fill what looks
        plausible, hidden from everyone else including screen readers, and
        taken out of the tab order so a keyboard user never lands in it.
      */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company-url">Company website</label>
        <input id="contact-company-url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {field("name", "Your name *", { required: true, autoComplete: "name", placeholder: "Sam B." })}
        {field("email", "Email *", { required: true, type: "email", autoComplete: "email", placeholder: "you@venue.com" })}
        {field("business", "Business", { autoComplete: "organization", placeholder: "Lumière Group" })}
        {field("phone", "Phone", { type: "tel", autoComplete: "tel", placeholder: "+61 4xx xxx xxx" })}
      </div>

      <div className="mt-4">{field("venues", "How many venues", { as: "select" })}</div>
      <div className="mt-4">
        {field("message", "What would you like to know? *", {
          as: "textarea",
          required: true,
          placeholder: "What you run today, what is not working, and what you are hoping to change.",
        })}
      </div>

      {/*
        One live region for both outcomes. Assertive because a failed send is
        something the person has to act on now, and the message replaces the
        button they just pressed.
      */}
      <div aria-live="assertive" className="mt-4">
        {status === "error" && (
          <div
            ref={statusRef}
            tabIndex={-1}
            data-testid="contact-form-error"
            className="flex items-start gap-2.5 rounded-xl border p-3.5"
            style={{ borderColor: "#B01B1B", background: "rgba(176,27,27,0.06)" }}
          >
            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#B01B1B" }} />
            <div className="text-[13px]" style={{ color: "#B01B1B" }}>
              {failure}{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="underline underline-offset-2"
                style={{ color: "#B01B1B" }}
              >
                Email us directly instead.
              </a>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        data-testid="contact-form-submit"
        className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nua-burgundy hover:bg-nua-burgundyDark disabled:opacity-60 text-white text-sm font-medium transition-colors"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send message
          </>
        )}
      </button>

      <p className="mt-3 text-[12px] text-nua-muted">* Required. We only use these details to reply to you.</p>
    </form>
  );
}
