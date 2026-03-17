import styles from "./GlanceSection.module.css";

interface Props {
  items: { label: string; value: string }[];
}

export function GlanceSection({ items }: Props) {
  return (
    <section className="section section--dark">
      <div className="container">
        <h2 className={styles.heading}>At a Glance</h2>
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.label} className={styles.item}>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
