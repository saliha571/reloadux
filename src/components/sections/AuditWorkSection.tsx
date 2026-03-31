"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./AuditWorkSection.module.css";

interface AuditWorkSectionProps {
  tag: string;
  heading: string;
  stats: { value: string; label: string }[];
  caseStudies: {
    name: string;
    description: string;
    slides: { type: "video" | "image"; src: string; caption?: string }[];
    href: string;
    comingSoon?: boolean;
  }[];
  hideHeader?: boolean;
  removeCaseStudyTopBorder?: boolean;
  sliderVariant?: "default" | "singlePeek";
  className?: string;
}

function renderLabel(label: string) {
  const boldWords = ["UX research", "client satisfaction", "AI-guided UX"];
  let result = label;
  for (const word of boldWords) {
    if (result.includes(word)) {
      result = result.replace(word, `<strong>${word}</strong>`);
    }
  }
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

function renderHeading(heading: string) {
  const boldWord = "UX audit";
  if (heading.includes(boldWord)) {
    const parts = heading.split(boldWord);
    return (
      <>
        {parts[0]}<strong>{boldWord}</strong>{parts[1]}
      </>
    );
  }
  return heading;
}

function CaseStudySlider({
  cs,
  sliderVariant = "default",
}: {
  cs: AuditWorkSectionProps["caseStudies"][number];
  sliderVariant?: AuditWorkSectionProps["sliderVariant"];
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className={styles.sliderWrap}>
      <Swiper
        modules={[Navigation, FreeMode, Mousewheel]}
        slidesPerView={sliderVariant === "singlePeek" ? 1.08 : 1.5}
        spaceBetween={sliderVariant === "singlePeek" ? 16 : 20}
        freeMode={{ enabled: sliderVariant !== "singlePeek", momentum: true }}
        mousewheel={{ forceToAxis: true }}
        breakpoints={{
          0: { slidesPerView: sliderVariant === "singlePeek" ? 1.05 : 1.15, spaceBetween: 12 },
          768: { slidesPerView: sliderVariant === "singlePeek" ? 1.08 : 1.3, spaceBetween: 16 },
          1024: { slidesPerView: sliderVariant === "singlePeek" ? 1.08 : 1.5, spaceBetween: 20 },
        }}
        onSwiper={(s) => {
          swiperRef.current = s;
          setIsBeginning(s.isBeginning);
          setIsEnd(s.isEnd);
        }}
        onSlideChange={(s) => {
          setIsBeginning(s.isBeginning);
          setIsEnd(s.isEnd);
        }}
        className={styles.swiper}
      >
        {(cs.slides ?? []).map((slide, j) => (
          <SwiperSlide key={j}>
            <div className={styles.slide}>
              {slide.type === "video" ? (
                <video
                  src={slide.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className={styles.slideMedia}
                />
              ) : (
                <Image
                  src={slide.src}
                  alt={`${cs.name} slide ${j + 1}`}
                  width={1280}
                  height={620}
                  className={styles.slideMedia}
                  loading="lazy"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navRow}>
        <button
          className={`${styles.navBtn} ${isBeginning ? styles.navDisabled : ""}`}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          disabled={isBeginning}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className={`${styles.navBtn} ${isEnd ? styles.navDisabled : ""}`}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          disabled={isEnd}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export function AuditWorkSection({
  tag,
  heading,
  stats,
  caseStudies,
  hideHeader,
  removeCaseStudyTopBorder,
  sliderVariant = "default",
  className,
}: AuditWorkSectionProps) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      {!hideHeader && (
        <div className={styles.constrained}>
          <SectionTag text={tag} />
          <div className={styles.headingRow}>
            <h2 className={styles.heading}>{renderHeading(heading)}</h2>
            <div className={styles.badge}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dd-badge.svg"
                alt=""
                width={94}
                height={93}
                className={styles.badgeImg}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/down-arrow.svg"
                alt=""
                width={18}
                height={28}
                className={styles.badgeArrow}
              />
            </div>
          </div>

          <div className={styles.statsRow}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{renderLabel(stat.label)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.caseStudies}>
        {caseStudies.map((cs, i) => (
          <div
            key={i}
            className={`${styles.caseStudy} ${removeCaseStudyTopBorder ? styles.caseStudyNoTopBorder : ""}`}
          >
            <div className={styles.constrained}>
              <div className={styles.caseStudyHeader}>
                <span className={styles.caseStudyTag}>[ {cs.name} ]</span>
                <p className={styles.caseStudyDesc}>{cs.description}</p>
              </div>
            </div>
            <CaseStudySlider cs={cs} sliderVariant={sliderVariant} />
          </div>
        ))}
      </div>
    </section>
  );
}
