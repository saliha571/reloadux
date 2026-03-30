"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./ConversationalHeroSection.module.css";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { resolveStrapiUploadOrPublicUrl } from "@/lib/media";

const FALLBACK_HERO_VIDEO = "/videos/conversational-hero-video.mp4";

export interface ConversationalHeroSectionProps {
  titleItalic: string;
  titleBold: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  videoSrc: string;
  /** Optional first frame; omit when empty so the browser shows decoded video. */
  videoPoster?: string;
  stat: { value: string; text: string; source: string };
}

function StatBlock({ stat }: { stat: ConversationalHeroSectionProps["stat"] }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statRow}>
        <div className={styles.statValue}>{stat.value}</div>
        <p className={styles.statText}>{stat.text}</p>
      </div>
      <p className={styles.statSource}>{stat.source}</p>
    </div>
  );
}

function CtaArrow() {
  return (
    <svg
      className={styles.ctaArrow}
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M1 6h16M13 1l6 5-6 5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedSrc =
    resolveStrapiUploadOrPublicUrl(videoSrc || "") || FALLBACK_HERO_VIDEO;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {
      /* autoplay may be blocked; user can use controls if we add them later */
    });
  }, [resolvedSrc]);

  return (
    <section className={styles.section} aria-label="Hero">
      <div className={styles.glow} aria-hidden />
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
            <Link href={ctaHref} className={styles.cta}>
              <span className={styles.ctaFlair} aria-hidden />
              <span className={styles.ctaLabel}>
                {ctaText}
                <CtaArrow />
              </span>
            </Link>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <StatBlock stat={stat} />
          </ScrollReveal>
        </div>

        <div className={styles.videoColumn}>
          <ScrollReveal delay={0.25}>
            <div className={styles.videoFrame}>
              <video
                key={resolvedSrc}
                ref={videoRef}
                className={styles.video}
                src={"/videos/conversational-hero-video.mp4"}
                poster={"/images/conversational/chat-voice-mock.png"}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
