import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InquiryForm } from "./inquiry-form";

const submitInquiry = vi.hoisted(() => vi.fn());

vi.mock("@/app/actions/submit-inquiry", () => ({ submitInquiry }));

async function completeRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Name"), "Avery Stone");
  await user.type(screen.getByLabelText("Email"), "avery@example.com");
  await user.selectOptions(screen.getByLabelText("Project type"), "automation");
}

describe("InquiryForm", () => {
  beforeEach(() => {
    submitInquiry.mockResolvedValue({ status: "idle", message: "" });
  });

  it("renders the approved inquiry fields", () => {
    render(<InquiryForm />);

    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Company or team (optional)")).not.toBeRequired();
    expect(screen.queryByLabelText(/budget/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send project inquiry" })).toBeInTheDocument();
    expect(screen.getByLabelText("Project type")).toHaveTextContent("Full-stack product");
    expect(screen.getByLabelText("Project type")).toHaveTextContent("Automation");
    expect(screen.getByLabelText("Project type")).toHaveTextContent("AI feature or workflow");
    expect(screen.getByLabelText("Project type")).toHaveTextContent("Not sure yet");
    expect(screen.getByLabelText("What are you trying to improve?")).toBeInTheDocument();
  });

  it("preserves a typed message after a provider error and lets the visitor retry", async () => {
    const user = userEvent.setup();
    submitInquiry.mockResolvedValue({
      status: "error",
      message: "Your inquiry could not be sent. Try again or email Felix directly.",
    });
    render(<InquiryForm />);
    const message = screen.getByLabelText("What are you trying to improve?");

    await completeRequiredFields(user);
    await user.type(message, "Make customer handoffs easier across our internal tools.");
    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Your inquiry could not be sent. Try again or email Felix directly.",
    );
    expect(message).toHaveValue("Make customer handoffs easier across our internal tools.");
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Send project inquiry" })).toBeEnabled();
    });

    const firstSubmission = submitInquiry.mock.calls[0]?.[1] as FormData;
    message.closest("form")?.reset();
    expect(message).toHaveValue("Make customer handoffs easier across our internal tools.");
    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));

    await waitFor(() => expect(submitInquiry).toHaveBeenCalledTimes(2));
    const retrySubmission = submitInquiry.mock.calls[1]?.[1] as FormData;
    expect(retrySubmission.get("startedAt")).toBe(firstSubmission.get("startedAt"));
    expect(retrySubmission.get("startedAt")).not.toBe("");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Your inquiry could not be sent. Try again or email Felix directly.",
    );
  });

  it("resets the form only after a successful submission", async () => {
    const user = userEvent.setup();
    submitInquiry.mockResolvedValue({
      status: "success",
      message: "Thanks—your inquiry was sent. Felix will reply as soon as possible.",
    });
    render(<InquiryForm />);
    const message = screen.getByLabelText("What are you trying to improve?");

    await completeRequiredFields(user);
    await user.type(message, "Make customer handoffs easier across our internal tools.");
    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Thanks—your inquiry was sent.");
    await waitFor(() => expect(message).toHaveValue(""));
  });

  it("associates authoritative invalid field errors with their fields", async () => {
    const user = userEvent.setup();
    submitInquiry.mockResolvedValue({
      status: "invalid",
      message: "Please correct the highlighted fields.",
      fieldErrors: { name: ["Name must include at least two characters."] },
    });
    render(<InquiryForm />);

    await completeRequiredFields(user);
    await user.type(
      screen.getByLabelText("What are you trying to improve?"),
      "Make customer handoffs easier across our internal tools.",
    );
    await user.click(screen.getByRole("button", { name: "Send project inquiry" }));

    expect(await screen.findByText("Name must include at least two characters.")).toHaveAttribute(
      "id",
      "inquiry-name-error",
    );
    expect(screen.getByLabelText("Name")).toHaveAttribute(
      "aria-describedby",
      "inquiry-name-error",
    );
  });
});
