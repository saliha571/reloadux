import styles from "./BlogHeroSection.module.css";

export function BlogHeroSection() {
  return (
    <section className="section section--dark">
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>AI insights from our UX leaders.</p>
        </div>
      </div>
    </section>
  );
}
