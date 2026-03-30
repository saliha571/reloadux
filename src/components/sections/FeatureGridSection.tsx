"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import styles from "./FeatureGridSection.module.css";

export interface Feature {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

interface FeatureGridSectionProps {
  heading: string;
  features: Feature[];
}

const STAGGER_DELAY = 0.12;

export function FeatureGridSection({ heading, features }: FeatureGridSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <ScrollReveal key={`${feature.title}-${index}`} delay={index * STAGGER_DELAY}>
              <article className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    width={600}
                    height={600}
                    className={styles.image}
                    sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDesc}>{feature.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
