"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./WorkShowcase.module.css";
import { SectionTag } from "@/components/ui/SectionTag";

interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  bgColor?: string;
  href?: string;
  comingSoon?: boolean;
}

interface WorkShowcaseProps {
  caseStudies: CaseStudy[];
}

export function WorkShowcase({ caseStudies }: WorkShowcaseProps) {
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState("View Case Study");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <SectionTag text="OUR WORK" variant="dark" />
            <h2 className={styles.heading}>
              From intelligent redesigns to AI-native products,
              we&apos;ve got success stories showcasing our impact.
            </h2>
          </div>
          <div className={styles.badge}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/dd-badge.svg"
              alt="Design Deliver Discover Define"
              width={94}
              height={93}
              className={styles.badgeImg}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/down-arrow.svg"
              alt=""
              width={18}
              height={28}
              className={styles.badgeArrow}
            />
          </div>
        </div>

        <div className={styles.studies}>
          {caseStudies.map((study, i) => (
            <div key={i} className={styles.study}>
              <div
                className={styles.imageWrapper}
                ref={wrapperRef}
                style={study.bgColor ? { backgroundColor: study.bgColor } : undefined}
                onMouseEnter={() => {
                  setCursorVisible(true);
                  setCursorText(study.comingSoon ? "Coming Soon" : "View Case Study");
                }}
                onMouseLeave={() => setCursorVisible(false)}
                onMouseMove={handleMouseMove}
              >
                {cursorVisible && (
                  <div
                    className={styles.customCursor}
                    style={{ left: cursorPos.x, top: cursorPos.y }}
                  >
                    {cursorText}
                  </div>
                )}
                <div className={study.bgColor ? styles.mediaInner : styles.mediaFull}>
                  {study.video ? (
                    <video
                      autoPlay
                      playsInline
                      loop
                      muted
                      preload="metadata"
                      className={styles.media}
                    >
                      <source src={study.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={1280}
                      height={513}
                      className={styles.media}
                    />
                  )}
                </div>
                {study.href && !study.comingSoon && (
                  <Link href={study.href} className={styles.imageLink} aria-label={`View ${study.title} case study`} />
                )}
              </div>
              <div className={styles.studyInfo}>
                <SectionTag text={study.client.toUpperCase()} variant="dark" />
                <div className={styles.studyRight}>
                  <p className={styles.studyDesc}>{study.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/case-studies/" className={styles.seeAll}>
          <span className={styles.seeAllText}>See all projects</span>
          <span className={styles.seeAllIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none">
              <g clipPath="url(#seeAllArrow)">
                <path d="M5.916 13H21.083" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.584 19.5L21.084 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.584 6.5L21.084 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="seeAllArrow">
                  <rect width="26" height="26" fill="white" transform="translate(0.5)"/>
                </clipPath>
              </defs>
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}
