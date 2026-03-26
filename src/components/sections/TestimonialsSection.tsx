"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./TestimonialsSection.module.css";
import { SectionTag } from "@/components/ui/SectionTag";

interface Testimonial {
  index: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  companyLogo?: string;
  videoUrl?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  tagText?: string;
}

const SCROLL_COOLDOWN = 800;
const PEEK_HEIGHT = 60;

function lockScroll() {
  const scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.dataset.scrollLock = String(scrollY);
}

function unlockScroll() {
  const scrollY = document.body.dataset.scrollLock;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  delete document.body.dataset.scrollLock;
  if (scrollY) window.scrollTo(0, parseInt(scrollY, 10));
}

function isScrollLocked() {
  return document.body.style.position === "fixed";
}

export function TestimonialsSection({ testimonials, tagText = "WORDS OF OUR CLIENTS" }: TestimonialsSectionProps) {
  const [active, setActive] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [slideHeights, setSlideHeights] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startY = useRef(0);
  const isScrolling = useRef(false);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const measure = () => {
      const heights = slideRefs.current.map((el) => el?.offsetHeight ?? 0);
      setSlideHeights(heights);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [testimonials.length]);

  const getTranslateY = useCallback(
    (idx: number) => {
      let y = 0;
      for (let i = 0; i < idx; i++) {
        y += slideHeights[i] ?? 0;
      }
      return y;
    },
    [slideHeights]
  );

  const carouselHeight =
    slideHeights.length > 0 ? (slideHeights[0] ?? 0) + PEEK_HEIGHT : 600;

  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= testimonials.length) return;
      if (isScrolling.current) return;
      isScrolling.current = true;
      setActive(idx);
      setTimeout(() => {
        isScrolling.current = false;
      }, SCROLL_COOLDOWN);
    },
    [testimonials.length]
  );

  useEffect(() => {
    const carousel = containerRef.current;
    if (!carousel) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 5) return;

      const current = activeRef.current;
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (scrollingDown && current >= testimonials.length - 1) {
        if (isScrollLocked()) unlockScroll();
        return;
      }
      if (scrollingUp && current <= 0) {
        if (isScrollLocked()) unlockScroll();
        return;
      }

      if (isScrolling.current) return;

      if (scrollingDown) {
        goTo(current + 1);
      } else if (scrollingUp) {
        goTo(current - 1);
      }
    };

    carousel.addEventListener("wheel", handleWheel, { passive: false });
    return () => carousel.removeEventListener("wheel", handleWheel);
  }, [testimonials.length, goTo]);

  useEffect(() => {
    return () => { if (isScrollLocked()) unlockScroll(); };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = startY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
      if (diff > 0) {
        goTo(active + 1);
      } else if (diff < 0) {
        goTo(active - 1);
      }
    },
    [active, goTo]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const activeTestimonial = testimonials[active];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <SectionTag text={tagText} />
        </div>

        <div className={styles.right}>
          <div
            className={styles.carousel}
            ref={containerRef}
            style={{ height: carouselHeight, cursor: activeTestimonial?.videoUrl ? "none" : "default" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => { setCursorVisible(true); lockScroll(); }}
            onMouseLeave={() => { setCursorVisible(false); if (isScrollLocked()) unlockScroll(); }}
            onMouseMove={handleMouseMove}
          >
            {cursorVisible && activeTestimonial?.videoUrl && activeTestimonial?.avatar && playingVideo !== active && (
              <div
                className={`${styles.reviewCursor} ${styles.reviewCursorVideo}`}
                style={{ left: cursorPos.x, top: cursorPos.y }}
              >
                <Image
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  width={83}
                  height={83}
                  className={styles.cursorAvatar}
                />
              </div>
            )}
            <div
              className={styles.track}
              style={{ transform: `translateY(-${getTranslateY(active)}px)` }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  ref={(el) => { slideRefs.current[i] = el; }}
                  className={styles.slide}
                  onClick={() => {
                    if (t.videoUrl && playingVideo !== i) {
                      setPlayingVideo(i);
                    }
                  }}
                >
                  <span className={styles.counter}>{t.index}</span>
                  <blockquote className={styles.quote}>
                    {t.quote}
                  </blockquote>
                  <div className={styles.author}>
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={68}
                        height={68}
                        className={styles.avatarImg}
                      />
                    ) : (
                      <div className={styles.avatar} />
                    )}
                    <div className={styles.authorInfo}>
                      <span className={styles.name}>{t.name}</span>
                      <span className={styles.role}>
                        {t.role}{" "}
                        {t.companyLogo ? (
                          <Image
                            src={t.companyLogo}
                            alt={t.company}
                            width={80}
                            height={24}
                            className={styles.companyLogo}
                          />
                        ) : (
                          <strong>{t.company}</strong>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {playingVideo !== null && testimonials[playingVideo]?.videoUrl && (
        <div
          className={styles.videoOverlay}
          onClick={() => setPlayingVideo(null)}
        >
          <div
            className={styles.videoContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${testimonials[playingVideo].videoUrl}&autoplay=1`}
              title={`${testimonials[playingVideo].name} testimonial video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoIframe}
            />
            <button
              className={styles.videoClose}
              onClick={() => setPlayingVideo(null)}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
