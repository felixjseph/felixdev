import { describe, expect, it } from "vitest";
import { inquirySchema } from "./schema";

const valid = {
  name: "Avery Stone",
  email: "avery@example.com",
  projectType: "automation",
  company: "Northstar",
  message: "We need to remove repetitive order reconciliation work.",
  website: "",
  startedAt: 1_700_000_000_000,
};

describe("inquirySchema", () => {
  it("accepts the approved form shape", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid project types and short messages", () => {
    const result = inquirySchema.safeParse({
      ...valid,
      projectType: "branding",
      message: "Help",
    });

    expect(result.success).toBe(false);
  });

  it("accepts an empty optional company and defaults an omitted one", () => {
    const emptyCompany = inquirySchema.safeParse({ ...valid, company: "" });
    const omittedCompany = inquirySchema.safeParse({ ...valid, company: undefined });

    expect(emptyCompany.success && emptyCompany.data.company).toBe("");
    expect(omittedCompany.success && omittedCompany.data.company).toBe("");
  });

  it("trims text fields and enforces name, email, and length constraints", () => {
    const parsed = inquirySchema.safeParse({
      ...valid,
      name: "  Avery Stone  ",
      email: "  avery@example.com  ",
      company: "  Northstar  ",
      message: "  We need to remove repetitive order reconciliation work.  ",
    });

    expect(parsed.success && parsed.data).toMatchObject({
      name: "Avery Stone",
      email: "avery@example.com",
      company: "Northstar",
      message: "We need to remove repetitive order reconciliation work.",
    });
    expect(inquirySchema.safeParse({ ...valid, name: "A" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, name: "x".repeat(81) }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    expect(
      inquirySchema.safeParse({ ...valid, email: `${"a".repeat(151)}@example.com` }).success,
    ).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, company: "x".repeat(121) }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, message: "x".repeat(2_001) }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, website: "x".repeat(201) }).success).toBe(false);
  });

  it("keeps honeypot and elapsed-time fields in the parsed input", () => {
    const result = inquirySchema.safeParse({
      ...valid,
      website: "bot.example",
      startedAt: "1700000000000",
    });

    expect(result.success && result.data).toMatchObject({
      website: "bot.example",
      startedAt: 1_700_000_000_000,
    });
  });
});
