"use client";

import { useSyncExternalStore } from "react";
import { getAnalyticsConsent, setAnalyticsConsent } from "@/lib/analytics";

type CookieConsentProps = {
  content: {
    title: string;
    description: string;
    accept: string;
    reject: string;
  };
};

export function CookieConsent({ content }: CookieConsentProps) {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => "",
  );
  const visible = consent === "";

  function choose(value: "granted" | "denied") {
    setAnalyticsConsent(value);
    window.dispatchEvent(new Event("ozgenai-consent-change"));
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-[8px] border border-stone-200 bg-white/95 p-4 shadow-2xl shadow-stone-950/10 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-stone-950">{content.title}</p>
          <p className="mt-1 text-sm leading-6 text-stone-600">
            {content.description}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="rounded-[8px] border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            onClick={() => choose("denied")}
          >
            {content.reject}
          </button>
          <button
            type="button"
            className="rounded-[8px] bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
            onClick={() => choose("granted")}
          >
            {content.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("ozgenai-consent-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("ozgenai-consent-change", onStoreChange);
  };
}

function getConsentSnapshot() {
  return getAnalyticsConsent();
}
