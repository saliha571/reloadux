"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      {
        rootMargin: options.rootMargin || "-80px",
        threshold: options.threshold || 0.1,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [options.rootMargin, options.threshold]);

  return ref;
}
