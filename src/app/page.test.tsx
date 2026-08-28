import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("states the approved role and headline", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", {
        name: "Software that works. Automation that keeps working.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Full-Stack & AI Automation Developer")).toBeInTheDocument();
  });
});
