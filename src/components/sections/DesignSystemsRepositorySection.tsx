import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./DesignSystemsRepositorySection.module.css";

interface RepoItem {
  blackLogo: string;
  colorLogo: string;
  name: string;
  url: string;
}

const REPOSITORY_ITEMS: RepoItem[] = [
  {
    blackLogo: "https://reloadux.com/wp-content/uploads/2024/10/logo-components-2.svg",
    colorLogo: "https://reloadux.com/wp-content/uploads/2024/10/logo-components-3.svg",
    name: "Click",
    url: "https://www.oneclickcontractor.com",
  },
  {
    blackLogo: "https://reloadux.com/wp-content/uploads/2024/10/signal-logo-4.svg",
    colorLogo: "https://reloadux.com/wp-content/uploads/2024/10/signal-logo-4-1.svg",
    name: "Signal Design System",
    url: "https://www.teamsignal.com",
  },
  {
    blackLogo: "https://reloadux.com/wp-content/uploads/2024/10/Pendulum-logo-1-1.svg",
    colorLogo: "https://reloadux.com/wp-content/uploads/2024/10/Pendulum-logo-1-1-1.svg",
    name: "Pendulum Design System for",
    url: "https://www.pendulumintel.com",
  },
  {
    blackLogo: "https://reloadux.com/wp-content/uploads/2024/10/Logo-client-s-23.svg",
    colorLogo: "https://reloadux.com/wp-content/uploads/2024/10/Logo-client-s-23-1.svg",
    name: "Skyline design system",
    url: "https://www.reiblackbook.com",
  },
  {
    blackLogo: "https://reloadux.com/wp-content/uploads/2024/10/logo-components-4.svg",
    colorLogo: "https://reloadux.com/wp-content/uploads/2024/10/logo-components-5.svg",
    name: "",
    url: "https://www.taxbackinternational.com",
  },
];

export function DesignSystemsRepositorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionTag text="DESIGN SYSTEMS REPOSITORY" variant="dark" />
          <h2 className={styles.heading}>
            Experience our design systems in action, firsthand.
          </h2>
        </div>

        <div className={styles.rows}>
          {REPOSITORY_ITEMS.map((item) => (
            <a
              key={item.url}
              href="#request-to-view"
              className={styles.row}
            >
              <div className={styles.logoWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.blackLogo}
                  alt={`${item.name || "Repository"} logo`}
                  className={`${styles.logo} ${styles.logoBlack}`}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.colorLogo}
                  alt={`${item.name || "Repository"} logo`}
                  className={`${styles.logo} ${styles.logoColor}`}
                />
              </div>

              <p className={styles.text}>
                {item.name ? `${item.name} ` : ""}
                <span className={styles.repoUrl}>{item.url.replace("https://", "www.")}</span>
              </p>

              <span className={styles.cta}>
                Request to view
                <span className={styles.arrowWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/icons/repo-arrow.svg" alt="" className={styles.arrowIcon} />
                </span>
              </span>
            </a>
          ))}
        </div>

        <p className={styles.more}>AND 100+ MORE..</p>
      </div>
    </section>
  );
}
