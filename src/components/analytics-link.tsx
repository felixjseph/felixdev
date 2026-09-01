"use client";

import type { ComponentProps } from "react";
import { trackPortfolioEvent, type PortfolioEventName } from "@/lib/analytics";

type AnalyticsLinkProps = ComponentProps<"a"> & {
  eventName: PortfolioEventName;
};

export function AnalyticsLink({ eventName, onClick, ...props }: AnalyticsLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) trackPortfolioEvent(eventName);
      }}
    />
  );
}
