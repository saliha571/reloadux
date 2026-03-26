"use client";
import { useState } from "react";
import Image from "next/image";
import { SectionTag } from "@/components/ui/SectionTag";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { NextStep } from "@/lib/types";
import styles from "./ContactFormSection.module.css";

interface TeamMember {
  name: string;
  role: string;
  linkedin: string;
  image?: string;
}

interface ContactFormSectionProps {
  tag?: string;
  heading?: string;
  nextSteps?: NextStep[];
  contactInfo?: {
    phone: string;
    email: string;
    team: TeamMember[];
  };
}

export function ContactFormSection({
  tag = "CONNECT WITH US",
  heading = "Let\u2019s talk about your product.",
  nextSteps = [],
  contactInfo,
}: ContactFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAttempted(true);
    const form = e.currentTarget;
    if (!form.checkValidity()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className={`section ${styles.section}`}>
        <div className="container">
          <div className={styles.success}>
            <h2 className={styles.successTitle}>Thank you!</h2>
            <p className={styles.successText}>
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.section}`} id="contact-form">
       <ScrollReveal>
          <div className={styles.header}>
            <SectionTag text={tag} variant="dark" />
            <h2 className={styles.heading}>{heading}</h2>
          </div>
        </ScrollReveal>
        <div
  style={{
    width: "100%",
    borderTop: "1px solid #c3c3c3",
    margin: "unset"
  }}
></div>
      <div className="container">
        <div className={styles.layout}>
          {/* ── Left: Form ──────────────────────────────────── */}
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} noValidate className={`${styles.form} ${attempted ? styles.attempted : ""}`}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Your Name<span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className={styles.input}
                  />
                  <span className={styles.error}>Please fill out this field.</span>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    Work Email<span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className={styles.input}
                  />
                  <span className={styles.error}>Please fill out this field.</span>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Company Name</label>
                  <input
                    type="text"
                    name="company"
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Contact No.</label>
                  <input
                    type="tel"
                    name="phone"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  About Project<span className={styles.required}>*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className={styles.textarea}
                />
                <span className={styles.error}>Please fill out this field.</span>
              </div>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={subscribe}
                    onChange={() => setSubscribe(!subscribe)}
                    className={styles.checkbox}
                  />
                  <span>Check here to subscribe for updates.</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={() => setSmsConsent(!smsConsent)}
                    className={styles.checkbox}
                  />
                  <span>
                    By checking this box, you agree to receive SMS messages from
                    reloadux. Reply &apos;STOP&apos; to opt out at any time.
                  </span>
                </label>
              </div>

              <p className={styles.disclaimer}>
                By &quot;Submitting&quot; this form, you are agreeing to the
                reloadux&apos;s terms of use and privacy policy. We appreciate
                your trust in us. Your privacy is our top priority. Rest assured
                that we will never share, sell, or trade your personal
                information, including phone numbers and SMS consent, with any
                third parties under any circumstances. Your data remains secure
                with us.
              </p>

              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </ScrollReveal>

          {/* ── Right: Team + Next Steps ────────────────────── */}
          <ScrollReveal delay={0.2}>
            <div className={styles.sidebar}>
              {contactInfo?.team && contactInfo.team.length > 0 && (
                <div className={styles.teamCards}>
                  {contactInfo.team.map((member) => (
                    <a
                      key={member.name}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.teamCard}
                    >
                      <div className={styles.avatarWrap}>
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={56}
                            height={56}
                            className={styles.avatar}
                          />
                        ) : (
                          <div className={styles.avatarPlaceholder}>
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className={styles.teamInfo}>
                        <span className={styles.teamName}>
                          {member.name}
                          <svg
                            className={styles.linkedinIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </span>
                        <span className={styles.teamRole}>{member.role}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {nextSteps.length > 0 && (
                <div className={styles.nextSteps}>
                  <h3 className={styles.nextStepsTitle}>Next Steps</h3>
                  <div className={styles.stepsList}>
                    {nextSteps.map((step) => (
                      <div key={step.number} className={styles.step}>
                        <svg
                          className={styles.stepArrow}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                        <p className={styles.stepText}>{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
