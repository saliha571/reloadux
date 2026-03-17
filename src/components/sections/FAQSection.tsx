import { FAQItem } from "@/components/ui/FAQItem";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./FAQSection.module.css";
import type { FAQItem as FAQItemType } from "@/lib/types";

interface Props {
  faqs: FAQItemType[];
}

export function FAQSection({ faqs }: Props) {
  return (
    <section className="section section--light">
      <div className="container">
        <SectionTag text="FAQ" />
        <h2 className={styles.heading}>Frequently Asked Questions</h2>
        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
