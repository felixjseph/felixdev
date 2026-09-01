import { inquirySchema } from "./schema";
import type { InquiryResult, Mailer } from "./types";

const MINIMUM_ELAPSED_TIME_MS = 1_500;
const MAXIMUM_ELAPSED_TIME_MS = 24 * 60 * 60 * 1_000;

const invalidResult = (fieldErrors: Record<string, string[]>): InquiryResult => ({
  status: "invalid",
  message: "Please correct the highlighted fields.",
  fieldErrors,
});

const blockedResult = (): InquiryResult => ({
  status: "blocked",
  message: "Your submission could not be processed.",
});

const errorResult = (): InquiryResult => ({
  status: "error",
  message: "Something went wrong. Please try again.",
});

function getFieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  return issues.reduce<Record<string, string[]>>((fieldErrors, issue) => {
    const field = issue.path[0];

    if (typeof field === "string") {
      (fieldErrors[field] ??= []).push(issue.message);
    }

    return fieldErrors;
  }, {});
}

export function createInquiryService({ mailer, now }: { mailer: Mailer; now: () => number }) {
  return {
    async submit(input: unknown): Promise<InquiryResult> {
      const parsed = inquirySchema.safeParse(input);

      if (!parsed.success) {
        return invalidResult(getFieldErrors(parsed.error.issues));
      }

      if (parsed.data.website !== "") {
        return blockedResult();
      }

      const elapsedTime = now() - parsed.data.startedAt;

      if (elapsedTime < MINIMUM_ELAPSED_TIME_MS || elapsedTime > MAXIMUM_ELAPSED_TIME_MS) {
        return blockedResult();
      }

      try {
        await mailer.sendInquiry(parsed.data);
        return {
          status: "success",
          message: "Thanks—your inquiry was sent. Felix will reply as soon as possible.",
        };
      } catch {
        return errorResult();
      }
    },
  };
}
