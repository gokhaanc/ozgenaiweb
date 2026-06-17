"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  event?: AnalyticsEventName;
  eventLabel?: string;
};

export function TrackedLink({
  href,
  children,
  className,
  event = "cta_click",
  eventLabel,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(event, { href, label: eventLabel })}
    >
      {children}
    </Link>
  );
}
