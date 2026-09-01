export const portfolioEvents = [
  "sayu_builder_completed",
] as const;

export type PortfolioEventName = (typeof portfolioEvents)[number];

export function trackPortfolioEvent(name: PortfolioEventName): void {
  if (process.env.NEXT_PUBLIC_ENABLE_CUSTOM_ANALYTICS !== "true") return;

  void import("@vercel/analytics").then(({ track }) => track(name));
}
