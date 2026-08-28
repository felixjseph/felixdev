import { describe, expect, it, vi } from "vitest";
import { createInquiryService } from "./inquiry-service";

const now = 1_700_000_010_000;
const valid = {
  name: "Avery Stone",
  email: "avery@example.com",
  projectType: "automation",
  company: "Northstar",
  message: "We need to remove repetitive order reconciliation work.",
  website: "",
  startedAt: now - 5_000,
};

describe("createInquiryService", () => {
  it("delivers valid input once and returns the success result", async () => {
    const sendInquiry = vi.fn().mockResolvedValue({ id: "message-123" });
    const service = createInquiryService({ mailer: { sendInquiry }, now: () => now });

    await expect(service.submit(valid)).resolves.toEqual({
      status: "success",
      message: "Thanks—your inquiry was sent. Felix will reply as soon as possible.",
    });
    expect(sendInquiry).toHaveBeenCalledOnce();
    expect(sendInquiry).toHaveBeenCalledWith(valid);
  });

  it("returns field errors without calling the mailer for invalid input", async () => {
    const sendInquiry = vi.fn().mockResolvedValue({ id: "message-123" });
    const service = createInquiryService({ mailer: { sendInquiry }, now: () => now });

    const result = await service.submit({ ...valid, message: "short" });

    expect(result.status).toBe("invalid");
    expect(result).toMatchObject({ fieldErrors: { message: expect.any(Array) } });
    expect(sendInquiry).not.toHaveBeenCalled();
  });

  it("blocks a nonempty honeypot without calling the mailer", async () => {
    const sendInquiry = vi.fn().mockResolvedValue({ id: "message-123" });
    const service = createInquiryService({ mailer: { sendInquiry }, now: () => now });

    await expect(service.submit({ ...valid, website: "spam.example" })).resolves.toMatchObject({
      status: "blocked",
    });
    expect(sendInquiry).not.toHaveBeenCalled();
  });

  it("blocks submissions completed in under 1,500 milliseconds", async () => {
    const sendInquiry = vi.fn().mockResolvedValue({ id: "message-123" });
    const service = createInquiryService({ mailer: { sendInquiry }, now: () => now });

    await expect(service.submit({ ...valid, startedAt: now - 500 })).resolves.toMatchObject({
      status: "blocked",
    });
    expect(sendInquiry).not.toHaveBeenCalled();
  });

  it("blocks submissions started more than 24 hours ago", async () => {
    const sendInquiry = vi.fn().mockResolvedValue({ id: "message-123" });
    const service = createInquiryService({ mailer: { sendInquiry }, now: () => now });

    await expect(service.submit({ ...valid, startedAt: now - 86_400_001 })).resolves.toMatchObject({
      status: "blocked",
    });
    expect(sendInquiry).not.toHaveBeenCalled();
  });

  it("returns independent results for separate blocked submissions", async () => {
    const sendInquiry = vi.fn().mockResolvedValue({ id: "message-123" });
    const service = createInquiryService({ mailer: { sendInquiry }, now: () => now });

    const first = await service.submit({ ...valid, website: "spam.example" });
    const second = await service.submit({ ...valid, website: "spam.example" });

    expect(second).not.toBe(first);
  });

  it("returns a generic recoverable error when delivery fails", async () => {
    const sendInquiry = vi.fn().mockRejectedValue(new Error("provider secret failure"));
    const service = createInquiryService({ mailer: { sendInquiry }, now: () => now });

    const result = await service.submit(valid);

    expect(result).toMatchObject({ status: "error" });
    expect(result.message).not.toContain("provider secret failure");
  });
});
