"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./TimelineSection.module.css";

interface Phase {
  label: string;
  title: string;
  description: string;
}

interface TimelineSectionProps {
  tag: string;
  heading: string;
  phases: Phase[];
  note?: string;
}

export function TimelineSection({
  tag,
  heading,
  phases,
  note,
}: TimelineSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.leftCol}>
            <SectionTag text={tag} />
            <p className={styles.heading}>{heading}</p>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.timeline}>
              {phases.map((phase, i) => (
                <motion.div
                  key={i}
                  className={styles.phase}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <div className={styles.dotCol}>
                    <motion.span
                      className={styles.dot}
                      initial={{ backgroundColor: "var(--color-white)" }}
                      whileInView={{ backgroundColor: "var(--color-black)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.2 + 0.3 }}
                    />
                    {i < phases.length - 1 && <span className={styles.line} />}
                  </div>
                  <div className={styles.phaseContent}>
                    <span className={styles.phaseLabel}>{phase.label}</span>
                    <h3 className={styles.phaseTitle}>{phase.title}:</h3>
                    <p className={styles.phaseDesc}>{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {note && <p className={styles.note}>{note}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
