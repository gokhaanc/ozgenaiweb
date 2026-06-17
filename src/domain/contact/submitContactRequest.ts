import type { ContactEmailSender, EmailDeliveryResult } from "./emailSender";
import { validateContactRequest } from "./validation";

type SubmitContactRequestDependencies = {
  emailSender: ContactEmailSender;
};

export async function submitContactRequest(
  input: unknown,
  dependencies: SubmitContactRequestDependencies,
): Promise<EmailDeliveryResult> {
  const request = validateContactRequest(input);

  if (request.website?.trim()) {
    return {
      id: "honeypot-ignored",
      mode: "ignored",
    };
  }

  return dependencies.emailSender.sendContactRequest(request);
}
