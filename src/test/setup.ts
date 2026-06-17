import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

type NavigationState = {
  pathname: string;
  searchParams: URLSearchParams;
  push: ReturnType<typeof vi.fn>;
};

const navigationState: NavigationState = {
  pathname: "/en",
  searchParams: new URLSearchParams(),
  push: vi.fn(),
};

vi.stubGlobal("__nextNavigation", navigationState);

vi.mock("next/image", () => ({
  default: (imageProps: {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
  }) => {
    const { src, alt, ...props } = imageProps;
    delete props.fill;
    delete props.priority;

    return React.createElement("img", { ...props, src, alt });
  },
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => React.createElement("a", { ...props, href }, children),
}));

vi.mock("next/navigation", () => ({
  usePathname: () =>
    (globalThis as unknown as { __nextNavigation: NavigationState })
      .__nextNavigation.pathname,
  useSearchParams: () =>
    (globalThis as unknown as { __nextNavigation: NavigationState })
      .__nextNavigation.searchParams,
  useRouter: () => ({
    push: (globalThis as unknown as { __nextNavigation: NavigationState })
      .__nextNavigation.push,
  }),
}));
