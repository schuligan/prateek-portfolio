import type { MetadataRoute } from "next";

const SITE_URL = "https://prateek-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "monthly", priority: 1 }];
}
