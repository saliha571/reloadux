import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./ValuesSection.module.css";
import type { ValueItem } from "@/lib/types";

interface Props {
  values: ValueItem[];
}

export function ValuesSection({ values }: Props) {
  return (
    <section className="section section--light">
      <div className="container">
        <SectionTag text="OUR VALUES" />
        <div className={styles.grid}>
          {values.map((v) => (
            <div key={v.title} className={styles.card}>
              <h3 className={styles.title}>{v.title}</h3>
              <p className={styles.description}>{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
