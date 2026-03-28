"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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

export function OtherServicesSection({ tag, items }: OtherServicesSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionTag text={tag} />

        <div className={styles.list}>
          {items.map((item, i) => {
            const content = (
              <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>
                <span className={styles.arrow}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.833 14.167L14.167 5.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.833 5.833H14.167V14.167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </motion.div>
            );

            if (item.href) {
              return (
                <Link key={i} href={item.href} className={styles.cardLink}>
                  {content}
                </Link>
              );
            }

            return <div key={i} className={styles.cardLink}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
