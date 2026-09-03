import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyEmailButton } from "./copy-email-button";

afterEach(() => vi.unstubAllGlobals());

describe("copy email", () => {
  it("writes the exact address only after a click and confirms success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<CopyEmailButton email="felixjosephcastaneda@gmail.com" />);
    expect(writeText).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Email address copied."));
    expect(writeText).toHaveBeenCalledWith("felixjosephcastaneda@gmail.com");
  });

  it("provides an honest manual fallback if clipboard permission is unavailable", async () => {
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) } });
    render(<CopyEmailButton email="felixjosephcastaneda@gmail.com" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Copy unavailable."));
    expect(screen.queryByText("Copied")).not.toBeInTheDocument();
  });
});
