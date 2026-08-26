import React from "react";
import Image from "next/image";

type BrandLogoProps = {
  size?: number;
  className?: string;
  alt?: string;
};

export default function BrandLogo({
  size = 30,
  className = "",
  alt = "",
}: BrandLogoProps) {
  return (
    <Image
      src="/assets/brand/logo.svg"
      alt={alt}
      width={size}
      height={size}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`object-contain flex-shrink-0 rounded-md transition-all duration-200 ${className}`}
      decoding="async"
    />
  );
}
