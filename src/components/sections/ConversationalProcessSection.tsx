"use client";

import { useState } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./ConversationalProcessSection.module.css";

export interface ProcessItem {
  bold: string;
  text: string;
}

export interface ProcessStep {
  counter: string;
  title: string;
  intro: string;
  listHeading: string;
  items: ProcessItem[];
}

export interface ConversationalProcessSectionProps {
  tag: string;
  heading: string;
  steps: ProcessStep[];
  deliverablesTag: string;
  deliverables: string[];
}

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      className={`${styles.toggleIcon} ${open ? styles.toggleOpen : ""}`}
      aria-hidden
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5V19M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function ConversationalProcessSection({
  tag,
  heading,
  steps,
  deliverablesTag,
  deliverables,
}: ConversationalProcessSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section} aria-labelledby="conversational-process-heading">
      <div className={styles.inner}>
        <div className={styles.left}>
          <SectionTag text={tag} variant="dark" />
          <h2 id="conversational-process-heading" className={styles.heading}>
            {heading}
          </h2>
          <div className={styles.accordion}>
            {steps.map((step, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={`${step.counter}-${step.title}`} className={styles.accordionItem}>
                  <button
                    type="button"
                    className={styles.titleRow}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    id={`process-step-trigger-${index}`}
                    aria-controls={`process-step-panel-${index}`}
                  >
                    <span className={styles.counter}>{step.counter}</span>
                    <span className={styles.title}>{step.title}</span>
                    <ToggleIcon open={isOpen} />
                  </button>
                  <div
                    id={`process-step-panel-${index}`}
                    role="region"
                    aria-labelledby={`process-step-trigger-${index}`}
                    className={`${styles.content} ${isOpen ? styles.contentOpen : styles.contentClosed}`}
                  >
                    <p className={styles.intro}>{step.intro}</p>
                    <p className={styles.listHeading}>{step.listHeading}</p>
                    <ul className={styles.list}>
                      {step.items.map((item) => (
                        <li key={`${item.bold}-${item.text}`} className={styles.listItem}>
                          <span className={styles.listBold}>{item.bold}</span>
                          {" - "}
                          {item.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <aside className={styles.right}>
          <SectionTag text={deliverablesTag} variant="dark" />
          <div className={styles.pills}>
            {deliverables.map((label) => (
              <span key={label} className={styles.pill}>
                {label}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
