import type { MetadataRoute } from "next";
import { getCaseStudies, getBlogPosts } from "@/lib/content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://reloadux.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getCaseStudies();
  const { posts } = await getBlogPosts();

  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/about-us/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/contact-us/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/case-studies/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const servicePages = [
    "ux-redesign",
    "ai-opportunity-mapping",
    "design-from-scratch-mvp",
    "team-extension",
    "design-discovery",
    "usability-testing",
    "ux-audit-ai-readiness",
    "design-systems",
    "web-design",
    "ui-ux-design",
    "conversational-ux",
  ].map((slug) => ({
    url: `${BASE_URL}/service/${slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyPages = caseStudies.map((study) => ({
    url: `${BASE_URL}/case-study/${study.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages, ...blogPages];
}
