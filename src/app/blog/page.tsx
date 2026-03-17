import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/content";
import { BlogHeroSection } from "@/components/sections/BlogHeroSection";
import { BlogGrid } from "@/components/sections/BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description: "AI insights from our UX leaders.",
};

export default async function BlogPage() {
  const { posts } = await getBlogPosts();

  return (
    <>
      <BlogHeroSection />
      <BlogGrid posts={posts} />
    </>
  );
}
