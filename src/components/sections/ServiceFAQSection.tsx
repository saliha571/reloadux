import { SectionTag } from "@/components/ui/SectionTag";
import { FAQItem } from "@/components/ui/FAQItem";
import styles from "./ServiceFAQSection.module.css";

interface FAQItemData {
  question: string;
  answer: string;
}

interface ServiceFAQSectionProps {
  tag: string;
  heading: string;
  items: FAQItemData[];
  className?: string;
}

export function ServiceFAQSection({ tag, heading, items, className }: ServiceFAQSectionProps) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionTag text={tag} />
          <h2 className={styles.heading}>{heading}</h2>
        </div>
        <div className={styles.list}>
          {items.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
