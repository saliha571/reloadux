"use client";

import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./KeyDeliverablesSection.module.css";

interface KeyDeliverablesSectionProps {
  tag: string;
  heading: string;
  items: { title: string; description: string }[];
  variant?: "default" | "webDesignGrid";
  className?: string;
}

export function KeyDeliverablesSection({
  tag,
  heading,
  items,
  variant = "default",
  className,
}: KeyDeliverablesSectionProps) {
  return (
    <section
      className={`${styles.section} ${variant === "webDesignGrid" ? styles.webDesignGrid : ""} ${className || ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionTag text={tag} />
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.list}>
          {items.map((item, i) => (
            <div key={i} className={styles.row}>
              <h3 className={styles.rowTitle}>{item.title}</h3>
              <p className={styles.rowDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
