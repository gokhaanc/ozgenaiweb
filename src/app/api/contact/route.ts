import { ContactSubmissionError } from "@/domain/contact/errors";
import { submitContactRequest } from "@/domain/contact/submitContactRequest";
import { createContactEmailSender } from "@/infrastructure/email/resendContactEmailSender";
import { verifyTurnstileToken } from "@/infrastructure/turnstile/turnstileVerifier";
import { getRequestFingerprint, isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const fingerprint = getRequestFingerprint(request);

  if (isRateLimited(fingerprint, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return Response.json(
      { ok: false, code: "RATE_LIMITED" },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    await verifyTurnstileToken(body.turnstileToken, getClientIp(request));

    const result = await submitContactRequest(
      {
        ...body,
        turnstileToken: undefined,
        sourcePath: body.sourcePath ?? request.headers.get("referer") ?? undefined,
      },
      {
        emailSender: createContactEmailSender(),
      },
    );

    return Response.json({ ok: true, id: result.id, mode: result.mode });
  } catch (error) {
    if (error instanceof ContactSubmissionError) {
      return Response.json(
        {
          ok: false,
          code: error.code,
          details: error.code === "VALIDATION_ERROR" ? error.details : undefined,
        },
        { status: error.status },
      );
    }

    return Response.json(
      { ok: false, code: "EMAIL_DELIVERY_FAILED" },
      { status: 500 },
    );
  }
}

function getClientIp(request: Request) {
  const cloudflareIp = request.headers.get("cf-connecting-ip");

  if (cloudflareIp) {
    return cloudflareIp;
  }

  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
}
