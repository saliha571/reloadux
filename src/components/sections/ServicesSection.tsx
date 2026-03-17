import Link from "next/link";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./ServicesSection.module.css";
import type { ServiceCategory } from "@/lib/types";

interface ServicesSectionProps {
  categories: ServiceCategory[];
}

const ArrowIcon = () => (
  <svg className={styles.arrowIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
    <path d="M5 12.5H19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 18.5L19 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 6.5L19 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function ServicesSection({ categories }: ServicesSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <div key={i} className={styles.column}>
              {cat.label && (
                <SectionTag text={cat.label} variant="dark" />
              )}
              <ul className={styles.linkList}>
                {cat.items.map((item, j) => (
                  <li key={j} className={styles.listItem}>
                    {item.href && item.href !== "#" ? (
                      <Link href={item.href} className={styles.link}>
                        <span className={styles.linkText}>{item.title}</span>
                        <span className={styles.arrowWrap}><ArrowIcon /></span>
                      </Link>
                    ) : (
                      <span className={styles.plainItem}>{item.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
