import type { ContactRequest } from "./validation";

export type EmailDeliveryResult = {
  id: string;
  mode: "sent" | "development" | "ignored";
};

export interface ContactEmailSender {
  sendContactRequest(input: ContactRequest): Promise<EmailDeliveryResult>;
}
