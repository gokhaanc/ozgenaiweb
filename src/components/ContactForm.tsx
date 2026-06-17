"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { ServiceContent, SiteContent } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { trackEvent } from "@/lib/analytics";
import type { ServiceSlug } from "@/lib/routes";

type ContactFormProps = {
  locale: Locale;
  content: SiteContent["contact"];
  services: readonly ServiceContent[];
  initialService?: ServiceSlug;
};

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  budget: string;
  timeline: string;
  consent: boolean;
  website: string;
};

type FieldErrors = Partial<Record<keyof FormState, string[]>>;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => true;
      theme: "light";
      size: "normal" | "compact" | "flexible";
    },
  ) => string | undefined;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  var turnstile: TurnstileApi | undefined;
}

function initialState(initialService?: ServiceSlug): FormState {
  return {
    name: "",
    email: "",
    company: "",
    service: initialService ?? "",
    message: "",
    budget: "",
    timeline: "",
    consent: false,
    website: "",
  };
}

export function ContactForm({
  locale,
  content,
  services,
  initialService,
}: ContactFormProps) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [form, setForm] = useState<FormState>(() => initialState(initialService));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [started, setStarted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [resetTurnstile, setResetTurnstile] = useState<() => void>(() => () => {});

  const handleTurnstileReady = useCallback((reset: () => void) => {
    setResetTurnstile(() => reset);
  }, []);

  const clearTurnstileToken = useCallback(() => {
    setTurnstileToken("");
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
  }

  function markStarted() {
    if (!started) {
      setStarted(true);
      trackEvent("contact_form_start", { locale });
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFieldErrors({});

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        locale,
        sourcePath: window.location.pathname + window.location.search,
        turnstileToken,
      }),
    });

    const payload = (await response.json()) as {
      ok: boolean;
      details?: FieldErrors;
    };

    if (!response.ok || !payload.ok) {
      setFieldErrors(payload.details ?? {});
      setStatus("error");
      setTurnstileToken("");
      resetTurnstile();
      return;
    }

    trackEvent("contact_form_submit", {
      locale,
      service: form.service,
    });
    setStatus("success");
    setForm(initialState(initialService));
    setTurnstileToken("");
    resetTurnstile();
  }

  return (
    <form
      onSubmit={submit}
      onFocusCapture={markStarted}
      className="rounded-[8px] border border-stone-200 bg-white p-5 shadow-xl shadow-stone-950/5 md:p-8"
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id="name"
          label={content.form.name}
          value={form.name}
          error={fieldErrors.name?.[0]}
          onChange={(value) => update("name", value)}
        />
        <Field
          id="email"
          label={content.form.email}
          type="email"
          value={form.email}
          error={fieldErrors.email?.[0]}
          onChange={(value) => update("email", value)}
        />
        <Field
          id="company"
          label={content.form.company}
          value={form.company}
          error={fieldErrors.company?.[0]}
          onChange={(value) => update("company", value)}
        />
        <div>
          <label htmlFor="service" className="form-label">
            {content.form.service}
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={(event) => update("service", event.target.value)}
            className="form-field"
            aria-invalid={Boolean(fieldErrors.service)}
          >
            <option value="">{content.form.selectService}</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.shortTitle}
              </option>
            ))}
          </select>
          <FieldError message={fieldErrors.service?.[0]} />
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="form-label">
          {content.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          className="form-field resize-none"
          aria-invalid={Boolean(fieldErrors.message)}
        />
        <FieldError message={fieldErrors.message?.[0]} />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <SelectField
          id="budget"
          label={`${content.form.budget} (${content.form.optional})`}
          value={form.budget}
          options={content.budgetOptions}
          onChange={(value) => update("budget", value)}
        />
        <SelectField
          id="timeline"
          label={`${content.form.timeline} (${content.form.optional})`}
          value={form.timeline}
          options={content.timelineOptions}
          onChange={(value) => update("timeline", value)}
        />
      </div>
      <input
        tabIndex={-1}
        autoComplete="off"
        value={form.website}
        onChange={(event) => update("website", event.target.value)}
        name="website"
        className="hidden"
        aria-hidden="true"
      />
      <label className="mt-5 flex gap-3 text-sm leading-6 text-stone-700">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-stone-300"
        />
        <span>{content.form.consent}</span>
      </label>
      <FieldError message={fieldErrors.consent?.[0]} />
      {turnstileSiteKey ? (
        <TurnstileField
          siteKey={turnstileSiteKey}
          onReady={handleTurnstileReady}
          onVerify={setTurnstileToken}
          onExpire={clearTurnstileToken}
          onError={clearTurnstileToken}
        />
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting" || Boolean(turnstileSiteKey && !turnstileToken)}
        className="mt-6 inline-flex w-full items-center justify-center rounded-[8px] bg-[#06101f] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#123f8c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? content.form.submitting : content.form.submit}
      </button>
      {status === "success" ? (
        <div className="mt-5 rounded-[8px] bg-[#edf4ff] p-4 text-sm leading-6 text-[#08265d]">
          <strong>{content.form.successTitle}</strong> {content.form.successDescription}
        </div>
      ) : null}
      {status === "error" ? (
        <div className="mt-5 rounded-[8px] bg-red-50 p-4 text-sm leading-6 text-red-900">
          <strong>{content.form.errorTitle}</strong> {content.form.errorDescription}
        </div>
      ) : null}
    </form>
  );
}

function TurnstileField({
  siteKey,
  onReady,
  onVerify,
  onExpire,
  onError,
}: {
  siteKey: string;
  onReady: (reset: () => void) => void;
  onVerify: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderTurnstile = useCallback(() => {
    if (!containerRef.current || !globalThis.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current =
      globalThis.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": () => {
          onError();
          return true;
        },
        theme: "light",
        size: "flexible",
      }) ?? null;
  }, [onError, onExpire, onVerify, siteKey]);

  useEffect(() => {
    renderTurnstile();

    return () => {
      if (widgetIdRef.current && globalThis.turnstile) {
        globalThis.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [renderTurnstile]);

  useEffect(() => {
    onReady(() => {
      if (widgetIdRef.current && globalThis.turnstile) {
        globalThis.turnstile.reset(widgetIdRef.current);
      }
    });
  }, [onReady]);

  return (
    <div className="mt-5">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
      />
      <div ref={containerRef} />
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="form-field"
        aria-invalid={Boolean(error)}
      />
      <FieldError message={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: keyof FormState;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="form-field"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-red-700">{message}</p>;
}
