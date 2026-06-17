import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "@/content/en.json";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          ok: false,
          details: {
            name: ["Required"],
          },
        }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("preselects service from the page query", () => {
    render(
      <ContactForm
        locale="en"
        content={en.contact}
        services={en.services.items}
        initialService="ai-donusumu"
      />,
    );

    expect(screen.getByLabelText(en.contact.form.service)).toHaveValue(
      "ai-donusumu",
    );
  });

  it("renders validation errors returned by the API", async () => {
    render(
      <ContactForm locale="en" content={en.contact} services={en.services.items} />,
    );

    fireEvent.click(screen.getByRole("button", { name: en.contact.form.submit }));

    await waitFor(() => expect(screen.getByText("Required")).toBeInTheDocument());
  });

  it("submits the Turnstile token when bot protection is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "site-key");
    vi.stubGlobal("turnstile", {
      render: vi.fn((_: string, options: { callback: (token: string) => void }) => {
        options.callback("turnstile-token");
        return "widget-id";
      }),
      reset: vi.fn(),
      remove: vi.fn(),
    });
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetch);

    render(
      <ContactForm locale="en" content={en.contact} services={en.services.items} />,
    );

    fireEvent.click(screen.getByRole("button", { name: en.contact.form.submit }));

    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
    const body = JSON.parse(fetch.mock.calls[0]?.[1]?.body as string) as {
      turnstileToken?: string;
    };
    expect(body.turnstileToken).toBe("turnstile-token");
  });
});
