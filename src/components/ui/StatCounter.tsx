"use client";

import { useRef, useEffect } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import styles from "./StatCounter.module.css";

interface StatCounterProps {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

function CountDisplay({
  value,
  fallback,
  isNumeric,
}: {
  value: MotionValue<number>;
  fallback: string;
  isInView: boolean;
  isNumeric: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isNumeric || !ref.current) return;
    const unsubscribe = value.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(Math.round(v));
    });
    return unsubscribe;
  }, [value, isNumeric]);

  if (!isNumeric) return <>{fallback}</>;
  return <span ref={ref}>0</span>;
}

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView && !isNaN(numericValue)) {
      animate(count, numericValue, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, numericValue, count]);

  return (
    <div ref={ref} className={styles.stat}>
      <span className={styles.value}>
        {prefix}
        <CountDisplay
          value={rounded}
          fallback={value}
          isInView={isInView}
          isNumeric={!isNaN(numericValue)}
        />
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
