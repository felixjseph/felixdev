"use server";

import { createInquiryService } from "@/features/inquiry/inquiry-service";
import { resendMailer } from "@/features/inquiry/resend-mailer";
import type { InquiryResult } from "@/features/inquiry/types";

export async function submitInquiry(
  _previous: InquiryResult,
  formData: FormData,
): Promise<InquiryResult> {
  const service = createInquiryService({ mailer: resendMailer, now: Date.now });
  return service.submit(Object.fromEntries(formData.entries()));
}
