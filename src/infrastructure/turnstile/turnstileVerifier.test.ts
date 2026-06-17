import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactSubmissionError } from "@/domain/contact/errors";
import { verifyTurnstileToken } from "./turnstileVerifier";

describe("verifyTurnstileToken", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("fails closed in production when the secret key is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");

    await expect(verifyTurnstileToken("token", "203.0.113.10")).rejects.toThrow(
      ContactSubmissionError,
    );
  });

  it("rejects missing tokens when Turnstile is configured", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");

    await expect(verifyTurnstileToken("", "203.0.113.10")).rejects.toMatchObject({
      code: "BOT_PROTECTION_FAILED",
      status: 400,
    });
  });

  it("sends token, secret, and remote ip to Cloudflare Siteverify", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetch);

    await expect(
      verifyTurnstileToken("visitor-token", "203.0.113.10"),
    ).resolves.toBeUndefined();

    expect(fetch).toHaveBeenCalledWith(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          secret: "secret",
          response: "visitor-token",
          remoteip: "203.0.113.10",
        }),
      },
    );
  });

  it("rejects failed Siteverify responses", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: false,
          "error-codes": ["invalid-input-response"],
        }),
      }),
    );

    await expect(verifyTurnstileToken("bad-token")).rejects.toMatchObject({
      code: "BOT_PROTECTION_FAILED",
      status: 400,
    });
  });
});
