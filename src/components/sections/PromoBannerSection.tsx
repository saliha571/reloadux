"use client";

import { useState } from "react";
import { FlairButton } from "@/components/ui/FlairButton";
import styles from "./PromoBannerSection.module.css";

interface PromoBannerSectionProps {
  title?: string;
  bannerHeading?: string;
  bannerCtaText?: string;
  bannerCtaHref?: string;
  projectCtaText?: string;
  projectCtaHref?: string;
}

export function PromoBannerSection({
  title = "How AI Elevates UX/UI Design for ux audit & ai readiness",
  bannerHeading = "Set the benchmark\nfor excellence.",
  bannerCtaText = "Let's Talk",
  bannerCtaHref = "/contact-us",
  projectCtaText = "Let's Talk",
  projectCtaHref = "/contact-us",
}: PromoBannerSectionProps) {
  const [email, setEmail] = useState("");

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.leftCol}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.banner}>
            <div className={styles.bannerContent}>
              <h3 className={styles.bannerHeading}>
                {bannerHeading.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br />}
                  </span>
                ))}
              </h3>
              <FlairButton href={bannerCtaHref} size="sm">
                {bannerCtaText}
              </FlairButton>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.projectCard}>
            <h3 className={styles.projectHeading}>Have a project in mind?</h3>
            <FlairButton href={projectCtaHref} size="sm">
              {projectCtaText}
            </FlairButton>
          </div>

          <div className={styles.subscribeCard}>
            <h4 className={styles.subscribeTitle}>Subscribe</h4>
            <p className={styles.subscribeDesc}>Get exclusive design insights.</p>
            <input
              type="email"
              placeholder="Your Email*"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
            />
            <button className={styles.subscribeBtn}>
              <span>Subscribe</span>
              <svg width="16" height="16" viewBox="0 0 26 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.41602 9.5H20.5827" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.084 16L20.584 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.084 3L20.584 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.shareBlock}>
            <p className={styles.shareLabel}>Share this article</p>
            <div className={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
