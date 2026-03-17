"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogSection.module.css";
import { SectionTag } from "@/components/ui/SectionTag";
import { FlairButton } from "@/components/ui/FlairButton";

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * 435, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <SectionTag text="LATEST ARTICLES" variant="dark" />
          <h2 className={styles.heading}>
            AI insights from our UX leaders.
          </h2>
          <FlairButton href="/blog/" size="sm" showArrow={false} className={styles.viewAll}>
            View all Blogs
          </FlairButton>
          <div className={styles.arrows}>
            <button className={styles.arrow} onClick={() => scrollBy(-1)} aria-label="Previous">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className={styles.arrow} onClick={() => scrollBy(1)} aria-label="Next">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.cards} ref={trackRef}>
          {posts.map((post, i) => (
            <Link
              key={i}
              href={`/blog/${post.slug}/`}
              className={styles.card}
            >
              <div className={styles.cardImage}>
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={280}
                    className={styles.image}
                  />
                )}
              </div>
              <p className={styles.category}>{post.category}</p>
              <h4 className={styles.cardTitle}>{post.title}</h4>
              <p className={styles.meta}>
                {post.date} <span>•</span> {post.readTime}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
