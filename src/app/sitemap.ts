import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  return origin ? [{ url: origin, changeFrequency: "monthly", priority: 1 }] : [];
}
