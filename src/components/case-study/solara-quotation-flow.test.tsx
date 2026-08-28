import { cleanup, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectPage from "@/app/work/[slug]/page";
import { SolaraQuotationFlow } from "./solara-quotation-flow";

describe("SolaraQuotationFlow", () => {
  it("explains the document-first quotation routing without unverified metrics", () => {
    render(<SolaraQuotationFlow />);

    expect(screen.getByText("Search the approved quotation document")).toBeInTheDocument();
    expect(screen.getByText("Answer from the document without calling Gemini")).toBeInTheDocument();
    expect(screen.getByText("Use lightweight Gemini quotation assistance")).toBeInTheDocument();
    expect(screen.queryByText(/40%/)).not.toBeInTheDocument();
  });

  it("uses an ordered flow with explicitly labelled alternative outcomes", () => {
    render(<SolaraQuotationFlow />);

    const flow = screen.getByRole("list", { name: "Solara quotation routing" });
    expect(within(flow).getAllByRole("listitem")).toHaveLength(5);
    expect(screen.getByRole("heading", { name: "Can the approved document answer?" })).toBeInTheDocument();
    const documentAnswer = screen.getByText("Yes — the document can answer").closest("li");
    expect(documentAnswer).toHaveTextContent("Answer from the document without calling Gemini");

    const geminiAssistance = screen.getByText("No — more help is needed").closest("li");
    expect(geminiAssistance).toHaveTextContent("Use lightweight Gemini quotation assistance");
    expect(screen.getByText("Shipped")).toBeInTheDocument();
  });

  it("renders the flow only on Solara's route", async () => {
    const solara = await ProjectPage({ params: Promise.resolve({ slug: "solara" }) });
    const { unmount } = render(solara);
    expect(screen.getByText("Answer from the document without calling Gemini")).toBeInTheDocument();
    unmount();

    const sayu = await ProjectPage({ params: Promise.resolve({ slug: "sayu-cafe" }) });
    render(sayu);
    expect(screen.queryByText("Answer from the document without calling Gemini")).not.toBeInTheDocument();
    cleanup();

    const pach = await ProjectPage({ params: Promise.resolve({ slug: "pach-drugmart" }) });
    render(pach);
    expect(screen.queryByText("Answer from the document without calling Gemini")).not.toBeInTheDocument();
  });
});
