import type { InquiryInput } from "./schema";

export type InquiryResult =
  | { status: "idle"; message: "" }
  | { status: "success"; message: string }
  | { status: "invalid"; message: string; fieldErrors: Record<string, string[]> }
  | { status: "blocked"; message: string }
  | { status: "error"; message: string };

export type Mailer = {
  sendInquiry(input: InquiryInput): Promise<{ id: string }>;
};
