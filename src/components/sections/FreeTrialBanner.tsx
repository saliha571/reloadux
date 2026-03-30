"use client";

import { FlairButton } from "@/components/ui/FlairButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./FreeTrialBanner.module.css";

export interface FreeTrialBannerProps {
  heading: string;
  headingAccent: string;
  headingEnd: string;
  benefits: string[];
  ctaText: string;
  ctaHref: string;
}

function CheckIcon() {
  return (
    <svg
      className={styles.check}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 10L8.5 14.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FreeTrialBanner({
  heading,
  headingAccent,
  headingEnd,
  benefits,
  ctaText,
  ctaHref,
}: FreeTrialBannerProps) {
  return (
    <section className={styles.section} aria-labelledby="free-trial-banner-heading">
      <ScrollReveal>
        <div className={styles.inner}>
          <h2 id="free-trial-banner-heading" className={styles.heading}>
            {heading}
            {" "}
            <span className={styles.accent}>{headingAccent}</span>
            {headingEnd}
          </h2>
          <ul className={styles.benefits}>
            {benefits.map((text) => (
              <li key={text} className={styles.benefit}>
                <CheckIcon />
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className={styles.ctaWrap}>
            <FlairButton href={ctaHref} size="lg" variant="light">
              {ctaText}
            </FlairButton>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
