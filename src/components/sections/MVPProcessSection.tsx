"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MVPProcessSection.module.css";

interface MVPProcessSectionProps {
  tag: string;
  heading: string;
  steps: { counter: string; title: string; content: string }[];
  deliverables: string[];
}

export function MVPProcessSection({
  tag,
  heading,
  steps,
  deliverables,
}: MVPProcessSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openHeights, setOpenHeights] = useState<Record<number, number>>({});
  const bodyRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  useEffect(() => {
    const measureHeights = () => {
      const nextHeights: Record<number, number> = {};
      bodyRefs.current.forEach((el, i) => {
        if (el) nextHeights[i] = el.scrollHeight;
      });
      setOpenHeights(nextHeights);
    };

    measureHeights();
    window.addEventListener("resize", measureHeights);
    return () => window.removeEventListener("resize", measureHeights);
  }, [steps]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <p className={styles.tag}>[ {tag} ]</p>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.columns}>
          <div className={styles.accordion}>
            {steps.map((step, i) => {
              const isOpen = activeIndex === i;
              return (
                <div key={i} className={styles.step}>
                  <button
                    className={styles.stepHeader}
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <h3 className={styles.stepTitleWrap}>
                      <span className={styles.counter}>{step.counter}</span>
                      {step.title}
                    </h3>
                    <span className={`${styles.toggleIcon} ${isOpen ? styles.toggleIconActive : ""}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/icons/process-toggle.svg"
                        alt=""
                        width={33}
                        height={33}
                        className={styles.toggleSvg}
                      />
                    </span>
                  </button>
                  <div
                    ref={(el) => {
                      bodyRefs.current[i] = el;
                    }}
                    className={styles.stepBody}
                    style={{ maxHeight: isOpen ? `${openHeights[i] ?? 0}px` : "0px" }}
                  >
                    <ul className={styles.stepContent}>
                      <li>{step.content}</li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.deliverables}>
            <h2 className={styles.deliverablesHeading}>
              [ DELIVERABLES EXPECTED ]
            </h2>
            <div className={styles.pills}>
              {deliverables.map((item, i) => (
                <span key={i} className={styles.pill}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
