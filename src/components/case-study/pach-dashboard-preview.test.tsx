import { cleanup, render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import PachDrugmartPage from "@/app/work/pach-drugmart/page";
import SayuCafePage from "@/app/work/sayu-cafe/page";
import SolaraPage from "@/app/work/solara/page";
import { PachDashboardPreview } from "./pach-dashboard-preview";

describe("PachDashboardPreview", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders qualitative operational dashboard views without unsupported claims", () => {
    render(<PachDashboardPreview />);

    const preview = screen.getByRole("figure", {
      name: "Pach Drugmart operational dashboard preview",
    });

    expect(within(preview).getByRole("heading", { name: "Inventory analytics" })).toBeVisible();
    expect(within(preview).getByRole("heading", { name: "Operational dashboard" })).toBeVisible();
    expect(within(preview).getByRole("heading", { name: "Transaction visibility" })).toBeVisible();
    expect(within(preview).getByText("Low")).toBeVisible();
    expect(within(preview).getByText("Stable")).toBeVisible();
    expect(within(preview).getByText("Review")).toBeVisible();
    const caption = preview.querySelector("figcaption");
    expect(caption).toBeVisible();
    expect(caption).toHaveTextContent(
      "This visualization represents the operational views described in the case study.",
    );
    expect(
      within(preview).getByText(
        "This visualization represents the operational views described in the case study.",
      ),
    ).toBeVisible();
    expect(within(preview).queryByText(/record management/i)).not.toBeInTheDocument();
    expect(within(preview).queryByText(/PD Pach/i)).not.toBeInTheDocument();
  });

  it("renders only on the Pach Drugmart route", () => {
    const { unmount } = render(<PachDrugmartPage />);
    expect(
      screen.getByRole("figure", { name: "Pach Drugmart operational dashboard preview" }),
    ).toBeInTheDocument();
    unmount();

    render(<SayuCafePage />);
    expect(
      screen.queryByRole("figure", { name: "Pach Drugmart operational dashboard preview" }),
    ).not.toBeInTheDocument();
    cleanup();

    render(<SolaraPage />);
    expect(
      screen.queryByRole("figure", { name: "Pach Drugmart operational dashboard preview" }),
    ).not.toBeInTheDocument();
  });
});
