import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import {
  portfolioEvents,
  trackPortfolioEvent,
  type PortfolioEventName,
} from "./analytics";

const track = vi.hoisted(() => vi.fn());
const analyticsModuleFactory = vi.hoisted(() => vi.fn(() => ({ track })));

vi.mock("@vercel/analytics", analyticsModuleFactory);

const customAnalyticsSetting = process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS;

describe("portfolio analytics", () => {
  beforeEach(() => {
    analyticsModuleFactory.mockClear();
    track.mockClear();
  });

  afterEach(() => {
    if (customAnalyticsSetting === undefined) {
      delete process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS;
    } else {
      process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS = customAnalyticsSetting;
    }
  });

  it("contains only approved event names in the required order", () => {
    expect(portfolioEvents).toEqual([
      "explore_work",
      "project_opened",
      "resume_downloaded",
      "sayu_builder_completed",
      "inquiry_started",
      "inquiry_submitted",
    ]);
  });

  it("exposes a one-argument, allow-listed event API", () => {
    expect(trackPortfolioEvent.length).toBe(1);
    expectTypeOf(trackPortfolioEvent).parameters.toEqualTypeOf<[PortfolioEventName]>();
  });

  it("does not import or track while custom analytics are disabled", async () => {
    process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS = "false";

    trackPortfolioEvent("inquiry_started");
    await Promise.resolve();

    expect(analyticsModuleFactory).not.toHaveBeenCalled();
    expect(track).not.toHaveBeenCalled();
  });

  it("tracks an allow-listed event without properties only when opted in", async () => {
    process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS = "true";

    trackPortfolioEvent("project_opened");
    await vi.waitFor(() => expect(track).toHaveBeenCalledWith("project_opened"));

    expect(track).toHaveBeenCalledTimes(1);
  });
});
