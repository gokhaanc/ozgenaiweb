import { z } from "zod";
import { locales } from "@/i18n/routing";
import { serviceSlugs } from "@/lib/routes";
import { ContactSubmissionError } from "./errors";

const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().max(120).optional(),
);

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().trim().max(160),
  company: z.string().trim().min(2).max(160),
  service: z.enum(serviceSlugs),
  message: z.string().trim().min(10).max(2000),
  budget: optionalText,
  timeline: optionalText,
  locale: z.enum(locales),
  sourcePath: z.string().trim().max(300).optional(),
  consent: z.literal(true),
  website: z.string().max(200).optional(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

export function validateContactRequest(input: unknown): ContactRequest {
  const result = contactRequestSchema.safeParse(input);

  if (!result.success) {
    throw new ContactSubmissionError(
      "VALIDATION_ERROR",
      "Contact request validation failed.",
      400,
      result.error.flatten().fieldErrors,
    );
  }

  return result.data;
}
