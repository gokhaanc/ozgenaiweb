import { beforeEach, describe, expect, it, vi } from "vitest";
import { setAnalyticsConsent, trackEvent } from "./analytics";

describe("analytics", () => {
  beforeEach(() => {
    localStorage.clear();
    window.gtag = vi.fn();
    window.clarity = vi.fn();
  });

  it("does nothing without consent", () => {
    trackEvent("cta_click", { label: "hero" });

    expect(window.gtag).not.toHaveBeenCalled();
    expect(window.clarity).not.toHaveBeenCalled();
  });

  it("sends events after consent", () => {
    setAnalyticsConsent("granted");
    trackEvent("cta_click", { label: "hero" });

    expect(window.gtag).toHaveBeenCalledWith("event", "cta_click", {
      label: "hero",
    });
    expect(window.clarity).toHaveBeenCalledWith("event", "cta_click");
  });
});
