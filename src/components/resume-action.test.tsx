import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeAction } from "./resume-action";

describe("ResumeAction", () => {
  it("renders honest unavailable UI when no public file is configured", () => {
    render(<ResumeAction destination="" label="Download résumé" />);

    expect(screen.queryByRole("link", { name: /Download résumé/i })).not.toBeInTheDocument();
    expect(screen.getByText("Download résumé").closest("[aria-disabled='true']"))
      .toHaveAttribute("data-resume-state", "unavailable");
  });

  it("becomes a downloadable link when the shared destination is configured", () => {
    render(
      <ResumeAction
        destination="/felix-castaneda-resume.pdf"
        label="Download résumé"
      />,
    );

    expect(screen.getByRole("link", { name: "Download résumé" })).toHaveAttribute(
      "href",
      "/felix-castaneda-resume.pdf",
    );
    expect(screen.getByRole("link", { name: "Download résumé" })).toHaveAttribute("download");
  });
});
