import type { ImgHTMLAttributes } from "react";

type BrandMarkProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "src">;

export function BrandMark(props: BrandMarkProps) {
  return (
    <img
      aria-hidden="true"
      alt=""
      decoding="async"
      height={64}
      src="/images/nested-system-mark.png"
      width={64}
      {...props}
    />
  );
}
