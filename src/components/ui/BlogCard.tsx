import Link from "next/link";
import Image from "next/image";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  href: string;
}

export function BlogCard({
  title,
  category,
  date,
  readTime,
  image,
  href,
}: BlogCardProps) {
  return (
    <Link href={href} className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image src={image} alt={title} fill className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.meta}>
          {date} • {readTime}
        </span>
      </div>
    </Link>
  );
}
