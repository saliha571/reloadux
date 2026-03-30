"use client";

import type { ReactNode } from "react";
import { FlairButton } from "@/components/ui/FlairButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./GenAIStatementSection.module.css";

interface GenAIStatementSectionProps {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaHref: string;
}

const ACCENT_PATTERN = /\b(clicks|conversations)\b/gi;

function renderHeadingWithAccents(heading: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(ACCENT_PATTERN.source, ACCENT_PATTERN.flags);
  let key = 0;

  while ((match = re.exec(heading)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(heading.slice(lastIndex, match.index));
    }
    nodes.push(
      <span key={`accent-${key++}`} className={styles.accent}>
        {match[0]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < heading.length) {
    nodes.push(heading.slice(lastIndex));
  }

  return <>{nodes}</>;
}

export function GenAIStatementSection({
  heading,
  subheading,
  ctaText,
  ctaHref,
}: GenAIStatementSectionProps) {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.inner}>
          <h2 className={styles.heading}>{renderHeadingWithAccents(heading)}</h2>
          <p className={styles.subheading}>{subheading}</p>
          <FlairButton href={ctaHref} variant="light" size="lg">
            {ctaText}
          </FlairButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
