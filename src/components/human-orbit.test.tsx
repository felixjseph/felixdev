import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HumanOrbit } from "./human-orbit";

describe("HumanOrbit", () => {
  it("keeps the portrait and workflow labels available without interaction", () => {
    const { container } = render(<HumanOrbit />);

    expect(
      screen.getByAltText("Felix Castañeda portrait placeholder"),
    ).toBeInTheDocument();
    const orbit = container.querySelector("[data-orbit-system]");
    expect(orbit).toBeInTheDocument();
    expect(orbit).toHaveAttribute("data-pointer-cap", "12");
    expect(orbit?.querySelectorAll("[data-orbit-node]")).toHaveLength(3);
    expect(screen.getByText("Build")).toHaveAttribute("data-orbit-node");
    expect(screen.getByText("Automate")).toHaveAttribute("data-orbit-node");
    expect(screen.getByText("Improve")).toHaveAttribute("data-orbit-node");
  });

  it("shows the shared resume action as unavailable without a public file", () => {
    render(<HumanOrbit />);

    expect(screen.queryByRole("link", { name: /Download résumé/i })).not.toBeInTheDocument();
    expect(screen.getByText("Download résumé").closest("[aria-disabled='true']"))
      .toHaveAttribute("data-resume-state", "unavailable");
  });
});
