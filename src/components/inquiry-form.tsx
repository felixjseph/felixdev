"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry } from "@/app/actions/submit-inquiry";
import { projectTypes } from "@/features/inquiry/schema";
import type { InquiryResult } from "@/features/inquiry/types";
import { siteConfig } from "@/content/site";

const initialState: InquiryResult = { status: "idle", message: "" };
const initialValues = { name: "", email: "", projectType: "", company: "", message: "" };

const projectTypeLabels: Record<(typeof projectTypes)[number], string> = {
  "full-stack": "Full-stack product",
  automation: "Automation",
  ai: "AI feature or workflow",
  "not-sure": "Not sure yet",
};

const fieldErrorIds = {
  name: "inquiry-name-error",
  email: "inquiry-email-error",
  projectType: "inquiry-project-type-error",
  company: "inquiry-company-error",
  message: "inquiry-message-error",
} as const;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="border-2 border-current bg-[var(--color-accent-foreground)] px-5 py-3 font-semibold text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      {pending ? "Sending inquiry…" : "Send project inquiry"}
    </button>
  );
}

function FieldError({ field, errors }: { field: keyof typeof fieldErrorIds; errors: string[] | undefined }) {
  if (!errors?.length) return null;

  return (
    <p className="mt-2 text-sm font-medium" id={fieldErrorIds[field]}>
      {errors[0]}
    </p>
  );
}

export function InquiryForm() {
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const [values, setValues] = useState(initialValues);
  const startedAtInput = useRef<HTMLInputElement>(null);
  const fieldErrors = state.status === "invalid" ? state.fieldErrors : {};

  useEffect(() => {
    if (!startedAtInput.current) return;
    startedAtInput.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status !== "success") return;
    const resetValues = window.setTimeout(() => setValues(initialValues));
    return () => window.clearTimeout(resetValues);
  }, [state]);

  const resultMessage =
    state.status === "error"
      ? "Your inquiry could not be sent. Try again or email Felix directly."
      : state.message;

  return (
    <form action={formAction} className="mt-8 max-w-2xl space-y-5">
      <input aria-hidden="true" className="sr-only" name="website" tabIndex={-1} type="text" />
      <input name="startedAt" ref={startedAtInput} type="hidden" />

      <div>
        <label className="block font-semibold" htmlFor="inquiry-name">
          Name
        </label>
        <input
          aria-describedby={fieldErrors.name ? fieldErrorIds.name : undefined}
          aria-invalid={Boolean(fieldErrors.name)}
          autoComplete="name"
          className="mt-2 w-full border-2 border-current bg-transparent px-3 py-2"
          id="inquiry-name"
          name="name"
          required
          type="text"
          value={values.name}
          onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
        />
        <FieldError errors={fieldErrors.name} field="name" />
      </div>

      <div>
        <label className="block font-semibold" htmlFor="inquiry-email">
          Email
        </label>
        <input
          aria-describedby={fieldErrors.email ? fieldErrorIds.email : undefined}
          aria-invalid={Boolean(fieldErrors.email)}
          autoComplete="email"
          className="mt-2 w-full border-2 border-current bg-transparent px-3 py-2"
          id="inquiry-email"
          name="email"
          required
          type="email"
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
        />
        <FieldError errors={fieldErrors.email} field="email" />
      </div>

      <div>
        <label className="block font-semibold" htmlFor="inquiry-project-type">
          Project type
        </label>
        <select
          aria-describedby={fieldErrors.projectType ? fieldErrorIds.projectType : undefined}
          aria-invalid={Boolean(fieldErrors.projectType)}
          className="mt-2 w-full border-2 border-current bg-[var(--color-accent)] px-3 py-2"
          id="inquiry-project-type"
          name="projectType"
          required
          value={values.projectType}
          onChange={(event) => setValues((current) => ({ ...current, projectType: event.target.value }))}
        >
          <option disabled value="">
            Choose one
          </option>
          {projectTypes.map((projectType) => (
            <option key={projectType} value={projectType}>
              {projectTypeLabels[projectType]}
            </option>
          ))}
        </select>
        <FieldError errors={fieldErrors.projectType} field="projectType" />
      </div>

      <div>
        <label className="block font-semibold" htmlFor="inquiry-company">
          Company or team (optional)
        </label>
        <input
          aria-describedby={fieldErrors.company ? fieldErrorIds.company : undefined}
          aria-invalid={Boolean(fieldErrors.company)}
          autoComplete="organization"
          className="mt-2 w-full border-2 border-current bg-transparent px-3 py-2"
          id="inquiry-company"
          name="company"
          type="text"
          value={values.company}
          onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))}
        />
        <FieldError errors={fieldErrors.company} field="company" />
      </div>

      <div>
        <label className="block font-semibold" htmlFor="inquiry-message">
          What are you trying to improve?
        </label>
        <textarea
          aria-describedby={fieldErrors.message ? fieldErrorIds.message : undefined}
          aria-invalid={Boolean(fieldErrors.message)}
          className="mt-2 min-h-36 w-full border-2 border-current bg-transparent px-3 py-2"
          id="inquiry-message"
          name="message"
          required
          value={values.message}
          onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
        />
        <FieldError errors={fieldErrors.message} field="message" />
      </div>

      {state.status === "success" ? <p role="status">{resultMessage}</p> : null}
      {state.status === "invalid" || state.status === "blocked" || state.status === "error" ? (
        <p role="alert">
          {resultMessage}
          {state.status === "error" && siteConfig.publicContact.email ? (
            <>
              {" "}
              <a className="underline" href={`mailto:${siteConfig.publicContact.email}`}>
                Email Felix directly
              </a>
            </>
          ) : null}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
