/* eslint-disable @next/next/no-img-element */
import styles from "./CTASection.module.css";
import { FlairButton } from "@/components/ui/FlairButton";

interface CTASectionProps {
  title: string;
  ctaText: string;
  ctaHref: string;
  subtitle?: string;
  hideLogos?: boolean;
}

const clientLogos = [
  { src: "/images/cta/nbcu.png", alt: "NBCU" },
  { src: "/images/cta/fintua.png", alt: "Fintua" },
  { src: "/images/cta/workeasy.png", alt: "Workeasy" },
  { src: "/images/cta/7-eleven.png", alt: "7-Eleven" },
  { src: "/images/cta/people-guru.png", alt: "People Guru" },
];

export function CTASection({
  title,
  ctaText,
  ctaHref,
  subtitle,
  hideLogos,
}: CTASectionProps) {
  const parts = title.split("your product");

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          {parts.length > 1 ? (
            <>
              {parts[0]}
              <span className={styles.accent}>your product</span>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </h2>

        <FlairButton href={ctaHref} size="lg">
          {ctaText}
        </FlairButton>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {!hideLogos && (
          <div className={styles.logos}>
            {clientLogos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                width={174}
                height={34}
                className={styles.logo}
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
