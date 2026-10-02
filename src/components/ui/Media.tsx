/* eslint-disable @next/next/no-img-element -- Curated responsive derivatives are generated at build preparation; no duplicate runtime optimizer. */
const media: Record<string, { width: number; height: number; widths: number[] }> = {
  hero: { width: 1600, height: 1065, widths: [480, 800, 1200, 1600] },
  action: { width: 1600, height: 1200, widths: [480, 800, 1200, 1600] },
  "action-detail": { width: 1200, height: 1600, widths: [480, 800, 1200] },
  experience: { width: 1600, height: 1200, widths: [480, 800, 1200, 1600] },
  origin: { width: 1600, height: 1200, widths: [480, 800, 1200, 1600] },
  claudia: { width: 1080, height: 800, widths: [480, 800, 1080] },
  francisco: { width: 1024, height: 759, widths: [480, 800, 1024] },
  luis: { width: 1080, height: 800, widths: [480, 800, 1080] },
};
export function Media({ name, alt, sizes = "100vw", className = "", priority = false }: {
  name: string; alt: string; sizes?: string; className?: string; priority?: boolean;
}) {
  const item = media[name];
  return <img src={`/media/${name}-${item.widths.at(-1)}.webp`}
    srcSet={item.widths.map(w => `/media/${name}-${w}.webp ${w}w`).join(", ")}
    sizes={sizes} width={item.width} height={item.height} alt={alt} className={className}
    loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}
export function Logo({ className = "" }: { className?: string }) {
  return <img src="/media/btf-logo.webp" alt="BTF Group" width="768" height="146" className={`logo ${className}`} />;
}
