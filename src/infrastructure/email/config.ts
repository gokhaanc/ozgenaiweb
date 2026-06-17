import { ContactSubmissionError } from "@/domain/contact/errors";

export type EmailConfig =
  | {
      mode: "resend";
      apiKey: string;
      from: string;
      to: string;
    }
  | {
      mode: "development";
      to: string;
    };

export function getEmailConfig(): EmailConfig {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@ozgenai.com";
  const isProduction = process.env.NODE_ENV === "production";

  if (apiKey && from) {
    return {
      mode: "resend",
      apiKey,
      from,
      to,
    };
  }

  if (isProduction) {
    throw new ContactSubmissionError(
      "CONFIGURATION_ERROR",
      "Email delivery is not configured.",
      500,
    );
  }

  return {
    mode: "development",
    to,
  };
}
