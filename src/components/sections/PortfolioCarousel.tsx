"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import styles from "./PortfolioCarousel.module.css";
import type { PortfolioItem } from "@/lib/types";

interface Props {
  items: PortfolioItem[];
}

export function PortfolioCarousel({ items }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const cursorText =
    hoveredIndex !== null && items[hoveredIndex]?.comingSoon
      ? "Coming\nSoon"
      : "View\nCase Study";

  return (
    <section className={styles.section}>
      <div className={styles.sectionInner}>
      <div
        ref={wrapperRef}
        className={styles.sliderParent}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
      >
        {cursorVisible && (
          <div
            className={styles.cursor}
            style={{ left: cursorPos.x, top: cursorPos.y }}
          >
            <svg className={styles.cursorArrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{cursorText}</span>
          </div>
        )}

        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(s) => (swiperRef.current = s)}
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1200}
          loop
          className={styles.swiper}
        >
          {items.map((item, i) => (
            <SwiperSlide key={item.slug || i} className={styles.slide}>
              {item.href && !item.comingSoon ? (
                <Link
                  href={item.href}
                  className={styles.slideLink}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1920}
                    height={930}
                    className={styles.slideImage}
                  />
                </Link>
              ) : (
                <div
                  className={styles.slideLink}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1920}
                    height={930}
                    className={styles.slideImage}
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      <div className={styles.navRow}>
        <button
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
        />
        <button
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
        />
      </div>
      </div>
    </section>
  );
}
