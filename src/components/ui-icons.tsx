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

export function DownloadIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="M10 3.5v9M6.5 9 10 12.5 13.5 9M4 16.5h12" /></svg>;
}

export function EmailIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <rect height="12" rx="2" width="15" x="2.5" y="4" />
      <path d="m4.5 6.5 5.5 4 5.5-4" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <path d="M6.1 3.2 8 6.9 5.9 8.4a11.8 11.8 0 0 0 5.7 5.7L13.1 12l3.7 1.9-.5 2.3c-.2.8-.9 1.3-1.7 1.3C7.9 17.5 2.5 12.1 2.5 5.4c0-.8.5-1.5 1.3-1.7l2.3-.5Z" />
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg {...shared} {...props}>
      <path d="M16 8.3c0 4.4-6 9.2-6 9.2s-6-4.8-6-9.2a6 6 0 1 1 12 0Z" />
      <circle cx="10" cy="8.3" r="2" />
    </svg>
  );
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

export function ExpandIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="M7 3H3v4m10-4h4v4M3 13v4h4m10-4v4h-4" /></svg>;
}

export function CloseIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="m5 5 10 10M5 15 15 5" /></svg>;
}

export function PauseIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="M7 4v12M13 4v12" /></svg>;
}

export function PlayIcon(props: IconProps) {
  return <svg {...shared} {...props}><path d="m6 4 10 6-10 6Z" /></svg>;
}
