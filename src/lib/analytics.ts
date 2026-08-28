export const portfolioEvents = [
  "explore_work",
  "project_opened",
  "resume_downloaded",
  "sayu_builder_completed",
  "inquiry_started",
  "inquiry_submitted",
] as const;

export type PortfolioEventName = (typeof portfolioEvents)[number];

export function trackPortfolioEvent(name: PortfolioEventName): void {
  if (process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS !== "true") return;

  void import("@vercel/analytics").then(({ track }) => track(name));
}
