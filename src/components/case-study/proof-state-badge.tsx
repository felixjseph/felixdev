import type { ProofState } from "@/types/project";

const proofLabels = {
  shipped: "Shipped",
  prototype: "Prototype",
  planned: "Planned",
} as const;

export function ProofStateBadge({ state }: { state: ProofState }) {
  return (
    <span className="inline-flex border-2 border-[var(--color-text)] bg-[var(--color-support)] px-2 py-1 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-support-foreground)]">
      {proofLabels[state]}
    </span>
  );
}
