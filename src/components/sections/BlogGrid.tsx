import { BlogCard } from "@/components/ui/BlogCard";
import styles from "./BlogGrid.module.css";
import type { BlogPost } from "@/lib/types";

interface Props {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: Props) {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              category={post.category}
              date={post.date}
              readTime={post.readTime}
              image={post.image}
              href={`/blog/${post.slug}/`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
