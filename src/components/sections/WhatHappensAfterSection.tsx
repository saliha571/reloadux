"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./WhatHappensAfterSection.module.css";

interface WhatHappensAfterSectionProps {
  tag: string;
  heading: string;
  paths: { title: string; description: string }[];
}

const STAGGER_DELAY = 0.08;
const DURATION = 0.6;

export function WhatHappensAfterSection({
  tag,
  heading,
  paths,
}: WhatHappensAfterSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.tagCol}>
            <SectionTag text={tag} />
          </div>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.pathList}>
          {paths.map((path, i) => (
            <motion.div
              key={i}
              className={styles.pathItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{
                duration: DURATION,
                delay: i * STAGGER_DELAY,
                ease: [0, 0, 0.2, 1],
              }}
            >
              <div className={styles.pathContent}>
                <h3 className={styles.pathTitle}>{path.title}</h3>
                <p className={styles.pathDesc}>{path.description}</p>
              </div>
              <span className={styles.arrow}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.833 14.167L14.167 5.833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.833 5.833H14.167V14.167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
