"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FlairButton } from "@/components/ui/FlairButton";
import styles from "./VideoBannerSection.module.css";

interface VideoBannerSectionProps {
  heading: string;
  headingAccent: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  videoSrc?: string;
}

export function VideoBannerSection({
  heading,
  headingAccent,
  description,
  ctaText,
  ctaHref,
  videoSrc,
}: VideoBannerSectionProps) {
  return (
    <section className={`${styles.section} ${!videoSrc ? styles.noVideo : ""}`}>
      {videoSrc && (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
            src={videoSrc}
          />
          <div className={styles.overlay} />
        </>
      )}
      <div className={styles.inner}>
        <ScrollReveal>
          <h2 className={styles.heading}>
            {heading}{" "}
            <span className={styles.accent}>{headingAccent}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className={styles.description}>{description}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <FlairButton href={ctaHref} size="lg">
            {ctaText}
          </FlairButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
