import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./WhyUsSection.module.css";

interface ValueProp {
  title: string;
  description: string;
}

interface WhyUsSectionProps {
  tag: string;
  heading: string;
  cards: ValueProp[];
}

export function WhyUsSection({ tag, heading, cards }: WhyUsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionTag text={tag} variant="dark" />
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.cards}>
          {cards.map((card, i) => (
            <div key={i} className={styles.card}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
