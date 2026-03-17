import styles from "./ContactHeroSection.module.css";
import type { HeroData } from "@/lib/types";

export function ContactHeroSection(props: HeroData) {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>[ {props.title} ]</h1>
          <p className={styles.subtitle}>{props.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
