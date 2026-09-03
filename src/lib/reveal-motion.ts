// Small, composited gestures: section authors choose direction, not new engines.
const presets = {
  rise: { x: 0, y: 18, scale: 1, duration: 600 },
  title: { x: 0, y: 26, scale: 1, duration: 740 },
  left: { x: -30, y: 0, scale: 1, duration: 740 },
  right: { x: 30, y: 0, scale: 1, duration: 740 },
  card: { x: 0, y: 18, scale: 0.965, duration: 780 },
  fade: { x: 0, y: 0, scale: 1, duration: 620 },
} as const;

export function revealMotion(variant: string | undefined, delay: string | undefined, compact: boolean) {
  const preset = presets[variant as keyof typeof presets] ?? presets.rise;
  const distance = compact ? 0.65 : 1;
  const parsedDelay = Number(delay);

  return {
    keyframes: [
      { opacity: 0, transform: `translate3d(${preset.x * distance}px, ${preset.y * distance}px, 0) scale(${preset.scale})` },
      { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
    ],
    options: {
      duration: preset.duration,
      delay: Number.isFinite(parsedDelay) ? Math.min(120, Math.max(0, parsedDelay)) : 0,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      fill: "backwards" as const,
    },
  };
}
