/* eslint-disable @next/next/no-img-element -- Curated responsive derivatives are generated at build preparation; no duplicate runtime optimizer. */
import { media } from "@/content/media";
export function Media({ name, alt, sizes = "100vw", className = "", priority = false }: {
  name: string; alt: string; sizes?: string; className?: string; priority?: boolean;
}) {
  const item = media[name as keyof typeof media];
  return <img data-media={name} src={`/media/${name}-${item.widths.at(-1)}.webp`}
    srcSet={item.widths.map(w => `/media/${name}-${w}.webp ${w}w`).join(", ")}
    sizes={sizes} width={item.width} height={item.height} alt={alt} className={className}
    loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}
export function Logo({ className = "" }: { className?: string }) {
  return <img src="/media/btf-logo.webp" alt="BTF Group" width="768" height="146" className={`logo ${className}`} />;
}
