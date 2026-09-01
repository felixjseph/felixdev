import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { InquiryInput } from "./schema";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock("server-only", () => ({}));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { resendMailer } from "./resend-mailer";

const inquiry: InquiryInput = {
  name: "Avery Stone",
  email: "avery@example.com",
  projectType: "automation",
  company: "Northstar",
  message: "We need to remove repetitive order reconciliation work. <script>alert('x')</script>",
  website: "",
  startedAt: 1_700_000_000_000,
};

describe("resendMailer", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.FELIXDEV_FROM_EMAIL = "Felixdev Portfolio <portfolio@example.com>";
    process.env.FELIXDEV_TO_EMAIL = "felix@example.com";
    send.mockReset();
  });

  it("maps a project inquiry to an escaped React email", async () => {
    send.mockResolvedValue({ data: { id: "message-123" }, error: null });

    await expect(resendMailer.sendInquiry(inquiry)).resolves.toEqual({ id: "message-123" });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: process.env.FELIXDEV_FROM_EMAIL,
        to: [process.env.FELIXDEV_TO_EMAIL],
        replyTo: "avery@example.com",
        subject: "Portfolio inquiry · Automation · Avery Stone",
      }),
    );

    const email = send.mock.calls[0]?.[0].react;
    const markup = renderToStaticMarkup(email);
    expect(markup).toContain("Avery Stone");
    expect(markup).toContain("avery@example.com");
    expect(markup).toContain("Automation");
    expect(markup).toContain("Northstar");
    expect(markup).toContain("We need to remove repetitive order reconciliation work.");
    expect(markup).toContain("&lt;script&gt;alert(&#x27;x&#x27;)&lt;/script&gt;");
    expect(markup).not.toContain("<script>alert('x')</script>");
  });

  it.each(["RESEND_API_KEY", "FELIXDEV_FROM_EMAIL", "FELIXDEV_TO_EMAIL"])(
    "rejects missing %s before calling the provider",
    async (variable) => {
      delete process.env[variable];

      await expect(resendMailer.sendInquiry(inquiry)).rejects.toThrow("Inquiry email is not configured");
      expect(send).not.toHaveBeenCalled();
    },
  );

  it("throws a generic error when the provider rejects delivery", async () => {
    send.mockResolvedValue({ data: null, error: { message: "provider secret failure" } });

    await expect(resendMailer.sendInquiry(inquiry)).rejects.toThrow("Inquiry email could not be sent");
    await expect(resendMailer.sendInquiry(inquiry)).rejects.not.toThrow("provider secret failure");
  });
});
