"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export function ScrollTracker() {
  const fired = useRef({ 50: false, 90: false });

  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        return;
      }

      const progress = Math.round((window.scrollY / scrollable) * 100);
      if (progress >= 50 && !fired.current[50]) {
        fired.current[50] = true;
        trackEvent("scroll_50");
      }
      if (progress >= 90 && !fired.current[90]) {
        fired.current[90] = true;
        trackEvent("scroll_90");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
