import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./OutcomesSection.module.css";

interface OutcomesSectionProps {
  tag: string;
  heading: string;
  items: string[];
}

export function OutcomesSection({ tag, heading, items }: OutcomesSectionProps) {
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, midpoint);
  const rightItems = items.slice(midpoint);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <SectionTag text={tag} />
          <h2 className={styles.heading}>{heading}</h2>
        </div>

        <div className={styles.grid}>
          <ul className={styles.list}>
            {leftItems.map((item, i) => (
              <li key={i} className={styles.item}>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.checkIcon}
                >
                  <circle cx="19" cy="19" r="18.5" stroke="#565656" />
                  <path
                    d="M14.0586 18.5371L17.9204 22.3989L25.644 14.6753"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
          <ul className={styles.list}>
            {rightItems.map((item, i) => (
              <li key={i} className={styles.item}>
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.checkIcon}
                >
                  <circle cx="19" cy="19" r="18.5" stroke="#565656" />
                  <path
                    d="M14.0586 18.5371L17.9204 22.3989L25.644 14.6753"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
