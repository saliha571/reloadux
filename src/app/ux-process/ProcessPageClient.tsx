"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import type { UXProcessPageData } from "@/lib/types";
import styles from "./ProcessPage.module.css";

interface ProcessPageClientProps {
  data: UXProcessPageData;
}

export function ProcessPageClient({ data }: ProcessPageClientProps) {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollToStep = useCallback((index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx !== -1) setActiveSlide(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTag}>
            <SectionTag text={data.hero.tag} variant="light" />
          </div>
          <ScrollReveal>
            <h1 className={styles.heroHeading}>
              <span className={styles.heroHeadingBold}>
                {data.hero.headingBold}
              </span>{" "}
              <span className={styles.heroHeadingFaded}>
                {data.hero.headingFaded}
              </span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Process Section (dark) ── */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          <nav className={styles.sidebar}>
            <ul className={styles.sidebarList}>
              {data.processSteps.map((step, i) => (
                <li
                  key={step.id}
                  className={`${styles.sidebarItem} ${activeSlide === i ? styles.sidebarItemActive : ""}`}
                  onClick={() => scrollToStep(i)}
                >
                  {step.title}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.slides}>
            {data.processSteps.map((step, i) => (
              <div
                key={step.id}
                className={styles.slide}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
              >
                <ScrollReveal>
                  <h3 className={styles.slideHeading}>
                    {step.number} {step.title}
                  </h3>
                </ScrollReveal>

                <div className={styles.processSteps}>
                  {step.categories.map((cat, j) => (
                    <motion.div
                      key={j}
                      className={styles.stepCard}
                      style={{ marginTop: j * 60 }}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: j * 0.15 }}
                    >
                      <div className={styles.stepCardInner}>
                        <p className={styles.stepHeading}>{cat.name}</p>
                        <ul>
                          {cat.items.map((item, k) => (
                            <li key={k}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <ScrollReveal>
                  <div className={styles.descPart}>
                    <h3 className={styles.accentHeading}>
                      [ what to expect? ]
                    </h3>
                    <p className={styles.descText}>
                      {step.expectPrefix && (
                        <span className={styles.expectPrefix}>{step.expectPrefix} </span>
                      )}
                      {step.expectBold && (
                        <>
                          {step.expectBold}
                          {step.id === "one" && (
                            <span className={styles.inlineAvatars}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/testimonials/iman.webp" alt="" className={styles.inlineAvatar} />
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/testimonials/yuriy.webp" alt="" className={styles.inlineAvatar} />
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/testimonials/viktor.webp" alt="" className={styles.inlineAvatar} />
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/images/testimonials/mahir.webp" alt="" className={styles.inlineAvatar} />
                            </span>
                          )}
                          {" "}
                        </>
                      )}
                      {step.expectLight}{" "}
                      <span>{step.expectFaded}</span>
                      {step.expectSuffix && (
                        <> {step.expectSuffix}</>
                      )}
                    </p>
                  </div>
                </ScrollReveal>

                {step.deliverables.length > 0 && (
                  <ScrollReveal>
                    <div className={styles.kpis}>
                      <h3 className={styles.accentHeading}>
                        [ deliverables ]
                      </h3>
                      <div className={styles.kpisWrapper}>
                        {step.deliverables.map((d, j) => (
                          <div key={j} className={styles.singleKpi}>
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study ── */}
      <ScrollReveal>
        <section className={styles.caseStudy}>
          <div className={styles.caseStudyInner}>
            <div className={styles.caseStudyImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.caseStudy.image}
                alt={`${data.caseStudy.tag} case study`}
              />
            </div>
            <div className={styles.caseStudyContent}>
              <div className={styles.caseStudyTag}>
                <SectionTag text={data.caseStudy.tag} />
              </div>
              <p className={styles.caseStudyHeading}>
                {data.caseStudy.heading}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Testimonials ── */}
      <TestimonialsSection
        testimonials={data.testimonials}
        tagText="WORDS OF OUR CLIENTS"
      />

      {/* ── CTA ── */}
      <CTASection
        title={data.cta.title}
        subtitle={data.cta.subtitle}
        ctaText={data.cta.ctaText}
        ctaHref={data.cta.ctaHref}
        buttonAfterSubtitle
        hideLogos
        className={styles.ctaSection}
      />

      {/* ── Contact Form ── */}
      <ContactFormSection
        tag="CONNECT WITH US"
        heading="Let&#8217;s talk about your product."
        nextSteps={data.nextSteps}
        contactInfo={data.contactInfo}
      />
    </div>
  );
}
