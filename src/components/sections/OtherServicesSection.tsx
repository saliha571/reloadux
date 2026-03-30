"use client";

import Link from "next/link";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./OtherServicesSection.module.css";

interface ServiceLink {
  title: string;
  description: string;
  href: string;
}

interface OtherServicesSectionProps {
  tag: string;
  items: ServiceLink[];
}

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    aria-hidden
  >
    <path
      d="M5 14L14 5M14 5H7M14 5V12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function OtherServicesSection({ tag, items }: OtherServicesSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <SectionTag text={tag} />
        </header>

        <div className={styles.list}>
          {items.map((item, i) => {
            const content = (
              <>
                <div className={styles.rowLeft}>
                  <h3 className={styles.title}>{item.title}</h3>
                </div>
                <div className={styles.rowRight}>
                  <p className={styles.description}>{item.description}</p>
                </div>
                <span className={styles.arrowIcon}>
                  <ArrowIcon />
                </span>
              </>
            );

            const rowClass = `${styles.row} ${styles.serviceRow}`;

            if (item.href) {
              return (
                <Link key={i} href={item.href} className={`${rowClass} ${styles.linkRow}`}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={i} className={rowClass}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
