import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import en from "@/content/en.json";
import { ServicesTabs } from "./ServicesTabs";

describe("ServicesTabs", () => {
  it("switches the active service panel", () => {
    render(<ServicesTabs locale="en" content={en.services} />);

    expect(
      screen.getByRole("heading", {
        name: "We automate repetitive work with artificial intelligence.",
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Websites/i }));

    expect(
      screen.getByRole("heading", {
        name: "We build fast websites that create trust and turn visitors into customers.",
      }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Marketing" }));

    expect(
      screen.getByRole("heading", {
        name: "We turn your digital presence into a measurable growth system.",
      }),
    ).toBeInTheDocument();
  });
});
