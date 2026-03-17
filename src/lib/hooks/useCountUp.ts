"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  startOnView?: boolean;
}

export function useCountUp({ end, duration = 2000, startOnView = true }: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasStarted.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setCount(end);
      return;
    }

    function startAnimation() {
      if (hasStarted.current) return;
      hasStarted.current = true;

      const startTime = performance.now();

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }

    if (!startOnView) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return { count, ref };
}
