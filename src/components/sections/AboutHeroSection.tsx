import { Button } from "@/components/ui/Button";
import styles from "./AboutHeroSection.module.css";
import type { HeroData } from "@/lib/types";

export function AboutHeroSection(props: HeroData) {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>{props.title}</h1>
          <p className={styles.subtitle}>{props.subtitle}</p>
          <Button href={props.ctaHref}>{props.ctaText}</Button>
        </div>
      </div>
    </section>
  );
}
