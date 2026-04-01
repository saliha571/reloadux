"use client";

import type { AIOpportunityMappingPageData } from "@/lib/types";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { KeyDeliverablesSection } from "@/components/sections/KeyDeliverablesSection";
import { WhoThisIsForSection } from "@/components/sections/WhoThisIsForSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { WhatHappensAfterSection } from "@/components/sections/WhatHappensAfterSection";
import { OtherServicesSection } from "@/components/sections/OtherServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BenefitsGridSection } from "@/components/sections/BenefitsGridSection";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceFAQSection } from "@/components/sections/ServiceFAQSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { SectionTag } from "@/components/ui/SectionTag";
import pageStyles from "./AIOpportunityMappingPage.module.css";
import homeData from "../../../../content/pages/home.json";

interface Props {
  data: AIOpportunityMappingPageData;
}

export function AIOpportunityMappingPageClient({ data }: Props) {
  return (
    <>
      <ServiceHero
        tag={data.hero.tag}
        hideTag
        title="AI Opportunity Mapping"
        titleSize="small"
        subtitle="Know exactly where AI fits in your product experience so every investment goes into the right experience."
        ctaText={data.hero.ctaText}
        ctaHref={data.hero.ctaHref}
        clientLogos={[
          { src: "/images/logos/vocable-logo.svg", alt: "Vocable", width: 154 },
          { src: "/images/logos/pendulum-logo.svg", alt: "Pendulum", width: 191 },
          { src: "/images/logos/super-ss-logo.svg", alt: "Super Soccer Star", width: 142 },
          { src: "/images/logos/black-book-logo.svg", alt: "Black Book", width: 198 },
          { src: "/images/logos/one-click-logo.svg", alt: "One Click", width: 182 },
          { src: "/images/logos/lopic-logo.svg", alt: "Lopic", width: 144 },
          { src: "/images/logos/verahealth-logo.svg", alt: "Verahealth", width: 188 },
          { src: "/images/logos/emerald-logo.svg", alt: "Emerald", width: 235 },
          { src: "/images/logos/excheqr-logo.svg", alt: "Excheqr", width: 193 },
          { src: "/images/logos/holacure-logo.svg", alt: "Holacure", width: 169 },
          { src: "/images/logos/livemore-logo.svg", alt: "Livemore", width: 178 },
          { src: "/images/logos/cured-logo.svg", alt: "Cured", width: 123 },
          { src: "/images/logos/upskill-logo.svg", alt: "Upskill", width: 198 },
        ]}
        backgroundImage="/images/hero/ux-audit-hero-bg.png"
        className={pageStyles.heroSection}
      />

      <ChallengesSection
        tag={data.challenges.tag}
        heading={data.challenges.heading}
        description={data.challenges.description}
        cards={data.challenges.cards}
      />

      <section className={pageStyles.includesSection}>
        <video
          className={pageStyles.includesVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/videos/ai-banner-video.mp4" type="video/mp4" />
          <source src="https://reloadux.com/wp-content/uploads/2024/08/ai-banner-video.mp4" type="video/mp4" />
        </video>
        <div className={pageStyles.includesOverlay} aria-hidden />
        <div className={pageStyles.includesInner}>
          <div className={pageStyles.includesHeader}>
            <SectionTag text={data.includes.tag} />
            <div className={pageStyles.includesHeaderContent}>
              <h2 className={pageStyles.includesHeading}>
                {data.includes.heading}
              </h2>
              <p className={pageStyles.includesSubtext}>
                A 1-week deep dive into your product, users, and workflows,
                uncovering the AI opportunities worth building.
              </p>

              <ul className={pageStyles.includesList}>
                {data.includes.items.map((item) => (
                  <li key={item.title} className={pageStyles.includesItem}>
                    <span className={pageStyles.includesCheck} aria-hidden>
                      <img src="/images/icons/tick-box.svg" alt="" />
                    </span>
                    <span className={pageStyles.includesItemText}>
                      {item.title}
                      {item.description ? `, ${item.description}` : ""}
                    </span>
                  </li>
                ))}
              </ul>

              <p className={pageStyles.includesOutcome}>{data.includes.outcomeTitle}</p>
            </div>
          </div>
        </div>
      </section>

      <WhoThisIsForSection
        tag={data.whoThisIsFor.tag}
        heading={data.whoThisIsFor.heading}
        cards={data.whoThisIsFor.cards}
        hideHeading
      />

      <KeyDeliverablesSection
        tag={data.keyDeliverables.tag}
        heading={data.keyDeliverables.heading}
        items={data.keyDeliverables.items}
      />

      <section className={pageStyles.howItWorksSection}>
        <div className={pageStyles.howItWorksInner}>
          <div className={pageStyles.howItWorksLayout}>
            <SectionTag text={data.process.tag} />
            <div className={pageStyles.howItWorksContent}>
              <h2 className={pageStyles.howItWorksHeading}>{data.process.heading}</h2>

              <div className={pageStyles.howItWorksTimeline}>
                {data.process.steps.map((step, index) => {
                  const lines = step.content
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean);
                  const titleLine = lines[0] ?? "";
                  const descLines = lines.slice(1);

                  return (
                    <article key={`${step.counter}-${step.title}`} className={pageStyles.howItWorksStep}>
                      <span className={pageStyles.howItWorksDot} aria-hidden />
                      <div className={pageStyles.howItWorksStepBody}>
                        <p className={pageStyles.howItWorksDay}>DAY {index + 1}</p>
                        {titleLine && <p className={pageStyles.howItWorksStepTitle}>{titleLine}</p>}
                        {descLines.length > 0 && (
                          <p className={pageStyles.howItWorksStepDesc}>{descLines.join(" ")}</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingSection
        tag={data.pricing.tag}
        description={data.pricing.description}
        planName={data.pricing.planName}
        price={data.pricing.price}
        pricePer={data.pricing.pricePer}
        features={data.pricing.features}
        ctaText={data.pricing.ctaText}
        ctaHref={data.pricing.ctaHref}
      />

      <WhatHappensAfterSection
        tag={data.whatHappensAfter.tag}
        heading={data.whatHappensAfter.heading}
        paths={data.whatHappensAfter.paths}
        variant="cards"
      />

      <OtherServicesSection
        tag={data.otherServices.tag}
        items={data.otherServices.items}
      />

      <TestimonialsSection testimonials={homeData.testimonials} />

      <BenefitsGridSection
        tag={data.whyUs.tag}
        heading={data.whyUs.heading}
        cards={data.whyUs.cards}
      />

      <CTASection
        title={data.bottomCta.title}
        subtitle={data.bottomCta.subtitle}
        ctaText={data.bottomCta.ctaText}
        ctaHref={data.bottomCta.ctaHref}
        hideLogos
        headingClassName={pageStyles.ctaHeading}
        backgroundImage="/images/cta/ux-audit-cta-bg.png"
      />

      <ServiceFAQSection {...data.faqs} />

      <ContactFormSection
        tag="CONNECT WITH US"
        heading="Let's talk about your product."
        nextSteps={data.nextSteps}
        contactInfo={data.contactInfo}
      />
    </>
  );
}
