import type { Metadata } from "next";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/sections/CTASection";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export async function generateStaticParams() {
  const { posts } = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <section className="section section--dark">
        <div className="container">
          <article className={styles.article}>
            <div className={styles.meta}>
              <span className={styles.category}>{post.category}</span>
              <span className={styles.date}>
                {post.date} &bull; {post.readTime}
              </span>
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            {post.content && (
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </article>
        </div>
      </section>
      <CTASection
        title="Ready to make your product experience AI-native?"
        subtitle="Join our list of clients."
        ctaText="Contact Us"
        ctaHref="/contact-us/"
      />
    </>
  );
}
