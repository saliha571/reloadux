"use client";

import { useState } from "react";
import styles from "./CapabilitiesSection.module.css";

interface CapabilityItem {
  title: string;
  subitems: string[];
}

interface CapabilitiesSectionProps {
  tag: string;
  heading: string;
  items: CapabilityItem[];
}

export function CapabilitiesSection({ tag, heading, items }: CapabilitiesSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.tag}>[ {tag} ]</span>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.accordion}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={styles.item}>
                <button
                  className={styles.trigger}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <span className={styles.icon}>{isOpen ? "×" : "+"}</span>
                </button>
                {isOpen && (
                  <div className={styles.content}>
                    {item.subitems.map((sub, j) => (
                      <span key={j} className={styles.subitem}>
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
