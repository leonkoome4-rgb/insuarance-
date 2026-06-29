import type { MetadataRoute } from "next";
import { COVERS } from "@/data/covers";

const BASE_URL = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "yearly", priority: 1 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/covers`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/client-services`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/partners`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/quote`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/claim`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/request-cover`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const coverRoutes: MetadataRoute.Sitemap = COVERS.map((cover) => ({
    url: `${BASE_URL}/covers/${cover.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...coverRoutes];
}
