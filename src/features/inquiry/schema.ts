import { z } from "zod";

export const projectTypes = ["full-stack", "automation", "ai", "not-sure"] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  projectType: z.enum(projectTypes),
  company: z.string().trim().max(120).default(""),
  message: z.string().trim().min(20).max(2_000),
  website: z.string().max(200),
  startedAt: z.coerce.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
