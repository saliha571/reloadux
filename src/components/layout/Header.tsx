"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { FlairButton } from "@/components/ui/FlairButton";
import { SectionTag } from "@/components/ui/SectionTag";

const navLinks = [
  { label: "work", href: "/case-studies/" },
  { label: "process", href: "/ux-process/" },
  { label: "services", href: "#", hasMega: true },
  { label: "marketing & creatives", href: "/marketing-and-creatives/" },
  { label: "about us", href: "/about-us/" },
  { label: "blog", href: "/blog/" },
];

const megaServices = [
  {
    title: "Design from Scratch - MVP",
    about: "For startups",
    href: "/service/design-from-scratch-mvp/",
  },
  {
    title: "UX Redesign",
    about: "For B2B and Saas Companies",
    href: "/service/ux-redesign/",
  },
  {
    title: "Team Extension",
    about: "For existing companies",
    href: "/service/team-extension/",
  },
];

const expertiseCol1 = [
  { label: "UX Audit & AI Readiness", href: "/service/ux-audit/" },
  { label: "AI Opportunity Mapping", href: "/service/ai-opportunity-mapping/" },
  { label: "AI Feature Experience Design", href: "/service/ai-feature-experience-design/" },
  { label: "Legacy UX Modernization", href: "/service/legacy-ux-modernization/" },
];

const expertiseCol2 = [
  { label: "Conversational UX", href: "/service/conversational-ux/" },
  { label: "Design Discovery", href: "/service/design-discovery/" },
  { label: "Design Systems", href: "/service/design-systems/" },
  { label: "Usability Testing", href: "/service/usability-testing/" },
  { label: "Web Design", href: "/service/web-design/" },
  { label: "UI/UX Design", href: "/service/ui-ux-design/" },
];

interface HeaderProps {
  logoUrl?: string;
}

export function Header({ logoUrl }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMega = useCallback(() => {
    setMegaOpen(false);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMega();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeMega]);

  const openMega = () => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };

  const scheduleMegaClose = () => {
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 250);
  };

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.mainMenu}>
          <div className={styles.headerLogo}>
            <Link href="/">
              <Image
                src={logoUrl || "/images/reloadux-logo.svg"}
                alt="reloadux-logo"
                width={120}
                height={24}
                priority
              />
            </Link>
          </div>

          <div className={`${styles.menuContainer} ${mobileOpen ? styles.menuContainerOpen : ""}`}>
            <ul className={styles.menu}>
              {navLinks.map((link) =>
                link.hasMega ? (
                  <li
                    key={link.label}
                    className={`${styles.menuItem} ${styles.hasMegaMenu}`}
                    onMouseEnter={openMega}
                    onMouseLeave={scheduleMegaClose}
                  >
                    <button
                      className={styles.navLink}
                      onClick={() => setMegaOpen((v) => !v)}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <span
                        className={`${styles.chevron} ${megaOpen ? styles.chevronOpen : ""}`}
                      />
                    </button>
                  </li>
                ) : (
                  <li key={link.label} className={styles.menuItem}>
                    <Link
                      href={link.href}
                      className={styles.navLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className={styles.menuCta}>
            <FlairButton href="/contact-us/" size="sm">
              Get a Free Consultation
            </FlairButton>

            <button
              className={`${styles.mobileToggle} ${mobileOpen ? styles.mobileToggleOpen : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mega Menu ─────────────────────────────────────── */}
      <div
        className={`${styles.megaMenu} ${megaOpen ? styles.megaMenuVisible : ""}`}
        onMouseEnter={openMega}
        onMouseLeave={scheduleMegaClose}
      >
        <div className={styles.megaMenuInner}>
          <div className={styles.container}>
            <div className={styles.megaWrapper}>
              {/* Left Part: services + expertise */}
              <div className={styles.leftPart}>
                <div className={styles.serviceMenu}>
                  <h3 className={styles.partHeading}><SectionTag text="SERVICES" /></h3>
                  <div className={styles.servicesList}>
                    {megaServices.map((s) => (
                      <Link
                        key={s.title}
                        href={s.href}
                        className={styles.singleMenuService}
                        onClick={closeMega}
                      >
                        <h4 className={styles.serviceTitle}>
                          {s.title}
                          <Image
                            src="/images/diversity-arrow.svg"
                            alt=""
                            width={24}
                            height={24}
                            className={styles.serviceHoverArrow}
                          />
                        </h4>
                        <p className={styles.serviceAbout}>{s.about}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={styles.capabilitiesMenu}>
                  <h3 className={styles.partHeading}><SectionTag text="EXPERTISE" /></h3>
                  <div className={styles.subMenus}>
                    <div className={styles.singleCol}>
                      <div className={styles.subMenuItems}>
                        <ul>
                          {expertiseCol1.map((item) => (
                            <li key={item.label}>
                              <Link href={item.href} onClick={closeMega}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.singleCol}>
                      <div className={styles.subMenuItems}>
                        <ul>
                          {expertiseCol2.map((item) => (
                            <li key={item.label}>
                              <Link href={item.href} onClick={closeMega}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Part: Nura AI card */}
              <div className={styles.rightPart}>
                <div className={styles.rightPartInner}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/nura-ai.svg"
                    alt="Nura Ai"
                    className={styles.nuraImage}
                  />
                </div>
                <Link
                  href="/service/conversational-ux/"
                  className={styles.megaMenuLink}
                  onClick={closeMega}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Blurry Backdrop ───────────────────────────────── */}
      <div
        className={`${styles.blurryBg} ${megaOpen ? styles.blurryBgVisible : ""}`}
        onClick={closeMega}
      />
    </header>
  );
}
