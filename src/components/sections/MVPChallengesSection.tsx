/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SectionTag } from "@/components/ui/SectionTag";
import styles from "./MVPChallengesSection.module.css";

interface MVPChallengesSectionProps {
  tag: string;
  heading: string;
  cards: { actorImage: string; actorName: string; content: string }[];
}

export function MVPChallengesSection({
  tag,
  heading,
  cards,
}: MVPChallengesSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <SectionTag text={tag} variant="dark" />
        <h2 className={styles.heading}>{heading}</h2>
      </div>

      <div className={styles.carousel}>
        <Swiper
          modules={[Autoplay]}
          onSwiper={(s) => (swiperRef.current = s)}
          slidesPerView="auto"
          centeredSlides
          loop
          spaceBetween={24}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          className={styles.swiper}
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i} className={styles.slide}>
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <img
                    src={card.actorImage}
                    alt={card.actorName}
                    width={32}
                    height={32}
                    className={styles.avatar}
                  />
                  <p className={styles.actorName}>{card.actorName}</p>
                </div>
                <div className={styles.cardBody}>
                  <h4 className={styles.cardContent}>{card.content}</h4>
                  <img
                    src="/images/challenges/emoji-group.svg"
                    alt=""
                    width={69}
                    height={34}
                    className={styles.emoji}
                  />
                </div>
                <div className={styles.cardFooter}>
                  <img
                    src="/images/challenges/card-bottom.svg"
                    alt=""
                    width={321}
                    height={44}
                    className={styles.cardBottomImg}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
