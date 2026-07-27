export function GearItem({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-3 py-2">
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
      />
      <span className="font-body text-ink">{name}</span>
    </li>
  );
}
