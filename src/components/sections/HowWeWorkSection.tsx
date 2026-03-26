"use client";

import Link from "next/link";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./HowWeWorkSection.module.css";

interface ProcessStageItem {
  title: string;
  counter: string;
  description: string;
  deliverables: string[];
  note?: string;
  href?: string;
}

interface HowWeWorkSectionProps {
  tag: string;
  subtitle: string;
  stages: ProcessStageItem[];
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

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    aria-hidden
  >
    <circle cx="19" cy="19" r="18.5" stroke="#565656" />
    <path
      d="M14.0547 18.5337L17.9165 22.3955L25.6401 14.6719"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function HowWeWorkSection({ tag, subtitle, stages }: HowWeWorkSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <SectionTag text={tag} variant="dark" />
          <p className={styles.subtitle}>{subtitle}</p>
        </header>
        <div className={styles.list}>
          {stages.map((stage, index) => {
            const content = (
              <>
                <div className={styles.rowLeft}>
                  <h2 className={styles.title}>{stage.title}</h2>
                </div>
                <div className={styles.rowRight}>
                  <p className={styles.description}>{stage.description}</p>
                  <p className={styles.deliverablesLabel}>[ DELIVERABLES ]</p>
                  <ul className={styles.deliverablesList}>
                    {stage.deliverables.map((item, i) => (
                      <li key={i}>
                        <span className={styles.checkIcon}>
                          <CheckIcon />
                        </span>
                        <span className={styles.deliverableText}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {stage.note && (
                    <p className={styles.note}>{stage.note}</p>
                  )}
                </div>
                <span className={styles.arrowIcon}>
                  <ArrowIcon />
                </span>
              </>
            );

            const rowClass = `${styles.row} ${styles.ourUxservices}`;

            if (stage.href) {
              return (
                <Link
                  key={index}
                  href={stage.href}
                  className={`${rowClass} ${styles.linkRow}`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <div key={index} className={rowClass}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
