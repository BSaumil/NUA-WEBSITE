import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { TRIAL_DAYS } from "@/config/siteConfig";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const venueOptions = ["1 venue", "2–10 venues", "11–49 venues", "50+ venues"];

export default function LeadDialog({ open, onOpenChange, type = "demo", plan = null }) {
  const isDemo = type === "demo";
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    phone: "",
    venues: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpenChange = (v) => {
    if (!v) {
      setSuccess(false);
    }
    onOpenChange(v);
  };

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please add your name and email");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/leads`, {
        ...form,
        type,
        plan: plan || undefined,
        source: "landing",
      });
      setSuccess(true);
      toast.success(isDemo ? "Demo request received 🎉" : "Trial request received 🎉", {
        description: "We'll be in touch within 24 hours.",
      });
      setForm({ name: "", email: "", business: "", phone: "", venues: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      let msg = "Something went wrong. Please try again.";
      if (Array.isArray(detail)) {
        msg = detail.map((d) => d?.msg || d?.message || "Invalid input").join("; ");
      } else if (typeof detail === "string") {
        msg = detail;
      }
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid="lead-dialog"
        className="sm:max-w-[560px] bg-[#0f0f17] border-white/10 text-white p-0 overflow-hidden"
      >
        {/* Gradient header */}
        <div className="relative px-6 pt-6 pb-5 border-b border-white/5 bg-gradient-to-br from-[#8b5cf6]/15 via-transparent to-[#f58c14]/15">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#8b5cf6]/30 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/10 bg-white/5">
              <Sparkles className="w-3 h-3 text-[#f58c14]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#a1a1aa]">
                {isDemo ? "Book a demo" : "Start free trial"}
              </span>
            </div>
            <DialogHeader className="mt-3 text-left">
              <DialogTitle className="font-display text-2xl font-bold text-white">
                {isDemo ? "Talk to a hospitality operator." : "Spin up NUA in minutes."}
              </DialogTitle>
              <DialogDescription className="text-[#a1a1aa]">
                {isDemo
                  ? "30-min call, your tech stack reviewed live, custom rollout plan within 24 hours."
                  : `${TRIAL_DAYS}-day free trial · no card required · migrate from any POS.`}
                {plan ? <span className="block mt-1 text-[#c4b5fd]">Selected plan: <span className="font-mono">{plan}</span></span> : null}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Body */}
        {success ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">You&apos;re on the list.</h3>
            <p className="mt-2 text-sm text-[#a1a1aa] max-w-sm mx-auto">
              A NUA operator will reach out within 24 hours. Meanwhile, keep an eye on your inbox, including spam.
            </p>
            <button
              data-testid="lead-success-close"
              onClick={() => handleOpenChange(false)}
              className="mt-6 px-5 py-2.5 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="lead-name" className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                  Full name *
                </Label>
                <Input
                  id="lead-name"
                  data-testid="lead-name-input"
                  value={form.name}
                  onChange={update("name")}
                  required
                  placeholder="Anaïs Laurent"
                  className="mt-1.5 bg-white/[0.04] border-white/10 text-white placeholder:text-[#52525b]"
                />
              </div>
              <div>
                <Label htmlFor="lead-email" className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                  Work email *
                </Label>
                <Input
                  id="lead-email"
                  data-testid="lead-email-input"
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  required
                  placeholder="you@venue.com"
                  className="mt-1.5 bg-white/[0.04] border-white/10 text-white placeholder:text-[#52525b]"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="lead-business" className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                  Business name
                </Label>
                <Input
                  id="lead-business"
                  data-testid="lead-business-input"
                  value={form.business}
                  onChange={update("business")}
                  placeholder="Lumière Group"
                  className="mt-1.5 bg-white/[0.04] border-white/10 text-white placeholder:text-[#52525b]"
                />
              </div>
              <div>
                <Label htmlFor="lead-phone" className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                  Phone
                </Label>
                <Input
                  id="lead-phone"
                  data-testid="lead-phone-input"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+61 4xx xxx xxx"
                  className="mt-1.5 bg-white/[0.04] border-white/10 text-white placeholder:text-[#52525b]"
                />
              </div>
            </div>

            <div>
              <Label className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                Number of venues
              </Label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {venueOptions.map((v) => (
                  <button
                    type="button"
                    key={v}
                    data-testid={`lead-venues-${v.split(" ")[0]}`}
                    onClick={() => setForm((f) => ({ ...f, venues: v }))}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      form.venues === v
                        ? "border-[#8b5cf6] bg-[#8b5cf6]/15 text-[#c4b5fd]"
                        : "border-white/10 text-[#a1a1aa] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="lead-message" className="text-[11px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                Notes (optional)
              </Label>
              <Textarea
                id="lead-message"
                data-testid="lead-message-input"
                value={form.message}
                onChange={update("message")}
                placeholder="Anything we should know before the call?"
                rows={3}
                className="mt-1.5 bg-white/[0.04] border-white/10 text-white placeholder:text-[#52525b] resize-none"
              />
            </div>

            <button
              type="submit"
              data-testid="lead-submit-btn"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#f58c14] hover:bg-[#d87b10] text-white text-sm font-medium shadow-lg shadow-[#f58c14]/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                </>
              ) : (
                <>{isDemo ? "Book my demo" : "Start my free trial"}</>
              )}
            </button>

            <p className="text-center text-[10px] font-mono uppercase tracking-widest text-[#666670]">
              By submitting, you agree to our privacy policy
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
