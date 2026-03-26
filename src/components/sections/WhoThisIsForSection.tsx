import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./WhoThisIsForSection.module.css";

interface IdealClientCard {
  title: string;
  description: string;
}

interface WhoThisIsForSectionProps {
  tag: string;
  heading: string;
  cards: IdealClientCard[];
}

export function WhoThisIsForSection({ tag, heading, cards }: WhoThisIsForSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.tagWrap}>
            <SectionTag text={tag} variant="light" />
          </div>
          <h2 className={styles.heading}>{heading}</h2>
        </div>
        <div className={styles.list}>
          {cards.map((card, i) => (
            <div key={i} className={styles.item}>
              <h3 className={styles.itemTitle}>{card.title}</h3>
              <p className={styles.itemDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
