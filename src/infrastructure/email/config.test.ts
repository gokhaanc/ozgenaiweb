import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactSubmissionError } from "@/domain/contact/errors";
import { getEmailConfig } from "./config";

describe("email config", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses Resend when required env vars are present", () => {
    vi.stubEnv("RESEND_API_KEY", "key");
    vi.stubEnv("RESEND_FROM_EMAIL", "OzGen AI <hello@example.com>");
    vi.stubEnv("CONTACT_TO_EMAIL", "info@ozgenai.com");

    expect(getEmailConfig()).toEqual({
      mode: "resend",
      apiKey: "key",
      from: "OzGen AI <hello@example.com>",
      to: "info@ozgenai.com",
    });
  });

  it("fails closed in production when delivery is missing", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("RESEND_FROM_EMAIL", "");

    expect(() => getEmailConfig()).toThrow(ContactSubmissionError);
  });
});
