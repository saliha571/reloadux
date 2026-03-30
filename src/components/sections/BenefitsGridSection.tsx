import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./BenefitsGridSection.module.css";

interface BenefitCard {
  title: string;
  description: string;
}

interface BenefitsGridSectionProps {
  tag: string;
  heading: string;
  cards: BenefitCard[];
}

export function BenefitsGridSection({
  tag,
  heading,
  cards,
}: BenefitsGridSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.tagWrap}>
            <SectionTag text={tag} variant="dark" />
          </div>
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.grid}>
          {/* Row 1: card | empty | card */}
          <div className={`${styles.card} ${styles.businessLeadersCard}`}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{cards[0]?.title}</h3>
              <p className={styles.cardDesc}>{cards[0]?.description}</p>
            </div>
          </div>

          <div className={styles.cardEmpty} />

          <div className={`${styles.card} ${styles.productManagersCard}`}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{cards[1]?.title}</h3>
              <p className={styles.cardDesc}>{cards[1]?.description}</p>
            </div>
          </div>

          {/* Row 2: decor | card | decor */}
          {cards[2] && (
            <div className={styles.cardFull}>
              <div className={styles.cardFullLeft} />
              <div className={styles.cardFullCenter}>
                <h3 className={styles.cardTitle}>{cards[2].title}</h3>
                <p className={styles.cardDesc}>{cards[2].description}</p>
              </div>
              <div className={styles.cardFullRight} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
