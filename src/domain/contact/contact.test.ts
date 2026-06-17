import { describe, expect, it, vi } from "vitest";
import { ContactSubmissionError } from "./errors";
import { submitContactRequest } from "./submitContactRequest";
import { validateContactRequest } from "./validation";

const validRequest = {
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

describe("contact validation", () => {
  it("accepts a valid contact request", () => {
    expect(validateContactRequest(validRequest)).toMatchObject({
      email: "ada@example.com",
      service: "ai-donusumu",
    });
  });

  it("rejects invalid service values", () => {
    expect(() =>
      validateContactRequest({ ...validRequest, service: "everything" }),
    ).toThrow(ContactSubmissionError);
  });
});

describe("submitContactRequest", () => {
  it("uses the injected email sender for valid requests", async () => {
    const sendContactRequest = vi.fn().mockResolvedValue({
      id: "sent-1",
      mode: "sent",
    });

    await expect(
      submitContactRequest(validRequest, {
        emailSender: { sendContactRequest },
      }),
    ).resolves.toEqual({ id: "sent-1", mode: "sent" });
    expect(sendContactRequest).toHaveBeenCalledOnce();
  });

  it("silently ignores honeypot submissions", async () => {
    const sendContactRequest = vi.fn();

    await expect(
      submitContactRequest(
        { ...validRequest, website: "https://spam.example" },
        { emailSender: { sendContactRequest } },
      ),
    ).resolves.toMatchObject({ mode: "ignored" });
    expect(sendContactRequest).not.toHaveBeenCalled();
  });
});
