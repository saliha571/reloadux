/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./CaseStudiesCarousel.module.css";

interface CaseStudySlide {
  type: "video" | "image";
  src: string;
}

interface CaseStudyItem {
  tag: string;
  description: string;
  videoUrl?: string;
  image?: string;
  slides?: CaseStudySlide[];
}

interface CaseStudiesCarouselProps {
  items: CaseStudyItem[];
  ctaText: string;
  ctaHref: string;
}

function CaseStudySlider({ item }: { item: CaseStudyItem }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const slides: CaseStudySlide[] = item.slides?.length
    ? item.slides
    : ([
        item.videoUrl ? { type: "video", src: item.videoUrl } : null,
        item.image ? { type: "image", src: item.image } : null,
      ].filter(Boolean) as CaseStudySlide[]);

  const total = slides.length;

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= total) return;
      setCurrent(idx);
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${idx * 100}%)`;
      }
    },
    [total]
  );

  if (slides.length === 0) return null;

  return (
    <div className={styles.sliderParent}>
      <div className={styles.sliderViewport}>
        <div
          ref={trackRef}
          className={styles.sliderTrack}
          style={{ transition: "transform 0.5s ease" }}
        >
          {slides.map((slide, i) => (
            <div key={i} className={styles.slide}>
              {slide.type === "video" ? (
                <video
                  src={slide.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className={styles.media}
                />
              ) : (
                <img
                  src={slide.src}
                  alt=""
                  className={styles.media}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {total > 1 && (
        <div className={styles.navRow}>
          <button
            className={`${styles.navBtn} ${current === 0 ? styles.navDisabled : ""}`}
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Previous slide"
          >
            <svg width="26" height="26" viewBox="0 0 27 26" fill="none">
              <path
                d="M21.084 13H5.917"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.416 6.5L5.916 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.416 19.5L5.916 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={`${styles.navBtn} ${current === total - 1 ? styles.navDisabled : ""}`}
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            aria-label="Next slide"
          >
            <svg width="26" height="26" viewBox="0 0 27 26" fill="none">
              <path
                d="M5.916 13H21.083"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.584 19.5L21.084 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.584 6.5L21.084 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export function CaseStudiesCarousel({
  items,
  ctaText,
  ctaHref,
}: CaseStudiesCarouselProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {items.map((item, i) => (
          <div key={i} className={styles.caseStudy}>
            <div className={styles.aboutRow}>
              <span className={styles.tag}>[{item.tag}]</span>
              <p className={styles.description}>{item.description}</p>
            </div>
            <CaseStudySlider item={item} />
          </div>
        ))}
        <div className={styles.ctaRow}>
          <Link href={ctaHref} className={styles.exploreLink}>
            <span>{ctaText}</span>
            <svg width="27" height="26" viewBox="0 0 27 26" fill="none">
              <path
                d="M5.916 13H21.083"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.584 19.5L21.084 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.584 6.5L21.084 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
