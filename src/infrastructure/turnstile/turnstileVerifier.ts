import { ContactSubmissionError } from "@/domain/contact/errors";

type TurnstileSiteverifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

const siteverifyUrl =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp?: string,
): Promise<void> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new ContactSubmissionError(
        "CONFIGURATION_ERROR",
        "Turnstile is not configured.",
        500,
      );
    }

    return;
  }

  if (typeof token !== "string" || token.trim() === "") {
    throw new ContactSubmissionError(
      "BOT_PROTECTION_FAILED",
      "Turnstile token is required.",
      400,
    );
  }

  const payload: Record<string, string> = {
    secret,
    response: token,
  };

  if (remoteIp) {
    payload.remoteip = remoteIp;
  }

  const response = await fetch(siteverifyUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new ContactSubmissionError(
      "BOT_PROTECTION_FAILED",
      "Turnstile verification failed.",
      400,
    );
  }

  const result = (await response.json()) as TurnstileSiteverifyResponse;

  if (!result.success) {
    throw new ContactSubmissionError(
      "BOT_PROTECTION_FAILED",
      "Turnstile token was rejected.",
      400,
      result["error-codes"],
    );
  }
}
