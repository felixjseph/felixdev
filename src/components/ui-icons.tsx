import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const shared = {
  "aria-hidden": true,
  fill: "none",
  focusable: false,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 1.7,
  viewBox: "0 0 20 20",
} as const;

export function ArrowUpRightIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="M5.5 14.5 14.5 5.5M7 5.5h7.5V13" /></svg>;
}

export function ArrowDownRightIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="m5.5 5.5 9 9M14.5 7v7.5H7" /></svg>;
}

export function ArrowRightIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5" /></svg>;
}

export function ArrowUpIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="M10 16V4M5.5 8.5 10 4l4.5 4.5" /></svg>;
}

export function RefreshIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="M15.6 7.2A6 6 0 1 0 16 11M15.6 3.8v3.6h-3.7" /></svg>;
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <circle cx="10" cy="10" r="3" />
      <path d="M10 2.5v1.4M10 16.1v1.4M2.5 10h1.4M16.1 10h1.4M4.7 4.7l1 1M14.3 14.3l1 1M15.3 4.7l-1 1M5.7 14.3l-1 1" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="M15.8 12.4A6.3 6.3 0 0 1 7.6 4.2 6.3 6.3 0 1 0 15.8 12.4Z" /></svg>;
}
