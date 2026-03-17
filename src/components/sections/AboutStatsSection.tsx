"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./AboutStatsSection.module.css";

interface StatItem {
  value: string;
  label: string;
}

interface AboutStatsSectionProps {
  tag: string;
  heading: string;
  stats: StatItem[];
}

function parseStatValue(raw: string) {
  const match = raw.match(/^([+\-]?)(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { prefix: "", numericValue: 0, suffix: raw, decimals: 0 };
  const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
  return {
    prefix: match[1],
    numericValue: parseFloat(match[2]),
    suffix: match[3],
    decimals,
  };
}

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) {
  const { prefix, numericValue, suffix, decimals } = parseStatValue(value);
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericValue;
      setDisplay(current.toFixed(decimals));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [numericValue, decimals, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animate();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <span className={styles.statValue} ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function AboutStatsSection({ tag, heading, stats }: AboutStatsSectionProps) {
  const durations = [500, 2000, 2000, 2000];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionTag text={tag} />
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.stat}>
              <AnimatedCounter
                value={stat.value}
                duration={durations[i] ?? 2000}
              />
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
