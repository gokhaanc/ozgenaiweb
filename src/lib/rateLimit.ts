import { createHash } from "node:crypto";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function getRequestFingerprint(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const realIp = request.headers.get("x-real-ip") ?? "";
  const userAgent = request.headers.get("user-agent") ?? "";
  const salt = process.env.RATE_LIMIT_SALT ?? "ozgenai-contact";

  return createHash("sha256")
    .update(`${forwardedFor.split(",")[0]}|${realIp}|${userAgent}|${salt}`)
    .digest("hex");
}

export function isRateLimited(
  key: string,
  options: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return false;
  }

  current.count += 1;
  return current.count > options.limit;
}

export function resetRateLimitForTests() {
  buckets.clear();
}
