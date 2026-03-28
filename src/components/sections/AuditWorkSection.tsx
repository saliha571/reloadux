"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
}: {
  cs: AuditWorkSectionProps["caseStudies"][number];
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const defaultCaption =
    cs.name === "PEOPLE GURU"
      ? `Our audit for PeopleGuru uncovered visual and functional inconsistencies that hindered users from efficiently completing tasks.`
      : `Our comprehensive UX audit report identified various problem areas, from information hierarchy to accessibility concerns.`;

  return (
    <div className={styles.sliderWrap}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1.35}
        spaceBetween={24}
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
        {cs.slides.map((slide, j) => (
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
                  alt={slide.caption || defaultCaption}
                  width={1280}
                  height={620}
                  className={styles.slideMedia}
                />
              )}
              <h3 className={styles.slideCaption}>
                {slide.caption || defaultCaption}
              </h3>
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
}: AuditWorkSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
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

        <div className={styles.caseStudies}>
          {caseStudies.map((cs, i) => (
            <div key={i} className={styles.caseStudy}>
              <div className={styles.caseStudyHeader}>
                <span className={styles.caseStudyTag}>[ {cs.name} ]</span>
                <p className={styles.caseStudyDesc}>{cs.description}</p>
              </div>
              <CaseStudySlider cs={cs} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
