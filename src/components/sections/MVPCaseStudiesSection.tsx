"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./MVPCaseStudiesSection.module.css";

interface MVPCaseStudiesSectionProps {
  tag: string;
  heading: string;
  description: string;
  items: {
    name: string;
    description: string;
    desktopImage: string;
    mobileImage: string;
    href: string;
    comingSoon?: boolean;
  }[];
}

export function MVPCaseStudiesSection({
  tag,
  heading,
  description,
  items,
}: MVPCaseStudiesSectionProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const cursorText =
    hoveredIndex !== null && items[hoveredIndex]?.comingSoon
      ? "Coming\nSoon"
      : "View\nCase Study";

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            <span className={styles.inlineTag}>[ {tag} ]</span>
            {heading}
          </h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.rows}>
          {items.map((item, i) => (
            <div key={item.name} className={styles.row}>
                <motion.div
                  className={styles.imageWrapper}
                  initial={{ transform: "translate(0px, 40px)" }}
                  whileInView={{ transform: "translate(0px, 0px)" }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => {
                    setCursorVisible(true);
                    setHoveredIndex(i);
                  }}
                  onMouseLeave={() => {
                    setCursorVisible(false);
                    setHoveredIndex(null);
                  }}
                >
                  {cursorVisible && hoveredIndex === i && (
                    <div
                      className={styles.cursor}
                      style={{ left: cursorPos.x, top: cursorPos.y }}
                    >
                      <svg className={styles.cursorArrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H8M17 7V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{cursorText}</span>
                    </div>
                  )}
                  {item.href && !item.comingSoon && (
                    <Link href={item.href} className={styles.imageLink} aria-label={`View ${item.name} case study`} />
                  )}
                  <Image
                    src={item.desktopImage}
                    alt={item.name}
                    width={1280}
                    height={720}
                    className={styles.desktopImage}
                  />
                  <Image
                    src={item.mobileImage}
                    alt={item.name}
                    width={390}
                    height={720}
                    className={styles.mobileImage}
                  />
                </motion.div>
                <div className={styles.rowFooter}>
                  <span className={styles.rowName}>[ {item.name} ]</span>
                  <span className={styles.rowDescription}>
                    {item.description}
                  </span>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
