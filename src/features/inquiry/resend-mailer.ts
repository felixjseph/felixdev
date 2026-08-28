import "server-only";

import { Resend } from "resend";
import { ProjectInquiryEmail } from "@/emails/project-inquiry-email";
import type { InquiryInput } from "./schema";
import type { Mailer } from "./types";

const projectTypeLabels: Record<InquiryInput["projectType"], string> = {
  "full-stack": "Full-stack",
  automation: "Automation",
  ai: "AI",
  "not-sure": "Not sure",
};

function getConfiguration() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FELIXDEV_FROM_EMAIL;
  const to = process.env.FELIXDEV_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Inquiry email is not configured");
  }

  return { apiKey, from, to };
}

export const resendMailer: Mailer = {
  async sendInquiry(input) {
    const { apiKey, from, to } = getConfiguration();
    const projectType = projectTypeLabels[input.projectType];

    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: input.email,
        subject: `Portfolio inquiry · ${projectType} · ${input.name}`,
        react: ProjectInquiryEmail({ ...input, projectType }),
      });

      if (error || !data?.id) {
        throw new Error("Provider failed to deliver inquiry email");
      }

      return { id: data.id };
    } catch {
      throw new Error("Inquiry email could not be sent");
    }
  },
};
