import { cleanup, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectPage from "@/app/work/[slug]/page";
import { PachDashboardPreview } from "./pach-dashboard-preview";

describe("PachDashboardPreview", () => {
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
    expect(
      within(preview).getByText(
        "This visualization represents the operational views described in the case study.",
      ),
    ).toBeVisible();
    expect(within(preview).queryByText(/record management/i)).not.toBeInTheDocument();
    expect(within(preview).queryByText(/PD Pach/i)).not.toBeInTheDocument();
  });

  it("renders only on the Pach Drugmart route", async () => {
    const pach = await ProjectPage({ params: Promise.resolve({ slug: "pach-drugmart" }) });
    const { unmount } = render(pach);
    expect(
      screen.getByRole("figure", { name: "Pach Drugmart operational dashboard preview" }),
    ).toBeInTheDocument();
    unmount();

    const sayu = await ProjectPage({ params: Promise.resolve({ slug: "sayu-cafe" }) });
    render(sayu);
    expect(
      screen.queryByRole("figure", { name: "Pach Drugmart operational dashboard preview" }),
    ).not.toBeInTheDocument();
    cleanup();

    const solara = await ProjectPage({ params: Promise.resolve({ slug: "solara" }) });
    render(solara);
    expect(
      screen.queryByRole("figure", { name: "Pach Drugmart operational dashboard preview" }),
    ).not.toBeInTheDocument();
  });
});
