import { describe, expect, it } from "vitest";
import { contactPath, isServiceSlug, localizedPath } from "./routes";

describe("routes", () => {
  it("builds locale-aware paths", () => {
    expect(localizedPath("en")).toBe("/en");
    expect(localizedPath("tr", "/about")).toBe("/tr/about");
  });

  it("builds service-aware contact links", () => {
    expect(contactPath("en", "ai-donusumu")).toBe(
      "/en?service=ai-donusumu#contact",
    );
  });

  it("guards supported service slugs", () => {
    expect(isServiceSlug("web-sitesi")).toBe(true);
    expect(isServiceSlug("danismanlik")).toBe(true);
    expect(isServiceSlug("marketing")).toBe(true);
    expect(isServiceSlug("unknown")).toBe(false);
  });
});
