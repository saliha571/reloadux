/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import styles from "./HeroSection.module.css";
import { FlairButton } from "@/components/ui/FlairButton";

interface HeroProps {
  title: string;
  titleAccent?: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  clientLogos?: string[];
}

const logoFiles = [
  { src: "/images/logos/nbc-1.svg", alt: "NBC", width: 211 },
  { src: "/images/logos/barclays-2.svg", alt: "Barclays", width: 178 },
  { src: "/images/logos/groupon-1.svg", alt: "Groupon", width: 145 },
  { src: "/images/logos/7-eleven-1.svg", alt: "7-Eleven", width: 151 },
  { src: "/images/logos/sterne-kessler.svg", alt: "Sterne Kessler", width: 221 },
  { src: "/images/logos/encore-1.svg", alt: "Encore", width: 157 },
  { src: "/images/logos/peopleguru-2.svg", alt: "PeopleGuru", width: 179 },
  { src: "/images/logos/nokia-2.svg", alt: "Nokia", width: 156 },
  { src: "/images/logos/knowles-1.svg", alt: "Knowles", width: 197 },
  { src: "/images/logos/replenium-1.svg", alt: "Replenium", width: 169 },
  { src: "/images/logos/digno-2.svg", alt: "Digno", width: 120 },
  { src: "/images/logos/nitro-2.svg", alt: "Nitro", width: 142 },
  { src: "/images/logos/moment-1.svg", alt: "Moment", width: 185 },
];

function horizontalLoop(items: Element[], config: { speed?: number; paused?: boolean; repeat?: number; reversed?: boolean; paddingRight?: number; snap?: number | false }) {
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); },
  });

  const length = items.length;
  const startX = (items[0] as HTMLElement).offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snapFn = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);

  gsap.set(items, {
    xPercent: (i: number, el: Element) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
      xPercents[i] = snapFn(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number)
      );
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  const totalWidth =
    (items[length - 1] as HTMLElement).offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    (items[length - 1] as HTMLElement).offsetWidth *
      (gsap.getProperty(items[length - 1], "scaleX") as number) +
    (config.paddingRight || 0);

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = (item as HTMLElement).offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

    tl.to(
      item,
      {
        xPercent: snapFn(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snapFn(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.vars.onReverseComplete?.();
    tl.reverse();
  }

  return tl;
}

export function HeroSection({
  title,
  titleAccent,
  subtitle,
  ctaText,
  ctaHref,
}: HeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Timeline | null>(null);

  const handleMouseEnter = useCallback(() => loopRef.current?.pause(), []);
  const handleMouseLeave = useCallback(() => loopRef.current?.play(), []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const boxes = gsap.utils.toArray<Element>(
      wrapper.querySelectorAll(`.${styles.logoItem}`)
    );

    if (boxes.length === 0) return;

    loopRef.current = horizontalLoop(boxes, {
      paused: false,
      repeat: -1,
      speed: 0.8,
      paddingRight: 40,
    });

    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      loopRef.current?.kill();
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>{title}</span>
          {titleAccent && (
            <span className={styles.titleAccent}>{titleAccent}</span>
          )}
        </h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <FlairButton href={ctaHref} size="lg">
          {ctaText}
        </FlairButton>
      </div>

      <div ref={wrapperRef} className={styles.logoStrip}>
        {logoFiles.map((logo, i) => (
          <div key={i} className={styles.logoItem}>
            <img
              width={logo.width}
              height={66}
              decoding="async"
              src={logo.src}
              alt={logo.alt}
              className={styles.logoImage}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
