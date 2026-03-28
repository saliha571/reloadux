/* eslint-disable @next/next/no-img-element */
"use client";

import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./ClientPoolSection.module.css";

interface ClientLogo {
  src: string;
  alt: string;
}

interface ClientPoolSectionProps {
  tag?: string;
  heading?: string;
  logos?: ClientLogo[];
}

const defaultLogos: ClientLogo[] = [
  { src: "/images/logos/nbc-1.svg", alt: "NBC" },
  { src: "/images/logos/barclays-2.svg", alt: "Barclays" },
  { src: "/images/logos/nokia-2.svg", alt: "Nokia" },
  { src: "/images/logos/groupon-1.svg", alt: "Groupon" },
  { src: "/images/logos/7-eleven-1.svg", alt: "7-Eleven" },
  { src: "/images/logos/peopleguru-2.svg", alt: "PeopleGuru" },
  { src: "/images/logos/vocable-logo.svg", alt: "Vocable" },
  { src: "/images/logos/pendulum-logo.svg", alt: "Pendulum" },
  { src: "/images/logos/black-book-logo.svg", alt: "Black Book" },
  { src: "/images/logos/emerald-logo.svg", alt: "Emerald" },
  { src: "/images/logos/verahealth-logo.svg", alt: "Verahealth" },
  { src: "/images/logos/excheqr-logo.svg", alt: "Excheqr" },
  { src: "/images/logos/holacure-logo.svg", alt: "Holacure" },
  { src: "/images/logos/livemore-logo.svg", alt: "Livemore" },
  { src: "/images/logos/cured-logo.svg", alt: "Cured" },
  { src: "/images/logos/upskill-logo.svg", alt: "Upskill" },
  { src: "/images/logos/lopic-logo.svg", alt: "Lopic" },
  { src: "/images/logos/one-click-logo.svg", alt: "One Click" },
  { src: "/images/logos/super-ss-logo.svg", alt: "Super Soccer Star" },
  { src: "/images/logos/digno-2.svg", alt: "Digno" },
  { src: "/images/logos/nitro-2.svg", alt: "Nitro" },
  { src: "/images/logos/sterne-kessler.svg", alt: "Sterne Kessler" },
  { src: "/images/logos/encore-1.svg", alt: "Encore" },
  { src: "/images/logos/knowles-1.svg", alt: "Knowles" },
];

export function ClientPoolSection({
  tag = "CLIENT POOL",
  heading = "Trusted by brands, from startups to fortune 500s.",
  logos,
}: ClientPoolSectionProps) {
  const displayLogos = logos || defaultLogos;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionTag text={tag} />
        <h2 className={styles.heading}>{heading}</h2>

        <div className={styles.grid}>
          {displayLogos.map((logo, i) => (
            <div key={i} className={styles.logoWrap}>
              <img
                src={logo.src}
                alt={logo.alt}
                className={styles.logo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
