"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Send,
} from "lucide-react";
import {
  budgetRanges,
  contactMethods,
  enquirySchema,
  serviceInterests,
} from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";
const labelBase = "mb-1.5 block text-sm font-medium text-foreground";
const errorBase = "mt-1.5 flex items-center gap-1.5 text-xs text-danger";

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    businessName: "",
    websiteUrl: "",
    services: [] as string[],
    budget: "",
    contactMethod: "email",
    message: "",
    consent: false,
    company: "", // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const serviceLabels = useMemo(
    () =>
      Object.fromEntries(serviceInterests.map((s) => [s.value, s.label])),
    []
  );

  const set = (field: string, value: string | boolean | string[]) => {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => {
      if (!e[field]) return e;
      const next = { ...e };
      delete next[field];
      return next;
    });
  };

  const toggleService = (value: string) => {
    set(
      "services",
      values.services.includes(value)
        ? values.services.filter((s) => s !== value)
        : [...values.services, value]
    );
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        if (json.fieldErrors) setErrors(json.fieldErrors);
        setServerError(
          json.error ?? "Submission failed. Please try again shortly."
        );
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError(
        "Network error — your enquiry could not be sent. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 rounded-2xl border border-accent/40 bg-surface p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Your enquiry has been received.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Thank you, {values.name.split(" ")[0]}. Your message has been
            recorded and we&apos;ll reply to{" "}
            <span className="text-foreground">{values.email}</span> as soon as
            we&apos;ve reviewed it — usually within one to two working days.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setValues({
              name: "",
              email: "",
              businessName: "",
              websiteUrl: "",
              services: [],
              budget: "",
              contactMethod: "email",
              message: "",
              consent: false,
              company: "",
            });
          }}
          className="text-sm font-medium text-accent-strong underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot — invisible to humans */}
      <div className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Full name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputBase}
            placeholder="Alex Morgan"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className={errorBase}>
              <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            Email address <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputBase}
            placeholder="you@business.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className={errorBase}>
              <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="businessName" className={labelBase}>
            Business name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            className={inputBase}
            placeholder="Morgan's Cleaning Co."
            value={values.businessName}
            onChange={(e) => set("businessName", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="websiteUrl" className={labelBase}>
            Current website <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            inputMode="url"
            className={inputBase}
            placeholder="https://yourbusiness.com"
            value={values.websiteUrl}
            onChange={(e) => set("websiteUrl", e.target.value)}
            aria-invalid={!!errors.websiteUrl}
            aria-describedby={errors.websiteUrl ? "websiteUrl-error" : undefined}
          />
          {errors.websiteUrl && (
            <p id="websiteUrl-error" className={errorBase}>
              <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {errors.websiteUrl}
            </p>
          )}
        </div>
      </div>

      <fieldset>
        <legend className={cn(labelBase, "mb-3")}>
          What are you interested in? <span className="text-accent">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceInterests.map((s) => {
            const active = values.services.includes(s.value);
            return (
              <button
                key={s.value}
                type="button"
                aria-pressed={active}
                onClick={() => toggleService(s.value)}
                className={cn(
                  "h-10 rounded-full border px-4 text-sm font-medium transition-all duration-300",
                  active
                    ? "border-accent bg-accent text-on-accent"
                    : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
                )}
              >
                {serviceLabels[s.value]}
              </button>
            );
          })}
        </div>
        {errors.services && (
          <p className={errorBase}>
            <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {errors.services}
          </p>
        )}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelBase}>
            Budget range <span className="font-normal text-muted">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              className={cn(inputBase, "appearance-none pr-10")}
              value={values.budget}
              onChange={(e) => set("budget", e.target.value)}
            >
              <option value="">Select a range</option>
              {budgetRanges.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
          </div>
        </div>
        <div>
          <label htmlFor="contactMethod" className={labelBase}>
            Preferred contact method
          </label>
          <div className="relative">
            <select
              id="contactMethod"
              name="contactMethod"
              className={cn(inputBase, "appearance-none pr-10")}
              value={values.contactMethod}
              onChange={(e) => set("contactMethod", e.target.value)}
            >
              {contactMethods.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          About your project <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={cn(inputBase, "resize-y leading-relaxed")}
          placeholder="Tell us what you're building, what's slowing you down, or what you'd like to improve…"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.message ? (
            <p id="message-error" className={errorBase}>
              <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {errors.message}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted">{values.message.length}/3000</span>
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#34d399]"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I&apos;m happy for Veya to use these details to respond to my
            enquiry, as described in the{" "}
            <a
              href="/privacy"
              className="text-accent-strong underline-offset-4 hover:underline"
            >
              privacy policy
            </a>
            . My information won&apos;t be shared for marketing.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className={errorBase}>
            <AlertCircle className="h-3.5 w-3.5" aria-hidden /> {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-foreground"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
          {serverError}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-on-accent transition-all duration-300 hover:bg-accent-strong disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending your enquiry…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden />
              Send Enquiry
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-muted">
          Your details are used only to respond to this enquiry. No newsletters,
          no third-party marketing, ever.
        </p>
      </div>
    </form>
  );
}
