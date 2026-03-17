import Link from "next/link";
import styles from "./GenAiBanner.module.css";

interface GenAiBannerProps {
  title: string;
  titleAccent: string;
  description: string;
  descriptionLine2?: string;
  ctaText: string;
  ctaHref: string;
}

export function GenAiBanner({
  title,
  titleAccent,
  description,
  descriptionLine2,
  ctaText,
  ctaHref,
}: GenAiBannerProps) {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <h2 className={styles.heading}>
            {title}
            <br />
            <em className={styles.accent}>{titleAccent}</em>
          </h2>
          <p className={styles.description}>{description}</p>
          {descriptionLine2 && (
            <p className={styles.description}>{descriptionLine2}</p>
          )}
        </div>
        <Link href={ctaHref} className={styles.cta}>
          {ctaText}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10H16M16 10L10 4M16 10L10 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
