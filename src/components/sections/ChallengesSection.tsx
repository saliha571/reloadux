/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./ChallengesSection.module.css";

interface ChallengesSectionProps {
  tag: string;
  heading: string;
  description: string;
  cards: { tag: string; description: string }[];
}

export function ChallengesSection({
  tag,
  heading,
  description,
  cards,
}: ChallengesSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const allCards = gsap.utils.toArray<HTMLElement>(
      track.querySelectorAll(`.${styles.card}`)
    );
    if (allCards.length === 0) return;

    const gap = 24;
    const n = cards.length;

    gsap.set(allCards[0], { width: "100%" });
    gsap.set(allCards[n], { width: "100%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    let cumulative = 0;

    for (let i = 0; i < n; i++) {
      const stepHeight = allCards[i].offsetHeight + gap;
      cumulative += stepHeight;

      tl.to(allCards[i], { width: "calc(100% - 80px)", duration: 0.5, ease: "power2.inOut" }, `step${i}`);
      tl.to(allCards[i + 1], { width: "100%", duration: 0.5, ease: "power2.inOut" }, `step${i}`);
      tl.to(track, { y: -cumulative, duration: 0.5, ease: "power2.inOut" }, `step${i}`);
      if (i < n - 1) {
        tl.to({}, { duration: 2.5 });
      }
    }

    tl.to({}, { duration: 2.5 });
    tl.set(track, { y: 0 });
    tl.set(allCards, { width: "calc(100% - 80px)" });
    tl.set(allCards[0], { width: "100%" });
    tl.set(allCards[n], { width: "100%" });

    tlRef.current = tl;

    const pause = () => tl.pause();
    const play = () => tl.play();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", play);

    return () => {
      tl.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", play);
    };
  }, [cards]);

  const duplicated = [...cards, ...cards];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <SectionTag text={tag} variant="dark" />
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.track} ref={trackRef}>
            {duplicated.map((card, i) => (
              <div key={i} className={styles.card}>
                <img
                  src="/images/icons/emoji-group.svg"
                  alt=""
                  width={69}
                  height={34}
                  className={styles.emoji}
                />
                <span className={styles.cardTag}>[{card.tag}]</span>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
