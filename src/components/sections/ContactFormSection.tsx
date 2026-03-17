"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./ContactFormSection.module.css";

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="section section--light">
        <div className="container">
          <div className={styles.success}>
            <h2 className={styles.successTitle}>Thank you!</h2>
            <p className={styles.successText}>We&apos;ll get back to you within 24 hours.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--light" id="contact-form">
      <div className="container">
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>First Name</label>
              <input type="text" name="firstName" required className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Last Name</label>
              <input type="text" name="lastName" required className={styles.input} />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input type="email" name="email" required className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Company</label>
            <input type="text" name="company" className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Tell us about your project</label>
            <textarea name="message" rows={5} required className={styles.textarea} />
          </div>
          <Button type="submit" variant="primary">Submit</Button>
        </form>
      </div>
    </section>
  );
}
