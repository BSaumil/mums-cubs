export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface SendEmailResult {
  ok: boolean;
  providerMessageId?: string;
  errorCode?: string;
}

export interface EmailProvider {
  send(input: SendEmailInput): Promise<SendEmailResult>;
}

/**
 * Resend's REST API over plain fetch — deliberately not the `resend` SDK, to
 * avoid a dependency for one POST request. Requires RESEND_API_KEY and
 * EMAIL_FROM_ADDRESS. This call could not be exercised from the development
 * sandbox this was built in (outbound network there is allowlisted and does
 * not include api.resend.com) — it is untested against the live API. Verify
 * with a real key before relying on it in production.
 */
export class ResendEmailProvider implements EmailProvider {
  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.EMAIL_FROM_ADDRESS;
    if (!apiKey || !from) return { ok: false, errorCode: "not_configured" };

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: input.to,
          subject: input.subject,
          html: input.html,
          text: input.text,
        }),
      });

      if (!response.ok) {
        return { ok: false, errorCode: `resend_http_${response.status}` };
      }
      const body: { id?: string } = await response.json();
      return { ok: true, providerMessageId: body.id };
    } catch {
      return { ok: false, errorCode: "network_error" };
    }
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM_ADDRESS);
}

let sharedProvider: EmailProvider | null = null;
export function getEmailProvider(): EmailProvider {
  if (!sharedProvider) sharedProvider = new ResendEmailProvider();
  return sharedProvider;
}
