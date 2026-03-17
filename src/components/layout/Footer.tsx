import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const resources = [
  { label: "Process", href: "/process/" },
  { label: "Work", href: "/case-studies/" },
  { label: "About us", href: "/about-us/" },
  { label: "Blog", href: "/blog/" },
  { label: "Launch & Grow", href: "/launch-and-grow/" },
];

const caseStudies = [
  { label: "Swaay", href: "/case-study/swaay/" },
  { label: "Nitro League", href: "/case-study/nitro/" },
  { label: "Bridge", href: "/case-study/bridge/" },
  { label: "Digno", href: "/case-study/digno/" },
  { label: "Vocable", href: "/case-study/vocable/" },
];

const services = [
  { label: "Build from scratch", href: "/service/design-from-scratch-mvp/" },
  { label: "Product Revamp", href: "/service/ux-redesign/" },
  { label: "Investor Pitch Design", href: "/service/investor-pitch/" },
  { label: "Team Extension", href: "/service/team-extension/" },
];

const capabilities = [
  ["UX Research", "Usability Testing", "Discovery Design", "iOS/ Android Native Apps"],
  ["Design Discovery", "Brand Identity", "Web Design", "Frontend Development"],
  ["UX Audit", "UIUX Design", "React Js"],
  ["Visual Design", "Prototyping", "Webflow"],
];

const industries = [
  ["AI & ML"],
  ["Saas"],
  ["Fintech"],
  ["Healthcare"],
];

interface FooterProps {
  email?: string;
  phone?: string;
  address?: string;
  copyright?: string;
  socialLinks?: { platform: string; url: string }[];
  logoUrl?: string;
}

export function Footer({
  email = "info@reloadux.com",
  phone = "(202) 978 3410",
  address = "Reston, VA 11951\nFreedom Drive 13th Floor\nReston, VA 20190",
  copyright = "© 2021 Reloadux – all rights reserved",
  logoUrl,
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* ── Top: Logo + Contact + Location ── */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Image
                src={logoUrl || "/images/reloadux-logo.svg"}
                alt="reloadux"
                width={120}
                height={24}
              />
            </Link>
          </div>

          <div className={styles.menuCol}>
            <h4 className={styles.colTitle}>Contact info</h4>
            <p className={styles.contacts}>
              {email}
              <br />
              {phone}
            </p>
          </div>

          <div className={styles.menuCol}>
            <h4 className={styles.colTitle}>Our Location</h4>
            <p className={styles.addr}>
              {address.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < address.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* ── Links: Resources, Case Study, Services, Socials ── */}
        <div className={styles.links}>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Resources</h4>
            <ul className={styles.linkList}>
              {resources.map((r) => (
                <li key={r.label}>
                  <Link href={r.href} className={styles.link}>{r.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Casestudy</h4>
            <ul className={styles.linkList}>
              {caseStudies.map((c) => (
                <li key={c.label}>
                  <Link href={c.href} className={styles.link}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul className={styles.linkList}>
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className={styles.link}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>Socials</h4>
            <div className={styles.socials}>
              <a href="https://linkedin.com/company/reloadux" className={styles.socialIcon} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M4.4 2.2C4.4 3.08 3.68 3.8 2.8 3.8C1.92 3.8 1.2 3.08 1.2 2.2C1.2 1.32 1.92 0.6 2.8 0.6C3.68 0.6 4.4 1.32 4.4 2.2ZM4.4 5H1.2V16H4.4V5ZM9.08 5H5.9V16H9.08V10.24C9.08 7.12 13.12 6.84 13.12 10.24V16H16.32V9.1C16.32 4 10.44 4.2 9.08 7.08V5Z" fill="currentColor"/></svg>
              </a>
              <a href="https://facebook.com/reloadux" className={styles.socialIcon} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M6.39 18V9.79H9.19L9.59 6.59H6.39V4.55C6.39 3.62 6.64 2.99 7.99 2.99H9.69V0.13C9.39 0.09 8.39 0 7.23 0C4.81 0 3.17 1.49 3.17 4.23V6.59H0.36V9.79H3.17V18H6.39Z" fill="currentColor"/></svg>
              </a>
              <a href="https://instagram.com/reloadux" className={styles.socialIcon} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M8.5 4.14C6.1 4.14 4.14 6.1 4.14 8.5C4.14 10.9 6.1 12.86 8.5 12.86C10.9 12.86 12.86 10.9 12.86 8.5C12.86 6.1 10.9 4.14 8.5 4.14ZM8.5 11.33C6.93 11.33 5.67 10.07 5.67 8.5C5.67 6.93 6.93 5.67 8.5 5.67C10.07 5.67 11.33 6.93 11.33 8.5C11.33 10.07 10.07 11.33 8.5 11.33ZM14.05 3.96C14.05 4.52 13.6 4.97 13.04 4.97C12.48 4.97 12.03 4.52 12.03 3.96C12.03 3.4 12.48 2.95 13.04 2.95C13.6 2.95 14.05 3.4 14.05 3.96ZM16.92 4.98C16.85 3.63 16.55 2.43 15.56 1.44C14.57 0.45 13.37 0.15 12.02 0.08C10.63 0 6.37 0 4.98 0.08C3.63 0.15 2.43 0.45 1.44 1.44C0.45 2.43 0.15 3.63 0.08 4.98C0 6.37 0 10.63 0.08 12.02C0.15 13.37 0.45 14.57 1.44 15.56C2.43 16.55 3.63 16.85 4.98 16.92C6.37 17 10.63 17 12.02 16.92C13.37 16.85 14.57 16.55 15.56 15.56C16.55 14.57 16.85 13.37 16.92 12.02C17 10.63 17 6.37 16.92 4.98ZM15.11 13.53C14.83 14.24 14.28 14.79 13.57 15.07C12.45 15.51 9.78 15.41 8.5 15.41C7.22 15.41 4.55 15.51 3.43 15.07C2.72 14.79 2.17 14.24 1.89 13.53C1.45 12.41 1.55 9.74 1.55 8.5C1.55 7.26 1.45 4.59 1.89 3.47C2.17 2.76 2.72 2.21 3.43 1.93C4.55 1.49 7.22 1.59 8.5 1.59C9.78 1.59 12.45 1.49 13.57 1.93C14.28 2.21 14.83 2.76 15.11 3.47C15.55 4.59 15.45 7.26 15.45 8.5C15.45 9.74 15.55 12.41 15.11 13.53Z" fill="currentColor"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Capabilities ── */}
        <div className={styles.capabilities}>
          <h4 className={styles.colTitle}>Capabilities</h4>
          <div className={styles.capGrid}>
            {capabilities.map((col, i) => (
              <div key={i} className={styles.capCol}>
                {col.map((item) => (
                  <span key={item} className={styles.capItem}>{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Industries ── */}
        <div className={styles.industries}>
          <h4 className={styles.colTitle}>Industries</h4>
          <div className={styles.indGrid}>
            {industries.map((col, i) => (
              <div key={i} className={styles.indCol}>
                {col.map((item) => (
                  <span key={item} className={styles.indItem}>{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Copyright ── */}
        <div className={styles.copyright}>
          <p>{copyright} | powered by <Image src="/images/tkxel-logo.svg" alt="tkxel" width={40} height={16} className={styles.tkxelLogo} /></p>
        </div>
      </div>
    </footer>
  );
}
