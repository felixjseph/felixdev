import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { DrinkCatalog } from "./types";
import { SayuBuilder } from "./sayu-builder";

const fixtureCatalog: DrinkCatalog = {
  verification: "approved",
  options: {
    base: [
      { id: "coffee", label: "Coffee" },
      { id: "seasonal", label: "Seasonal" },
    ],
    sweetness: [{ id: "balanced", label: "Balanced" }],
    milk: [{ id: "oat", label: "Oat milk" }],
    temperature: [
      { id: "iced", label: "Iced" },
      { id: "hot", label: "Hot" },
    ],
    texture: [
      { id: "clean", label: "Clean" },
      { id: "foamy", label: "Foamy" },
    ],
  },
  constraints: [
    {
      when: { base: "seasonal", temperature: "hot" },
      disallow: { field: "texture", optionIds: ["foamy"] },
      reason: "The test seasonal recipe is served without foam.",
    },
  ],
};

describe("SayuBuilder", () => {
  it("uses native radio groups with keyboard-accessible names", () => {
    render(<SayuBuilder catalog={fixtureCatalog} />);

    expect(screen.getByRole("group", { name: "Choose your base" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Choose your sweetness" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Choose your milk" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Choose your temperature" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "Choose your texture" })).toBeInTheDocument();

    for (const field of ["base", "sweetness", "milk", "temperature", "texture"]) {
      expect(within(screen.getByRole("group", { name: new RegExp(`Choose your ${field}`) })).getAllByRole("radio").length).toBeGreaterThan(0);
    }
  });

  it("disables incompatible options and announces the derived summary", async () => {
    const user = userEvent.setup();
    render(<SayuBuilder catalog={fixtureCatalog} />);

    await user.click(screen.getByRole("radio", { name: "Seasonal" }));
    await user.click(screen.getByRole("radio", { name: "Hot" }));

    expect(screen.getByRole("radio", { name: "Foamy" })).toBeDisabled();
    expect(screen.getByText("The test seasonal recipe is served without foam.")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("status")).toHaveTextContent("Hot seasonal");
  });

  it("immediately normalizes an incompatible prior texture selection", async () => {
    const user = userEvent.setup();
    render(<SayuBuilder catalog={fixtureCatalog} />);

    await user.click(screen.getByRole("radio", { name: "Foamy" }));
    await user.click(screen.getByRole("radio", { name: "Seasonal" }));
    await user.click(screen.getByRole("radio", { name: "Hot" }));

    expect(screen.getByRole("radio", { name: "Clean" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Foamy" })).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("clean texture");
  });

  it("renders exact proof labels for development and approved catalogs", () => {
    const { rerender } = render(<SayuBuilder catalog={fixtureCatalog} />);
    expect(screen.getByText("Shipped · Approved menu rules")).toBeInTheDocument();

    rerender(<SayuBuilder catalog={{ ...fixtureCatalog, verification: "development" }} />);
    expect(screen.getByText("Prototype · Menu rules awaiting approval")).toBeInTheDocument();
  });

  it("keeps smart suggestions visibly planned and inactive", () => {
    render(<SayuBuilder catalog={fixtureCatalog} />);

    expect(screen.getByRole("heading", { name: "Planned · Smart suggestions" })).toBeInTheDocument();
    expect(screen.getByText(/AI recommendations are not active/i)).toBeInTheDocument();
  });
});
