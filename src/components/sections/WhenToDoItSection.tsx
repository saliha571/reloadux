"use client";

import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./WhenToDoItSection.module.css";

interface WhenToDoItSectionProps {
  tag: string;
  heading: string;
  items: { title: string; description: string }[];
}

export function WhenToDoItSection({
  tag,
  heading,
  items,
}: WhenToDoItSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionTag text={tag} variant="dark" />
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
