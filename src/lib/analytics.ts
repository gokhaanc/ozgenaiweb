"use client";

export type AnalyticsEventName =
  | "service_tab_click"
  | "cta_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "language_change"
  | "work_card_click"
  | "scroll_50"
  | "scroll_90";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

const consentKey = "ozgenai-analytics-consent";
let memoryConsent: "granted" | "denied" | "" = "";

function normalizeConsent(value: string | null | undefined) {
  return value === "granted" || value === "denied" ? value : "";
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsConsent() {
  if (typeof window === "undefined") {
    return false;
  }

  return getAnalyticsConsent() === "granted";
}

export function setAnalyticsConsent(value: "granted" | "denied") {
  memoryConsent = value;

  try {
    window.localStorage.setItem(consentKey, value);
  } catch {
    // Some browsers block storage in strict/private modes. Analytics stays gated.
  }
}

export function getAnalyticsConsent() {
  if (typeof window === "undefined") {
    return memoryConsent;
  }

  try {
    return normalizeConsent(window.localStorage.getItem(consentKey)) || memoryConsent;
  } catch {
    return memoryConsent;
  }
}

export function clearAnalyticsConsent() {
  memoryConsent = "";

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(consentKey);
  } catch {
    // Ignore blocked storage.
  }
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) {
    return;
  }

  window.gtag?.("event", name, params);
  window.clarity?.("event", name);
}

export { consentKey };
