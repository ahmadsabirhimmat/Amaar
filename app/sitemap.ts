import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-07");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
