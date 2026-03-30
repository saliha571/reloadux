"use client";

import styles from "./ConversationalHeroSection.module.css";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { FlairButton } from "@/components/ui/FlairButton";

export interface ConversationalHeroSectionProps {
  titleItalic: string;
  titleBold: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  videoSrc: string;
  videoPoster: string;
  stat: { value: string; text: string; source: string };
}

function StatBlock({ stat }: { stat: ConversationalHeroSectionProps["stat"] }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statValue}>{stat.value}</div>
      <p className={styles.statText}>{stat.text}</p>
      <p className={styles.statSource}>{stat.source}</p>
    </div>
  );
}

export function ConversationalHeroSection({
  titleItalic,
  titleBold,
  subtitle,
  ctaText,
  ctaHref,
  videoSrc,
  videoPoster,
  stat,
}: ConversationalHeroSectionProps) {
  return (
    <section className={styles.section} aria-label="Hero">
      <div className={styles.ellipse} aria-hidden />
      <div className={styles.inner}>
        <div className={styles.left}>
          <h1 className={styles.heading}>
            <ScrollReveal className={styles.titleLineReveal} delay={0}>
              <span className={styles.titleItalic}>{titleItalic}</span>
            </ScrollReveal>
            <ScrollReveal className={styles.titleLineReveal} delay={0.1}>
              <span className={styles.titleBold}>{titleBold}</span>
            </ScrollReveal>
          </h1>
          <ScrollReveal delay={0.2}>
            <p className={styles.subtitle}>{subtitle}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <FlairButton href={ctaHref} size="lg">
              {ctaText}
            </FlairButton>
          </ScrollReveal>
          <ScrollReveal delay={0.4} className={styles.statDesktop}>
            <StatBlock stat={stat} />
          </ScrollReveal>
        </div>

        <div className={styles.videoWrap}>
          <ScrollReveal delay={0.25}>
            <video
              className={styles.video}
              src={videoSrc}
              poster={videoPoster}
              autoPlay
              muted
              loop
              playsInline
            />
          </ScrollReveal>
          <ScrollReveal delay={0.45} className={styles.statMobile}>
            <StatBlock stat={stat} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
