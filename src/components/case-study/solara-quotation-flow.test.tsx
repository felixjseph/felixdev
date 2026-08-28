import { cleanup, render, screen, within } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import PachDrugmartPage from "@/app/work/pach-drugmart/page";
import SayuCafePage from "@/app/work/sayu-cafe/page";
import SolaraPage from "@/app/work/solara/page";
import { SolaraQuotationFlow } from "./solara-quotation-flow";

describe("SolaraQuotationFlow", () => {
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

  it("explains the document-first quotation routing without unverified metrics", () => {
    render(<SolaraQuotationFlow />);

    expect(screen.getByText("Search the approved quotation document")).toBeInTheDocument();
    expect(screen.getByText("Answer from the document without calling Gemini")).toBeInTheDocument();
    expect(screen.getByText("Use lightweight Gemini quotation assistance")).toBeInTheDocument();
    expect(screen.queryByText(/40%/)).not.toBeInTheDocument();
  });

  it("uses an ordered flow with a visible decision", () => {
    render(<SolaraQuotationFlow />);

    const flow = screen.getByRole("list", { name: "Solara quotation routing" });
    expect(flow.querySelectorAll(":scope > li")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Can the approved document answer?" })).toBeInTheDocument();
    expect(screen.getByText("Shipped")).toBeInTheDocument();
  });

  it("nests sibling yes and no outcomes under the decision", () => {
    render(<SolaraQuotationFlow />);

    const decision = screen.getByRole("heading", {
      name: "Can the approved document answer?",
    }).closest("li");
    const outcomes = within(decision!).getByRole("list", {
      name: "Quotation outcomes",
    });

    expect(outcomes.parentElement).toBe(decision);
    expect(outcomes.querySelectorAll(":scope > li")).toHaveLength(2);
    expect(within(outcomes).getByText("Yes — the document can answer")).toBeInTheDocument();
    expect(within(outcomes).getByText("No — more help is needed")).toBeInTheDocument();
  });

  it("labels the document-answer outcome as the yes branch", () => {
    render(<SolaraQuotationFlow />);

    const documentAnswer = screen.getByText("Yes — the document can answer").closest("li");
    expect(documentAnswer).toHaveTextContent("Answer from the document without calling Gemini");
  });

  it("labels Gemini assistance as the no branch", () => {
    render(<SolaraQuotationFlow />);

    const geminiAssistance = screen.getByText("No — more help is needed").closest("li");
    expect(geminiAssistance).toHaveTextContent("Use lightweight Gemini quotation assistance");
  });

  it("renders the flow only on Solara's route", () => {
    const { unmount } = render(<SolaraPage />);
    expect(screen.getByText("Answer from the document without calling Gemini")).toBeInTheDocument();
    unmount();

    render(<SayuCafePage />);
    expect(screen.queryByText("Answer from the document without calling Gemini")).not.toBeInTheDocument();
    cleanup();

    render(<PachDrugmartPage />);
    expect(screen.queryByText("Answer from the document without calling Gemini")).not.toBeInTheDocument();
  });
});
