"use client";

import { FlairButton } from "@/components/ui/FlairButton";
import styles from "./WebDesignGoLiveSection.module.css";

const DEFAULT_BACKGROUND = "/images/covers/web-design-go-live-section-bg.webp";

export interface WebDesignGoLiveSectionProps {
  headingBefore: string;
  headingAccent: string;
  headingAfter: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImage?: string;
}

export function WebDesignGoLiveSection({
  headingBefore,
  headingAccent,
  headingAfter,
  subtitle,
  ctaText,
  ctaHref,
  backgroundImage,
}: WebDesignGoLiveSectionProps) {
  const bgUrl = backgroundImage ?? DEFAULT_BACKGROUND;

  return (
    <section
      className={styles.section}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          {headingBefore}
          <span className={styles.accent}>{headingAccent}</span>
          {headingAfter}
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.cta}>
          <FlairButton href={ctaHref} size="lg">
            {ctaText}
          </FlairButton>
        </div>
      </div>
    </section>
  );
}
