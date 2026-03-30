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
        <div className={styles.topRow}>
          <div className={styles.tagCol}>
            <SectionTag text={tag} />
          </div>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.timelineWrap}>
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
                    initial={{ scale: 0.6, opacity: 0.5 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.2 + 0.3 }}
                  />
                  {i < phases.length - 1 && <span className={styles.line} />}
                </div>
                <div className={styles.phaseContent}>
                  <span className={styles.phaseLabel}>{phase.label}</span>
                  <p className={styles.phaseText}>
                    <strong>{phase.title}:</strong> {phase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {note && <p className={styles.note}>{note}</p>}
        </div>
      </div>
    </section>
  );
}
