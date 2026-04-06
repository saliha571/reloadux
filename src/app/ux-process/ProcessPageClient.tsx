"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import type { NextStep } from "@/lib/types";
import styles from "./ProcessPage.module.css";

const processSteps = [
  {
    id: "one",
    number: "01/",
    title: "Discover",
    categories: [
      {
        name: "Business",
        items: [
          "Understand company\u2019s background & vision",
          "Understand client requirements",
          "Define product goals",
          "Define business goals",
        ],
      },
      {
        name: "User Research",
        items: [
          "Identify target audience",
          "Gather insights",
          "Analyse demographics",
        ],
      },
      {
        name: "Market Research",
        items: [
          "Study competitors",
          "Identify trends",
          "Analyse product feasibility along with competitors",
        ],
      },
    ],
    expectBold: "A team of UX consultants",
    expectLight: "leads a 1-2 week discovery workshop",
    expectFaded:
      "with stakeholders and users to gather key insights.",
    deliverables: [
      "Business vision",
      "User persona",
      "SWOT analysis",
      "Competitive analysis",
      "UX audit report",
      "Business model canvas",
    ],
  },
  {
    id: "two",
    number: "02/",
    title: "Define",
    categories: [
      {
        name: "Problem Statement",
        items: [
          "Define pain points",
          "Define user expectations",
          "Clarify scope",
          "Identify product KPIs",
        ],
      },
      {
        name: "Existing solutions",
        items: [
          "Explore existing solutions",
          "Evaluate pros & cons",
          "Identify better solution",
        ],
      },
      {
        name: "User Journey",
        items: [
          "Brainstorm ideas",
          "Conceptualisation",
          "Define user flows & Journey",
        ],
      },
    ],
    expectBold: "",
    expectLight:
      "defining the problem statements and the scope of work.",
    expectFaded:
      "Once defined, UX Designers will start creating the User Journey.",
    deliverables: [
      "KPIs",
      "Goals & challenges",
      "User flows",
      "Module feature list",
      "New suggestions",
      "Priority matrix",
    ],
  },
  {
    id: "three",
    number: "03/",
    title: "Design",
    categories: [
      {
        name: "Wire-framing",
        items: [
          "Create layouts",
          "Outline functionality",
          "Build lo-fi structure",
        ],
      },
      {
        name: "Visual Design",
        items: [
          "Define style guide",
          "Build design system",
          "Prepare mood-board",
          "Create high-fi designs",
        ],
      },
      {
        name: "Feedback Incorporation",
        items: ["Gather inputs & feedback", "Implement changes"],
      },
    ],
    expectBold: "",
    expectLight:
      "collaborate to design solutions that meet your needs, using industry best practices.",
    expectFaded:
      "This includes review cycles to finalize the UX and visuals.",
    deliverables: [
      "Wireframes",
      "Design language",
      "Design system",
      "Tokens",
      "Usability testing",
      "High fidelity design",
    ],
  },
  {
    id: "four",
    number: "04/",
    title: "Deliver",
    categories: [
      {
        name: "Interactive Prototyping",
        items: [
          "Prepare clickable prototype",
          "Add micro-interactions",
          "Integrate animations",
        ],
      },
      {
        name: "Front-End Development",
        items: ["Code interfaces", "Ensure responsiveness"],
      },
      {
        name: "Usability Testing",
        items: [
          "Conduct testing with users",
          "Gather feedback & insights",
          "Refine product",
        ],
      },
    ],
    expectPrefix: "We\u2019ll build a",
    expectBold: "",
    expectLight:
      "high-quality end product, bringing the design to life with optimization,",
    expectFaded:
      "interactivity, and other design elements,",
    expectSuffix: "all thoroughly tested for usability.",
    deliverables: [],
  },
];

