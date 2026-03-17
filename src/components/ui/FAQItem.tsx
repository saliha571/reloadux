"use client";

import { useState } from "react";
import styles from "./FAQItem.module.css";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.item} ${open ? styles.open : ""}`}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className={styles.question}>{question}</span>
        <span className={styles.icon}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className={styles.answer}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
