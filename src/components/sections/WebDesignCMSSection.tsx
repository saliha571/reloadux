"use client";

import Image from "next/image";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./WebDesignCMSSection.module.css";

export interface WebDesignCMSCard {
  name: string;
  icon: string;
}

interface WebDesignCMSSectionProps {
  tag: string;
  heading: string;
  cards: WebDesignCMSCard[];
}

export function WebDesignCMSSection({
  tag,
  heading,
  cards,
}: WebDesignCMSSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionTag text={tag} variant="dark" />
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <article key={card.name} className={styles.card}>
              <Image
                src={card.icon}
                alt={card.name}
                width={36}
                height={36}
                className={styles.icon}
              />
              <h3 className={styles.cardTitle}>{card.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
