"use client";

import { SectionTag } from "@/components/ui/SectionTag";
import { FlairButton } from "@/components/ui/FlairButton";
import styles from "./PricingSection.module.css";

interface PricingSectionProps {
  tag: string;
  description: string;
  planName: string;
  price: string;
  pricePer: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

function renderDescription(text: string) {
  const italicPhrase = "identify exactly where integrating AI would improve it";
  if (text.includes(italicPhrase)) {
    const parts = text.split(italicPhrase);
    return (
      <>
        {parts[0]}
        <em className={styles.descAccent}>{italicPhrase}</em>
        {parts[1]}
      </>
    );
  }
  return text;
}

function renderFeature(text: string) {
  const colonIdx = text.indexOf(":");
  if (colonIdx === -1) return text;
  const label = text.slice(0, colonIdx);
  const rest = text.slice(colonIdx);
  return (
    <>
      <em className={styles.featureLabel}>{label}</em>
      {rest}
    </>
  );
}

export function PricingSection({
  tag,
  description,
  planName,
  price,
  pricePer,
  features,
  ctaText,
  ctaHref,
}: PricingSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.tagCol}>
            <SectionTag text={tag} />
          </div>
          <div className={styles.descCol}>
            <h2 className={styles.description}>{renderDescription(description)}</h2>
          </div>
        </div>

        <div className={styles.cardWrap}>
          <div className={styles.card}>
            <div className={styles.planRow}>
              <span className={styles.sparkle}>✦</span>
              <span className={styles.planName}>{planName}</span>
            </div>

            <p className={styles.startsFrom}>Starts from</p>
            <div className={styles.priceRow}>
              <span className={styles.price}>{price}</span>
              <span className={styles.pricePer}>{pricePer}</span>
            </div>

            <div className={styles.whatYouGet}>[ WHAT YOU GET ]</div>

            <ul className={styles.features}>
              {features.map((feature, i) => (
                <li key={i} className={styles.featureItem}>
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{renderFeature(feature)}</span>
                </li>
              ))}
            </ul>

            <div className={styles.ctaWrap}>
              <FlairButton href={ctaHref} size="md">
                {ctaText}
              </FlairButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
