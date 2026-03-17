import Link from "next/link";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./OurServicesSection.module.css";

interface ServiceLink {
  title: string;
  href: string;
}

interface Props {
  services: ServiceLink[];
}

export function OurServicesSection({ services }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <SectionTag text="OUR SERVICES" />
          <h2 className={styles.heading}>
            Start, improve, or scale an<br />
            AI-native product experience.
          </h2>
        </div>

        <ul className={styles.list}>
          {services.map((item, i) => (
            <li key={i} className={styles.item}>
              <Link href={item.href} className={styles.link}>
                <span className={styles.linkText}>{item.title}</span>
                <span className={styles.arrow}>
                  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.027 24.227L22.227 11.027" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22.225 22.34V11.027" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.912 11.027H22.226" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