const testimonials = [
  {
    index: "/01",
    quote:
      "\u201cWe started with reloadux with an AI product and a lot of assumptions. They challenged most of them, in a good way. By the time we launched, we had an AI marketing tool marketers actually wanted. I loved the fact that they always spent time thinking through what they are building\u201d",
    name: "Iman Oubou",
    role: "CEO at",
    company: "Vocable",
    avatar: "/images/testimonials/iman.webp",
    companyLogo: "/images/testimonials/vocable-logo.webp",
    videoUrl:
      "https://www.youtube.com/embed/hUyQpSovdA8?si=7tbMS5YqndijNSmp",
  },
  {
    index: "/02",
    quote:
      "\u201cWe had the AI product knowledge. What we didn\u2019t have was a way to present it that didn\u2019t overwhelm users, reloadux team took the time to understand the product and created end to end interactive flows that became the foundation of the product.\u201d",
    name: "Matthew Tarascio",
    role: "Tech Entrepreneur at",
    company: "MomentAI",
    avatar: "/images/testimonials/matthew.jpeg",
    companyLogo: "/images/testimonials/momentai-logo.jpeg",
  },
  {
    index: "/03",
    quote:
      "\u201cThe collaboration was smooth from start to finish. They asked the right questions, pushed back when we were off track, and helped us identify where AI actually made sense, then delivered ahead of schedule.\u201d",
    name: "Yuriy Shikhanovich",
    role: "Manager at",
    company: "Via People",
    avatar: "/images/testimonials/yuriy.webp",
    companyLogo: "/images/testimonials/via-people-logo.webp",
  },
  {
    index: "/04",
    quote:
      "\u201cOperations managers are skeptical people. reloadux team got that immediately. Everything they designed had a clear explanation behind it. That\u2019s why it actually got used.\u201d",
    name: "Viktor Misyutin",
    role: "Manager at",
    company: "Encore",
    avatar: "/images/testimonials/viktor.webp",
    companyLogo: "/images/testimonials/encore-logo.webp",
  },
  {
    index: "/05",
    quote:
      "\u201creloadux clear updates kept us informed every step of the way. Their straightforward approach made our partnership efficient and productive\u201d",
    name: "Mahir Iskender",
    role: "CEO at",
    company: "Digno",
    avatar: "/images/testimonials/mahir.webp",
    companyLogo: "/images/testimonials/digno-logo.webp",
  },
];

interface ProcessPageClientProps {
  nextSteps: NextStep[];
  contactInfo: {
    phone: string;
    email: string;
    team: { name: string; role: string; linkedin: string; image?: string }[];
  };
}

export function ProcessPageClient({ nextSteps, contactInfo }: ProcessPageClientProps) {
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
            <SectionTag text="OUR END-TO-END PROCESS" variant="light" />
          </div>
          <ScrollReveal>
            <h1 className={styles.heroHeading}>
              <span className={styles.heroHeadingBold}>
                Our formula for building the right product,
              </span>{" "}
              <span className={styles.heroHeadingFaded}>
                that generates ROI and win hearts.
              </span>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Process Section (dark) ── */}
      <section className={styles.processSection}>
        <div className={styles.processInner}>
          {/* Sidebar */}
          <nav className={styles.sidebar}>
            <ul className={styles.sidebarList}>
              {processSteps.map((step, i) => (
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

          {/* Slides */}
          <div className={styles.slides}>
            {processSteps.map((step, i) => (
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

                {/* Process Steps (staircase cards) */}
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

                {/* What to Expect */}
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

                {/* Deliverables */}
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
              <img
                src="/images/covers/process-case-study.png"
                alt="Vocable case study"
              />
            </div>
            <div className={styles.caseStudyContent}>
              <div className={styles.caseStudyTag}>
                <SectionTag text="VOCABLE" />
              </div>
              <p className={styles.caseStudyHeading}>
                Boosted content efficiency by 300-500%, enabling
                more output in less time due to our process driven approach
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── Testimonials ── */}
      <TestimonialsSection
        testimonials={testimonials}
        tagText="WORDS OF OUR CLIENTS"
      />

      {/* ── CTA ── */}
      <CTASection
        title="Got a project in mind?"
        subtitle="Collaborate with us to bring your vision to life. Our creative experts ensure tailored success by following a thorough design process."
        ctaText="Let's Connect"
        ctaHref="#contact-form"
        buttonAfterSubtitle
        hideLogos
        className={styles.ctaSection}
      />

      {/* ── Contact Form ── */}
      <ContactFormSection
        tag="CONNECT WITH US"
        heading="Let&#8217;s talk about your product."
        nextSteps={nextSteps}
        contactInfo={contactInfo}
      />
    </div>
  );
}
