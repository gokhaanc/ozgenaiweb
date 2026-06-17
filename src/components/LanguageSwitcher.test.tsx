import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageSwitcher } from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    const navigation = (
      globalThis as unknown as {
        __nextNavigation: {
          pathname: string;
          searchParams: URLSearchParams;
          push: ReturnType<typeof import("vitest").vi.fn>;
        };
      }
    ).__nextNavigation;

    navigation.pathname = "/en/contact";
    navigation.searchParams = new URLSearchParams("service=ai-donusumu");
    navigation.push.mockClear();
    window.location.hash = "#contact";
    localStorage.clear();
  });

  it("stores the chosen locale and navigates to the matching route", () => {
    const navigation = (
      globalThis as unknown as {
        __nextNavigation: {
          push: ReturnType<typeof import("vitest").vi.fn>;
        };
      }
    ).__nextNavigation;

    render(<LanguageSwitcher locale="en" />);
    fireEvent.change(screen.getByLabelText("Language"), {
      target: { value: "tr" },
    });

    expect(localStorage.getItem("ozgenai-locale")).toBe("tr");
    expect(navigation.push).toHaveBeenCalledWith(
      "/tr/contact?service=ai-donusumu#contact",
    );
  });
});
