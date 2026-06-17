import { Resend } from "resend";
import { ContactSubmissionError } from "@/domain/contact/errors";
import type {
  ContactEmailSender,
  EmailDeliveryResult,
} from "@/domain/contact/emailSender";
import type { ContactRequest } from "@/domain/contact/validation";
import { getEmailConfig } from "./config";

class DevelopmentContactEmailSender implements ContactEmailSender {
  async sendContactRequest(): Promise<EmailDeliveryResult> {
    return {
      id: "development-noop",
      mode: "development",
    };
  }
}

class ResendContactEmailSender implements ContactEmailSender {
  private readonly resend: Resend;

  constructor(
    private readonly config: {
      apiKey: string;
      from: string;
      to: string;
    },
  ) {
    this.resend = new Resend(config.apiKey);
  }

  async sendContactRequest(input: ContactRequest): Promise<EmailDeliveryResult> {
    const response = await this.resend.emails.send({
      from: this.config.from,
      to: this.config.to,
      replyTo: input.email,
      subject: `New OzGen AI request: ${input.service}`,
      text: renderContactEmail(input),
    });

    if (response.error) {
      throw new ContactSubmissionError(
        "EMAIL_DELIVERY_FAILED",
        "Email provider rejected the message.",
        502,
      );
    }

    return {
      id: response.data?.id ?? "resend-accepted",
      mode: "sent",
    };
  }
}

export function createContactEmailSender(): ContactEmailSender {
  const config = getEmailConfig();

  if (config.mode === "development") {
    return new DevelopmentContactEmailSender();
  }

  return new ResendContactEmailSender(config);
}

function renderContactEmail(input: ContactRequest) {
  return [
    "New OzGen AI contact request",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company / Brand: ${input.company}`,
    `Service: ${input.service}`,
    `Locale: ${input.locale}`,
    `Budget: ${input.budget ?? "Not provided"}`,
    `Timeline: ${input.timeline ?? "Not provided"}`,
    `Source: ${input.sourcePath ?? "Not provided"}`,
    "",
    "Message:",
    input.message,
  ].join("\n");
}
