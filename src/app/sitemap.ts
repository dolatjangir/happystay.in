import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://creatikai.com/",
      lastModified: new Date("2026-07-27T10:13:40+00:00"),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}