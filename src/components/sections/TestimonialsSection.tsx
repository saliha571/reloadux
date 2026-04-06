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
  tagVariant?: "light" | "dark";
  heading?: string;
}

const PEEK_HEIGHT = 60;
const SCROLL_PER_SLIDE = 500;

export function TestimonialsSection({ testimonials, tagText = "WORDS OF OUR CLIENTS", tagVariant = "light", heading = "Long term partnership is what we are always striving." }: TestimonialsSectionProps) {
  const [active, setActive] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [slideHeights, setSlideHeights] = useState<number[]>([]);
  const [sectionH, setSectionH] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const measure = () => {
      const heights = slideRefs.current.map((el) => el?.offsetHeight ?? 0);
      setSlideHeights(heights);
      if (sectionRef.current) setSectionH(sectionRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [testimonials.length]);

  const getTranslateY = useCallback(
    (idx: number) => {
      let y = 0;
      for (let i = 0; i < idx; i++) y += slideHeights[i] ?? 0;
      return y;
    },
    [slideHeights]
  );

  const carouselHeight =
    slideHeights.length > 0 ? (slideHeights[0] ?? 0) + PEEK_HEIGHT : 600;

  const extraScroll = (testimonials.length - 1) * SCROLL_PER_SLIDE;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || sectionH === 0 || extraScroll <= 0) return;

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;

      if (scrolled <= 0) { setActive(0); return; }

      const progress = Math.min(Math.max(scrolled / extraScroll, 0), 1);
      const idx = Math.min(
        Math.round(progress * (testimonials.length - 1)),
        testimonials.length - 1
      );
      setActive(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [testimonials.length, sectionH, extraScroll]);

  const scrollToSlide = useCallback(
    (idx: number) => {
      const wrapper = wrapperRef.current;
      if (!wrapper || testimonials.length <= 1) return;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const target = wrapperTop + (idx / (testimonials.length - 1)) * extraScroll;
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [testimonials.length, extraScroll]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const activeTestimonial = testimonials[active];
  const wrapperHeight = sectionH > 0 ? sectionH + extraScroll : undefined;

  return (
    <div
      ref={wrapperRef}
      className={styles.stickyWrapper}
      style={wrapperHeight ? { height: wrapperHeight } : undefined}
    >
      <section className={styles.section} ref={sectionRef}>
        <div className={styles.inner}>
          <div className={styles.headerRow}>
            <SectionTag text={tagText} variant={tagVariant} />
            {heading && (
              <h2 className={styles.heading}>{heading}</h2>
            )}
          </div>

          <div className={styles.carouselRow}>
            <div
              className={styles.carousel}
              style={{ height: carouselHeight, cursor: activeTestimonial?.videoUrl ? "none" : "default" }}
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
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
                      if (t.videoUrl && playingVideo !== i) setPlayingVideo(i);
                    }}
                  >
                    <span className={styles.counter}>{t.index}</span>
                    <blockquote className={styles.quote}>{t.quote}</blockquote>
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
                  onClick={() => scrollToSlide(i)}
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
    </div>
  );
}
