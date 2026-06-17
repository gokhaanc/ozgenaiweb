import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const validContactBody = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  service: "ai-donusumu",
  message: "We want to automate lead follow-up and reporting.",
  budget: "€2k-€5k",
  timeline: "This month",
  locale: "en",
  sourcePath: "/en/contact",
  consent: true,
  website: "",
};

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("rejects contact submissions without a Turnstile token when configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(validContactBody),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload).toMatchObject({
      ok: false,
      code: "BOT_PROTECTION_FAILED",
    });
  });
});
