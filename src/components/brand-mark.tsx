import type { SVGProps } from "react";

type BrandMarkProps = SVGProps<SVGSVGElement>;

export function BrandMark(props: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7 7h50v39L43 57H7V7Z" stroke="currentColor" strokeLinejoin="miter" strokeWidth="6" />
      <path d="M18 18h28v22L37 49H18V18Z" stroke="currentColor" strokeLinejoin="miter" strokeWidth="4" />
      <path d="M27 43V26h13M27 34h9M37 35v8h-6" stroke="currentColor" strokeLinecap="square" strokeLinejoin="miter" strokeWidth="4" />
      <path d="m42 57 15-15v15H42Z" fill="currentColor" />
    </svg>
  );
}
