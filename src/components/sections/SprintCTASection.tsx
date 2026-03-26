import styles from "./SprintCTASection.module.css";
import { FlairButton } from "@/components/ui/FlairButton";

interface SprintStep {
  number: string;
  text: string;
}

interface SprintCTASectionProps {
  heading: string;
  subheading: string;
  description: string;
  steps: SprintStep[];
  ctaText: string;
  ctaHref: string;
}

export function SprintCTASection({
  heading,
  subheading,
  description,
  steps,
  ctaText,
  ctaHref,
}: SprintCTASectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            {heading}
            <br />
            {subheading}
          </h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.cta}>
            <FlairButton href={ctaHref} size="lg">
              {ctaText}
            </FlairButton>
          </div>
        </div>
        <div className={styles.right}>
          {steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <span className={styles.stepText}>{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
