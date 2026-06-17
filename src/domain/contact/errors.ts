export type ContactErrorCode =
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "BOT_PROTECTION_FAILED"
  | "CONFIGURATION_ERROR"
  | "EMAIL_DELIVERY_FAILED";

export class ContactSubmissionError extends Error {
  constructor(
    readonly code: ContactErrorCode,
    message: string,
    readonly status = 500,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "ContactSubmissionError";
  }
}
