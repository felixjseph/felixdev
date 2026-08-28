import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HumanOrbit } from "./human-orbit";

describe("HumanOrbit", () => {
  it("keeps the portrait and workflow labels available without interaction", () => {
    render(<HumanOrbit />);

    expect(
      screen.getByAltText("Felix Castañeda portrait placeholder"),
    ).toBeInTheDocument();
    expect(screen.getByText("Build")).toBeInTheDocument();
    expect(screen.getByText("Automate")).toBeInTheDocument();
    expect(screen.getByText("Improve")).toBeInTheDocument();
  });
});
