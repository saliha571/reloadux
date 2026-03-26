import Image from "next/image";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./ApproachSection.module.css";

interface Principle {
  number: string;
  title: string;
  description: string;
  gif?: string;
}

interface ApproachSectionProps {
  tag: string;
  heading: string;
  headingItalic: string;
  description: string;
  principles: Principle[];
}

export function ApproachSection({
  tag,
  heading,
  headingItalic,
  description,
  principles,
}: ApproachSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <SectionTag text={tag} />
          </div>
          <div className={styles.headerRight}>
            <h2 className={styles.heading}>
              {heading}{" "}
              <span className={styles.headingItalic}>{headingItalic}</span>
            </h2>
            <p className={styles.description}>{description}</p>
          </div>
        </div>

        <div className={styles.grid}>
          {principles.map((principle, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.gifStrip}>
                <span className={styles.gifWrap}>
                  {principle.gif ? (
                    <Image
                      src={principle.gif}
                      alt={principle.title}
                      width={36}
                      height={36}
                      className={styles.gif}
                      unoptimized
                    />
                  ) : (
                    <span className={styles.gifPlaceholder} />
                  )}
                </span>
              </div>
              <div className={styles.cardText}>
                <p className={styles.title}>
                  <span className={styles.number}>{principle.number}</span>{" "}
                  {principle.title}
                </p>
                <p className={styles.cardDescription}>
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
