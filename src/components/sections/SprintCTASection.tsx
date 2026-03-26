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
        <h2 className={styles.heading}>
          {heading}
          <br />
          {subheading}
        </h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <p key={i} className={styles.stepText}>
              {step.number}. {step.text}
            </p>
          ))}
        </div>
        <p className={styles.closing}>
          You leave with clear priorities, a realistic path forward, and no more
          guessing.
        </p>
        <div className={styles.cta}>
          <FlairButton href={ctaHref} size="lg">
            {ctaText}
          </FlairButton>
        </div>
      </div>
    </section>
  );
}
