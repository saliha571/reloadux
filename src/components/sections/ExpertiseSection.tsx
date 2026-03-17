"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import styles from "./ExpertiseSection.module.css";
import { SectionTag } from "@/components/ui/SectionTag";

interface ExpertiseDomain {
  title: string;
  tags: string[];
  href?: string;
}

interface ExpertiseSectionProps {
  domains: ExpertiseDomain[];
}

export function ExpertiseSection({ domains }: ExpertiseSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 1 },
      },
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionTag text="DIVERSITY" />
          <h2 className={styles.heading}>
            We design AI experiences for complex domains.
          </h2>
        </div>

        <div className={styles.carousel} ref={emblaRef}>
          <div className={styles.track}>
            {domains.map((domain, i) => (
              <div key={i} className={styles.slide}>
                <Link
                  href={domain.href || "#"}
                  className={styles.card}
                >
                  <h3 className={styles.catTitle}>{domain.title}</h3>
                  <div className={styles.pageTags}>
                    {domain.tags.map((tag, j) => (
                      <span key={j}>{tag}</span>
                    ))}
                  </div>
                  <span className={styles.diversityCta}>
                    <svg
                      className={styles.arrowIcon}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 16H26M26 16L18 8M26 16L18 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {scrollSnaps.length > 1 && (
          <div className={styles.dots}>
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ""}`}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
